## 1. Anisotropic Plasmonics and Quantum Confinement at the Nanoscale

When metallic or semiconducting crystals shrink below the de Broglie wavelength of their conduction electrons (typically $2\text{ to }50\text{ nm}$), bulk band structures give way to size- and geometry-dependent optical resonances. In this Imperial College London nanomaterials investigation (awarded **84.00%**), I synthesised and optically characterised two distinct classes of colloidal nanomaterials:
1. **CTAB-Stabilised Gold Nanorods (AuNRs):** Exhibiting split transverse and longitudinal Surface Plasmon Resonance (SPR) bands governed by aspect ratio and **Gans electrodynamic dipole theory**.
2. **Cadmium Selenide (CdSe) Semiconducting Quantum Dots (QDs):** Exhibiting size-tunable excitonic absorption and photoluminescence governed by the **Brus quantum confinement equation**, alongside **oleylamine surface ligand passivation** of deep-trap crystal defects.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/nanorod_qd_absorbance.png" alt="High-Resolution UV-Vis Absorbance and Fluorescence Spectra of Gold Nanorods and CdSe Quantum Dots" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: Experimental UV-Vis absorbance and photoluminescence spectra resolving the transverse (~520 nm) and red-shifted longitudinal plasmon modes of CTAB-stabilised gold nanorods alongside the excitonic band-edge vs deep-trap fluorescence profiles of unpassivated and oleylamine-passivated CdSe quantum dots.
  </figcaption>
</figure>

---

## 2. Seed-Mediated Gold Nanorod Growth and Gans Electrodynamic Theory

Spherical gold nanoparticles exhibit a single isotropic Surface Plasmon Resonance absorption peak near $\lambda \approx 520\text{ nm}$. By contrast, breaking spherical symmetry into a prolate spheroid (nanorod) with major axis $L$ and minor diameter $D$ (aspect ratio $R = L/D$) splits the conduction-band oscillation into two orthogonal modes:
- **Transverse Plasmon Mode ($\lambda_T \approx 515\text{ to }525\text{ nm}$):** Electron oscillation perpendicular to the rod axis, insensitive to aspect ratio.
- **Longitudinal Plasmon Mode ($\lambda_L \approx 650\text{ to }900\text{ nm}$):** Electron oscillation along the major axis, which red-shifts linearly with aspect ratio $R$.

In our seed-mediated synthesis, cationic surfactant **cetyltrimethylammonium bromide (CTAB)** preferentially binds to the $\{100\}$ lateral crystal facets of gold seeds while $\text{AgNO}_3$ co-directs anisotropic deposition onto the less-hindered $\{111\}$ end facets. Within **Gans theory** (the dipole extension of Mie scattering to prolate spheroids), the extinction cross-section $C_{\text{ext}}$ across medium dielectric constant $\epsilon_m$ and complex gold permittivity $\epsilon(\omega) = \epsilon_1(\omega) + i\epsilon_2(\omega)$ is summed over the three geometric depolarisation factors $P_j \in \{P_A, P_B, P_C\}$:
$$C_{\text{ext}}(\omega) = \frac{2\pi V \epsilon_m^{3/2}}{3\lambda} \sum_{j \in \{A,B,C\}} \frac{\left(\frac{1}{P_j^2}\right) \epsilon_2(\omega)}{\left[\epsilon_1(\omega) + \left(\frac{1 - P_j}{P_j}\right)\epsilon_m\right]^2 + \epsilon_2(\omega)^2}$$
where the longitudinal depolarisation factor $P_A$ decreases monotonically with aspect ratio $R = L/D$:
$$P_A = \frac{1 - e^2}{e^2}\left[\frac{1}{2e}\ln\!\left(\frac{1+e}{1-e}\right) - 1\right], \quad e = \sqrt{1 - \frac{1}{R^2}}, \quad P_B = P_C = \frac{1 - P_A}{2}$$

Fitting the resonance condition $\epsilon_1(\lambda_L) = -\!\left(\frac{1 - P_A}{P_A}\right)\epsilon_m$ in Python against our measured longitudinal absorbance maxima allowed us to extract the mean nanorod aspect ratio directly from optical spectra without requiring transmission electron microscopy on every synthetic batch.

