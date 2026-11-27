## Why Biopotentials Are the Hardest Signals to Clean Up

When you first study digital signal processing on textbook synthetic sine waves, filtering feels almost trivial: take an FFT, pick a cutoff frequency, and multiply. The moment you connect actual electrodes to a human being, however, every assumption of stationary linear time-invariant (LTI) signal processing gets tested at once.

Across four biomedical signal processing modules at Imperial College London, I worked through the full hierarchy of clinical surface recordings in **MATLAB**: **high-density surface electromyography (sEMG)** on contracting skeletal muscle, **occipital electroencephalography (EEG)** during visual cortex Alpha blocking, and **electrocardiography (ECG)** corrupted by respiration baseline wander and $50\text{ Hz}$ power-line interference. This article brings together the story of how I built each signal processing pipeline, why naive textbook estimators failed on the raw recordings, and how those lessons later fed directly into the DSP engine I wrote for **MYOWAVE**.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/digital-biosignals/biosignal_oscilloscope_photo.jpg" alt="Biopotential Pulse Acquisition and Digital Storage Oscilloscope Bench Setup" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Benchtop biopotential signal acquisition and digital oscilloscope verification: before any digital Z-plane filter or spectral estimator can extract a biomarker, the analog front-end and sampling rate must preserve phase and transient pulse morphology.
  </figcaption>
</figure>

---

## 1. Tracking an Action Potential Moving at 4 Metres per Second (sEMG Delay & MFCV)

Our first problem looked deceptively simple: given two bipolar surface EMG channels $x_1[n]$ and $x_2[n]$ spaced a known distance $\Delta d$ apart along a muscle belly (moving away from the neuromuscular innervation zone toward the tendon), how fast is the depolarisation wave travelling along the muscle fibres?

Clinically, **Muscle Fibre Conduction Velocity ($\text{MFCV} = \Delta d / \tau_0$)** is a sensitive biomarker for peripheral neuropathy, muscular dystrophy, and localised muscle fatigue (where lactic acid accumulation slows sarcolemmal sodium-channel kinetics). If signal $x_2(t)$ is simply a delayed, noisy copy of $x_1(t)$ shifted by propagation time $\tau_0$:

$$x_2(t) = x_1(t - \tau_0) + w(t)$$

then in discrete time we want to find the sample shift $m$ that minimises the Mean Squared Error ($\text{MSE}$) between the two waveforms:

$$\text{MSE}(m) = \frac{1}{N}\sum_{n=0}^{N-1}\big(x_2[n] - x_1[n - m]\big)^2 = \hat{P}_{x_1} + \hat{P}_{x_2} - 2\hat{R}_{x_1 x_2}[m]$$

Writing out that algebraic expansion in MATLAB was a neat "aha" moment: minimising the squared amplitude difference $\text{MSE}(m)$ is mathematically identical to maximising the discrete **cross-correlation** $\hat{R}_{x_1 x_2}[m]$ when the channel powers are stationary.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/digital-biosignals/emg_delay_combined.png" alt="Phase-Shifted Bipolar sEMG Waveforms, MSE Minimisation, and Delay-Aligned Overlay" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Estimating muscle fibre propagation delay across a linear sEMG electrode array: raw phase-delayed motor-unit action potential trains (top), parabolic MSE minimisation (middle), and phase-aligned overlay after delay compensation (bottom).
  </figcaption>
</figure>

### The Sub-Sample Quantisation Trap

Here is the catch we ran into when we actually plugged in physical distances: if two electrodes sit $\Delta d = 10\text{ mm}$ apart and action potentials travel along skeletal muscle at roughly $4.1\text{ m/s}$, the true propagation delay is only $\tau_0 \approx 2.44\text{ ms}$. At a $1,000\text{ Hz}$ sampling rate ($\Delta t = 1.0\text{ ms}$), an integer lag search can only return $m = 2\text{ samples}$ ($5.0\text{ m/s}$) or $m = 3\text{ samples}$ ($3.33\text{ m/s}$), which is a huge $\pm 20\%$ velocity quantization error!

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/digital-biosignals/emg_mse_vs_delay.png" alt="Mean Squared Error Objective Landscape Across Candidate Sample Lags" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Zooming into the MSE bowl around the optimal sample delay: fitting a continuous local parabola across the three minimum discrete lag samples recovers sub-sample delay accuracy and a physiological conduction velocity of 4.12 m/s.
  </figcaption>
</figure>

