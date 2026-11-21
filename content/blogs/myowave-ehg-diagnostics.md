## Why We Built MYOWAVE: A 7-to-9-Year Diagnostic Delay

When our Imperial College London design group first started researching **endometriosis** alongside the **ENDO1000** clinical study framework, one statistic jumped off every clinical paper: it takes an average of **7 to 9 years** from a patient's first symptom onset to receive a confirmed diagnosis.

The reason for that bottleneck is that non-invasive transvaginal ultrasound frequently misses superficial peritoneal endometriosis lesions, leaving **invasive diagnostic laparoscopy** under general anaesthesia as the clinical gold standard. However, a growing body of reproductive physiology literature has shown that endometriosis significantly alters **uterine myometrial contractility**: patients exhibit hyper-peristaltic, dysrhythmic uterine smooth-muscle contractions and elevated intrauterine basal pressure across the menstrual cycle.

Just as an ECG measures cardiac action potentials on the chest and an EMG measures skeletal muscle recruitment on a limb, **Electrohysterography (EHG)** records the slow myoelectrical action-potential bursts of the uterus non-invasively from surface Ag/AgCl electrodes placed over the lower abdomen.

Our project, **MYOWAVE**, set out to build a complete, wearable, non-invasive EHG acquisition and clinical longitudinal monitoring platform. I served as Project Manager and personally owned all of the **electronic hardware design (KiCad `ADS1299` PCB), embedded signal synthesis (Arduino Due DAC firmware), real-time 250 Hz digital signal processing (`scipy.signal`), and full-stack clinical and patient web applications (NiceGUI + Firebase)**, leading our team to win the **Year 2 Molecular Bioengineering Prize for Best Design Group Project**.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/myowave-ehg/pcb_angled_3d.png" alt="Angled 3D KiCad Render of Our Custom MYOWAVE ADS1299 Biopotential Acquisition PCB" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Angled 3D KiCad render of our custom MYOWAVE biopotential acquisition shield built around the 8-channel 24-bit Texas Instruments ADS1299-6PAGR front-end.
  </figcaption>
</figure>

---

## Designing Around a 50 Microvolt Signal Buried in 50 Hz Mains Noise

If you hook a standard 10-bit or 12-bit microcontroller ADC (`analogRead()` on an Arduino) up to a pair of abdominal skin electrodes through a basic op-amp, you will not see uterine contractions. You will see a giant $50\text{ Hz}$ power-line sine wave, a slow drifting DC offset from electrode-skin half-cell potential ($E_{\text{half-cell}} \approx \pm 200\text{ mV}$ for Ag/AgCl), maternal ECG R-peaks bleeding down from the thorax, and respiration motion every four seconds.

Meanwhile, the actual uterine EHG signal sits way down at **$20\text{ to }500\,\mu\text{V}$** in amplitude and oscillates inside an ultra-low frequency window between **$0.13\text{ Hz}$ and $1.0\text{ Hz}$** (with an underlying mechanical slow wave near $0.05\text{ Hz}$).

### Choosing the Texas Instruments `ADS1299-6PAGR` Front-End

