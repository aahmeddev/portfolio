## Why Build a Spectrophotometer From Scratch?

Every molecular bioengineering lab has a benchtop UV-Vis spectrophotometer tucked into the corner. You pipette $1\text{ mL}$ into a plastic cuvette, close the lid, click "Measure," and a clean absorbance curve pops up on the screen. Until you have to design and align the optical path yourself, it is easy to forget that inside that grey box is a game of geometric ray-tracing where a few percent of stray scattered photons can completely ruin your dynamic range.

Our goal in this project was to design, 3D-print in black PLA, wire, and calibrate a combined **transmission absorbance and $90^\circ$ fluorescence spectrophotometer** from scratch. We had a **900 lines/mm transmission diffraction grating**, a few ThorLabs and Newport optical post mounts, an **STM32 Nucleo-F401RE** microcontroller board, and a **Toshiba `TCD1304` linear CCD array** ($3,648$ silicon photodiodes spaced at an $8\,\mu\text{m}$ pixel pitch across a $29.1\text{ mm}$ sensor window).

<figure class="my-8 flex flex-col items-center">
  <img src="/projects/pulse-oximeter-spectrophotometer/cad_isometric.png" alt="SolidWorks Isometric 3D CAD Assembly of Our Custom Spectrophotometer Housing" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border bg-white p-2" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    SolidWorks isometric 3D CAD assembly (Ahmed_Casing.SLDASM) showing the complete optical housing, dual-excitation cuvette tower, internal steering mirror, diffraction grating mount, and linear CCD detector slot.
  </figcaption>
</figure>

---

## The Geometry Puzzle: Getting 400 to 700 nm onto a 29 mm Chip

The first challenge I hit in SolidWorks was purely geometric. A linear CCD chip is only $29.1\text{ mm}$ wide. If you mount the diffraction grating at the wrong angle by even two or three degrees, the violet end of the spectrum misses the left edge of the silicon die entirely, or the red end spills off the right edge onto the PCB solder mask.

To anchor the middle of the visible spectrum ($\lambda_c = 532\text{ nm}$, corresponding to our green calibration laser) squarely onto the centre of the `TCD1304` detector window, I started from the first-order ($m = 1$) diffraction grating equation for a grating pitch of $d = \frac{1}{900\text{ mm}^{-1}} = 1.111\,\mu\text{m}$:

$$d\sin\theta_m = m\lambda \implies \theta_1(532\text{ nm}) = \arcsin\!\left(\frac{1 \times 532 \times 10^{-9}\text{ m}}{1.111 \times 10^{-6}\text{ m}}\right) = \arcsin(0.4788) = 28.61^\circ$$

Tracing the folded beam path from the cuvette exit slit (`TransmissionCuvetteHolder.SLDPRT`) off the internal steering mirror and through the grating plane onto `CCD_Board.SLDASM` yielded a target grating mount incidence angle of **$46.064^\circ$**. Building that exact angle directly into the SolidWorks locating ribs meant that when we dropped the physical grating into the 3D-printed slot, the dispersed rainbow landed across the central active pixels on the first try without needing finicky thumbscrew adjustments in the dark.

---

## The Stray-Light Surprise (and How We Engineered Around It in CAD)

Here is where theory met the messy reality of 3D printing. Even when you print an optical enclosure in matte black PLA, fused deposition modelling leaves microscopic cylindrical layer lines along every wall. At shallow grazing angles, black PLA behaves almost like a shiny specular mirror.

When we ran our first dark-room tests with a bright broadband source, two major stray-light artefacts showed up as an elevated baseline floor across the CCD:
1. **The Zero-Order ($m = 0$) Beam:** A transmission diffraction grating does not deflect 100% of incoming light into the $m = \pm 1$ rainbow orders. Over half of the optical power passes straight through undiffracted at $\theta_0 = 0^\circ$, slams into the back wall of the box, and scatters back onto the CCD sensor.
2. **Ceiling Grazing Reflections:** Divergent rays exiting the cuvette holder skimmed along the flat top lid of the housing and bounced straight down onto the detector pixels.

