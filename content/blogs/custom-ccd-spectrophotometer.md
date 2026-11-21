## 1. Optical Geometry and Diffraction Grating Derivation

Benchtop UV-Vis and fluorescence spectrophotometers rely on precision optical benches to disperse polychromatic light across a linear detector while preventing stray internal reflections from swamping weak analytical signals. In this Imperial College London bioinstrumentation project (awarded **79%**), I designed, CAD-modelled, assembled, and calibrated a custom 3D-printed transmission and 90-degree fluorescence spectrophotometer built around a **900 lines/mm transmission diffraction grating** and an **STM32 Nucleo-F401RE** driving a **3,648-pixel Toshiba TCD1304 linear CCD**.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png" alt="SolidWorks 3D Optical Enclosure CAD and Stray-Light Baffle Improvements" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: Annotated SolidWorks 3D CAD breakdown of the custom spectrophotometer enclosure (Ahmed_Casing.SLDASM), showing the asymmetrical ceiling sawtooth baffle, 45-degree concave zero-order V-trap, cuvette mount, diffraction grating holder, and TCD1304 linear CCD plane.
  </figcaption>
</figure>

To center the visible spectrum ($\lambda_c = 532\text{ nm}$ green reference laser) onto the active photosensitive region of the Toshiba `TCD1304` linear CCD array ($29.1\text{ mm}$ sensor length across $3,648$ pixels at $8\,\mu\text{m}$ pitch), I derived the first-order ($m = 1$) diffraction angle from the grating pitch $d = \frac{1}{900\text{ mm}^{-1}} = 1.111\,\mu\text{m}$:
$$d\sin\theta_m = m\lambda \implies \theta_1(532\text{ nm}) = \arcsin\!\left(\frac{1 \times 532 \times 10^{-9}\text{ m}}{1.111 \times 10^{-6}\text{ m}}\right) = \arcsin(0.4788) = 28.61^\circ$$

Accounting for the fixed internal steering mirror geometry and the focal distance to the CCD detector board (`CCD_Board.SLDASM`), the optimal grating incidence mount angle was derived as **$46.064^\circ$**, ensuring that the entire $400\text{ to }700\text{ nm}$ visible band dispersed cleanly across the central two-thirds of the linear pixel array without clipping at the violet or deep-red edges.

---

## 2. Eliminating Stray Photons: Asymmetrical Sawtooth Baffles and the 45° V-Trap

In 3D-printed black PLA optical housings, layer striations act as grazing-incidence reflectors. Two sources of stray light severely degrade dynamic range and Beer-Lambert linearity at high optical density:
1. **Zero-Order ($m = 0$) Undiffracted Beam:** Over 50% of incident photons pass straight through a transmission grating without diffraction ($\theta_0 = 0^\circ$) and reflect off the rear housing wall back toward the CCD.
2. **Ceiling and Side-Wall Grazing Reflections:** Divergent rays emerging from the cuvette holder reflect at shallow angles along the upper lid into the detector plane.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/cad_lid_grating.png" alt="SolidWorks Cross-Section of Asymmetrical Sawtooth Lid Baffle and Grating Mount" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: SolidWorks cross-section of the upper lid assembly showing the asymmetrical sawtooth ceiling baffle teeth angled away from the detector plane and the recessed diffraction grating mount.
  </figcaption>
</figure>

To suppress both artefact channels mechanically inside SolidWorks (`Ahmed_Casing.SLDASM`), I engineered two internal optical traps:
- **Concave $45^\circ$ Specular Zero-Order V-Trap:** Positioned directly in the path of the $m = 0$ undiffracted beam, the V-trap forces incoming parallel rays to undergo multiple consecutive $45^\circ$ inward bounces deep into a narrowed light-absorbing vertex, attenuating zero-order back-scatter by over an order of magnitude per bounce.
- **Asymmetrical Ceiling Sawtooth Baffle:** Instead of a flat lid, the upper enclosure ceiling is profiled with asymmetrical sawtooth ridges whose steep faces intercept shallow grazing rays coming from the slit and redirect them backward into dead-zone cavities.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/cad_v_trap.png" alt="SolidWorks Detail View of the Concave 45-Degree Zero-Order Optical V-Trap" class="rounded-xl shadow-md max-w-full md:max-w-2xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 3: Detailed SolidWorks CAD view of the concave 45-degree zero-order V-trap geometry engineered to capture undiffracted (m = 0) transmission rays.
  </figcaption>
</figure>

---

## 3. Three-Laser Pixel-to-Wavelength Calibration (`405 / 532 / 650 nm`)

The STM32 Nucleo-F401RE digitises the `TCD1304` charge-coupled output across $3,648$ pixel indices (`0` to `3647`). Converting raw pixel indices $p$ into calibrated nanometre wavelengths $\lambda(p)$ requires anchoring the dispersion curve against monochromatic atomic or diode laser lines.

Using violet ($405\text{ nm}$), green ($532\text{ nm}$), and red ($650\text{ nm}$) calibration lasers across $n = 5$ replicate scans, I wrote a Python calibration pipeline (`scipy.stats.linregress` and `scipy.signal.find_peaks`) to locate centroid pixel peaks and fit the linear dispersion relation:
$$\lambda(p) = m_{\text{cal}} \cdot p + \lambda_0$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/laser_calibration.png" alt="Three-Laser Pixel-to-Wavelength Linear Regression Calibration" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 4: Linear regression pixel-to-wavelength calibration across 405 nm (violet), 532 nm (green), and 650 nm (red) laser centroids on the 3,648-pixel Toshiba TCD1304 CCD array.
  </figcaption>
</figure>

The three laser centroids fell on a highly linear dispersion line ($R^2 > 0.999$), confirming that small-angle grating dispersion across the $29.1\text{ mm}$ detector plane introduced negligible second-order geometric distortion.

---

## 4. Transmission Absorbance, 90° Fluorescence, and Unknown Chemical Identification

With pixel indices mapped to nanometres, I evaluated the instrument across both **transmission absorbance** ($A(\lambda) = -\log_{10}\!\big(\frac{I_{\text{sample}}(\lambda) - I_{\text{dark}}(\lambda)}{I_{\text{blank}}(\lambda) - I_{\text{dark}}(\lambda)}\big)$) and **orthogonal $90^\circ$ fluorescence emission** ($n = 5$ replicates per sample, shaded $\pm 1\sigma$ confidence bands):

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/absorbance_combined.png" alt="Normalised Transmission Absorbance Spectra Across Reference Dyes" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 5: Combined normalised transmission absorbance spectra (n = 5 replicates with ±1 SD bands) captured on the custom 3D-printed CCD spectrophotometer.
  </figcaption>
</figure>

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/fluorescence_combined.png" alt="Normalised 90-Degree Fluorescence Emission Spectra" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 6: Normalised 90-degree orthogonal fluorescence emission profiles (n = 5 replicates) demonstrating clean Stokes-shifted emission recovery with minimal excitation bleed-through.
  </figcaption>
</figure>

Finally, by matching the measured absorbance and fluorescence peak maxima ($\lambda_{\max}$) and full-width at half-maximum (FWHM) bandwidths of blind chemical unknowns against commercial reference spectrophotometer profiles, our Python deconvolution pipeline accurately identified the unknown fluorophore and chromophore species:

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/pulse-oximeter-spectrophotometer/chemical_id_proof.png" alt="Unknown Chemical Identification Proof Against Reference Spectra" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 7: Quantitative spectral overlay and peak-matching proof identifying unknown dye and fluorophore samples against commercial benchmark spectra.
  </figcaption>
</figure>