Instead of chaining discrete instrumentation amplifiers (such as an `INA128` or `AD620`) into external active analog high-pass filters, where capacitor tolerance mismatches of even 1% degrade the Common-Mode Rejection Ratio (CMRR) at low frequencies, I designed our custom KiCad schematic (`MYOWAVE.kicad_sch`) around the **Texas Instruments `ADS1299-6PAGR`**:
- **Simultaneous 24-Bit Delta-Sigma Resolution:** Because a 24-bit converter partitions a $\pm 187.5\text{ mV}$ input full-scale range (at $24\times$ internal programmable gain amplifier setting) into $2^{24} = 16,777,216$ steps, the least significant bit (LSB) resolution is roughly **$22.3\text{ nanovolts}$**. That allows the ADC to digitise both the massive $\pm 100\text{ mV}$ DC electrode half-cell offset and the $50\,\mu\text{V}$ uterine burst simultaneously without saturating the front-end or needing bulky AC-coupling capacitors in the analog path!
- **Active Bias / Driven-Right-Leg (DRL) Feedback Loop:** By summing the common-mode voltage across the differential recording channels, inverting it through the `ADS1299` internal bias amplifier, and driving it back into the patient reference electrode, we actively cancel $50\text{ Hz}$ capacitive mains pickup before it enters the PGA.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="flex flex-col items-center">
    <img src="/portfolio/projects/myowave-ehg/pcb_top_3d.png" alt="Top 3D KiCad View of the MYOWAVE Biopotential PCB" class="rounded-xl shadow-md w-full h-auto border border-border" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Top 3D KiCad render showing the central ADS1299-6PAGR TQFP-64 package, local decoupling capacitors, and Arduino shield pin headers.
    </figcaption>
  </figure>
  <figure class="flex flex-col items-center">
    <img src="/portfolio/projects/myowave-ehg/pcb_top_layout.png" alt="KiCad Copper Routing Layout Separating Differential Analog Inputs from SPI Lines" class="rounded-xl shadow-md w-full h-auto border border-border" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      KiCad copper routing layout separating the differential analog electrode input traces (left) from the high-speed SPI digital clock and data lines (right).
    </figcaption>
  </figure>
</div>

---

## Solving the Bench-Testing Catch-22 with an Arduino Due 12-Bit DAC

Halfway through the hardware build, we faced a classic medical device testing Catch-22: you cannot bring an unverified prototype PCB into a clinical setting to record live uterine contractions, yet standard lab bench function generators only output simple $1\text{ Hz}$ or $1\text{ kHz}$ sine and square waves that look nothing like a non-stationary myometrial burst.

To test our hardware and software pipeline end-to-end on the bench, I programmed a dedicated **Arduino Due** (`EHG_Generator.ino`, streaming at $115,200\text{ baud}$ and outputting real analog voltages via its true 12-bit hardware `DAC0` pin) to act as a **synthetic physiological uterus**:

$$v_{\text{EHG}}(t) = A_{\text{slow}}\sin(2\pi f_{\text{slow}} t) + E(t)\Big[A_{\text{FWL}}\sin(2\pi f_{\text{FWL}} t) + A_{\text{FWH}}\sin(2\pi f_{\text{FWH}} t)\Big] + A_{50}\sin(2\pi \cdot 50 t) + \eta(t)$$

By modulating fast action-potential spikes ($f_{\text{FWL}} \in [0.13, 0.34]\text{ Hz}$ and $f_{\text{FWH}} \in [0.34, 1.0]\text{ Hz}$) inside a slow Gaussian contraction envelope $E(t)$ recurring at $f_{\text{slow}} \approx 0.05\text{ Hz}$ and deliberately injecting $50\text{ Hz}$ mains hum and white noise $\eta(t)$, we could feed a known physiological waveform through resistive voltage dividers directly into our electrode leads and verify our CMRR and filter recovery quantitatively (`T3_CMRR.py`).

---

## The 250 Hz Python DSP Pipeline (`dsp_math.py`)

On the software side, I wrote a multi-threaded Python background acquisition service (`background_service.py` and `dsp_math.py`) that ingests incoming $250\text{ Hz}$ frames and runs them through a zero-phase `scipy.signal` processing chain:

