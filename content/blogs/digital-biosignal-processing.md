## Overview: Extracting Physiological Information from Noisy Biopotentials

Surface biopotentials recorded from the human body span microvolt-level cortical rhythms (**EEG**, $5\text{ to }100\,\mu\text{V}$), millivolt-level cardiac depolarization waves (**ECG**, $0.5\text{ to }3\text{ mV}$), and stochastic motor-unit recruitment interference patterns (**sEMG**, $50\,\mu\text{V}\text{ to }5\text{ mV}$). Across four Imperial College London digital biosignal processing studies, I implemented time-domain, frequency-domain, and Z-plane digital filtering pipelines in **MATLAB** and **Python** to extract physiological biomarkers from raw clinical recordings.

---

## 1. High-Density sEMG Propagation Delay and Muscle Fibre Conduction Velocity

When an alpha motor neuron fires, action potentials propagate bidirectionally from the neuromuscular innervation zone along sarcolemmal muscle fibres toward the tendon insertions. Recording surface EMG across a linear electrode array with inter-electrode spacing $\Delta d$ yields delayed copies of the propagating motor-unit action potential train:
$$x_2(t) = x_1(t - \tau_0) + w(t)$$

To estimate the propagation delay $\tau_0$ and derive **Muscle Fibre Conduction Velocity ($\text{MFCV} = \Delta d / \tau_0$)**, I evaluated discrete Mean Squared Error ($\text{MSE}$) minimisation and normalised cross-correlation $R_{x_1 x_2}[m]$:
$$\text{MSE}(m) = \frac{1}{N}\sum_{n=0}^{N-1}\big(x_2[n] - x_1[n - m]\big)^2 = \hat{P}_{x_1} + \hat{P}_{x_2} - 2\hat{R}_{x_1 x_2}[m]$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/digital-biosignals/emg_delay_combined.png" alt="Bipolar sEMG Array Propagation Delay and Cross-Correlation Alignment" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: Multi-channel surface EMG propagation analysis showing raw phase-shifted motor-unit action potentials, parabolic MSE delay minimisation, and phase-aligned waveform overlay.
  </figcaption>
</figure>

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/digital-biosignals/emg_mse_vs_delay.png" alt="Mean Squared Error Objective Curve Across Candidate Sample Delays" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: Mean Squared Error (MSE) objective landscape as a function of candidate sample lag m, identifying the global minimum delay corresponding to physiological muscle fibre conduction velocity (~4.1 m/s).
  </figcaption>
</figure>

Because integer sample lag resolution ($\Delta \tau = 1/f_s$) introduces step quantization at standard sampling rates, applying local parabolic interpolation (or frequency-domain phase-slope regression via the Fourier shift theorem $X_2(\omega) = X_1(\omega)e^{-j\omega\tau_0}$) recovers subsample delay precision and physiological conduction velocities in the $4.0\text{ to }4.5\text{ m/s}$ range.

---

## 2. Rectified EMG Envelope Extraction and Isometric Torque Tracking

Raw surface EMG is a zero-mean stochastic process whose instantaneous variance scales with both **motor-unit recruitment** and **rate coding (firing frequency)**. To map raw sEMG onto biomechanical joint torque during isometric contractions, I compared full-wave rectification ($|x[n]|$) followed by zero-phase low-pass Butterworth envelope filtering (`filtfilt`, cutoff $f_c \in \{1.5, 3.0, 6.0\}\text{ Hz}$) and sliding Root-Mean-Square ($\text{RMS}$) windows:

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/digital-biosignals/emg_envelopes_vs_torque.png" alt="Full-Wave Rectified Low-Pass sEMG Envelopes vs Measured Isometric Joint Torque" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 3: Comparison of low-pass Butterworth sEMG amplitude envelopes against load-cell isometric torque profiles, illustrating the bandwidth trade-off between envelope smoothness and electromechanical delay tracking.
  </figcaption>
</figure>

Cross-correlating the extracted sEMG envelope against the physical load-cell torque transducer trace also quantified the physiological **Electromechanical Delay (EMD)** of $35\text{ to }60\text{ ms}$ required for $\text{Ca}^{2+}$ release from the sarcoplasmic reticulum, acto-myosin cross-bridge cycling, and series elastic tendon tensioning.

---

