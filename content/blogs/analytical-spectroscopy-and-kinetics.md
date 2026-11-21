## Overview: Quantitative Analytical Chemistry and Mathematical Biology

Across four foundational Imperial College London laboratory and mathematical modelling studies, I combined experimental wet-lab instrumentation (**ATR-FTIR**, **$600.25\text{ MHz}$ $^1\text{H}$ NMR**, **UV-Vis enzyme and haemolysis spectrophotometry**) with mathematical parameter estimation and dynamical systems analysis in **MATLAB** and **Python**.

---

## 1. Structural Elucidation of Acetylsalicylic Acid via ATR-FTIR and 600.25 MHz 1H NMR

Following the acetylation of salicylic acid with acetic anhydride in the presence of an acid catalyst, purity and structural confirmation require orthogonal spectroscopic verification:
1. **Thin-Layer Chromatography (TLC) & Melting-Point Assay:** Silica-gel TLC under $254\text{ nm}$ UV visualization confirmed complete consumption of the phenolic salicylic acid starting material (absence of the $\text{FeCl}_3$-positive purple phenolic complex and distinct $R_f$ migration), verified by differential melting-point analysis ($135\text{ to }136\,^\circ\text{C}$).
2. **Attenuated Total Reflectance Fourier-Transform Infrared (ATR-FTIR) Spectroscopy:** Resolved the diagnostic ester carbonyl stretch ($\nu_{\text{C=O, ester}} \approx 1,750\text{ cm}^{-1}$), the carboxylic acid carbonyl stretch ($\nu_{\text{C=O, acid}} \approx 1,680\text{ cm}^{-1}$), the broad hydrogen-bonded carboxylic $\text{O-H}$ stretch ($2,500\text{ to }3,200\text{ cm}^{-1}$), and the $\text{C-O}$ ester vibrations ($1,180\text{ to }1,220\text{ cm}^{-1}$), while confirming the disappearance of the free phenolic $\text{O-H}$ band near $3,230\text{ cm}^{-1}$.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/aspirin_ftir_raw.png" alt="ATR-FTIR Transmittance Spectrum of Synthesised Acetylsalicylic Acid" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: Experimental ATR-FTIR transmittance spectrum resolving the separated ester (1,750 cm⁻¹) and carboxylic acid (1,680 cm⁻¹) carbonyl stretching modes of synthesised acetylsalicylic acid.
  </figcaption>
</figure>

3. **$600.25\text{ MHz}$ Proton Nuclear Magnetic Resonance ($^1\text{H}$ NMR in $\text{CDCl}_3$):** High-field $^1\text{H}$ NMR resolved the four non-equivalent aromatic ring protons ($1,2$-disubstituted benzene spin system between $\delta = 7.10\text{ and }8.15\text{ ppm}$ with characteristic ortho $J \approx 7.8\text{ Hz}$ and meta $J \approx 1.8\text{ Hz}$ coupling constants), the broad downfield carboxylic acid singlet ($\delta \approx 11.2\text{ ppm}$, $1\text{H}$), and the upfield methyl ester singlet ($\text{-OCOCH}_3$ at $\delta = 2.35\text{ ppm}$, $3\text{H}$ integration).

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/analytical_summary_slide.png" alt="Multi-Technique Analytical Characterisation Summary Across FTIR, 600 MHz 1H NMR, and TLC" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: Orthogonal structural confirmation summary integrating 600.25 MHz 1H NMR multiplet assignments, ATR-FTIR functional group modes, and chromatographic retention factors.
  </figcaption>
</figure>

---

## 2. Acid Phosphatase Competitive Inhibition (`Ki = 463 uM`) and Arrhenius Activation Energy

In our enzyme kinetics investigation, we assayed the hydrolysis of *para*-nitrophenyl phosphate ($p\text{-NPP}$) to yellow *para*-nitrophenolate ($p\text{-NP}$, monitored at $\lambda = 405\text{ nm}$ following alkaline quenching) catalysed by wheat-germ **acid phosphatase** across varying substrate concentrations $[S]$, inorganic phosphate inhibitor concentrations $[I]$, pH buffers, and temperatures.

