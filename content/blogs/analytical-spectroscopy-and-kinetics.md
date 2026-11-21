## Proving What Is Actually in Your Flask

In synthetic and biological chemistry, getting a white crystalline powder or a yellow colorimetric well at the end of a protocol is only half the job. The real question is how you prove, beyond reasonable doubt, what molecular structure you actually made, how fast an enzyme is turning it over, and where a biological system switches state.

This post brings together four of my favourite wet-lab and mathematical biology studies at Imperial College London: synthesising and structurally verifying **acetylsalicylic acid (aspirin)** across **$600.25\text{ MHz}$ $^1\text{H}$ NMR** and **ATR-FTIR**, measuring **acid phosphatase competitive inhibition ($K_i = 463\,\mu\text{M}$)** and **Arrhenius activation barriers ($E_a = 59.84\text{ kJ}\cdot\text{mol}^{-1}$)**, mapping **red blood cell osmotic haemolysis Fragiligraph curves**, and deriving **saddle-node hysteresis bifurcations** in nonlinear biological ODEs.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/nmr_spectrometer_photo.jpg" alt="Superconducting Nuclear Magnetic Resonance Spectrometer in the Analytical Chemistry Lab" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Inside the analytical spectroscopy suite: high-field superconducting Nuclear Magnetic Resonance (NMR) resolves individual proton chemical environments and spin-spin J-couplings down to parts per billion.
  </figcaption>
</figure>

---

## 1. Did We Actually Acetylate Salicylic Acid? (600 MHz 1H NMR & ATR-FTIR)

When you react salicylic acid with excess acetic anhydride in the presence of an acid catalyst ($\text{H}_3\text{PO}_4$ or $\text{H}_2\text{SO}_4$) and recrystallise the crude product from ethanol and water, the biggest risk is incomplete esterification, or conversely, hydrolysing your newly formed ester bond back into starting material if you boil the recrystallisation solvent too aggressively.

In the lab, we used four orthogonal checks to piece together the molecular proof:

1. **The Ferric Chloride ($\text{FeCl}_3$) & TLC Spot Test:** Unreacted salicylic acid possesses a free phenolic $\text{-OH}$ group that chelates $\text{Fe}^{3+}$ ions into a deep purple complex. Watching our recrystallised crystals stay pale yellow while the salicylic acid control turned ink-purple, and confirming a single clean spot on $254\text{ nm}$ UV silica Thin-Layer Chromatography (TLC) with a sharp melting point ($135\text{ to }136\,^\circ\text{C}$), gave us our first rapid bench confirmation.
2. **ATR-FTIR Vibrational Fingerprinting:** Placing a few milligrams of dry crystal onto the diamond Attenuated Total Reflectance (ATR) crystal let us directly inspect the carbonyl ($\text{C=O}$) double-bond region. Because aspirin contains *two* distinct carbonyl groups, an aromatic carboxylic acid and a newly formed phenolic acetate ester, we looked for, and resolved, the split between the conjugated acid carbonyl stretch at $\nu_{\text{C=O, acid}} \approx 1,680\text{ cm}^{-1}$ and the higher-frequency ester carbonyl stretch at $\nu_{\text{C=O, ester}} \approx 1,750\text{ cm}^{-1}$, sitting right alongside the broad hydrogen-bonded carboxylic $\text{O-H}$ envelope ($2,500\text{ to }3,200\text{ cm}^{-1}$).

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/aspirin_ftir_raw.png" alt="ATR-FTIR Transmittance Spectrum of Our Recrystallised Acetylsalicylic Acid" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Our experimental ATR-FTIR transmittance spectrum of synthesised acetylsalicylic acid: resolving the separated ester (1,750 cm⁻¹) and carboxylic acid (1,680 cm⁻¹) carbonyl stretching modes alongside the C-O ester fingerprint region.
  </figcaption>
</figure>