To break through the integer-sample ceiling without upsampling the entire recording by $20\times$, we can either fit a **three-point vertex parabola** across the discrete $\text{MSE}$ minimum ($m^*-1, m^*, m^*+1$) or move into the Fourier domain using the phase-shift property $X_2(\omega) = X_1(\omega)e^{-j\omega\tau_0}$, where $\tau_0$ is the continuous linear slope of the cross-spectral phase angle $\angle S_{x_1 x_2}(\omega) = -\omega\tau_0$.

---

## 2. Why Your Muscle Lags Behind Your Nervous System (EMG Envelopes vs Isometric Torque)

In prosthetic control and biomechanics, you want to predict how much mechanical force a muscle is generating simply by reading its surface EMG voltage. However, a raw sEMG trace is a zero-mean bipolar interference pattern, if you average the raw voltage over a window, positive and negative phases cancel out to zero regardless of how hard the subject is contracting!

To extract an amplitude envelope proportional to **motor-unit recruitment** and **rate coding**, we full-wave rectified the signal ($|x[n]|$) and passed it through zero-phase low-pass Butterworth filters across progressively tighter cutoff frequencies ($f_c \in \{1.5, 3.0, 6.0\}\text{ Hz}$):

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/digital-biosignals/emg_envelopes_vs_torque.png" alt="Rectified Low-Pass sEMG Envelopes Compared Against Load-Cell Isometric Joint Torque" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Comparing full-wave rectified low-pass Butterworth sEMG envelopes against actual load-cell isometric joint torque: notice the bandwidth trade-off between ripple suppression and responsiveness, as well as the physiological electromechanical delay (EMD).
  </figcaption>
</figure>

Overlaying our rectified sEMG envelope against the physical load-cell torque curve revealed two fascinating physiological facts:
1. **The Bandwidth-Latency Trade-off in Myoelectric Prosthetics:** A $6.0\text{ Hz}$ envelope responds quickly when the subject starts contracting, but it leaves spiky motor-unit firing ripples that would make a prosthetic hand jitter. Dropping the cut-off to $1.5\text{ Hz}$ produces a much smoother force estimate, but if you use a causal single-pass filter in real time, the filter group delay makes the prosthetic feel sluggish.
2. **Electromechanical Delay ($\text{EMD} \approx 40\text{ to }55\text{ ms}$):** Even when using a zero-phase (`filtfilt`) envelope, the electrical sEMG spike consistently rises roughly $45\text{ ms}$ *before* the mechanical torque transducer registers tension! That gap is the real physical time required for action potentials to travel down T-tubules, trigger dihydropyridine/ryanodine $\text{Ca}^{2+}$ release from the sarcoplasmic reticulum, cycle acto-myosin cross-bridges, and pull the slack out of the series elastic tendon.

---

## 3. Taming Spectral Variance in Cortical EEG Alpha Rhythms (Welch PSD)

In our third study, we examined occipital EEG recordings captured while a subject sat quietly with their **eyes closed** versus **eyes open**. When visual input is removed, thalamocortical feedback loops synchronise millions of pyramidal neurons in the primary visual cortex into a coherent **$8\text{ to }13\text{ Hz}$ Alpha oscillation** (the Berger effect).

When I first computed a standard raw FFT periodogram $\hat{S}_{\text{PER}}(f) = \frac{1}{N f_s}\left|\sum_{n=0}^{N-1} x[n]e^{-j2\pi fn/f_s}\right|^2$ across the recording, the spectrum looked like a forest of jagged noise spikes. The reason is a classic statistical pitfall: the raw periodogram is an **inconsistent estimator**. Because each frequency bin is the sum of squared Gaussian random variables (a $\chi_2^2$ distribution), the standard deviation of the periodogram at every frequency is equal to $100\%$ of the mean power itself, and taking a longer recording only packs *more* noisy frequency bins closer together without reducing the vertical variance!

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/digital-biosignals/eeg_alpha_psd.png" alt="Welch Averaged Modified Periodogram of Occipital EEG Alpha Band Synchronisation" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Welch Power Spectral Density (PSD) of occipital EEG using 50%-overlapping Hann-windowed segments: variance reduction cleanly isolates the ~10.2 Hz cortical Alpha peak from the 1/f background neural spectrum.
  </figcaption>
</figure>

Switching to **Welch's averaged modified periodogram**, slicing the EEG trace into $K$ overlapping segments of length $L$, tapering each segment with a smooth **Hann window** $w[n]$ to suppress sidelobe spectral leakage, and averaging their periodograms, cuts the estimator variance by roughly $\frac{9}{11 K}$:

$$\hat{S}_{\text{Welch}}(f) = \frac{1}{K L U f_s}\sum_{k=0}^{K-1}\left|\sum_{n=0}^{L-1} w[n]\,x_k[n]\,e^{-j2\pi fn/f_s}\right|^2, \quad U = \frac{1}{L}\sum_{n=0}^{L-1} w^2[n]$$