Under **competitive inhibition**, inorganic phosphate ($\text{P}_i$) competes directly with $p\text{-NPP}$ for the active-site histidine/arginine phosphate-binding pocket, increasing the apparent Michaelis constant $K_m^{\text{app}} = \alpha K_m$ without altering the maximum catalytic turnover velocity $V_{\max}$:
$$V_0 = \frac{V_{\max}[S]}{\alpha K_m + [S]} \implies \frac{1}{V_0} = \left(\frac{\alpha K_m}{V_{\max}}\right)\frac{1}{[S]} + \frac{1}{V_{\max}}, \quad \alpha = 1 + \frac{[I]}{K_i}$$

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/enzyme_kinetics_arrhenius.png" alt="Lineweaver-Burk Competitive Inhibition Plot and Arrhenius Activation Energy Curve" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 3: Left: Double-reciprocal Lineweaver-Burk plot across inorganic phosphate concentrations confirming shared y-intercept (constant Vmax) and yielding a competitive inhibition constant Ki = 463 μM. Right: Arrhenius linear regression yielding Ea = 59.84 kJ·mol⁻¹ prior to thermal denaturation above 50 °C.
  </figcaption>
</figure>

Fitting the double-reciprocal slopes against $[I]$ in MATLAB yielded a competitive inhibition dissociation constant of **$K_i = 463\,\mu\text{M}$**, a bell-shaped pH activity optimum at **$\text{pH } 5.322$** (governed by the $\text{p}K_a$ values of the catalytic histidine nucleophile and proton-donor residues), and an **Arrhenius activation energy** in the pre-denaturation regime ($15\text{ to }45\,^\circ\text{C}$) of:
$$\ln k_{\text{cat}} = \ln A - \frac{E_a}{R}\left(\frac{1}{T}\right) \implies E_a = 59.84\text{ kJ}\cdot\text{mol}^{-1}$$

---

## 3. Nonlinear ODE Bifurcation Analysis and Erythrocyte Osmotic Fragiligraphs

In **Modelling in Biology** and our **Erythrocyte Osmotic Fragility** study, I analysed how nonlinear biological response curves generate sharp threshold switches at both the genetic and cellular membrane levels:

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/blogs/analytical-kinetics/ode_bifurcation_haemolysis.png" alt="Saddle-Node Bifurcation Hysteresis Diagram and Erythrocyte Osmotic Fragiligraph" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 4: Left: Saddle-node bifurcation diagram of a Hill-type positive feedback gene regulatory ODE illustrating bistable hysteresis between lower and upper stable manifolds. Right: Sigmoidal erythrocyte osmotic haemolysis curve (540 nm haemoglobin release) and differential Fragiligraph peak across extracellular NaCl tonicity.
  </figcaption>
</figure>

1. **Saddle-Node Bifurcations and Hysteresis in Gene Regulatory ODEs:** For an autoregulatory transcription factor $x(t)$ with cooperative Hill feedback ($n = 2$), basal expression rate $\alpha$, maximal synthesis rate $v$, and linear degradation rate $\gamma$:
   $$\frac{dx}{dt} = f(x; \alpha) = \alpha + \frac{v x^2}{K^2 + x^2} - \gamma x$$
   Evaluating the equilibrium manifold $f(x^*; \alpha) = 0$ and the Jacobian stability eigenvalue $\lambda = \left.\frac{\partial f}{\partial x}\right|_{x^*}$ demonstrates that as $\alpha$ traverses the two **saddle-node bifurcation points** ($\text{SN}_1, \text{SN}_2$, where $f(x^*) = 0$ and $f'(x^*) = 0$ simultaneously), the system transitions from monostability into a **bistable hysteresis loop** with two stable attractors ($\lambda < 0$) separated by an unstable saddle branch ($\lambda > 0$).
2. **Erythrocyte Osmotic Haemolysis & Differential Fragiligraphs:** Exposing mammalian red blood cells to hypotonic $\text{NaCl}$ gradients ($0.85\%\text{ down to }0.15\%\text{ w/v}$) drives osmotic water influx across the biconcave membrane until critical spherical lysis releases intracellular haemoglobin (quantified spectrophotometrically at $\lambda = 540\text{ nm}$). Fitting the Boltzman sigmoidal lysis curve and its numerical derivative $\left|\frac{dH}{dC}\right|$ (**differential Fragiligraph**) extracts the median corpuscular fragility concentration ($C_{50} \approx 0.44\%\text{ w/v NaCl}$) and characterizes membrane surface-area-to-volume pathology.