<figure class="my-8 flex flex-col items-center">
  <img src="/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png" alt="Annotated SolidWorks CAD Breakdown of Our Stray-Light Baffle and V-Trap Improvements" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Iterating on the SolidWorks housing to kill stray internal reflections: adding an asymmetrical sawtooth ceiling baffle, a concave 45-degree zero-order V-trap, and light-tight tongue-and-groove lid joints.
  </figcaption>
</figure>

To fix both problems mechanically without adding bulky external optics, I redesigned the internal walls of the SolidWorks assembly around two passive optical traps:

- **A Concave $45^\circ$ Specular Zero-Order V-Trap:** Right where the undiffracted $m = 0$ beam hits the rear wall, I extruded a deep, narrow V-shaped cavity angled at $45^\circ$. Instead of scattering back into the main chamber, parallel zero-order rays are forced to bounce inward deeper and deeper toward the apex of the V-trap, losing roughly 90%+ of their intensity on each successive black PLA reflection.
- **An Asymmetrical Sawtooth Ceiling Baffle:** Across the inside of the upper lid, I modelled a series of angled sawtooth teeth. Any shallow ray flying upward from the cuvette slit hits the steep vertical face of a sawtooth ridge and is reflected backward toward the source compartment rather than forward onto the CCD.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="flex flex-col items-center">
    <img src="/projects/pulse-oximeter-spectrophotometer/cad_lid_grating.png" alt="SolidWorks Cross-Section of the Asymmetrical Ceiling Sawtooth Baffle" class="rounded-xl shadow-md w-full h-auto border border-border bg-white p-2" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Cross-section of the upper lid CAD showing the asymmetrical sawtooth baffle ridges and grating recess.
    </figcaption>
  </figure>
  <figure class="flex flex-col items-center">
    <img src="/projects/pulse-oximeter-spectrophotometer/cad_v_trap.png" alt="SolidWorks Detail View of the Concave 45-Degree Zero-Order V-Trap" class="rounded-xl shadow-md w-full h-auto border border-border bg-white p-2" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Close-up CAD view of the concave 45-degree V-trap engineered to extinguish the undiffracted zero-order beam.
    </figcaption>
  </figure>
</div>

---

## Turning 3,648 Raw Pixel Numbers into Nanometres

When the STM32 Nucleo-F401RE reads out a frame from the `TCD1304` CCD, it outputs an array of $3,648$ 12-bit ADC integers indexed from pixel $p = 0$ to $p = 3,647$. Out of the box, the microcontroller has no idea which pixel corresponds to $450\text{ nm}$ blue or $620\text{ nm}$ orange.

To calibrate the dispersion axis, we shone three monochromatic diode lasers into the sample chamber: **violet ($405\text{ nm}$)**, **green ($532\text{ nm}$)**, and **red ($650\text{ nm}$)**. In Python, I wrote a peak-centroid script (`scipy.signal.find_peaks` and `scipy.stats.linregress`) across $n = 5$ replicate captures to fit the linear pixel-to-wavelength transformation:

$$\lambda(p) = m_{\text{cal}} \cdot p + \lambda_0$$

<figure class="my-8 flex flex-col items-center">
  <img src="/projects/pulse-oximeter-spectrophotometer/laser_calibration.png" alt="Three-Laser Pixel-to-Wavelength Calibration Curve Across 405, 532, and 650 nm" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Anchoring pixel indices to physical wavelengths using 405 nm, 532 nm, and 650 nm laser peaks across the 3,648-pixel TCD1304 linear CCD array.
  </figcaption>
</figure>

Seeing the three laser centroids snap onto a straight line ($R^2 > 0.999$) was a great moment in the lab because it confirmed two things at once: our $46.064^\circ$ SolidWorks grating slot was mechanically square to the CCD plane, and small-angle diffraction across the $29\text{ mm}$ sensor introduced almost zero non-linear tangent distortion.

