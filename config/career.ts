import { ValidSkills } from "./constants";

export interface CareerExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  summary: string;
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
}

export const careerExperiences: CareerExperienceInterface[] = [
  {
    id: "ladame-lab-urop",
    position: "UROP Research Assistant & Data Analyst",
    company: "Imperial College London (Ladame Lab - miRFlow Spinout)",
    location: "London, UK (Department of BioEngineering)",
    period: "Jun 2026 - Sep 2026",
    badge: "Cancer Diagnostics & Bioconjugation",
    summary:
      "Supervised by Dr Sylvain Ladame alongside Marc Soler on the miRFlow circulating microRNA diagnostic platform for early-stage endometrial cancer (miR-223, miR-29b); handed over to a clinical researcher supporting the miRFlow spinout.",
    description: [
      "Executed in vitro bead-based sandwich hybridisation assays pairing size-encoded streptavidin magnetic microbeads (5.9 um and 8.2 um) with 0.4 um Dragon Green fluorescent reporter beads and split Peptide Nucleic Acid (PNA) probes.",
      "Synthesised four hydrophilic, negatively charged biotinylated backfiller conjugates (BMSA, BP2MSA, BMES, BP2MES) via room-temperature thiol-maleimide Michael addition in 1x PBS and purified over 50 biological conjugates on Reverse-Phase HPLC (C18 column, water/acetonitrile gradient, UV detection at 280 nm).",
      "Designed a 27-condition (3x3x3) full-factorial reaction buffer matrix over TE Buffer pH 8.0 (varying Tween-20, BSA, and NaCl) and authored Good Laboratory Practice Standard Operating Procedures covering 20 stock solutions and RNase-free workflows.",
      "Operated a Beckman Coulter CytoFlex flow cytometer (CytExpert) and ran FlowJo singlet and conjugate gating analysis alongside Python and Excel statistical validation scripts.",
    ],
    achievements: [
      "Improved diagnostic assay performance by 30% by suppressing hydrophobic bead-bead aggregation; demonstrated experimentally that hydrophilic PNA-backfillers, total assay volume, and magnetic-to-reporter bead volume ratios drove the signal-to-noise gain while ruling out most buffer variations.",
      "Separated 50+ biological conjugates to high purity via Reverse-Phase HPLC with centrifugal evaporation, flash-freezing, and overnight lyophilisation workup.",
      "Handed over validated protocols and datasets to a clinical researcher advancing the miRFlow diagnostic spinout.",
    ],
    skills: [
      "Reverse-Phase HPLC",
      "CytoFlex Flow Cytometry",
      "FlowJo",
      "Python",
      "Pandas / NumPy / SciPy",
    ],
    companyUrl: "https://www.imperial.ac.uk/bioengineering",
  },
  {
    id: "nanolyse-technologies",
    position: "Biotechnology & Commercial Strategy Assistant",
    company: "Nanolyse Technologies Ltd.",
    location: "United Kingdom",
    period: "Jun 2025 - Present",
    badge: "Scientific Software & Biotech R&D Strategy",
    summary:
      "Combining multi-core geochemical speciation software engineering in Python and C++ with biosensor market strategy, grant writing, and executive stakeholder engagement.",
    description: [
      "Co-developed over Git an installable multi-core Python speciation package (phreeqc-python-tool) wrapping the compiled United States Geological Survey IPhreeqc C++ shared library across 13 thermodynamic databases.",
      "Engineered a parallel batch execution engine (PhreeqcBatchRunner using ProcessPoolExecutor) with persistent per-worker IPhreeqc instances to automate data cleaning and dual-catchment toxic ammonia (NH3) speciation across 35,232 continuous environmental sensor records.",
      "Owned functional specifications, project plans, and technical business cases for an AI/ML chemical speciation framework modelling pharmaceutical compound behaviour in water and soil matrices.",
      "Conducted primary and secondary market research on emerging biotechnology start-ups and novel biosensor commercialisation, and built dual-layer PowerPoint and Figma decks for technical R&D directors and commercial executives.",
    ],
    achievements: [
      "Secured a £40,000 commercial grant (STFC / Harwell Science Campus scheme) by proving technical and commercial feasibility to executive assessors.",
      "Represented Nanolyse at 3 industry conferences with commercial briefings and technical discussions that led to 3 corporate R&D partnerships.",
      "Eliminated manual spreadsheet bottlenecks by connecting parallel PHREEQC and Python outputs directly into MATLAB and structured Microsoft Excel decision models.",
    ],
    skills: [
      "Python",
      "PHREEQC",
      "MATLAB",
      "Pandas / NumPy / SciPy",
      "Git",
      "Figma",
    ],
  },
  {
    id: "nhs-blood-and-transplant",
    position: "Clinical & Translational Research Shadowing",
    company: "NHS Blood and Transplant",
    location: "United Kingdom",
    period: "Oct 2025",
    badge: "Translational Medical Devices",
    summary:
      "Clinical and pre-clinical evaluation of ex situ donor organ preservation systems and hepatic regeneration workflows.",
    description: [
      "Evaluated the OrganOx metra normothermic machine perfusion system in a clinical and translational research setting and documented operational workflows for ex situ donor liver preservation.",
      "Observed pre-clinical trials focused on hepatic regeneration protocols and donor organ viability assessment.",
    ],
    achievements: [
      "Analysed translational medical device deployment constraints and clinical-research handoffs between surgical perfusion teams and translational investigators.",
    ],
    skills: ["Embedded C", "Arduino / STM32", "Python"],
  },
  {
    id: "imperial-hockey-club",
    position: "President (Club Captain), Treasurer & Men's 1st XI Goalkeeper",
    company: "Imperial College Hockey Club",
    location: "London, UK",
    period: "May 2025 - Present",
    badge: "Executive Governance & £26k Budget",
    summary:
      "Directing organisational strategy, financial governance, and external commercial negotiations for Imperial College London's largest mixed sports club (110+ members across 7 competitive squads).",
    description: [
      "Governs a £26,000 annual budget using Microsoft Excel forecast models and Imperial College Union eActivities across cash forecasting, supplier invoicing, and bank reconciliations.",
      "Expanded the club constitution from 19 to 23 formal committee roles and authored the Core Risk Assessment alongside competing as Men's 1st XI Goalkeeper.",
      "Authored formal budget appeals and negotiated commercial agreements with external sponsors, kit suppliers, and venue partners.",
    ],
    achievements: [
      "Secured £5,000 in Focus Sport funding from Imperial College Union plus a £1,000 commercial sponsorship (£6,000 total awarded and external funding alongside kit and transport deals).",
      "Grew paid club membership by 10% and established a community volunteering partnership with Ealing Hockey Club coaching children with special educational needs and disabilities, unlocking access to a second London training pitch.",
    ],
    skills: ["Git"],
  },
  {
    id: "oxford-epidemiology-lab",
    position: "Biomedical Research Intern",
    company: "University of Oxford (Epidemiology Lab)",
    location: "Oxford, UK",
    period: "Oct 2022 - Nov 2022",
    badge: "High-Throughput Wet-Lab Automation",
    summary:
      "High-throughput biological sample extraction, automated liquid handling, and quality control supporting a large-scale epidemiological study.",
    description: [
      "Executed wet-lab biological sample extraction protocols including aseptic technique, centrifugation, micropipetting, and blood sample processing under strict Standard Operating Procedures.",
      "Operated automated liquid handling platforms to prepare biological sample batches at scale with consistent volumetric precision.",
      "Performed quality assurance, quality control, and calibration standard validations across sample runs to maintain audit readiness and analytical accuracy.",
    ],
    achievements: [
      "Maintained full compliance with laboratory Standard Operating Procedures and calibration benchmarks across high-throughput epidemiological sample runs.",
    ],
    skills: ["Mammalian Cell Culture"],
  },
];