3. **$600.25\text{ MHz}$ Proton NMR ($^1\text{H}$ NMR in $\text{CDCl}_3$):** High-field $600.25\text{ MHz}$ $^1\text{H}$ NMR is where every proton on the molecule has to account for itself quantitatively. What makes a $1,2$-disubstituted benzene ring like aspirin so satisfying to assign at $600\text{ MHz}$ is that all four aromatic protons ($H_a, H_b, H_c, H_d$ between $\delta = 7.10\text{ and }8.15\text{ ppm}$) are chemically non-equivalent, splitting one another via three-bond *ortho* coupling ($^3J \approx 7.8\text{ Hz}$) and four-bond *meta* coupling ($^4J \approx 1.8\text{ Hz}$) into two doublets of doublets and two triplets of doublets. Upfield at $\delta = 2.35\text{ ppm}$, the sharp 3-proton singlet ($\text{-OCOCH}_3$, integrating in an exact $3:1:1:1:1$ ratio against the four aromatic ring protons) provided definitive confirmation that the acetyl group was covalently attached.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/analytical_summary_slide.png" alt="Summary of Our 600 MHz 1H NMR, ATR-FTIR, and Chromatographic Structural Assignments" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Integrating our 600.25 MHz 1H NMR multiplet assignments, ATR-FTIR vibrational modes, and TLC retention factors to verify product purity.
  </figcaption>
</figure>

---

## 2. Catching an Enzyme Inhibitor in the Act (`Ki = 463 uM` & `Ea = 59.84 kJ/mol`)

In our enzyme kinetics project, we studied **wheat-germ acid phosphatase**, an enzyme that hydrolyses phosphate monoesters under acidic conditions. In the assay, we fed the enzyme a colourless synthetic substrate, ***para*-nitrophenyl phosphate ($p\text{-NPP}$)**, which it cleaves into inorganic phosphate ($\text{P}_i$) and *para*-nitrophenol. Adding strong alkali ($\text{NaOH}$) at the end of each timed incubation does two things simultaneously: it denatures the enzyme to stop the clock, and it deprotonates *para*-nitrophenol into the bright yellow ***para*-nitrophenolate anion ($p\text{-NP}$)**, which absorbs strongly at $\lambda = 405\text{ nm}$.

Why is inorganic phosphate ($\text{P}_i$) such an interesting molecule to add back into this reaction? Because $\text{P}_i$ is the natural *product* of the hydrolysis reaction itself! By spiking known concentrations of $\text{KH}_2\text{PO}_4$ into the reaction wells, we wanted to test whether product accumulation slows the enzyme down via **competitive active-site inhibition** (fighting $p\text{-NPP}$ for the same positively charged histidine/arginine binding pocket) or **allosteric non-competitive inhibition**.

In Michaelis-Menten kinetics, a purely competitive inhibitor with dissociation constant $K_i$ scales the apparent Michaelis constant by $\alpha = 1 + [I]/K_i$ while leaving the maximum catalytic velocity $V_{\max}$ untouched (since flooding the enzyme with enough substrate $[S] \to \infty$ outcompetes the inhibitor):

$$V_0 = \frac{V_{\max}[S]}{\alpha K_m + [S]} \implies \frac{1}{V_0} = \left(\frac{\alpha K_m}{V_{\max}}\right)\frac{1}{[S]} + \frac{1}{V_{\max}}, \quad \alpha = 1 + \frac{[I]}{K_i}$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/enzyme_kinetics_arrhenius.png" alt="Lineweaver-Burk Competitive Inhibition Family and Arrhenius Activation Energy Fit" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Left: Our double-reciprocal Lineweaver-Burk lines across inorganic phosphate inhibitor concentrations intersecting at a common 1/Vmax y-intercept, yielding a competitive inhibition constant Ki = 463 μM. Right: Arrhenius temperature regression yielding Ea = 59.84 kJ·mol⁻¹ before thermal unfolding above 50 °C.
  </figcaption>
</figure>

Plotting our inverse rates $1/V_0$ against $1/[S]$ in MATLAB showed the family of lines pivoting cleanly around a single shared $y$-intercept ($1/V_{\max}$), confirming classic competitive inhibition with **$K_i = 463\,\mu\text{M}$**. Sweeping across buffer pH and incubation temperature also pinned down the enzyme's bell-shaped catalytic optimum at **$\text{pH } 5.322$** and an **Arrhenius activation barrier** of **$E_a = 59.84\text{ kJ}\cdot\text{mol}^{-1}$** across the $15\text{ to }45\,^\circ\text{C}$ linear window before hydrogen-bond disruption and thermal denaturation collapsed activity above $55\,^\circ\text{C}$:

