## Seeing Quantum Mechanics in a Vial

Most of the time in physical chemistry, quantum confinement feels like an abstract boundary-value problem on a lecture slide. That changed the afternoon we took our freshly synthesised **Cadmium Selenide (CdSe) quantum dot** aliquots into the darkroom and switched on a $365\text{ nm}$ ultraviolet lamp.

Every vial in the rack contained the exact same bulk chemical compound, $\text{CdSe}$, drawn from the exact same reaction flask. Yet simply because we had quenched each aliquot at a different number of seconds after hot injection, the vials glowed in a vivid, continuous rainbow from deep blue through emerald green, canary yellow, and sunset orange as the nanocrystal radius stepped from roughly $1.8\text{ nm}$ up to $4.2\text{ nm}$.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/nanorods-qds/quantum_dots_uv_photo.jpg" alt="Colloidal Semiconducting Quantum Dot Vials Glowing Under 365 nm UV Illumination" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Size-tunable photoluminescence of colloidal semiconducting nanocrystals under 365 nm UV excitation: smaller nanocrystals (left) experience stronger spatial exciton confinement and emit higher-energy blue photons, while larger nanocrystals (right) shift toward the red bulk band edge.
  </figcaption>
</figure>

Alongside those semiconducting quantum dots, we spent the second half of the laboratory synthesising **CTAB-stabilised gold nanorods (AuNRs)**. Bulk gold is unmistakably yellow and reflective, and spherical colloidal gold nanoparticles always sit near a ruby-red $520\text{ nm}$ absorbance band. By nudging the crystal growth into an elongated rod only a few tens of nanometres long, we could steer the solution colour across violet, navy blue, bottle green, and reddish-brown just by tuning the length-to-width aspect ratio.

This post is a reflection on how we synthesised both nanomaterials in the wet lab, the physical models I coded in Python to connect our raw spectrophotometer traces back to electrodynamics and nucleation kinetics, where our experimental data diverged from textbook theory, and why surface chemistry turned out to be the deciding factor in optical performance.

---

## Why Gold Stops Looking Like Gold at 40 Nanometres

When we prepared our gold nanorod growth solutions, the trickiest practical step was the **seed-mediated surfactant growth protocol**. You start by reducing chloroauric acid ($\text{HAuCl}_4$) with ice-cold sodium borohydride ($\text{NaBH}_4$) to form tiny $2\text{ to }4\text{ nm}$ spherical gold seeds, and then inject those seeds into a growth bath containing a weaker reducing agent (ascorbic acid), silver nitrate ($\text{AgNO}_3$), and a high concentration of the cationic surfactant **cetyltrimethylammonium bromide (CTAB)**.

Why does a cubic face-centred metal like gold grow into an anisotropic cylinder instead of just expanding into a bigger sphere? In the lab, we had to keep the water bath above $27\text{ to }30\,^\circ\text{C}$ because CTAB crystallises out of solution at cool room temperatures. Above its critical micelle temperature, CTAB forms a dense bilayer selectively packed along the lateral $\{100\}$ crystal facets of the growing gold seed, assisted by underpotential deposition of $\text{Ag}^+$ ions. That surfactant sleeve acts like a molecular zip-tie around the waist of the crystal, forcing newly reduced $\text{Au}^0$ atoms to deposit preferentially onto the less sterically hindered $\{111\}$ end caps.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/nanorods-qds/gold_nanorods_vials_photo.jpg" alt="Transmission Electron Micrographs, Solution Vials, and Longitudinal SPR Red-Shift Across Gold Nanorod Aspect Ratios" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border bg-white p-2" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    How geometry steers colour in gold nanorods: as the aspect ratio R = L/D increases from spherical seeds (left) to elongated rods (right), the transverse plasmon peak near 520 nm remains fixed while the longitudinal plasmon resonance shifts across the visible and near-infrared spectrum.
  </figcaption>
</figure>

