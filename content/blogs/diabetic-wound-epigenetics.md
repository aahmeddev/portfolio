## The Puzzle of "Metabolic Memory" in Chronic Diabetic Wounds

One of the most striking clinical puzzles in regenerative medicine is **metabolic memory**. When a patient with longstanding diabetes develops a chronic foot ulcer, strictly restoring their blood sugar back to normal physiological levels ($5\text{ mM}$ glucose) often fails to restart wound healing. Their dermal fibroblasts continue behaving as if they are still trapped in a hyperglycaemic environment: refusing to migrate, secreting tissue-chewing collagenases, and producing a fraction of the type I collagen (*COL1A1*) needed to rebuild the dermis.

Why would a fibroblast "remember" high glucose weeks after the glucose is gone, and pass that dysfunctional state down to its daughter cells? The prime suspect is **epigenetic modification**, specifically **DNA cytosine methylation ($5\text{-mC}$)** across the CpG islands of matrix-building gene promoters, coupled with stress-induced **cellular senescence**.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/diabetic-wound-epigenetics/fibroblasts_microscopy_photo.jpg" alt="Fluorescence Microscopy of Cultured Fibroblast Actin Cytoskeleton" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Fluorescence microscopy of fibroblast cytoskeletal architecture: under chronic hyperglycaemic stress, primary human dermal fibroblasts transition from spindle-shaped matrix-depositing cells into enlarged, flattened senescent phenotypes.
  </figcaption>
</figure>

In this study, we wanted to test that hypothesis hands-on across a 14-day wet-lab workflow: culturing primary human dermal fibroblasts under normoglycaemic ($5.0\text{ mM}$) versus diabetic-mimetic hyperglycaemic ($80.5\text{ mM}$) media, extracting their RNA to profile four senescence and matrix genes via RT-PCR, and reading the exact cytosine methylation marks on the *COL1A1* promoter using **sodium bisulphite sequencing**.

---

## Fourteen Days in Culture and the Nerve-Wracking RNA Extraction

Working with primary human dermal fibroblasts over a two-week stress timeline teaches you patience and sterile-hood discipline very quickly. Unlike immortalised cancer lines (like HeLa) that divide aggressively regardless of how you treat them, primary fibroblasts under $80.5\text{ mM}$ osmotic and oxidative glucose stress divide slowly and become fragile.

At the end of the 14-day culture window, we harvested both cohorts and moved to the **Qiagen RNeasy Plus Mini** spin-column protocol. Anyone who has worked with RNA in a shared teaching or research lab knows that ribonucleases (RNases) are everywhere on human skin and bench surfaces, and unlike DNases they do not even need divalent metal cofactors ($\text{Mg}^{2+}$) to chew through single-stranded mRNA.

To make sure our downstream RT-PCR measured genuine messenger RNA rather than contaminating genomic DNA, two procedural steps were critical:
1. **gDNA Eliminator Spin Columns:** Passing the guanidine-isothiocyanate lysate through a high-salt genomic DNA-binding column before adding ethanol to precipitate the RNA onto the silica membrane.
2. **SuperScript IV First-Strand cDNA Synthesis:** Reverse-transcribing equalised nanogram quantities of total RNA with oligo(dT) primers (which selectively prime the poly-A tails of mature eukaryotic mRNAs) before running **35-cycle semi-quantitative PCR** across five targets:
   - ***COL1A1* (Pro-Alpha 1 Type I Collagen):** The structural backbone of newly granulating dermis.
   - ***MMP1* (Interstitial Collagenase-1):** The enzyme that cleaves triple-helical type I collagen fibres.
   - ***NOX4* (NADPH Oxidase 4):** An intracellular enzymatic generator of superoxide and hydrogen peroxide ($\text{H}_2\text{O}_2$).
   - ***IL6* (Interleukin-6):** A flagship Senescence-Associated Secretory Phenotype (SASP) pro-inflammatory cytokine.
   - ***GAPDH*:** Our constitutive housekeeping loading control.

<figure class="my-8 flex flex-col items-center">
  <img src="/projects/diabetic-wound-epigenetics/rtpcr_gel_results.jpg" alt="Our Group 7 UV Transilluminator 2% Agarose Gel of 35-Cycle RT-PCR Amplicons" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Our raw UV transilluminator photograph (Group 7 results) of the 2% agarose gel resolving 35-cycle RT-PCR products across normoglycaemic (5 mM) and hyperglycaemic (80.5 mM) human dermal fibroblasts.
  </figcaption>
</figure>

When we slid our 2% agarose gel onto the UV transilluminator (pictured above), it was genuinely rewarding to see clean, single-band amplicons without primer-dimer smears or genomic contamination in the negative controls. Normalising the band intensities against *GAPDH* told a clear biological story: the high-glucose fibroblasts had sharply dialled down *COL1A1* transcription while ramping up *MMP1*, *NOX4*, and *IL6*. They were simultaneously halting collagen synthesis and secreting the exact enzyme (*MMP1*) that destroys existing collagen.

---

## Decoding Epigenetic Marks with Sodium Bisulphite and CodonCode Aligner

Seeing *COL1A1* mRNA drop on a gel proves transcriptional suppression, but it does not tell you *why* the promoter is turned off. Standard Sanger sequencing or PCR cannot distinguish an unmethylated cytosine (`C`) from a methylated **5-methylcytosine (`5-mC`)** because both base-pair identically with guanine (`G`) during polymerase extension.