With the variance suppressed, the $\sim 10.2\text{ Hz}$ occipital Alpha peak stood out unmistakably above the $1/f$ cortical background noise.

---

## 4. Placing Poles and Zeros by Hand on the Complex Z-Plane (ECG Filtering)

In our final study, we were handed a clinical ECG trace that was almost unreadable: heavy $50\text{ Hz}$ mains hum blurred the baseline into a thick ribbon, while slow $0.2\text{ Hz}$ respiratory motion swung the trace up and down across several millivolts.

Rather than calling a black-box filter wizard, we designed a custom **Infinite Impulse Response (IIR) pole-zero filter** directly on the complex $z$-plane. The intuition behind pole-zero placement is wonderfully geometric when you view the frequency response $H(e^{j\omega})$ as the ratio of distances from a point $e^{j\omega}$ moving around the unit circle to the zeros $z_k$ and poles $p_k$:

- To completely extinguish $50\text{ Hz}$ interference (and DC drift at $\omega = 0$), you drop **conjugate transmission zeros directly onto the unit circle** at angle $\omega_0 = \pm 2\pi(50\text{ Hz})/f_s$ (and $z = 1$), forcing the numerator of $H(e^{j\omega_0})$ to vanish to zero.
- If you only place zeros, however, the trench around $\omega_0$ is wide and dull, chewing away legitimate $25\text{ to }45\text{ Hz}$ QRS complex energy. To make the notch razor-sharp while keeping the system causally BIBO-stable, you place **conjugate poles just inside the unit circle** along the same radial angle at radius $r = 0.96$ ($p_{1,2} = r e^{\pm j\omega_0}$, with $|p| < 1$):

$$H_{\text{notch}}(z) = b_0 \frac{\left(1 - e^{j\omega_0}z^{-1}\right)\left(1 - e^{-j\omega_0}z^{-1}\right)}{\left(1 - r e^{j\omega_0}z^{-1}\right)\left(1 - r e^{-j\omega_0}z^{-1}\right)} = b_0 \frac{1 - 2\cos(\omega_0)z^{-1} + z^{-2}}{1 - 2r\cos(\omega_0)z^{-1} + r^2 z^{-2}}$$

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="flex flex-col items-center">
    <img src="/blogs/digital-biosignals/ecg_zplane.png" alt="Complex Z-Plane Pole-Zero Diagram of Our IIR ECG Filter" class="rounded-xl shadow-md w-full h-auto border border-border bg-white p-2" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Complex z-plane pole-zero plot verifying unit-circle transmission zeros and interior stabilizing poles (|p| &lt; 1).
    </figcaption>
  </figure>
  <figure class="flex flex-col items-center">
    <img src="/blogs/digital-biosignals/ecg_time_freq.png" alt="Restored P-QRS-T ECG Morphology and Filter Frequency Response" class="rounded-xl shadow-md w-full h-auto border border-border" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Time- and frequency-domain validation showing clean recovery of the P wave, QRS complex, and ST-T segment.
    </figcaption>
  </figure>
</div>

---

## Limitations and Real-World Clinical Considerations

Working across all four biosignal modalities highlighted why naive digital filters can actually cause misdiagnoses if applied carelessly:

1. **Causal IIR Phase Distortion vs ST-Segment Elevation:** Near a high-Q pole-zero notch or a steep high-pass cutoff ($0.5\text{ Hz}$), the phase response $\angle H(e^{j\omega})$ of a causal single-pass IIR filter becomes strongly non-linear. On an ECG, non-linear phase delay shifts the low-frequency T wave relative to the high-frequency QRS complex, creating artificial **ST-segment depression or elevation** that mimics myocardial ischaemia! In offline analysis (and buffered sliding windows), running **zero-phase forward-backward filtering (`filtfilt`)** cancels the phase angle identically ($\angle |H(e^{j\omega})|^2 = 0$), preserving clinical ST morphology.
2. **Non-Stationarity During Muscle Fatigue and Seizures:** Welch's PSD assumes the signal is wide-sense stationary over the averaging window. When a muscle fatigues during a sustained contraction (shifting median sEMG power toward lower frequencies) or when a cortical EEG transitions suddenly into a transient spike-and-wave burst, time-averaging smears the transition. Extending these pipelines with **Continuous Wavelet Transforms (CWT, Morlet wavelets)** or **Short-Time Fourier Transform (STFT) spectrograms** captures joint time-frequency evolution without sacrificing transient localisation.