---

## 3. Classical Nucleation Theory, the Zeldovich Factor, and LaMer Burst Dynamics

Controlling nanoparticle monodispersity requires separating **homogeneous burst nucleation** from subsequent **diffusional crystal growth**. In Python, I modelled the thermodynamic free-energy barrier $\Delta G(r)$ of a spherical nucleus of radius $r$ forming from a supersaturated monomer solution ($S = C / C_{\text{eq}} > 1$):
$$\Delta G(r) = 4\pi r^2 \gamma + \frac{4}{3}\pi r^3 \Delta G_v, \quad \Delta G_v = -\frac{k_B T \ln S}{v_m}$$
Setting $\frac{\partial \Delta G}{\partial r} = 0$ yields the critical nucleus radius $r^* = -\frac{2\gamma}{\Delta G_v}$ and the critical activation barrier $\Delta G^* = \frac{16\pi \gamma^3}{3(\Delta G_v)^2}$.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/nucleation_model_comparison.png" alt="Classical LaMer Burst Nucleation vs Diffusional Growth Kinetic Models" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: Python kinetic simulation comparing monomer supersaturation exhaustion, critical nucleus radius r*, and size-distribution narrowing across classical LaMer burst nucleation and Ostwald ripening regimes.
  </figcaption>
</figure>

Because classical thermodynamic equilibrium overestimates stationary nucleation flux by ignoring Brownian back-dissolution of supercritical clusters near $r^*$, I incorporated the non-equilibrium **Zeldovich factor ($Z$)** into the steady-state nucleation rate $J$:
$$J = Z \cdot \beta^* \cdot N_0 \exp\!\left(-\frac{\Delta G^*}{k_B T}\right), \quad Z = \sqrt{\frac{-1}{2\pi k_B T}\left.\frac{\partial^2 \Delta G}{\partial n^2}\right|_{n=n^*}} = \frac{v_m}{2\pi {r^*}^2}\sqrt{\frac{\gamma}{k_B T}}$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/nucleation_zeldovich_plot.png" alt="Zeldovich Non-Equilibrium Factor and Critical Barrier Sensitivity Analysis" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 3: Parametric sensitivity analysis of the Zeldovich non-equilibrium correction factor Z and stationary nucleation rate J across supersaturation ratios S and interfacial surface energies.
  </figcaption>
</figure>

---

## 4. CdSe Quantum Dot Confinement and Oleylamine Surface Trap Passivation

In hot-injection CdSe quantum dot synthesis, arresting crystal growth at progressive time intervals yields nanocrystals whose effective band gap $E_g(r)$ shifts from red to blue as the particle radius $r$ shrinks below the bulk Bohr exciton radius ($a_B \approx 5.6\text{ nm}$ for CdSe), following the **Brus equation**:
$$E_g(r) = E_{g,\text{bulk}} + \frac{\hbar^2 \pi^2}{2r^2}\left(\frac{1}{m_e^*} + \frac{1}{m_h^*}\right) - \frac{1.8 e^2}{4\pi \epsilon_0 \epsilon_r r}$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/qd_characterisation_table.png" alt="CdSe Quantum Dot Sizing, Band Gap, and Oleylamine Passivation Summary Table" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 4: Quantitative optical characterisation table comparing excitonic absorption maxima, Brus-derived nanocrystal radii, Stokes shifts, and fluorescence Full-Width at Half-Maximum (FWHM) before and after oleylamine ligand passivation.
  </figcaption>
</figure>

Crucially, raw unpassivated CdSe nanocrystals possess under-coordinated surface $\text{Cd}^{2+}$ and $\text{Se}^{2-}$ dangling orbitals that introduce mid-gap **deep surface trap states**. When photoexcited electrons and holes recombine via these surface traps rather than across the core band edge, the emission spectrum exhibits a broad, red-shifted tail. Coordinating the nanocrystal surface with **oleylamine** (an electron-donating L-type primary amine ligand) passivated these surface chalcogenide vacancies, suppressing deep-trap recombination and **halving the photoluminescence Full-Width at Half-Maximum (FWHM) from $185.2\text{ nm}$ down to $91.9\text{ nm}$** while restoring bright band-edge excitonic emission.