The chemical workaround is sodium bisulphite conversion. When you denature genomic DNA into single strands and incubate it with sodium bisulphite under acidic conditions, bisulphite sulfonates and hydrolytically deaminates unmethylated cytosines into uracil (`U`), which are then read as thymine (`T`) after PCR amplification. The methyl group on the 5-carbon of 5-methylcytosine sterically blocks bisulphite attack, so methylated cytosines remain `C` in the final sequencing chromatogram.

$$C_{\text{unmethylated}} \xrightarrow{\text{NaHSO}_3,\; \text{deamination}} U \xrightarrow{\text{PCR}} T, \qquad 5\text{-mC}_{\text{methylated}} \xrightarrow{\text{NaHSO}_3\text{ (protected)}} C \xrightarrow{\text{PCR}} C$$

We amplified the bisulphite-converted proximal promoter of *COL1A1*, ligated the amplicons into bacterial plasmid vectors, and sequenced **20 individual bacterial clones** ($10$ clones from the $5.0\text{ mM}$ normoglycaemic fibroblasts and $10$ clones from the $80.5\text{ mM}$ hyperglycaemic fibroblasts).

Why clone into bacteria before Sanger sequencing rather than sequencing the PCR product directly? Because every cell in a tissue population can have a slightly different binary methylation pattern across its promoter CpG sites. Direct PCR sequencing averages all cells into mixed `C/T` chromatogram peaks, whereas bacterial cloning isolates a **single DNA molecule per colony**, letting you count exact methylated vs unmethylated CpG dinucleotides across individual alleles.

<figure class="my-8 flex flex-col items-center">
  <img src="/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png" alt="Bisulphite Sequencing CpG Methylation Profile Across the COL1A1 Promoter and RT-PCR Expression Shifts" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Quantifying our CodonCode Aligner bisulphite clone alignments in Python: mean CpG cytosine methylation across the COL1A1 promoter jumped nearly three-fold from 13.1% ± 3.0% in normoglycaemic controls to 36.4% ± 6.3% in hyperglycaemic fibroblasts (p = 0.002), mirroring the transcriptional shutdown of COL1A1.
  </figcaption>
</figure>

Aligning all 20 clone trace files in **CodonCode Aligner** (after verifying $> 99\%$ non-CpG cytosine conversion efficiency to rule out incomplete bisulphite reaction artefacts) and running our two-sample statistical analysis in Python revealed a striking shift:

| Experimental Fibroblast Cohort | Clones Sequenced | Mean *COL1A1* Promoter CpG Methylation | Standard Error ($\pm\text{SEM}$) | Statistical Comparison |
| :--- | :--- | :--- | :--- | :--- |
| **Normoglycaemic Control ($5.0\text{ mM}$)** | $n = 10$ | **$13.1\%$** | $\pm 3.0\%$ | Baseline euchromatic promoter |
| **Hyperglycaemic Senescent ($80.5\text{ mM}$)** | $n = 10$ | **$36.4\%$** | $\pm 6.3\%$ | **$p = 0.002$ (2.78x Hypermethylation)** |

---

## Limitations of Our Study and How Outside Research Connects the Dots

While achieving a $p = 0.002$ methylation shift alongside matching RT-PCR gel bands was an exciting outcome, looking critically at our experimental design highlighted several limitations and follow-up questions:

1. **End-Point 35-Cycle RT-PCR vs Real-Time qPCR ($2^{-\Delta\Delta C_t}$):** At 35 PCR cycles, abundant transcripts such as *GAPDH* begin approaching the amplification plateau where dNTPs and primer annealing kinetics saturate. While agarose gel densitometry clearly captures large fold-change reversals, repeating the transcriptional quantification with SYBR Green or TaqMan **real-time RT-qPCR** across the exponential log-linear phase ($C_t$ threshold crossings) would yield exact $2^{-\Delta\Delta C_t}$ fold changes.
2. **80.5 mM Supraphysiological Glucose vs Osmotic Mannitol Controls:** In an acute 14-day *in vitro* model, $80.5\text{ mM}$ glucose is used to accelerate metabolic stress that takes years to accumulate in a human patient at $15\text{ to }25\text{ mM}$ blood glucose. However, adding $80.5\text{ mM}$ glucose also raises extracellular osmolarity. In a follow-up experiment, including an **equimolar mannitol osmotic control cohort** ($5.0\text{ mM}$ D-glucose $+ 75.5\text{ mM}$ D-mannitol) is essential to prove how much of the *NOX4* and DNMT induction comes specifically from intracellular glycolytic/polyol flux versus hyperosmotic cell shrinkage.
3. **Can We Erase the Epigenetic Mark? (5-Aza-2'-Deoxycytidine & Nanopore Direct Methylation Calling):** In the wider regenerative medicine literature, researchers are now testing whether topical **DNA methyltransferase (DNMT) inhibitors** such as **5-aza-2'-deoxycytidine (decitabine)** or TET-enzyme activators can demethylate the *COL1A1* promoter in senescent wound beds and restore collagen deposition. Even more exciting from a sequencing standpoint: instead of harsh sodium bisulphite chemistry (which degrades up to 90% of input DNA and requires cloning), **Oxford Nanopore direct DNA sequencing** can detect $5\text{-mC}$ and $5\text{-hmC}$ directly from raw ionic current modulations across native unamplified genomic DNA using Remora/Dorado modification models.