## 3. Non-Parametric Welch PSD of Cortical EEG Alpha Rhythms (`8 - 13 Hz`)

In electroencephalography (EEG), visual cortex synchronisation during relaxed wakefulness with eyes closed generates a prominent **posterior Alpha rhythm ($8\text{ to }13\text{ Hz}$)** over occipital and parietal electrodes (`O1`, `O2`, `Pz`), which desynchronises immediately upon opening the eyes (Alpha blocking or Berger effect).

Because a single raw periodogram $\hat{S}_{\text{PER}}(f) = \frac{1}{N f_s}\left|\sum_{n=0}^{N-1} x[n]e^{-j2\pi fn/f_s}\right|^2$ is an inconsistent spectral estimator whose variance does not decay as $N \to \infty$, I implemented **Welch's averaged modified periodogram method** using 50%-overlapping Hann-windowed segments:
$$\hat{S}_{\text{Welch}}(f) = \frac{1}{K L U f_s}\sum_{k=0}^{K-1}\left|\sum_{n=0}^{L-1} w[n]\,x_k[n]\,e^{-j2\pi fn/f_s}\right|^2, \quad U = \frac{1}{L}\sum_{n=0}^{L-1} w^2[n]$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/digital-biosignals/eeg_alpha_psd.png" alt="Welch Power Spectral Density of Occipital EEG Showing 10 Hz Alpha Band Peak" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 4: Welch Power Spectral Density (PSD) of resting EEG highlighting the dominant 8 to 13 Hz Alpha synchronisation peak (~10.2 Hz) and variance reduction via Hann window segment averaging.
  </figcaption>
</figure>

---

## 4. Z-Plane Pole-Zero Placement for ECG Baseline Wander and 50 Hz Mains Removal

Clinical electrocardiograms (ECG) are routinely corrupted by two narrowband/low-frequency noise processes:
1. **Respiration and Electrode Baseline Wander ($0.05\text{ to }0.67\text{ Hz}$):** Distorts ST-segment elevation diagnostics.
2. **Power-Line Electromagnetic Interference ($50\text{ Hz}$ fundamental and harmonics):** Obscures low-amplitude P and T waves and alters QRS morphology.

To suppress $50\text{ Hz}$ interference without attenuating adjacent QRS spectral energy ($5\text{ to }35\text{ Hz}$), I designed a second-order **Infinite Impulse Response (IIR) pole-zero notch filter** in the complex $z$-plane by placing a conjugate zero pair directly on the unit circle at angle $\omega_0 = 2\pi(50\text{ Hz})/f_s$ and a conjugate pole pair just inside the unit circle at radius $r = 0.96$:
$$H_{\text{notch}}(z) = b_0 \frac{\left(1 - e^{j\omega_0}z^{-1}\right)\left(1 - e^{-j\omega_0}z^{-1}\right)}{\left(1 - r e^{j\omega_0}z^{-1}\right)\left(1 - r e^{-j\omega_0}z^{-1}\right)} = b_0 \frac{1 - 2\cos(\omega_0)z^{-1} + z^{-2}}{1 - 2r\cos(\omega_0)z^{-1} + r^2 z^{-2}}$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/digital-biosignals/ecg_zplane.png" alt="Complex Z-Plane Pole-Zero Diagram of the IIR ECG Filter" class="rounded-xl shadow-md max-w-full md:max-w-xl h-auto border border-border bg-white p-2" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 5: Complex z-plane pole-zero plot verifying strict causal BIBO stability (all poles inside the unit circle |z| &lt; 1) and unit-circle transmission zeros at the notch frequency.
  </figcaption>
</figure>

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/digital-biosignals/ecg_time_freq.png" alt="Time-Domain P-QRS-T Restoration and Frequency-Domain Magnitude/Phase Response" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 6: Time- and frequency-domain validation of the cascaded high-pass and 50 Hz IIR notch ECG filter, restoring clean P, QRS, and T wave morphology with zero phase distortion via forward-backward filtering.
  </figcaption>
</figure>

Running the cascaded filter via zero-phase forward-backward recursion (`filtfilt`, squaring the magnitude response $|H(e^{j\omega})|^2$ while cancelling non-linear phase delay $\angle H(e^{j\omega}) = 0$) preserved exact R-peak timing and prevented artificial ST-segment phase ringing.
