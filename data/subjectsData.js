/**
 * Alinea Online — Subjects Data Model
 *
 * Hierarchy:  Subject  →  Level  →  Board  →  { modules, examStructure, skills }
 *
 * This nested structure lets the UI dynamically render
 * board-specific curriculum when a student selects a level + board combination.
 */

export const subjectsData = [
  /* ─────────────────────────────── 01 · ECONOMICS ─────────────────────────────── */
  {
    id: "economics",
    num: "01",
    title: "Economics",
    tag: "FLAGSHIP",
    badgeType: "red-outline",
    description:
      "Master micro & macro theory, 25-mark essay structures, evaluation triggers, and accurate diagram drawing for top A* performance.",
    tutor: "Khawar (Academic Director & Senior Examiner)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0455",
            modules: [
              "The Basic Economic Problem",
              "The Allocation of Resources",
              "Microeconomic Decision Makers",
              "Government & the Macroeconomy",
              "Economic Development",
              "International Trade & Globalisation",
            ],
            examStructure: [
              "Paper 1: Multiple Choice (45 min)",
              "Paper 2: Structured Questions (1h 45min)",
            ],
            skills: [
              "Diagram accuracy (Supply/Demand shifts)",
              "Definition precision for 2-mark questions",
              "Data-response interpretation",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4EC1",
            modules: [
              "The Economic Problem & Resource Allocation",
              "Business Economics & Efficiency",
              "Government Objectives & Macroeconomic Policies",
              "International Trade & the Global Economy",
            ],
            examStructure: [
              "Paper 1: Microeconomics & Business Economics (1h 30min)",
              "Paper 2: Macroeconomics & the Global Economy (1h 30min)",
            ],
            skills: [
              "Short-answer mark allocation",
              "8-mark structured response technique",
              "Graph construction from data tables",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9EC0 / WEC14",
            modules: [
              "Theme 1: Introduction to Markets & Market Failure",
              "Theme 2: The UK Economy — Performance & Policies",
              "Theme 3: Business Behaviour & the Labour Market",
              "Theme 4: A Global Perspective — Trade & Development",
            ],
            examStructure: [
              "Paper 1: Markets & Business (2h, 100 marks)",
              "Paper 2: National & International Economy (2h, 100 marks)",
              "Paper 3: Microeconomics & Macroeconomics (2h, 100 marks)",
            ],
            skills: [
              "25-mark essay chains (KAA + Evaluation)",
              "Data-response Question 5 technique",
              "Quantitative skills — index numbers & percentages",
            ],
          },
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "9708",
            modules: [
              "Basic Economic Ideas & Resource Allocation",
              "The Price System & the Micro Economy",
              "Government Intervention in the Price System",
              "International Trade, Money & Exchange Rates",
              "Theory & Measurement in the Macroeconomy",
              "Macroeconomic Policy & Planning",
            ],
            examStructure: [
              "Paper 1: Multiple Choice (1h, 30 marks)",
              "Paper 2: Data Response & Essay (1h 30min, 40 marks)",
              "Paper 3: Multiple Choice (1h 15min, 30 marks)",
              "Paper 4: Data Response & Essay (2h 15min, 70 marks)",
            ],
            skills: [
              "CIE evaluation vocabulary & trigger words",
              "Multi-part data interpretation",
              "Comparative advantage calculations",
            ],
          },
          {
            id: "aqa",
            label: "AQA",
            syllabus: "7136",
            modules: [
              "Markets & Market Failure",
              "National & International Economy",
              "Individuals, Firms, Markets & Market Failure",
              "The National & International Economy",
            ],
            examStructure: [
              "Paper 1: Markets & Market Failure (2h, 80 marks)",
              "Paper 2: National & International Economy (2h, 80 marks)",
              "Paper 3: Economic Principles & Issues (2h, 80 marks)",
            ],
            skills: [
              "AQA-style 25-mark essay scaffolds",
              "Context-driven multiple choice strategies",
              "Synoptic linkage across micro & macro",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────── 02 · MATHEMATICS ─────────────────────────────── */
  {
    id: "maths",
    num: "02",
    title: "Mathematics & Further Maths",
    tag: "POPULAR",
    badgeType: "yellow",
    description:
      "Rigorous problem-solving strategies, calculus mastery, mechanics, and statistics mark-scheme precision.",
    tutor: "Dr. Sarah Lin (Cambridge PhD)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0580 / 0606",
            modules: [
              "Number & Algebra",
              "Geometry & Mensuration",
              "Co-ordinate Geometry",
              "Trigonometry & Vectors",
              "Probability & Statistics",
            ],
            examStructure: [
              "Paper 2: Short-answer (Core, 1h 30min)",
              "Paper 4: Structured (Extended, 2h 30min)",
            ],
            skills: [
              "Show-that proof construction",
              "Multi-step worded problem decomposition",
              "Calculator efficiency techniques",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4MA1",
            modules: [
              "Numbers & the Number System",
              "Equations, Formulae & Identities",
              "Sequences, Functions & Graphs",
              "Geometry & Trigonometry",
              "Vectors & Transformations",
              "Statistics & Probability",
            ],
            examStructure: [
              "Paper 1H: Non-calculator (2h)",
              "Paper 2H: Calculator (2h)",
            ],
            skills: [
              "Non-calculator strategies for Paper 1",
              "Mark-scheme working chain layout",
              "Common error avoidance patterns",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9MA0 / WMA14",
            modules: [
              "Pure Mathematics 1 — Algebra, Functions & Calculus",
              "Pure Mathematics 2 — Sequences, Trigonometry & Vectors",
              "Statistics — Data Presentation & Probability",
              "Mechanics — Kinematics, Forces & Moments",
            ],
            examStructure: [
              "Paper 1: Pure Mathematics (2h, 100 marks)",
              "Paper 2: Pure Mathematics (2h, 100 marks)",
              "Paper 3: Statistics & Mechanics (2h, 100 marks)",
            ],
            skills: [
              "Integration by parts & substitution mastery",
              "Large-mark question scaffolding",
              "Proof techniques (induction, contradiction)",
            ],
          },
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "9709",
            modules: [
              "Pure Mathematics 1 — Quadratics, Coordinate Geometry",
              "Pure Mathematics 2 — Logarithms, Differentiation",
              "Pure Mathematics 3 — Complex Numbers, Differential Equations",
              "Mechanics — Forces, Energy, Motion",
              "Probability & Statistics 1 — Distributions, Hypothesis Testing",
            ],
            examStructure: [
              "Paper 1: Pure Maths 1 (1h 50min, 75 marks)",
              "Paper 3: Pure Maths 3 (1h 50min, 75 marks)",
              "Paper 4: Mechanics (1h 15min, 50 marks)",
              "Paper 5: Statistics (1h 15min, 50 marks)",
            ],
            skills: [
              "Trapezium rule & numerical methods",
              "Vector geometry in 3D space",
              "Binomial & normal distribution application",
            ],
          },
        ],
      },
      {
        id: "ib",
        label: "IB Diploma",
        boards: [
          {
            id: "ib",
            label: "IB (AA HL)",
            syllabus: "IB Mathematics: Analysis & Approaches HL",
            modules: [
              "Number & Algebra — Complex Numbers, Proof",
              "Functions — Transformations, Polynomials",
              "Geometry & Trigonometry — Vectors in 3D, Trig Identities",
              "Statistics & Probability — Distributions, Bayes Theorem",
              "Calculus — Limits, Differential Equations, Maclaurin Series",
            ],
            examStructure: [
              "Paper 1: Non-calculator (2h, 110 marks)",
              "Paper 2: Calculator (2h, 110 marks)",
              "Paper 3: Investigation (1h, 55 marks)",
            ],
            skills: [
              "GDC (graphing calculator) techniques for Paper 2",
              "Internal Assessment (IA) mathematical exploration",
              "Multi-step proof & conjecture strategies",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────── 03 · PHYSICS ─────────────────────────────── */
  {
    id: "physics",
    num: "03",
    title: "Physics",
    tag: "HIGH DEMAND",
    badgeType: "yellow",
    description:
      "Conceptual clarity combined with numerical accuracy, formula derivation, and practical paper exam techniques.",
    tutor: "James Vance (Imperial MSci)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0625",
            modules: [
              "General Physics — Measurements & Motion",
              "Thermal Physics — KMT & Thermal Properties",
              "Waves — Properties, Light & Sound",
              "Electricity & Magnetism — Circuits & EMF",
              "Atomic Physics — Radioactivity",
            ],
            examStructure: [
              "Paper 2: Multiple Choice (Extended, 45 min)",
              "Paper 4: Theory (Extended, 1h 15min)",
              "Paper 6: Alternative to Practical (1h)",
            ],
            skills: [
              "SI unit conversions & significant figures",
              "Circuit diagram interpretation",
              "Practical planning & error analysis",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4PH1",
            modules: [
              "Forces & Motion",
              "Electricity",
              "Waves",
              "Energy Resources & Energy Transfers",
              "Solids, Liquids & Gases",
              "Magnetism & Electromagnetism",
              "Radioactivity & Particles",
              "Astrophysics",
            ],
            examStructure: [
              "Paper 1: Multiple choice & Short answer (2h)",
              "Paper 2: Structured & Extended questions (1h 15min)",
            ],
            skills: [
              "Equation rearrangement practice",
              "Graph plotting & gradient extraction",
              "6-mark extended response structure",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9PH0 / WPH14",
            modules: [
              "Mechanics — Motion, Forces & Energy",
              "Electric Circuits & DC Electricity",
              "Materials — Stress, Strain & Young's Modulus",
              "Waves & Particle Nature of Light",
              "Fields — Electric, Gravitational & Magnetic",
              "Nuclear & Particle Physics",
            ],
            examStructure: [
              "Paper 1: Advanced Physics I (1h 45min, 90 marks)",
              "Paper 2: Advanced Physics II (1h 45min, 90 marks)",
              "Paper 3: General & Practical Principles (2h 30min, 120 marks)",
            ],
            skills: [
              "Deriving equations from first principles",
              "Practical endorsement techniques",
              "Synoptic 6-mark quality of written communication",
            ],
          },
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "9702",
            modules: [
              "Physical Quantities & Units",
              "Kinematics, Dynamics & Forces",
              "Work, Energy & Power",
              "Waves, Superposition & Stationary Waves",
              "Electricity — DC Circuits & Kirchhoff's Laws",
              "Nuclear Physics & Medical Imaging",
            ],
            examStructure: [
              "Paper 1: Multiple Choice (1h 15min, 40 marks)",
              "Paper 2: AS Structured Questions (1h 15min, 60 marks)",
              "Paper 4: A2 Structured Questions (2h, 100 marks)",
              "Paper 5: Planning, Analysis & Evaluation (1h 15min, 30 marks)",
            ],
            skills: [
              "CIE practical planning methodology",
              "Error propagation & uncertainty calculations",
              "Deriving relationships from experimental data",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────── 04 · BIOLOGY ─────────────────────────────── */
  {
    id: "biology",
    num: "04",
    title: "Biology",
    tag: "POPULAR",
    badgeType: "yellow",
    description:
      "Precision in key biological terminology, diagram labelling, experimental design, and data analysis questions.",
    tutor: "Dr. Rachel Mehta (Oxford PhD)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0610",
            modules: [
              "Cell Structure & Organisation",
              "Biological Molecules — Enzymes & Nutrition",
              "Plant Nutrition & Transport",
              "Human Physiology — Respiration, Excretion",
              "Reproduction & Inheritance",
              "Ecology & the Environment",
            ],
            examStructure: [
              "Paper 2: Multiple Choice (Extended, 45 min)",
              "Paper 4: Theory (Extended, 1h 15min)",
              "Paper 6: Alternative to Practical (1h)",
            ],
            skills: [
              "Biological drawing conventions",
              "Experimental variable identification",
              "Data table construction & graph plotting",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4BI1",
            modules: [
              "The Nature & Variety of Living Organisms",
              "Structure & Functions in Living Organisms",
              "Reproduction & Inheritance",
              "Ecology & the Environment",
              "Use of Biological Resources",
            ],
            examStructure: [
              "Paper 1: Multiple choice & Short answer (2h)",
              "Paper 2: Structured & Extended questions (1h 15min)",
            ],
            skills: [
              "Key term definition precision",
              "6-mark extended response framework",
              "Photomicrograph interpretation",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9BN0 / WBI14",
            modules: [
              "Biological Molecules & Ultrastructure",
              "Genetics, Biodiversity & Classification",
              "Exchange & Transport Systems",
              "Energy Transfers — Photosynthesis & Respiration",
              "Control Systems — Homeostasis & Nervous System",
              "Ecosystems & Populations",
            ],
            examStructure: [
              "Paper 1: Advanced Biochemistry (1h 45min, 90 marks)",
              "Paper 2: Advanced Physiology (1h 45min, 90 marks)",
              "Paper 3: General & Practical Biology (2h 30min, 120 marks)",
            ],
            skills: [
              "Statistical tests — chi-squared, t-test, Spearman's",
              "Synoptic essay planning (16-mark)",
              "Practical endorsement core skills",
            ],
          },
          {
            id: "aqa",
            label: "AQA",
            syllabus: "7402",
            modules: [
              "Biological Molecules & Cell Biology",
              "Organisms Exchange & Transport",
              "Genetics, Populations & Evolution",
              "Energy Transfers & Response to Stimuli",
              "Control of Gene Expression & Biotechnology",
            ],
            examStructure: [
              "Paper 1: Topics 1–4 (2h, 91 marks)",
              "Paper 2: Topics 5–8 (2h, 91 marks)",
              "Paper 3: Synoptic (2h, 78 marks)",
            ],
            skills: [
              "AQA practical skills assessment",
              "25-mark extended response technique",
              "Maths in biology — logarithms & Hardy-Weinberg",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────── 05 · ENGLISH LANGUAGE ─────────────────────────────── */
  {
    id: "english-language",
    num: "05",
    title: "English Language",
    tag: "CORE",
    badgeType: "yellow",
    description:
      "Analytical essay techniques, language & structural devices, unseen text interpretation, and persuasive writing.",
    tutor: "Claire Hemsworth (MA Cantab)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0500 / 0990",
            modules: [
              "Reading — Comprehension & Summary",
              "Directed Writing — Letters, Reports, Speeches",
              "Writer's Effect — Language Analysis",
              "Descriptive & Narrative Writing",
            ],
            examStructure: [
              "Paper 1: Reading (1h 45min, 80 marks)",
              "Paper 2: Directed & Composition Writing (2h, 50 marks)",
            ],
            skills: [
              "Implicit meaning inference",
              "Summary writing under word limits",
              "Sensory language for descriptive writing",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4EA1",
            modules: [
              "Non-Fiction Texts — Analysis & Comparison",
              "Transactional Writing — Argue, Persuade, Advise",
              "Imaginative & Creative Writing",
              "Poetry & Prose — Close Reading Skills",
            ],
            examStructure: [
              "Paper 1: Non-fiction & Transactional Writing (2h 15min)",
              "Paper 2: Poetry & Prose Texts (1h 30min)",
            ],
            skills: [
              "PEEL paragraph structuring",
              "Comparative connective vocabulary",
              "Register & tone awareness",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9EN0",
            modules: [
              "Voices in Speech & Writing",
              "Varieties in Language & Literature",
              "Investigating Language — Child Language Acquisition",
              "Crafting Language — Original Writing & Commentary",
            ],
            examStructure: [
              "Paper 1: Language Variation (2h 30min, 72 marks)",
              "Paper 2: Child Language & Original Writing (2h 30min, 72 marks)",
              "Coursework: Investigation + Original Writing",
            ],
            skills: [
              "Phonological, lexical & grammatical frameworks",
              "Sociolinguistic theory application",
              "Data transcription analysis",
            ],
          },
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "9093",
            modules: [
              "Passages for Comment — Reading Analysis",
              "Composition — Argumentative & Descriptive",
              "Language Analysis — Style & Structure",
              "Text Analysis & Comparison",
            ],
            examStructure: [
              "Paper 1: Reading (2h 15min, 50 marks)",
              "Paper 2: Writing (2h, 50 marks)",
              "Paper 3: Text Analysis (2h 15min, 50 marks)",
              "Paper 4: Language Topics (2h 15min, 50 marks)",
            ],
            skills: [
              "Authorial intention analysis",
              "Cohesive academic essay writing",
              "Stylistic comparison techniques",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────── 06 · ENGLISH LITERATURE ─────────────────────────────── */
  {
    id: "english-literature",
    num: "06",
    title: "English Literature",
    tag: "CORE",
    badgeType: "yellow",
    description:
      "Deep textual analysis, comparative poetry essays, drama interpretation, and examiner-focused thesis formulation.",
    tutor: "Claire Hemsworth (MA Cantab)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0475 / 0992",
            modules: [
              "Drama — Set Text Critical Analysis",
              "Prose — Character, Theme & Context",
              "Poetry — Anthology & Unseen",
              "Coursework Option — Extended Critical Essays",
            ],
            examStructure: [
              "Paper 1: Poetry & Prose (1h 30min, 50 marks)",
              "Paper 2: Drama (1h 30min, 50 marks)",
            ],
            skills: [
              "Quotation embedding technique",
              "Contextual linkage (AO3)",
              "Unseen poetry response framework",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4ET1",
            modules: [
              "Drama — Shakespeare & Modern Drama",
              "Poetry Anthology — Conflict & Relationships",
              "Prose — Novels & Short Stories",
              "Unseen Poetry Comparison",
            ],
            examStructure: [
              "Paper 1: Drama & Prose (1h 30min)",
              "Paper 2: Poetry & Unseen (1h 30min)",
            ],
            skills: [
              "Close reading & inference",
              "Comparative essay structure",
              "Writer's method analysis (AO2)",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9ET0",
            modules: [
              "Drama — Othello, A Streetcar Named Desire",
              "Prose — Frankenstein, The Handmaid's Tale",
              "Poetry — Keats, Selected Poems",
              "Coursework — Comparative Critical Essay",
            ],
            examStructure: [
              "Paper 1: Drama (2h 15min, 60 marks)",
              "Paper 2: Prose (1h 15min, 40 marks)",
              "Paper 3: Poetry (2h 15min, 60 marks)",
              "Coursework: Comparative (60 marks)",
            ],
            skills: [
              "AO5 — Critical interpretive debate",
              "Alternative reading lens application",
              "Sustained thesis across 40-mark essays",
            ],
          },
          {
            id: "aqa",
            label: "AQA",
            syllabus: "7712",
            modules: [
              "Love Through the Ages — Poetry & Prose",
              "Texts in Shared Contexts — WW1 or Modern",
              "Independent Critical Study (Coursework)",
              "Unseen Prose & Poetry Comparison",
            ],
            examStructure: [
              "Paper 1: Love Through the Ages (3h, 75 marks)",
              "Paper 2: Texts in Shared Contexts (2h 30min, 75 marks)",
              "NEA: Critical Study (50 marks)",
            ],
            skills: [
              "Historicist & feminist critical lenses",
              "Cross-text thematic comparison",
              "AQA mark-scheme signpost vocabulary",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────── 07 · BUSINESS & ACCOUNTING ─────────────────────────────── */
  {
    id: "business",
    num: "07",
    title: "Business Studies & Accounting",
    tag: "NEW",
    badgeType: "yellow",
    description:
      "Case study analysis, financial ratio interpretation, accounting ledgers, and strategic decision-making essay templates.",
    tutor: "Elena Rostova (MBA)",
    levels: [
      {
        id: "igcse",
        label: "IGCSE / O-Level",
        boards: [
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "0450 / 0452",
            modules: [
              "Understanding Business Activity",
              "People in Business — HR & Motivation",
              "Marketing — Research, Mix & Strategy",
              "Operations Management",
              "Financial Information & Decisions",
              "External Influences on Business",
            ],
            examStructure: [
              "Paper 1: Short Answer & Data Response (1h 30min, 80 marks)",
              "Paper 2: Case Study (1h 30min, 80 marks)",
            ],
            skills: [
              "Stakeholder analysis frameworks",
              "Calculation-based questions (profit, break-even)",
              "Case study application technique",
            ],
          },
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "4BS1",
            modules: [
              "Business Activity, Marketing & People",
              "Finance, Operations & Influences on Business",
              "Business & the Economic Environment",
              "Business Communications & ICT",
            ],
            examStructure: [
              "Paper 1: Business activity & influences (1h 30min)",
              "Paper 2: Business planning & finance (1h 30min)",
            ],
            skills: [
              "6-mark justify/evaluate response structure",
              "Financial document interpretation",
              "Market research data analysis",
            ],
          },
        ],
      },
      {
        id: "a-level",
        label: "A-Level",
        boards: [
          {
            id: "edexcel",
            label: "Edexcel (Pearson)",
            syllabus: "9BS0 / WBS14",
            modules: [
              "Theme 1: Marketing & People",
              "Theme 2: Managing Business Activities",
              "Theme 3: Business Decisions & Strategy",
              "Theme 4: Global Business & Competition",
            ],
            examStructure: [
              "Paper 1: Marketing, People & Global (2h, 100 marks)",
              "Paper 2: Business Activities & Decisions (2h, 100 marks)",
              "Paper 3: Investigating Business (2h 30min, 100 marks)",
            ],
            skills: [
              "20-mark essay evaluation chains",
              "Quantitative business analysis",
              "Pre-released case study preparation",
            ],
          },
          {
            id: "caie",
            label: "Cambridge (CAIE)",
            syllabus: "9609",
            modules: [
              "Business & Its Environment",
              "People in Organisations — Leadership & Motivation",
              "Marketing — Strategy & Planning",
              "Operations & Project Management",
              "Finance & Accounting — Budgets & Ratios",
              "Strategic Management & Decision Making",
            ],
            examStructure: [
              "Paper 1: Short Answer & Essay (1h 15min, 40 marks)",
              "Paper 2: Data Response (1h 30min, 60 marks)",
              "Paper 3: Case Study (3h, 100 marks)",
            ],
            skills: [
              "SWOT & PESTLE framework application",
              "Ratio analysis — ROI, gearing, liquidity",
              "Strategic recommendation with justification",
            ],
          },
        ],
      },
    ],
  },
];