When we placed our cuvettes into the UV-Vis spectrophotometer, every sample showed two distinct absorbance peaks rather than one. To extract the physical aspect ratio $R = L/D$ of our rods without booking hours on a Transmission Electron Microscope (TEM) for every single condition, I wrote a Python fitting script around **Gans theory** (Richard Gans' 1912 extension of Mie scattering to prolate spheroids).

In a prolate spheroid of volume $V$ suspended in water (dielectric constant $\epsilon_m \approx 1.77$), conduction electrons oscillate in two orthogonal modes: a **transverse mode** perpendicular to the rod axis ($\lambda_T \approx 520\text{ nm}$) and a **longitudinal mode** parallel to the rod axis ($\lambda_L$). Summing over the three geometric depolarisation factors $P_j \in \{P_A, P_B, P_C\}$ gives the extinction cross-section:

$$C_{\text{ext}}(\omega) = \frac{2\pi V \epsilon_m^{3/2}}{3\lambda} \sum_{j \in \{A,B,C\}} \frac{\left(\frac{1}{P_j^2}\right) \epsilon_2(\omega)}{\left[\epsilon_1(\omega) + \left(\frac{1 - P_j}{P_j}\right)\epsilon_m\right]^2 + \epsilon_2(\omega)^2}$$

Here $\epsilon(\omega) = \epsilon_1(\omega) + i\epsilon_2(\omega)$ is the complex frequency-dependent dielectric function of gold, and the longitudinal depolarisation factor $P_A$ depends strictly on the eccentricity $e$ and aspect ratio $R = L/D$:

$$P_A = \frac{1 - e^2}{e^2}\left[\frac{1}{2e}\ln\!\left(\frac{1+e}{1-e}\right) - 1\right], \quad e = \sqrt{1 - \frac{1}{R^2}}, \quad P_B = P_C = \frac{1 - P_A}{2}$$

Resonance occurs whenever the denominator's real bracket vanishes, $\epsilon_1(\lambda_L) = -\!\left(\frac{1 - P_A}{P_A}\right)\epsilon_m$. Because the real permittivity of gold $\epsilon_1(\lambda)$ becomes linearly more negative across the red and near-infrared window, solving that resonance equation let us translate our measured longitudinal peak wavelengths directly into nanorod aspect ratios ($R \approx 2.4\text{ to }4.1$).

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/nanorod_qd_absorbance.png" alt="High-Resolution UV-Vis Absorbance and Fluorescence Spectra from Our Nanorod and Quantum Dot Synthesis" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Our high-resolution optical characterisation plots: split transverse and longitudinal plasmon modes across our CTAB gold nanorod batches alongside the absorbance and fluorescence emission profiles of our CdSe quantum dots before and after surface ligand passivation.
  </figcaption>
</figure>

---

## Coding the Nucleation Bottle-Neck: Why LaMer Theory Needs the Zeldovich Factor

One thing that puzzled me during the synthesis was why injecting the precursor monomer all at once produced a sharp, narrow optical peak, whereas dripping it in slowly produced a muddy, broad absorbance shoulder.

In 1950, Victor LaMer explained this qualitatively as **burst nucleation**: monomer concentration builds past a critical supersaturation threshold $S = C / C_{\text{eq}}$, triggering a brief explosion of nuclei that immediately relieves supersaturation so all existing seeds grow diffusionally at the same time without new nuclei forming late.

When I sat down to simulate this quantitatively in Python, I started with the classical Gibbs free-energy barrier $\Delta G(r)$ of a spherical cluster of radius $r$, surface tension $\gamma$, and molecular volume $v_m$:

$$\Delta G(r) = 4\pi r^2 \gamma + \frac{4}{3}\pi r^3 \Delta G_v, \quad \Delta G_v = -\frac{k_B T \ln S}{v_m}$$

Differentiating with respect to $r$ gives the critical nucleus radius $r^* = -\frac{2\gamma}{\Delta G_v}$ and the thermodynamic barrier $\Delta G^* = \frac{16\pi \gamma^3}{3(\Delta G_v)^2}$. However, plugging a naive Boltzmann factor $\exp(-\Delta G^* / k_B T)$ into a differential equation solver overpredicted the nucleation rate by nearly two orders of magnitude.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/nucleation_model_comparison.png" alt="Python Kinetic Simulation Comparing Classical LaMer Burst Nucleation and Diffusional Growth" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Python kinetic trajectory simulations comparing monomer supersaturation collapse, critical radius evolution, and final size dispersity across burst nucleation and Ostwald ripening regimes.
  </figcaption>
</figure>

Digging into the physical chemistry literature led me to Yakov Zeldovich's non-equilibrium kinetic correction. Even after a cluster reaches the top of the free-energy hill at $r^*$, the energy landscape near the summit is flat ($\partial \Delta G / \partial r = 0$), meaning thermal fluctuations cause roughly half of critical clusters to random-walk backward and redissolve rather than tumbling forward into stable growth. Incorporating the **Zeldovich factor ($Z$)** scales the stationary nucleation flux $J$ by the curvature at the barrier peak:

$$J = Z \cdot \beta^* \cdot N_0 \exp\!\left(-\frac{\Delta G^*}{k_B T}\right), \quad Z = \frac{v_m}{2\pi {r^*}^2}\sqrt{\frac{\gamma}{k_B T}}$$

Plotting $Z$ and $J$ across realistic interfacial tension and supersaturation ranges in Python made it immediately obvious why temperature stability during hot injection is so unforgiving: a $5\,^\circ\text{C}$ drop across the reaction flask alters $S$ and $\Delta G^*$ exponentially, smearing the nucleation burst into continuous secondary nucleation.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/nucleation_zeldovich_plot.png" alt="Sensitivity Analysis of the Zeldovich Non-Equilibrium Factor and Nucleation Rate" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Parametric sensitivity plots generated from our Python nucleation model showing how the Zeldovich correction factor Z damps equilibrium nucleation flux across supersaturation regimes.
  </figcaption>
</figure>

---

## The Surface Trap Problem in CdSe Quantum Dots (and How Oleylamine Fixed It)

For our CdSe quantum dots, we used the **Brus equation** to calculate nanocrystal radii from the first excitonic absorption peak energy $E_g(r)$, balancing the bulk band gap ($E_{g,\text{bulk}} = 1.74\text{ eV}$) against the quantum particle-in-a-sphere kinetic energy confinement of the electron ($m_e^* = 0.13\,m_0$) and hole ($m_h^* = 0.45\,m_0$) and their screened Coulomb attraction:

$$E_g(r) = E_{g,\text{bulk}} + \frac{\hbar^2 \pi^2}{2r^2}\left(\frac{1}{m_e^*} + \frac{1}{m_h^*}\right) - \frac{1.8 e^2}{4\pi \epsilon_0 \epsilon_r r}$$

When we measured the fluorescence spectrum of our unpassivated CdSe aliquot, however, we hit a classic nanomaterials snag. Instead of a razor-sharp Gaussian emission peak just slightly Stokes-shifted from the absorption edge, the emission spectrum had a massive, broad shoulder stretching across the red end of the spectrum with a **Full-Width at Half-Maximum (FWHM) of $185.2\text{ nm}$**.

Why? At a radius of $2\text{ nm}$, over 35% of the atoms in a CdSe nanocrystal sit directly on the exterior surface. Those surface $\text{Cd}^{2+}$ and $\text{Se}^{2-}$ ions have unsatisfied, dangling coordination orbitals that act as mid-gap **deep surface trap states**. When a UV photon excites an electron-hole pair inside the core, the carrier frequently falls into a surface vacancy before it can recombine across the band edge, emitting a lower-energy trap photon.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/qd_characterisation_table.png" alt="Quantitative Optical Characterisation Table of Our CdSe Quantum Dots Before and After Oleylamine Passivation" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Summary of our experimental CdSe quantum dot measurements: passivating under-coordinated surface sites with oleylamine halved the fluorescence FWHM from 185.2 nm down to 91.9 nm.
  </figcaption>
</figure>

When we treated the colloidal suspension with **oleylamine** (an L-type primary amine ligand whose lone pair donates electron density into vacant surface cadmium orbitals), the transformation in the fluorimeter was dramatic: the broad deep-trap tail vanished, the band-edge excitonic peak sharpened, and the **emission FWHM dropped by more than half, from $185.2\text{ nm}$ down to $91.9\text{ nm}$**.

---

## Limitations of Our Setup and Where Outside Research Takes This Next

Looking back at our experimental data and code models, several practical limitations stood out that helped me appreciate how commercial nanomedicine and diagnostic spinouts engineer around them:

1. **The Dipole Approximation Ceiling in Gans Theory:** Gans theory assumes the gold nanorod is small enough relative to the wavelength of light ($L \ll \lambda$) that the electric field is uniform across the particle (the quasi-static dipole limit). For thicker or longer nanorods ($L > 80\text{ nm}$), higher-order multipole oscillations and phase retardation red-shift and broaden the longitudinal peak beyond what the analytical depolarization factor $P_A$ predicts. In industrial plasmonic design, researchers replace Gans theory with numerical **Discrete Dipole Approximation (DDA)** or **Finite-Difference Time-Domain (FDTD)** Maxwell solvers.
2. **Organic Ligand Passivation vs Epitaxial Core-Shell Growth:** While oleylamine dynamically coordinates surface traps in organic solvents, L-type amine ligands are labile and can desorb upon dilution or phase transfer into aqueous biological buffers. In clinical fluorescence diagnostics and flow cytometry, commercial quantum dots instead grow an inorganic wider-bandgap epitaxial shell (such as $\text{CdSe/ZnS}$) around the core, permanently confining both the electron and hole wavefunctions away from the crystal boundary.
3. **Connecting Back to Point-of-Care Biosensing:** Seeing how sensitive the longitudinal plasmon band of gold nanorods and the fluorescence quenching of quantum dots are to local surface dielectric changes directly informed how I thought about optical and flow-cytometric readouts during my subsequent diagnostic assay research in the **Ladame Lab (miRFlow)**. If I were extending this project in the lab, I would functionalise the gold nanorods with thiolated PNA or DNA hairpins (displacing the cytotoxic CTAB bilayer via PEG-thiol ligand exchange) to measure real-time plasmonic wavelength shifts upon target microRNA hybridisation.