$$\ln k_{\text{cat}} = \ln A - \frac{E_a}{R}\left(\frac{1}{T}\right)$$

### A Practical Note on Why Modern Enzymology Prefers Non-Linear Regression Over Lineweaver-Burk

One important statistical lesson I took away from writing the MATLAB fitting scripts: while the double-reciprocal Lineweaver-Burk plot ($1/V_0$ vs $1/[S]$) is fantastic for *visually* diagnosing competitive versus uncompetitive inhibition, taking the reciprocal $1/V_0$ severely distorts experimental error bars! The smallest, noisiest absorbance readings at the lowest substrate concentrations $[S]$ get flipped into the largest numbers at the far right of the $1/[S]$ axis, dominating ordinary least-squares linear regression. Cross-checking our parameters with direct non-linear least-squares fitting (`lsqcurvefit` on the untransformed Michaelis-Menten hyperbola) or the **Hanes-Woolf rearrangement** ($[S]/V_0$ vs $[S]$) weights the variance much more evenly across the concentration range.

---

## 3. Tipping Points in Biology: Red Blood Cell Fragiligraphs and Saddle-Node Bifurcations

Why do so many biological systems behave like sharp on/off switches rather than gradual linear dials? We saw this same mathematical theme appear in two completely different contexts:

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/ode_bifurcation_haemolysis.png" alt="Saddle-Node Hysteresis Bifurcation Diagram and Erythrocyte Osmotic Haemolysis Fragiligraph" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Nonlinear threshold switching in biology: saddle-node hysteresis and bistability in a cooperative Hill-feedback gene regulatory ODE (left), and sigmoidal erythrocyte osmotic haemolysis alongside its derivative Fragiligraph peak at 540 nm haemoglobin absorbance (right).
  </figcaption>
</figure>

1. **Erythrocyte Osmotic Fragility & Differential Fragiligraphs:** When we suspended mammalian red blood cells (erythrocytes) in a dilution series of $\text{NaCl}$ solutions stepping down from isotonic $0.85\%\text{ w/v}$ to hypotonic $0.15\%\text{ w/v}$, water rushed across the aquaporin channels into the cells. Because a healthy red blood cell is a flexible biconcave disc, it can swell substantially without stretching its lipid bilayer surface area, until it hits its critical spherical volume! Past that threshold, the membrane ruptures (haemolysis), releasing haemoglobin into the supernatant where we measured its Soret/Q-band absorbance at $\lambda = 540\text{ nm}$. Taking the numerical derivative $\left|\frac{dH}{dC}\right|$ of the sigmoidal lysis curve generates the **differential Fragiligraph**, whose peak ($C_{50} \approx 0.44\%\text{ NaCl}$) reflects the mean surface-area-to-volume ratio of the red cell population (which shifts right in hereditary spherocytosis or hypertonic pre-stress, and left in thalassaemia).
2. **Saddle-Node Bifurcations & Hysteresis Memory in Gene Networks:** In our mathematical biology coursework, I analysed how an autoregulatory transcription factor $x(t)$ with cooperative dimerisation ($n = 2$ Hill feedback) creates irreversible cellular memory:
   $$\frac{dx}{dt} = f(x; \alpha) = \alpha + \frac{v x^2}{K^2 + x^2} - \gamma x$$
   Solving the steady-state condition $f(x^*; \alpha) = 0$ and linearising the Jacobian eigenvalue $\lambda = f'(x^*)$ shows that between two critical basal transcription thresholds ($\text{SN}_1$ and $\text{SN}_2$), the system possesses **three equilibria**: a low-expression stable state ($\lambda < 0$), a high-expression stable state ($\lambda < 0$), and an intermediate unstable saddle point ($\lambda > 0$). Once a transient stimulus pushes the cell past the upper saddle-node bifurcation $\text{SN}_2$, the cell snaps onto the upper activated branch and *stays turned on* even when the stimulus $\alpha$ drops back down, a mathematical cousin of the epigenetic metabolic memory we observed experimentally in our diabetic wound fibroblasts!
