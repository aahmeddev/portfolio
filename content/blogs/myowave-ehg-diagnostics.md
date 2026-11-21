## 1. Clinical Need: Closing the 7-to-9-Year Endometriosis Diagnostic Gap

Endometriosis affects roughly 1 in 10 women of reproductive age globally, yet patients wait an average of **7 to 9 years** for a definitive clinical diagnosis because current gold-standard confirmation requires invasive diagnostic laparoscopy under general anaesthesia. Non-invasive **Electrohysterography (EHG)** records uterine smooth-muscle (myometrial) action potentials across the abdominal skin surface, offering a promising physiological window into aberrant uterine contractility and dysmenorrhoeic hyper-peristalsis.

Built for the **ENDO1000** longitudinal research framework, **MYOWAVE** won the **Imperial College London Year 2 Molecular Bioengineering Prize for Best Design Group Project**. As Project Manager and Lead Electronics and Software Engineer, I personally owned the custom KiCad biopotential hardware schematics, Arduino Due physiological waveform generator firmware, 250 Hz SciPy digital signal processing engine, and dual NiceGUI and Firebase web portals.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/myowave-ehg/pcb_angled_3d.png" alt="3D KiCad Render of the Custom MYOWAVE ADS1299 Biopotential Shield" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: Angled 3D KiCad PCB render of our custom MYOWAVE biopotential acquisition shield built around the 8-channel 24-bit Texas Instruments ADS1299-6PAGR delta-sigma front-end.
  </figcaption>
</figure>

---

## 2. Custom KiCad Biopotential Hardware (`ADS1299-6PAGR`) and Bench CMRR Verification

Surface uterine myoelectrical signals occupy an amplitude window of $20\text{ to }500\,\mu\text{V}$ and a frequency band below $3.0\text{ Hz}$, making them vulnerable to $50\text{ Hz}$ mains pickup, maternal ECG bleed-through, and electrode motion artefacts.

In KiCad (`MYOWAVE.kicad_sch`), I drafted a multi-board acquisition architecture pairing an Arduino Uno/Due shield interface with the **Texas Instruments `ADS1299-6PAGR`** 8-channel, simultaneous-sampling, 24-bit delta-sigma biopotential ADC:
- **Programmable Gain Front-End:** Configured at $24\times$ low-noise differential programmable gain with active Bias/Driven-Right-Leg (DRL) common-mode feedback to suppress $50\text{ Hz}$ body-coupled interference.
- **Power Rail Isolation:** Separated $+2.5\text{V}$, $+3.3\text{V}$, and $+5.0\text{V}$ analogue and digital supply networks with local ceramic decoupling capacitors positioned adjacent to every AVDD/DVDD pin.
- **SPI Bus & Hardware Verification:** Streamed 24-bit status and channel frames over SPI at $f_s = 250\text{ Hz}$ and validated passband flatness and $50\text{ Hz}$ Common-Mode Rejection Ratio (`T3_CMRR.py`) across the differential inputs.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/myowave-ehg/pcb_top_layout.png" alt="KiCad Top Copper Routing Layout of the MYOWAVE Biopotential PCB" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: Top copper routing layout in KiCad showing symmetrical differential electrode input traces, RC input filtering, and digital SPI isolation around the ADS1299-6PAGR package.
  </figcaption>
</figure>

### Arduino Due 12-Bit DAC Synthetic Uterine Burst Generator (`EHG_Generator.ino`)

Because testing live human uterine biopotentials on the bench requires repeatable reference waveforms with known ground-truth spectral content, I programmed an **Arduino Due 12-bit hardware DAC** (`DAC0`/`DAC1`, $115,200\text{ baud}$) to synthesise physiological uterine contraction bursts (`EHG_Generator.ino`):
$$v_{\text{EHG}}(t) = A_{\text{slow}}\sin(2\pi f_{\text{slow}} t) + E(t)\Big[A_{\text{FWL}}\sin(2\pi f_{\text{FWL}} t) + A_{\text{FWH}}\sin(2\pi f_{\text{FWH}} t)\Big] + \eta(t)$$
where $f_{\text{slow}} \approx 0.05\text{ Hz}$ models the slow mechanical intrauterine pressure envelope $E(t)$, while $f_{\text{FWL}} \in [0.13, 0.34]\text{ Hz}$ and $f_{\text{FWH}} \in [0.34, 1.0]\text{ Hz}$ model myometrial action-potential propagation bursts.

---

## 3. Threaded 250 Hz Python DSP Pipeline (`dsp_math.py`)

In `background_service.py` and `dsp_math.py`, incoming 250 Hz frames are ingested on a dedicated background daemon thread and filtered through a multi-stage `scipy.signal` conditioning chain:
1. **DC Offset & Respiration Removal:** A zero-phase high-pass Butterworth filter (`butter`, $f_c = 0.30\text{ Hz}$) eliminates electrode polarisation drift and maternal respiratory motion.
2. **Myometrial Action-Potential Bandpass ($0.34\text{ to }1.0\text{ Hz}$):** A 4th-order zero-phase Butterworth bandpass isolates uterine action-potential bursts while rejecting maternal ECG ($> 1.0\text{ Hz}$) and $50\text{ Hz}$ power-line interference.
3. **Welch Power Spectral Density & FWL/FWH Ratio Extraction:** Computes Welch PSD (`scipy.signal.welch`) to quantify peak frequency, median frequency, and integrated spectral energy across the **Fast Wave Low ($\text{FWL}: 0.13\text{ to }0.34\text{ Hz}$)** and **Fast Wave High ($\text{FWH}: 0.34\text{ to }1.0\text{ Hz}$)** diagnostic bands, alongside sliding RMS burst envelopes.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/myowave-ehg/ehg_dsp_pipeline.png" alt="MYOWAVE 250 Hz Butterworth Bandpass Conditioning and Welch FWL/FWH Spectral Density" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 3: MYOWAVE 250 Hz Python DSP pipeline output: zero-phase 4th-order Butterworth bandpass recovery of uterine contraction bursts from raw ADS1299 recordings (left) and Welch Power Spectral Density partitioning across Fast Wave Low (FWL) and Fast Wave High (FWH) bands (right).
  </figcaption>
</figure>

---

## 4. Dual NiceGUI + Firebase Clinical and Patient Portals

To support both longitudinal at-home patient self-monitoring and clinical researcher review within the ENDO1000 study workflow, I built a dual-portal web architecture in Python (**NiceGUI**, evolving from an earlier **Streamlit** prototype) backed by dual **Firebase Firestore** cloud synchronisation and local **SQLite** fallback storage:
- **Patient Mobile Diary Portal (`port 8082`):** Guides participants through electrode placement, displays real-time connection status and gentle contraction feedback, and logs timestamped pain scores, menstrual cycle phase, and medication intake.
- **Clinical Researcher Dashboard (`port 8081`):** Provides clinicians with multi-channel interactive Plotly time-series waveforms, Welch FWL/FWH spectral density plots, automated contraction burst frequency/duration metrics, and cohort export tools.