---

## Testing Unknown Dyes, Chlorophyll Fluorescence, and Honest Instrument Limits

Once calibrated, we switched between two optical configurations:
1. **Collinear ($180^\circ$) Transmission Absorbance:** Computing Beer-Lambert logarithmic absorbance from dark-subtracted blank and sample intensities:
   $$A(\lambda) = -\log_{10}\!\left(\frac{I_{\text{sample}}(\lambda) - I_{\text{dark}}(\lambda)}{I_{\text{blank}}(\lambda) - I_{\text{dark}}(\lambda)}\right)$$
2. **Orthogonal ($90^\circ$) Fluorescence Emission:** Exciting the cuvette from the perpendicular port so only Stokes-shifted isotropic fluorescence photons entered the slit toward the grating.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="flex flex-col items-center">
    <img src="/projects/pulse-oximeter-spectrophotometer/absorbance_combined.png" alt="Normalised Transmission Absorbance Spectra Captured on Our Spectrophotometer" class="rounded-xl shadow-md w-full h-auto border border-border" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Normalised transmission absorbance profiles (n = 5 replicates with ±1 SD bands).
    </figcaption>
  </figure>
  <figure class="flex flex-col items-center">
    <img src="/projects/pulse-oximeter-spectrophotometer/fluorescence_combined.png" alt="Normalised 90-Degree Fluorescence Emission Spectra" class="rounded-xl shadow-md w-full h-auto border border-border" />
    <figcaption class="text-center text-xs sm:text-sm text-muted-foreground mt-2">
      Orthogonal 90-degree fluorescence emission curves resolving clean Stokes-shifted peaks.
    </figcaption>
  </figure>
</div>

When given blind chemical unknowns, overlaying our Python-calibrated spectra against reference library profiles allowed us to identify every unknown dye and fluorophore unambiguously:

<figure class="my-8 flex flex-col items-center">
  <img src="/projects/pulse-oximeter-spectrophotometer/chemical_id_proof.png" alt="Blind Chemical Unknown Identification Against Reference Spectrophotometer Curves" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Overlaying our custom spectrophotometer's calibrated output against commercial reference profiles to prove unknown dye and fluorophore identity.
  </figcaption>
</figure>

### Where Our Prototype Hit Its Physical Limits (and How I Would Upgrade v2)

Building the instrument from scratch also made its physical trade-offs crystal clear:
- **The Slit-Width vs Signal-to-Noise Trade-off:** In transmission absorbance you have plenty of photons, so a narrow entrance slit ($\sim 100\,\mu\text{m}$) gives sharp spectral resolution ($\Delta\lambda \approx 1\text{ to }2\text{ nm}$). In $90^\circ$ fluorescence, however, isotropic emission means less than 1% of emitted photons enter the solid angle of the slit. Widening the slit boosts fluorescence SNR but broadens the image of the slit across multiple CCD pixels, convolving sharp peaks with a rectangular boxcar kernel.
- **Uncollimated Beam Divergence & Plano-Convex Lenses:** Without a collimating lens before the grating and a focusing cylindrical lens before the `TCD1304` detector, beam divergence across the free-space path limits spectral sharpness. Adding an achromatic doublet collimator and a cylindrical focusing lens (as used in commercial Ocean Insight miniature spectrometers) would boost photon collection by an order of magnitude while tightening the point-spread function.
- **CCD Electronic Shutter Integration Time & Dark Current:** Because the `TCD1304` is an uncooled silicon CCD, increasing the STM32 integration time (`SH` and `ICG` timer pulses) to capture dim fluorophores also integrates thermal dark-current electrons. Implementing automated real-time dark-pixel subtraction using the optically shielded dummy pixels (`pixels 0 to 31`) of the `TCD1304` frame would stabilise the baseline during long fluorescence exposures.