1. **Zero-Phase 4th-Order Butterworth Bandpass ($0.34\text{ to }1.0\text{ Hz}$):** Using forward-backward filtering (`scipy.signal.filtfilt`) strips out both sub-$0.1\text{ Hz}$ electrode baseline drift and $> 1.0\text{ Hz}$ maternal cardiac/skeletal EMG artefacts without distorting burst arrival timing.
2. **Welch Power Spectral Density & FWL/FWH Band Ratios:** Using `scipy.signal.welch`, the DSP engine partitions the spectral energy into the two canonical uterine diagnostic bands established in obstetrics and gynaecology literature:
   - **Fast Wave Low ($\text{FWL}: 0.13\text{ to }0.34\text{ Hz}$):** Associated with local non-propagating basal uterine electrical activity.
   - **Fast Wave High ($\text{FWH}: 0.34\text{ to }1.0\text{ Hz}$):** Associated with coordinated, high-velocity action-potential propagation across gap junctions (connexin-43) during intense or dysmenorrhoeic contractions.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/myowave-ehg/ehg_dsp_pipeline.png" alt="MYOWAVE 250 Hz Butterworth Bandpass Recovery and Welch FWL/FWH Spectral Density" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Output of our 250 Hz Python DSP engine (dsp_math.py): recovering clean uterine contraction bursts from noisy raw recordings via 4th-order Butterworth bandpass filtering (left) and computing Welch Power Spectral Density across the FWL and FWH diagnostic bands (right).
  </figcaption>
</figure>

---

## Building Two Distinct Interfaces: Why I Switched from Streamlit to NiceGUI

Initially, I prototyped our user interface in **Streamlit**. While Streamlit is great for single-page data science dashboards (like my Gene Expression Explorer app), we quickly hit its architectural ceiling when trying to run a **continuous $250\text{ Hz}$ hardware background thread** alongside two separate user roles (a patient logging symptoms on her phone and a clinician reviewing multi-channel spectral density on a desktop). In Streamlit, every UI interaction re-executes the entire Python script top-to-bottom.

To solve that cleanly, I migrated the entire full-stack application to **NiceGUI** (built on FastAPI, Vue, and Quasar) with a shared asynchronous background service (`background_service.py`), local **SQLite** storage, and dual **Firebase Firestore** cloud synchronisation:
- **The Patient Companion Portal (`port 8082`):** Designed around our user-centric patient survey feedback to be calm and non-clinical. Rather than overwhelming participants with raw microvolt Fourier transforms, it provides an intuitive wearable connection indicator, gentle session progress tracking, and a longitudinal symptom diary (pain severity, menstrual cycle phase, and analgesia logs).
- **The Clinical Researcher Portal (`port 8081`):** Built for ENDO1000 investigators, rendering live multi-channel Plotly waveforms, RMS burst envelopes, Welch FWL/FWH power ratios, and downloadable session telemetry.

---

## Limitations and Where Wearable EHG Research Goes Next

Winning the departmental **Best Design Group Project Prize** was a huge milestone, and reflecting on the engineering process also highlighted the hardest unsolved problems in wearable abdominal biopotentials:

1. **Separating Maternal Abdominal Skeletal EMG from Uterine Smooth Muscle:** When a patient walks, laughs, or shifts posture, the rectus abdominis skeletal muscles fire. Even though skeletal EMG peaks primarily between $20\text{ and }150\text{ Hz}$, the low-frequency modulation envelope of a posture shift can leak into the $0.3\text{ to }1.0\text{ Hz}$ EHG passband. Adding a board-mounted **3-axis MEMS accelerometer (IMU)** (such as an `MPU6050` or `LIS3DH`) and running an **Adaptive LMS (Least Mean Squares) Noise Cancellation filter** using the accelerometer channels as the motion reference would allow real-time ambulatory artefact subtraction.
2. **Spatial Propagation Velocity via Laplacian Electrode Grids:** A single bipolar channel tells you *when* a burst occurs and its frequency distribution, but in endometriosis, a critical diagnostic signature is the **direction and propagation velocity** of the contraction wave (e.g., retrograde fundus-to-cervix vs cervix-to-fundus peristalsis). Utilizing all 8 differential channels of our `ADS1299-6PAGR` PCB across a $4 \times 2$ high-density abdominal surface Laplacian grid would let us compute 2D spatial cross-correlation velocity vectors across the uterus.
