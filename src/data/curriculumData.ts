import { Phase, Milestone, PracticeBrief, LearningSession, UserSettings, ClientCoachModule } from '../types';

export const DEFAULT_PHASES: Phase[] = [
  {
    id: 1,
    title: 'Phase 1: Visual Design Foundations & Gestalt',
    subtitle: 'University Studio Foundation',
    description: 'Master the immutable grammar of design: anatomical typography, mathematical modular scales, WCAG luminance contrast, and Swiss layout balance.',
    themeColor: '#3b82f6',
  },
  {
    id: 2,
    title: 'Phase 2: Vector Mastery & Pen Tool Engineering',
    subtitle: 'Bezier Mathematics & Node Hygiene',
    description: 'Build industrial-grade precision with Bezier handles, minimum anchor nodes, Boolean pathfinder operations, and pixel-snapped 24px icon architectures.',
    themeColor: '#10b981',
  },
  {
    id: 3,
    title: 'Phase 3: Brand Identity & Design Systems',
    subtitle: 'Visual Semiotics & Token Systems',
    description: 'Formulate responsive logo suites, design tokens, optical kerning, comprehensive style guidelines, and scalable brand collateral.',
    themeColor: '#8b5cf6',
  },
  {
    id: 4,
    title: 'Phase 4: Editorial, Grid Systems & Print Specs',
    subtitle: 'Swiss Modernism & Print Production',
    description: 'Construct 12-column baseline grids, editorial cadence, bleeds, slugs, CMYK color space separations, 300 DPI pre-flighting, and packaging die-lines.',
    themeColor: '#f59e0b',
  },
  {
    id: 5,
    title: 'Phase 5: UI/UX, Wireframes & Component Systems',
    subtitle: 'User Experience & Digital Interfaces',
    description: 'Design atomic UI components, responsive layout grids (mobile to desktop 1440px), accessible form states, usability heuristics, and interactive micro-flows.',
    themeColor: '#ec4899',
  },
  {
    id: 6,
    title: 'Phase 6: Professional Portfolio & Client Hand-off',
    subtitle: 'Case Study Storytelling & Industry Readiness',
    description: 'Structure rigorous case studies, compose realistic presentation mockups, generate client delivery asset packages, and master freelance service relations.',
    themeColor: '#06b6d4',
  },
];

export const DEFAULT_MILESTONES: Milestone[] = [
  // 1.1 Typography Anatomy
  {
    id: 'm1-1',
    phaseId: 1,
    title: 'Typographic Anatomy & Optical Hierarchy',
    category: 'Typography',
    shortDesc: 'Analyze x-height, ascenders, descenders, kerning, leading, counter-spaces, and optical balance.',
    estimatedHours: 4.5,
    status: 'completed',
    completedAt: '2026-10-02T14:30:00Z',
    difficultyRating: 2,
    userNotes: 'Optical kerning requires looking at shapes of negative space rather than ruler distance.',
    workCriteria: {
      bachelorStandard: 'Exemplifies rigorous understanding of typographic craft. Displays distinct discrimination between metric and optical kerning, baseline alignment, and purposeful leading ratio based on line length.',
      simpleExplanation: 'Typography is about making words effortless to read. Letters have anatomy just like human bodies: feet on the floor (Baseline), waist height (x-height), and parts reaching up (like b, d) or down (like p, y). Kerning simply means fixing awkward gaps between letters so words do not look disconnected.',
      simpleAnalogy: 'Think of letters like passengers sitting on a bench. If they sit too close, they feel squished. If they sit too far, they do not feel like a group. You want comfortable breathing room between every pair.',
      goldenRule: 'Never trust automatic computer kerning on big titles! Always check with your own eyes and fix awkward gaps.',
      rubric: [
        {
          title: 'Anatomical Precision',
          criteria: 'Identifies and demonstrates minimum 8 anatomical parts (baseline, meanline, cap height, ascender, descender, counter, bowl, serif/terminal).',
          benchmark: 'Zero confusion between glyph bounding box and optical alignment.',
        },
        {
          title: 'Type Pairing & Contrast',
          criteria: 'Harmonious pairing of a high-contrast serif with a neutral geometric or humanist grotesque sans.',
          benchmark: 'Pairing shows intentional structural contrast (warmth vs geometry), avoiding font collision.',
        },
        {
          title: 'Craft & Negative Space',
          criteria: 'Leading (line-height) calibrated to line measure (ideal 45-75 characters per line).',
          benchmark: 'Body text does not create "rivers" of white space or cramped collisions.',
        },
      ],
      commonPitfalls: [
        'Setting leading too tight for long body copy, causing descenders to collide with ascenders.',
        'Pairing two typefaces that are too similar in style (e.g., Arial with Helvetica).',
        'Neglecting optical alignment on circular glyphs (O, C, S must overshoot the baseline slightly).',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Deconstruct a classical font (e.g. Garamond or Bodoni) vs a modern sans (e.g. Inter or Akzidenz-Grotesk). Print or zoom into 300% on laptop screen to trace terminals and counter-spaces.',
      step2_analogThumbnailing: 'Spend 20 minutes sketching 6 thumbnail compositions on paper exploring dramatic scale contrast (e.g. 120pt letterform behind 12pt body paragraph).',
      step3_digitalExecution: 'Open Figma or Illustrator. Set up 1080x1080 artboard. Place callout vectors highlighting anatomical lines and render an editorial specimen card.',
      step4_studioCritique: 'Step back 2 meters from laptop screen or squint. Does the headline dominate without suffocating the body? Is the visual rhythm crisp?',
    },
    practiceGuide: {
      artboardSetup: 'Figma / Illustrator: 1080 x 1080px (Square Specimen) or A4 Portrait (210 x 297mm). RGB color space, 72 or 300 DPI.',
      softwareWorkflow: [
        '1. Set up guides for Cap Height, X-Height, Baseline, and Descender.',
        '2. Choose one specimen typeface (e.g., Playfair Display or Adobe Caslon) and one body typeface (e.g., Inter).',
        '3. Create labeled red vector line callouts with clean 1px stroke weight and monospace tags.',
        '4. Export as 2x PNG and vector PDF for submission.',
      ],
      keyShortcuts: ['T (Text Tool)', 'Alt/Option + Left/Right Arrow (Kerning)', 'Alt/Option + Up/Down Arrow (Leading)', 'Cmd/Ctrl + Shift + O (Create Outlines)'],
      deliverableSpec: 'High-resolution PDF specimen sheet with annotated anatomical callouts and pairing rationales.',
    },
    youtubeReferences: [
      {
        title: 'Typography Manual: The Basics of Good Typography',
        channel: 'The Futur (Chris Do)',
        description: 'Comprehensive lecture on typographic hierarchy, kerning mistakes, and spatial rhythm for design students.',
        url: 'https://www.youtube.com/results?search_query=the+futur+typography+basics',
        focusArea: 'Kerning & Optical Hierarchy',
      },
      {
        title: 'Typography Anatomy Explained for Graphic Designers',
        channel: 'Satori Graphics',
        description: 'Deep dive into x-height, counters, serifs, and how anatomical proportions influence legibility.',
        url: 'https://www.youtube.com/results?search_query=satori+graphics+typography+anatomy',
        focusArea: 'Anatomy Callouts & Terminology',
      },
    ],
    graphicalExample: {
      type: 'typography-anatomy',
      caption: 'Anatomy Specimen: Baseline, Meanline (x-height), Cap Height, Ascender, and Descender Guides.',
      keyPrinciples: ['Baseline alignment', 'Counter-space breathability', 'Optical overshoot on curved letters'],
    },
    trials: [
      {
        id: 't1-1',
        attemptNumber: 1,
        date: '2026-10-01',
        versionTitle: 'V1 - Rough Specimen Wireframe',
        score: 74,
        critiqueNotes: 'Leading was too tight at 110%. Callout lines clashed with text body.',
        fileOrLink: 'figma.com/@atelier/typography-v1',
        status: 'needs-refinement',
      },
      {
        id: 't1-2',
        attemptNumber: 2,
        date: '2026-10-02',
        versionTitle: 'V2 - Optical Kerning & Callout Alignment',
        score: 93,
        critiqueNotes: 'Fixed line height to 145%. Used precise 1px red guide vectors. Meets university standard.',
        fileOrLink: 'figma.com/@atelier/typography-v2-final',
        status: 'passed-critique',
      },
    ],
    checklistItems: [
      { id: 'c1-1', label: 'Identify and label 6+ anatomical terms on specimen', done: true },
      { id: 'c1-2', label: 'Test optical kerning between T-A, V-o, and r-n', done: true },
      { id: 'c1-3', label: 'Verify leading ratio (1.4x to 1.6x of body font size)', done: true },
      { id: 'c1-4', label: 'Export vector PDF with clean layers and no font rasterization', done: true },
    ],
  },

  // 1.2 Modular Type Scale
  {
    id: 'm1-2',
    phaseId: 1,
    title: 'Modular Type Scale & Mathematical Hierarchy',
    category: 'Typography',
    shortDesc: 'Construct modular typographic scales using musical intervals (1.250 Major Third, 1.333 Perfect Fourth).',
    estimatedHours: 4.0,
    status: 'completed',
    completedAt: '2026-10-04T17:00:00Z',
    difficultyRating: 3,
    userNotes: 'Major Third scale generates harmonious proportional jumps between H1, H2, H3, and Body.',
    workCriteria: {
      bachelorStandard: 'Constructs an airtight typographic scale rooted in musical ratio theory. Demonstrates mathematical consistency across desktop and laptop viewport scales.',
      simpleExplanation: 'A type scale is a shortcut for picking font sizes. Instead of guessing random numbers like 19px or 27px, you pick 16px for body text and multiply it so your big Title is clearly bigger than your Subtitle, and your Subtitle is clearly bigger than your paragraph text.',
      simpleAnalogy: 'Think of staircase steps or Russian nesting dolls. Each step up is noticeably bigger than the one below it, so the reader’s eye instantly knows where to start reading.',
      goldenRule: 'Make size differences obvious! If your title is 32px, never make your subhead 30px—make it 24px so the contrast is unmistakable.',
      rubric: [
        {
          title: 'Mathematical Rigor',
          criteria: 'Base font size (16px) accurately multiplied by chosen ratio across minimum 6 hierarchy steps.',
          benchmark: 'Exact rem and px calculations documented with zero arbitrary font sizes.',
        },
        {
          title: 'Viewport Adaptability',
          criteria: 'System accounts for desktop (1440px) vs mobile (390px) responsive scale reduction.',
          benchmark: 'H1 scales down gracefully to prevent awkward 3-word single-line breaks.',
        },
        {
          title: 'CSS Token Readiness',
          criteria: 'Tokens named systematically (--text-xs to --text-4xl) with paired line-heights.',
          benchmark: 'Line heights decrease as font size increases (Display 1.1x, Body 1.5x).',
        },
      ],
      commonPitfalls: [
        'Keeping 1.5 line height on massive 64px display headers, creating huge unnatural gaps.',
        'Picking arbitrary random sizes (e.g. 17px, 23px, 39px) instead of adhering to the modular scale formula.',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Study Le Corbusier’s Modulor and Robert Bringhurst’s "The Elements of Typographic Style" chapters on musical scale intervals.',
      step2_analogThumbnailing: 'Write out the geometric progression on paper using ratio 1.25: 16 -> 20 -> 25 -> 31.25 -> 39.06 -> 48.83.',
      step3_digitalExecution: 'Build an interactive Figma hierarchy component library with text styles configured for all 6 scale tokens.',
      step4_studioCritique: 'Apply scale to a real sample editorial article. Does the reader instantly know where to look first, second, and third?',
    },
    practiceGuide: {
      artboardSetup: 'Figma: 1440 x 900px Desktop Frame with an 8-column layout grid.',
      softwareWorkflow: [
        '1. Set Base Body = 16px, line-height = 24px (150%).',
        '2. Generate steps using scale formula: Base * (Ratio ^ n).',
        '3. Create text styles in Figma and test on 3 paragraph paragraphs with pull-quote.',
        '4. Document tokens into a style sheet.',
      ],
      keyShortcuts: ['Cmd/Ctrl + Alt/Option + T (Typography details in Figma)', 'Shift + 2 (Zoom to selection)'],
      deliverableSpec: 'Figma Typography Token Specimen with live body copy and CSS variable export.',
    },
    youtubeReferences: [
      {
        title: 'How to Choose Font Sizes & Use Modular Scales',
        channel: 'Flux Academy',
        description: 'Step-by-step tutorial on modular scales, line heights, and typography tokens in modern design.',
        url: 'https://www.youtube.com/results?search_query=flux+academy+modular+scale+typography',
        focusArea: 'Ratio Selection & Figma Text Styles',
      },
    ],
    graphicalExample: {
      type: 'modular-scale',
      caption: 'Modular Type Scale Ladder: Display (48px), H1 (39px), H2 (31px), H3 (25px), Body (16px), Caption (13px).',
      keyPrinciples: ['Mathematical ratio progression', 'Inverse line-height scaling', 'Token naming convention'],
    },
    trials: [
      {
        id: 't2-1',
        attemptNumber: 1,
        date: '2026-10-04',
        versionTitle: 'V1 - Modular Scale Prototype',
        score: 91,
        critiqueNotes: 'Clear hierarchy. Line height formula matches body measure accurately.',
        fileOrLink: 'figma.com/@atelier/modular-scale-v1',
        status: 'passed-critique',
      },
    ],
    checklistItems: [
      { id: 'c2-1', label: 'Select modular ratio (e.g. Major Third 1.250)', done: true },
      { id: 'c2-2', label: 'Calculate 6 scale steps (Display down to Caption)', done: true },
      { id: 'c2-3', label: 'Assign inverse line-heights (1.1 for Display, 1.5 for Body)', done: true },
      { id: 'c2-4', label: 'Create Figma Text Styles and export CSS token variables', done: true },
    ],
  },

  // 1.3 Color Harmonies & WCAG
  {
    id: 'm1-3',
    phaseId: 1,
    title: 'Color Systems, Luminance & WCAG Accessibility',
    category: 'Color Theory',
    shortDesc: 'Build accessible 60-30-10 palettes, calculate relative luminance, and enforce WCAG AA/AAA contrast ratios.',
    estimatedHours: 3.5,
    status: 'completed',
    completedAt: '2026-10-07T11:15:00Z',
    difficultyRating: 2,
    userNotes: 'Never use pure black #000000; deep tinted charcoal #121214 feels far more organic and high-end.',
    workCriteria: {
      bachelorStandard: 'Exemplifies mastery of color temperature, optical perception, and formal digital accessibility compliance (WCAG 2.1 AA/AAA 4.5:1 and 3:1).',
      simpleExplanation: 'Color should help people navigate, not confuse them. The 60-30-10 rule gives instant visual balance: 60% is your calm background color, 30% is your cards and content boxes, and 10% is your eye-catching button color. Contrast just means making sure light text is on a dark background (or dark text on light) so everyone can read it without eye strain.',
      simpleAnalogy: 'Think of an ice cream sundae: 60% vanilla ice cream base, 30% chocolate fudge sauce, and 10% bright red cherry on top that you notice immediately.',
      goldenRule: 'If someone has to squint in bright daylight to read your words, your colors are failing! Test that dark text is always on a clean light surface.',
      rubric: [
        {
          title: 'Contrast Ratio Compliance',
          criteria: 'All normal copy passes 4.5:1 minimum; large headers pass 3:1 minimum on all intended surfaces.',
          benchmark: 'Verified contrast scores clearly annotated with zero failing text pairings.',
        },
        {
          title: 'Color System Distribution',
          criteria: 'Implementation of the 60-30-10 distribution rule (60% background/neutral, 30% structural secondary, 10% focal accent).',
          benchmark: 'Accent color is reserved strictly for focal interactions, preventing visual noise.',
        },
        {
          title: 'Shade & Tint Consistency',
          criteria: 'Creation of 9-step tonal ramps (50 through 900) based on perceptual lightness (LCH or HSL).',
          benchmark: 'Smooth brightness transitions without dirty brown/muddy midtones.',
        },
      ],
      commonPitfalls: [
        'Relying solely on hue contrast (e.g. red text on green background) which is illegible for colorblind users.',
        'Using low contrast light-gray text on white backgrounds to achieve a "minimalist" look at the expense of usability.',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Study Josef Albers’ "Interaction of Color" — how neighboring colors dramatically alter human perception of brightness.',
      step2_analogThumbnailing: 'Paint or swatch 3 variations of a 60-30-10 palette using colored markers or swatches.',
      step3_digitalExecution: 'Build color ramps in Figma. Run contrast plugins (Stark or Contrast) to verify every foreground/background combination.',
      step4_studioCritique: 'Toggle display to greyscale mode. Does the interface still have sufficient contrast without any color at all?',
    },
    practiceGuide: {
      artboardSetup: 'Figma: 1200 x 800px Color System Artboard with light and dark mode side-by-side.',
      softwareWorkflow: [
        '1. Choose primary brand hue (e.g. Cobalt Blue #2563EB).',
        '2. Build neutral ramp (50 to 950) with subtle blue undertone.',
        '3. Test text contrast on white surface (#FFFFFF) and dark surface (#09090B).',
        '4. Document Hex, RGB, HSL, and Contrast Ratio.',
      ],
      keyShortcuts: ['I (Eyedropper tool in Figma/Illustrator)', 'Alt/Option + Drag (Duplicate swatch)'],
      deliverableSpec: 'Complete Color Tokens Document with documented WCAG AA ratios and UI mock test.',
    },
    youtubeReferences: [
      {
        title: 'Color Theory for Designers: The 60-30-10 Rule',
        channel: 'Satori Graphics',
        description: 'How to construct clean color palettes, avoid muddy tones, and balance visual weight.',
        url: 'https://www.youtube.com/results?search_query=satori+graphics+color+theory+60+30+10',
        focusArea: 'Visual Weight & Palette Balance',
      },
    ],
    graphicalExample: {
      type: 'color-contrast',
      caption: 'Relative Luminance Test: WCAG AA (4.5:1) vs AAA (7.0:1) with 60-30-10 surface distribution.',
      keyPrinciples: ['4.5:1 body contrast requirement', '60-30-10 distribution', 'Desaturated dark mode neutrals'],
    },
    trials: [
      {
        id: 't3-1',
        attemptNumber: 1,
        date: '2026-10-07',
        versionTitle: 'V1 - Final Accessible Color System',
        score: 95,
        critiqueNotes: 'Contrast ratios exceed 8.2:1 for body copy. Tonal ramps are perceptual and smooth.',
        fileOrLink: 'figma.com/@atelier/color-system-v1',
        status: 'passed-critique',
      },
    ],
    checklistItems: [
      { id: 'c3-1', label: 'Define 60% dominant neutral, 30% secondary, 10% accent', done: true },
      { id: 'c3-2', label: 'Generate 9-step tonal ramp (50 to 900)', done: true },
      { id: 'c3-3', label: 'Verify WCAG AA 4.5:1 on light and dark surfaces', done: true },
      { id: 'c3-4', label: 'Test palette in greyscale to ensure luminance distinction', done: true },
    ],
  },

  // 1.4 Gestalt & Swiss Grids
  {
    id: 'm1-4',
    phaseId: 1,
    title: 'Gestalt Composition & Swiss 12-Column Grids',
    category: 'Layout & Grid',
    shortDesc: 'Implement Gestalt laws (Proximity, Closure, Similarity, Figure-Ground) on rigorous Swiss multi-column grid layouts.',
    estimatedHours: 5.0,
    status: 'in-progress',
    startedAt: '2026-10-09T09:00:00Z',
    difficultyRating: 3,
    userNotes: 'Working on Figure-Ground with negative space silhouettes.',
    workCriteria: {
      bachelorStandard: 'Applies Swiss International Typographic Style principles (Müller-Brockmann) with strict mathematical alignment, asymmetric balance, and intentional negative space.',
      simpleExplanation: 'A grid is simply an invisible shelf system. It stops your design from looking like messy clutter dropped randomly on the floor. Gestalt rules simply say: group things that belong together (like event date and ticket price) close together, and leave clean empty space around them.',
      simpleAnalogy: 'Think of an organized closet with neat shelves and hangers versus clothes piled in a messy heap on the floor. The grid is the shelving that makes everything instant to find.',
      goldenRule: 'Whitespace is not empty waste—it is breathing room! Stop trying to fill every square inch of your screen.',
      rubric: [
        {
          title: 'Grid Architecture',
          criteria: 'Constructs an exact 12-column layout with mathematically calculated margins and gutters.',
          benchmark: 'Every single asset, block, and headline snaps cleanly to column boundaries.',
        },
        {
          title: 'Asymmetrical Balance',
          criteria: 'Balances heavy typography with intentional open negative space rather than centering everything.',
          benchmark: 'Layout has dynamic energy without feeling cluttered or unstable.',
        },
        {
          title: 'Gestalt Principles',
          criteria: 'Clear demonstration of Figure-Ground and Proximity to group related metadata.',
          benchmark: 'Related items share tight spatial proximity; unrelated items are separated by rhythm.',
        },
      ],
      commonPitfalls: [
        'Defaulting to center-aligned text blocks which destroys the strong vertical anchor of Swiss design.',
        'Using arbitrary gutter widths that do not follow 8px or 12px spatial rhythm.',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Study Josef Müller-Brockmann’s "Grid Systems in Graphic Design". Trace the 12-column structure of an iconic Zurich concert poster.',
      step2_analogThumbnailing: 'Draw four 12-column miniature wireframe layouts in your notebook with black ink pen.',
      step3_digitalExecution: 'Create an A2 format artboard in Figma or InDesign. Enable 12 columns (16px gutters, 32px margins). Compose poster.',
      step4_studioCritique: 'Turn off the grid guides. Does the composition feel structured even without the lines visible? That is Gestalt continuity.',
    },
    practiceGuide: {
      artboardSetup: 'Figma / Illustrator: 1200 x 1600px (or A2 420 x 594mm). 12 Columns, 20px Gutter, 40px Margins.',
      softwareWorkflow: [
        '1. Set up Layout Grid in Figma (12 Columns, Count: 12, Type: Stretch, Gutter: 20px).',
        '2. Place primary title across 8 columns; place metadata across 4 columns.',
        '3. Ensure micro-copy (date, location, tickets) uses Gestalt proximity.',
        '4. Export with and without visible construction grid lines.',
      ],
      keyShortcuts: ['Ctrl/Cmd + G (Toggle Layout Grid in Figma)', 'Option/Alt + Hover (Inspect distance in pixels)'],
      deliverableSpec: 'Two-sided Swiss concert poster PDF (Side A: Clean artwork; Side B: With visible grid construction lines).',
    },
    youtubeReferences: [
      {
        title: 'Swiss Style Graphic Design: How to Use Grid Systems',
        channel: 'Will Paterson',
        description: 'How to use Swiss grids, asymmetrical layouts, and negative space like a master.',
        url: 'https://www.youtube.com/results?search_query=will+paterson+swiss+grid+systems',
        focusArea: '12-Column Grid Alignment & Asymmetry',
      },
    ],
    graphicalExample: {
      type: 'swiss-grid',
      caption: '12-Column Swiss Modular Grid: 8-column primary content span paired with 4-column structured metadata block.',
      keyPrinciples: ['Asymmetric equilibrium', 'Strict vertical axis alignment', 'Negative space as active element'],
    },
    trials: [
      {
        id: 't4-1',
        attemptNumber: 1,
        date: '2026-10-09',
        versionTitle: 'V1 - Swiss Poster Layout Concept',
        score: 79,
        critiqueNotes: 'Title alignment was drifting 4px off the 3rd column margin. Fixed in review.',
        fileOrLink: 'figma.com/@atelier/swiss-poster-v1',
        status: 'needs-refinement',
      },
    ],
    checklistItems: [
      { id: 'c4-1', label: 'Configure 12-column grid with 20px gutter and 40px margin', done: true },
      { id: 'c4-2', label: 'Align all typographic headers to column edges', done: true },
      { id: 'c4-3', label: 'Apply Gestalt proximity to date/venue/ticket info', done: false },
      { id: 'c4-4', label: 'Create second artboard overlaying red construction guide lines', done: false },
    ],
  },

  // 2.1 Pen Tool Bootcamp
  {
    id: 'm2-1',
    phaseId: 2,
    title: 'The Pen Tool Bootcamp: Bezier Curves & Extrema Nodes',
    category: 'Vector & Pen Tool',
    shortDesc: 'Master Bezier mathematics: placing nodes strictly at curve extrema, 45/90 degree handles, and minimal anchor counts.',
    estimatedHours: 6.0,
    status: 'in-progress',
    startedAt: '2026-10-10T16:00:00Z',
    difficultyRating: 4,
    userNotes: 'Keep handles aligned to 45° or 90° whenever possible for smooth curvature.',
    workCriteria: {
      bachelorStandard: 'Vectors must be production-clean: anchors strictly located at extrema (highest, lowest, leftmost, rightmost coordinates), zero rogue overlapping nodes, and symmetrical handle tensions.',
      simpleExplanation: 'The Pen Tool is not a crayon; it works like bending a flexible wire! Beginners click 40 times to make a circle, which creates bumpy ugly curves. The master secret is: click only at the highest, lowest, left, and right points of the curve, and pull the little handlebars to bend the line smoothly.',
      simpleAnalogy: 'Think of bending a smooth coat hanger wire around 4 sturdy pegs instead of trying to bend it around 40 tiny thumbtacks. Fewer dots = a smoother curve!',
      goldenRule: 'Less is more! If your curve looks jagged or bumpy, you have too many dots. Delete extra points until the curve flows.',
      rubric: [
        {
          title: 'Anchor Node Economy',
          criteria: 'Uses the absolute minimum number of nodes required to construct the curve.',
          benchmark: 'Tracing an organic letterform with 30% fewer nodes than auto-trace tools.',
        },
        {
          title: 'Extrema Placement',
          criteria: 'All curve turning points have anchors placed at exact 0°, 90°, 180°, or 270° angles.',
          benchmark: 'Zero tilted handles on smooth circular or oval arcs.',
        },
        {
          title: 'Handle Angle Hygiene',
          criteria: 'Tangent handles pulled with Shift key pressed to constrain to 0/45/90 degrees.',
          benchmark: 'Silky smooth Bezier interpolation without inflection kinks or bumps.',
        },
      ],
      commonPitfalls: [
        'Adding an anchor node in the middle of a smooth curve instead of at the extrema.',
        'Dragging handles out to extreme lengths causing overlapping loops and rasterization glitches.',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Study how mathematical Bezier cubic equations work. Play "The Bézier Game" online until achieving silver/gold medals.',
      step2_analogThumbnailing: 'Mark anchor nodes on paper over a printout of an italic letter "g" using a red pen.',
      step3_digitalExecution: 'Open Illustrator or Figma. Trace 5 complex glyphs (e.g., italic f, ampersand &, treble clef). Press Shift to lock handle angles.',
      step4_studioCritique: 'Press Cmd/Ctrl + Y to inspect outline mode. Zoom in to 1600%. Look for accidental double nodes or crossed paths.',
    },
    practiceGuide: {
      artboardSetup: 'Illustrator / Figma: 1000 x 1000px artboard with 0.5px stroke weight in high-contrast cyan.',
      softwareWorkflow: [
        '1. Place reference image on background layer and lock it (50% opacity).',
        '2. Use Pen Tool (P). Click and drag at top extrema, right extrema, bottom extrema, left extrema.',
        '3. Use Convert Anchor Point (Shift + C) to adjust handle balance.',
        '4. Remove unnecessary nodes with Delete Anchor Point tool (-).',
      ],
      keyShortcuts: ['P (Pen tool)', 'A (Direct Selection tool)', 'Shift + C (Anchor Point tool)', 'Cmd/Ctrl + Y (Outline mode toggle)'],
      deliverableSpec: 'SVG file containing 5 clean vector silhouettes with node coordinates inspected in code view.',
    },
    youtubeReferences: [
      {
        title: 'Mastering the Pen Tool in Adobe Illustrator / Figma',
        channel: 'Dansky',
        description: 'Comprehensive walkthrough of handle geometry, corner points, smooth nodes, and extrema.',
        url: 'https://www.youtube.com/results?search_query=dansky+pen+tool+masterclass',
        focusArea: 'Handle Balancing & Shift-Constraint',
      },
      {
        title: 'Pen Tool Secrets Professional Vector Artists Use',
        channel: 'Satori Graphics',
        description: 'How to place anchors at extrema to get silky smooth curves every single time.',
        url: 'https://www.youtube.com/results?search_query=satori+graphics+pen+tool+extrema',
        focusArea: 'Extrema Anchor Points',
      },
    ],
    graphicalExample: {
      type: 'bezier-curves',
      caption: 'Bezier Curve Anatomy: Extrema anchor node placement with horizontal/vertical control handles.',
      keyPrinciples: ['Nodes placed at extrema', 'Shift-constrained 90° handles', 'Minimal anchor node count'],
    },
    trials: [
      {
        id: 't5-1',
        attemptNumber: 1,
        date: '2026-10-10',
        versionTitle: 'V1 - Ampersand Curve Tracing',
        score: 82,
        critiqueNotes: 'Inner loop had 3 redundant nodes. Curve looked bumpy at high zoom.',
        fileOrLink: 'figma.com/@atelier/ampersand-v1',
        status: 'needs-refinement',
      },
    ],
    checklistItems: [
      { id: 'c5-1', label: 'Complete 10 levels of The Bézier Game', done: true },
      { id: 'c5-2', label: 'Trace ampersand (&) using only extrema anchors', done: true },
      { id: 'c5-3', label: 'Check outline view (Cmd + Y) for duplicate overlapping nodes', done: false },
      { id: 'c5-4', label: 'Verify SVG export code has clean minimal path commands', done: false },
    ],
  },

  // 2.2 Iconography System
  {
    id: 'm2-2',
    phaseId: 2,
    title: 'Consistent 24px Iconography System',
    category: 'Vector & Pen Tool',
    shortDesc: 'Design a unified 12-icon set on a 24x24px grid with 2px optical padding and strict corner radii.',
    estimatedHours: 5.5,
    status: 'not-started',
    difficultyRating: 4,
    workCriteria: {
      bachelorStandard: 'Designs an industrially scalable iconography system. All icons share identical optical weight, stroke width (2px), corner rounding (2px), and bounding-box padding.',
      simpleExplanation: 'Icons are tiny signs. If one icon has fat thick lines and another has hairline thin lines, your design looks broken. In this exercise, you make all 12 icons use the exact same 2px line thickness and keep 2px of empty margin around the frame so no lines get chopped off.',
      simpleAnalogy: 'Think of a family wearing matching uniforms. Every icon must look like it belongs to the same team—same line thickness, same rounded corners.',
      goldenRule: 'Always leave 2px of breathing space around the edges of the 24px box! Never let icons touch the outer frame.',
      rubric: [
        {
          title: 'Optical Weight Balancing',
          criteria: 'Dense shapes (like solid stars or circles) are compensated optically against light open shapes (like search icons).',
          benchmark: 'No single icon in the 12-piece suite appears visibly heavier or lighter.',
        },
        {
          title: 'Pixel Snapping',
          criteria: 'All straight lines and vertices snapped to whole pixel coordinates on the 24px grid.',
          benchmark: 'Zero half-pixel anti-aliasing blur when viewed at 100% 24px render scale.',
        },
        {
          title: 'Live Stroke vs Outlined Asset',
          criteria: 'Delivered as both live stroke components (for designer editing) and clean united fills (for SVG production).',
          benchmark: 'Zero non-expanded strokes in final production SVG code.',
        },
      ],
      commonPitfalls: [
        'Filling the full 24x24px box with a square shape while making a circular icon 20px, causing the square to look massive.',
        'Using inconsistent corner radii (e.g. 1px on one icon and 3px on another).',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Audit Lucide Icons or Feather Icons. Measure their 2px padding safe zone and stroke consistency.',
      step2_analogThumbnailing: 'Sketch 12 icons in a 24x24 grid notebook, focusing on recognizable metaphors.',
      step3_digitalExecution: 'Create 24x24px frames with a 20x20px internal live area and keyline guides (circle, square, horizontal rectangle).',
      step4_studioCritique: 'Line up all 12 icons at 24px and at 16px. Do they remain crisp and readable at micro-sizes?',
    },
    practiceGuide: {
      artboardSetup: 'Figma: 12 frames of 24 x 24px with a 2px red guide padding border.',
      softwareWorkflow: [
        '1. Set grid snap to 1px.',
        '2. Use 2px center/inside stroke with round cap and round join.',
        '3. Use Boolean Union to merge intersecting vector shapes.',
        '4. Export as clean SVG with currentColor fill.',
      ],
      keyShortcuts: ['R (Rectangle)', 'O (Ellipse)', 'Shift + X (Swap fill and stroke)'],
      deliverableSpec: '12-piece vector icon suite SVG package + 1 specimen presentation board.',
    },
    youtubeReferences: [
      {
        title: 'How to Design an Icon System in Figma',
        channel: 'Mizko',
        description: 'Master class on 24px keylines, optical weight, stroke scaling, and icon component sets.',
        url: 'https://www.youtube.com/results?search_query=mizko+design+icon+system+figma',
        focusArea: 'Keylines & Optical Volume',
      },
    ],
    graphicalExample: {
      type: 'icon-grid',
      caption: '24px Icon Construction Grid: 2px safe zone padding, keyline circle and rectangle guides.',
      keyPrinciples: ['20px live area with 2px padding', 'Strict 2px stroke weight', 'Consistent corner radius'],
    },
    trials: [],
    checklistItems: [
      { id: 'c6-1', label: 'Create 24x24 frame with 2px padding safe zone', done: false },
      { id: 'c6-2', label: 'Design 12 core icons (Home, Search, Bell, User, Settings, etc.)', done: false },
      { id: 'c6-3', label: 'Ensure all strokes are exactly 2px with rounded caps', done: false },
      { id: 'c6-4', label: 'Test at 16px, 24px, and 48px to verify optical sharpness', done: false },
    ],
  },

  // 5.1 UI/UX Component System
  {
    id: 'm5-1',
    phaseId: 5,
    title: 'Atomic UI Design System & Component States',
    category: 'UI/UX & Design Systems',
    shortDesc: 'Build accessible, auto-layout UI components with complete interactive states (Default, Hover, Active, Focused, Disabled).',
    estimatedHours: 6.5,
    status: 'not-started',
    difficultyRating: 3,
    workCriteria: {
      bachelorStandard: 'Constructs production-grade Figma auto-layout components following atomic design hierarchy. All interactive elements include accessible focus indicators and clear state feedback.',
      simpleExplanation: 'A button is not just a colored rectangle with text. When a user taps or clicks it, the button must react! It has 4 states: Normal (waiting), Hover (finger/mouse over it), Pressed (clicked), and Disabled (grayed out until you fill in the form). Auto-layout means the button automatically grows wider if you type a longer word inside it.',
      simpleAnalogy: 'Think of an elevator button. It is plain at rest, lights up brightly when your finger presses it, and stays lit so you know the elevator is coming. Digital buttons must give that same instant feedback.',
      goldenRule: 'Buttons must always change color when pressed so users know their tap worked!',
      rubric: [
        {
          title: 'Component State Completeness',
          criteria: 'Buttons, inputs, and toggles built with Default, Hover, Focused, Pressed/Active, and Disabled states.',
          benchmark: 'Focus ring meets 3:1 contrast against surrounding background.',
        },
        {
          title: 'Auto Layout Rigor',
          criteria: 'Padding and spacing adhere strictly to the 4px/8px spatial grid.',
          benchmark: 'Zero fixed-width buttons; component stretches and adapts to varying label lengths.',
        },
        {
          title: 'Variants & Component Properties',
          criteria: 'Utilizes Figma Component Properties (boolean, text, instance swap) cleanly.',
          benchmark: 'Clean component inspector panel with zero redundant duplicate components.',
        },
      ],
      commonPitfalls: [
        'Forgetting the keyboard focus-visible ring, which violates accessibility standards for disabled users.',
        'Hardcoding fixed dimensions instead of using responsive auto-layout padding.',
      ],
    },
    interactionProtocol: {
      step1_theoryDeconstruct: 'Audit Brad Frost’s Atomic Design methodology (Atoms -> Molecules -> Organisms).',
      step2_analogThumbnailing: 'Wireframe button hierarchy (Primary, Secondary, Tertiary, Destructive) on paper.',
      step3_digitalExecution: 'Create atomic button set in Figma using Auto Layout (Shift + A). Configure hover and focus variants.',
      step4_studioCritique: 'Test with very long strings ("Confirm and Proceed to Checkout"). Does the button stretch gracefully?',
    },
    practiceGuide: {
      artboardSetup: 'Figma: Component Sheet artboard 1440 x 1024px with dark and light theme comparison.',
      softwareWorkflow: [
        '1. Create text layer: "Button Action" (14px SemiBold).',
        '2. Press Shift + A to wrap in Auto Layout. Set padding: 10px vertical, 20px horizontal.',
        '3. Create Component (Cmd/Ctrl + Alt/Option + K).',
        '4. Add Component Variants for Hover, Focus (2px blue ring), Pressed, and Disabled.',
      ],
      keyShortcuts: ['Shift + A (Create Auto Layout)', 'Cmd/Ctrl + Alt/Option + K (Create Component)', 'Cmd/Ctrl + D (Duplicate)'],
      deliverableSpec: 'Figma Component Library featuring Primary/Secondary Buttons, Input Field, and Toggle Switch in all 5 states.',
    },
    youtubeReferences: [
      {
        title: 'Figma Auto Layout & Component Variants Masterclass',
        channel: 'Femke Design',
        description: 'Complete guide to building scalable UI design systems with auto-layout padding and variants.',
        url: 'https://www.youtube.com/results?search_query=femke+design+auto+layout+figma',
        focusArea: 'Auto Layout & State Variants',
      },
    ],
    graphicalExample: {
      type: 'ui-components',
      caption: 'Atomic UI Component System: Default, Hover, Focus Ring, and Disabled states with 8px spatial rhythm.',
      keyPrinciples: ['Focus ring contrast (3:1)', '8px padding increments', 'Auto layout responsive text wrapping'],
    },
    trials: [],
    checklistItems: [
      { id: 'c7-1', label: 'Build primary button atom with auto layout (Shift + A)', done: false },
      { id: 'c7-2', label: 'Create 5 distinct state variants (Default, Hover, Active, Focus, Disabled)', done: false },
      { id: 'c7-3', label: 'Test with 2px high-contrast keyboard focus indicator', done: false },
      { id: 'c7-4', label: 'Publish to local Figma asset library', done: false },
    ],
  },
];

export const DEFAULT_SESSIONS: LearningSession[] = [
  {
    id: 's-1',
    date: '2026-10-01',
    durationHours: 2.0,
    topic: 'Anatomy of Typography & Font Pairing',
    category: 'Typography',
    toolsUsed: ['Figma', 'Laptop Notes'],
    takeaway: 'Ascenders and descenders dictate how much leading (line height) a body text block needs.',
    rating: 5,
    milestoneId: 'm1-1',
    createdAt: '2026-10-01T15:00:00Z',
  },
  {
    id: 's-2',
    date: '2026-10-02',
    durationHours: 2.5,
    topic: 'Optical Kerning & Type Specimen Callouts',
    category: 'Typography',
    toolsUsed: ['Figma', 'Illustrator'],
    takeaway: 'Looking at negative space between letter pairs is 10x more accurate than measuring mechanical distance.',
    rating: 5,
    milestoneId: 'm1-1',
    createdAt: '2026-10-02T16:30:00Z',
  },
  {
    id: 's-3',
    date: '2026-10-04',
    durationHours: 2.0,
    topic: 'Modular Type Scale Formula & Mathematical Ratio',
    category: 'Typography',
    toolsUsed: ['Figma', 'type-scale.com'],
    takeaway: 'A ratio of 1.250 (Major Third) provides the most balanced jump between H3, H2, and H1 for screens.',
    rating: 5,
    milestoneId: 'm1-2',
    createdAt: '2026-10-04T18:15:00Z',
  },
  {
    id: 's-4',
    date: '2026-10-07',
    durationHours: 2.2,
    topic: 'WCAG 2.1 Contrast Scoring & 60-30-10 Rule',
    category: 'Color Theory',
    toolsUsed: ['Coolors', 'Figma Stark Plugin'],
    takeaway: '60% dominant neutral background, 30% structural secondary, 10% intense focal accent creates visual calm.',
    rating: 4,
    milestoneId: 'm1-3',
    createdAt: '2026-10-07T14:00:00Z',
  },
  {
    id: 's-5',
    date: '2026-10-09',
    durationHours: 2.5,
    topic: 'Swiss 12-Column Grid Alignment & Asymmetry',
    category: 'Layout & Grid',
    toolsUsed: ['Figma', 'Müller-Brockmann Reference'],
    takeaway: 'Asymmetric grid balance gives editorial work serious maturity compared to default centered copy.',
    rating: 4,
    milestoneId: 'm1-4',
    createdAt: '2026-10-09T18:00:00Z',
  },
  {
    id: 's-6',
    date: '2026-10-10',
    durationHours: 2.8,
    topic: 'Bezier Handles at Extrema & The Bézier Game',
    category: 'Vector & Pen Tool',
    toolsUsed: ['The Bézier Game', 'Illustrator'],
    takeaway: 'Press Shift to lock handles to 90 degrees. Never place nodes on diagonal arc inflection points.',
    rating: 4,
    milestoneId: 'm2-1',
    createdAt: '2026-10-10T19:30:00Z',
  },
];

export const DEFAULT_BRIEFS: PracticeBrief[] = [
  {
    id: 'b-1',
    title: 'Nordic Roast: Specialty Cold Brew Identity',
    category: 'Brand Identity',
    client: 'Nordic Roast Co. (Copenhagen)',
    description: 'A boutique roastery known for small-batch single-origin cold brews wants a minimalist visual identity that captures arctic purity and warm roast craftsmanship.',
    deliverables: ['Primary Logo mark', 'Can label packaging wrap (250ml)', 'Instagram launch carousel (1080x1350)'],
    constraints: ['Palette limited to maximum 3 colors', 'Must include subtle geometric mountain/wave iconography', 'No generic coffee bean clip art'],
    suggestedColors: ['#1E293B', '#E2E8F0', '#C27803'],
    difficulty: 'Intermediate',
    status: 'in-progress',
    notes: 'Starting with a clean monoline wordmark with custom R ligature.',
  },
  {
    id: 'b-2',
    title: 'Komorebi Architecture Triennial Poster',
    category: 'Editorial & Print',
    client: 'Kyoto Design Pavilion',
    description: 'An international architecture exhibition exploring light filtering through wooden lattices and modern sustainable timber construction.',
    deliverables: ['A2 Exhibition Poster (420 x 594 mm)', 'Social banner (1200 x 628 px)'],
    constraints: ['Must use a strict Swiss 12-column grid system', 'Only 1 font family permitted (varied weights only)', 'Use high negative space ratio (at least 45% white space)'],
    suggestedColors: ['#0A0A0C', '#FAFAFA', '#D97706'],
    difficulty: 'Intermediate',
    status: 'unstarted',
  },
  {
    id: 'b-3',
    title: 'Pulse: Micro-Habits Mobile App Icon System',
    category: 'Vector & Pen Tool',
    client: 'Pulse Labs',
    description: 'A minimalist wellness app tracking micro-habits like hydration, deep breathing, posture, and deep focus.',
    deliverables: ['App Store App Icon (1024x1024)', 'Set of 6 navigation icons (24x24 px grid)'],
    constraints: ['Pixel-snapped to 24px grid', 'Consistent 2px line weight with 2px corner radii', 'Tested against dark and light home screen wallpapers'],
    suggestedColors: ['#0F172A', '#38BDF8', '#10B981'],
    difficulty: 'Beginner',
    status: 'unstarted',
  },
];

export const CLIENT_COACHING_MODULES: ClientCoachModule[] = [
  {
    id: 'client-1',
    phase: 'Phase 1: Discovery, Intake & Qualifying',
    title: 'The Diagnostic Discovery Call Framework',
    summary: 'Never jump into visuals immediately. Position yourself as a strategic consultant diagnosing a business problem rather than an order-taker with software.',
    keyQuestionsToAsk: [
      '"What specific business outcome needs to change because of this redesign?" (Revenue, user trust, market repositioning?)',
      '"Who is the exact user or customer you are targeting, and what frustrates them right now?"',
      '"What happens if you do nothing and keep your current visual branding for the next 12 months?"',
      '"What does an unmitigated home-run success look like 6 months after launch?"',
      '"Who has the final sign-off authority on visual direction for this project?"',
    ],
    thingsToFocusOn: [
      'Focus 80% of the conversation on their customers and revenue, not fonts and hex codes.',
      'Take detailed notes in their exact vocabulary so you can mirror their words in your proposal.',
      'Qualify budget and timeline early: "Projects of this scope typically range between $3,000–$5,000. Does that align with your expectations?"',
    ],
    whatToAvoid: [
      'Avoid asking "What kind of colors or logo do you like?" — clients are not art directors; you are.',
      'Avoid giving immediate on-the-spot price quotes during the call.',
      'Never skip asking who the final decision-maker is. If the CEO isn’t in the room, work will get rejected later.',
    ],
    psychologicalInsight: 'Clients value clarity over talent. When you ask deep diagnostic business questions, they perceive you as a high-value strategic partner rather than a low-cost commodity freelancer.',
    scriptTemplate: 'Hi [Client Name],\n\nThanks for reaching out! Before we open Figma or discuss visual aesthetics, my process starts with a 30-minute Diagnostic Discovery session. Our goal is to uncover your exact business objectives, user bottlenecks, and market positioning so the design work drives tangible ROI for you.\n\nHere is my calendar link to pick a slot: [Link]. Looking forward to speaking!',
  },
  {
    id: 'client-2',
    phase: 'Phase 2: Scoping, Proposals & Pricing Defense',
    title: 'Value-Based Pricing & Ironclad Scope Defense',
    summary: 'Charge for the value of the outcome, not the hours spent dragging Bezier curves on a laptop. Protect your sanity with strict revision boundaries.',
    keyQuestionsToAsk: [
      '"Are there any hard launch deadlines tied to marketing events, investor pitches, or trade shows?"',
      '"What existing brand collateral, guidelines, or copy do we currently have access to?"',
      '"Is copywriting, stock photography licensing, or font licensing included in your budget?"',
    ],
    thingsToFocusOn: [
      'Always enforce the 50% upfront deposit rule before putting pen to tablet or opening software.',
      'Specify exactly 2 structured rounds of revisions in the contract. Additional rounds billed at $95/hr.',
      'Present 3 tiered options in your proposal (e.g., Option 1: Core Essentials; Option 2: Full System [Recommended]; Option 3: System + Collateral + Launch Kit).',
    ],
    whatToAvoid: [
      'Never send a 1-sentence price email. Always send a polished PDF proposal detailing the Problem, Solution, Scope, and Timeline.',
      'Never start project work without a signed contract and cleared deposit.',
      'Never accept open-ended "unlimited revisions" — it guarantees endless scope creep and burnout.',
    ],
    psychologicalInsight: 'Giving clients 3 options shifts their mental psychology from "Should I hire this designer or not?" to "Which tier fits our company best?"',
    scriptTemplate: 'Proposal Overview:\n\n1. Project Scope & Deliverables: [List exact deliverables]\n2. Investment: Option A ($X), Option B ($Y - Recommended), Option C ($Z)\n3. Payment Terms: 50% upon project kickoff, 50% prior to final asset package delivery.\n4. Revision Protocol: 2 consolidated rounds of feedback included. Additional rounds billed at $X/hr.',
  },
  {
    id: 'client-3',
    phase: 'Phase 3: Presentation & Defending Design Decisions',
    title: 'The "One Concept" Method & Decision Framing',
    summary: 'Never email mockups as flat attachments saying "What do you think?". Present live, tell the story of the user, and anchor every visual choice in their business goal.',
    keyQuestionsToAsk: [
      '"Does this layout achieve the primary goal of establishing trust with high-income buyers we established in week 1?"',
      '"Looking through the eyes of your customer: what questions does this leave unanswered?"',
    ],
    thingsToFocusOn: [
      'Present in context: Show logos on realistic packaging, laptop mockups, and mobile screens — never on a blank white canvas.',
      'Anchor every choice: "We chose this bold sans-serif not because it looks cool, but because your mobile analytics showed 78% of your readers view this on small smartphone viewports."',
      'Request consolidated written feedback from all stakeholders in a single document.',
    ],
    whatToAvoid: [
      'Never ask "Do you like it?". "Like" invites subjective personal preference (their spouse’s favorite color). Ask: "Does this fulfill the brief?".',
      'Never get defensive when given feedback. Say: "That’s interesting insight. Let’s look at how that impacts the customer’s journey."',
    ],
    psychologicalInsight: 'When you explain the *why* behind your design choices before they ask, you disarm subjective critiques and establish absolute creative authority.',
    scriptTemplate: 'Presentation Deck Structure:\n1. Recap the agreed brief and business objective.\n2. Review customer persona and competitive landscape.\n3. Present the design solution in realistic mockups.\n4. Walk through visual rationale (Typography, Color, Layout).\n5. Conclude: "Does this solution solve the business problem we identified in Phase 1?"',
  },
  {
    id: 'client-4',
    phase: 'Phase 4: Feedback Loops & Handling Revisions',
    title: 'Constructive Disagreement & De-escalation',
    summary: 'Clients will suggest bad design ideas (e.g. "Make the logo twice as big" or "Add a rainbow gradient"). Learn how to redirect bad ideas without alienating the client.',
    keyQuestionsToAsk: [
      '"What concern is prompting this change? Are you worried users won’t notice the brand, or is there another concern?"',
      '"If we make this element larger, it will push the primary Buy button below the fold on mobile. Is that a trade-off you’d like to make?"',
    ],
    thingsToFocusOn: [
      'Uncover the root problem behind the bad request. "Make the logo bigger" usually means "I feel my brand doesn’t feel prominent enough".',
      'Provide visual evidence: Show their suggestion side-by-side with your recommendation and let them see the contrast.',
      'Always respond with empathy and professional calm: "I understand where you are coming from..."',
    ],
    whatToAvoid: [
      'Never argue emotional opinions ("That looks ugly"). Argue user behavior and readability data.',
      'Never accept scattered feedback across 5 WhatsApp messages, 3 emails, and a phone call. Force a consolidated feedback sheet.',
    ],
    psychologicalInsight: 'Clients meddle when they feel out of control. By showing you understand their underlying anxiety, you regain their trust.',
    scriptTemplate: 'Dear [Client Name],\n\nThank you for the notes! Regarding making the header mark larger: if we increase the size by 50%, our testing shows it pushes the primary "Book Consultation" button below the laptop fold on 13-inch screens, which will directly reduce inquiry conversions.\n\nHere is an alternative: we can increase negative contrast around the mark so it commands greater visual presence without sacrificing the conversion CTA. Take a look at the attached comparison and let me know your thoughts!',
  },
  {
    id: 'client-5',
    phase: 'Phase 5: Asset Handoff & Retainer Retention',
    title: 'The Professional Delivery Kit & Retainer Conversion',
    summary: 'The project doesn’t end when the final invoice is paid. Turn one-off design clients into recurring monthly retainer contracts and steady referral engines.',
    keyQuestionsToAsk: [
      '"Now that your core identity is finished, what upcoming marketing campaigns or product launches do you have planned for next quarter?"',
      '"Would it be helpful for me to reserve 10 hours a month to handle all your ongoing social templates and presentation decks?"',
    ],
    thingsToFocusOn: [
      'Organize your asset zip folder impeccably: 01_Logos (SVG, EPS, PNG, Light/Dark), 02_Typography, 03_Colors, 04_Guidelines, 05_Mockups.',
      'Include a 1-page "Quick Start Cheat Sheet" for their non-designer staff.',
      'Schedule a 30-day post-launch check-in call to ask about initial performance and request a LinkedIn recommendation.',
    ],
    whatToAvoid: [
      'Never deliver assets named "final_v2_final_REALLY_FINAL.png". Use "AcmeCorp-Logo-Primary-FullColor.svg".',
      'Never disappear after delivery. The easiest client to get is the one you already have.',
    ],
    psychologicalInsight: 'Clients hate finding new designers. If you make working with you effortless, professional, and organized, they will happily pay a monthly retainer to keep you on call.',
    scriptTemplate: 'Hi [Client Name],\n\nCongratulations on the launch of the new identity! Your final production assets have been archived in this organized Google Drive / Zip folder: [Link].\n\nI also prepared a 1-page Brand Quick Start Guide so your team knows exactly which file to use for print vs web.\n\nI’d love to check in with you in 30 days to see how your audience responds. Would you be open to a quick 15-minute sync next month?',
  },
];

export const DEFAULT_SETTINGS: UserSettings = {
  userName: 'Creative Explorer',
  weeklyGoalHours: 10,
  themeMode: 'system',
  primaryLaptopTool: 'Figma & Photopea',
  targetPortfolioPieces: 4,
  learningMode: 'diploma',
};

export const DESIGN_QUOTES = [
  {
    quote: "Simplicity is not the lack of clutter, that's a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and what it is.",
    author: "Jonathan Ive",
  },
  {
    quote: "Whitespace is to be regarded as an active element, not a passive background.",
    author: "Jan Tschichold",
  },
  {
    quote: "Good design is making something intelligible and memorable. Great design is making something memorable and meaningful.",
    author: "Dieter Rams",
  },
  {
    quote: "Design is thinking made visual.",
    author: "Saul Bass",
  },
  {
    quote: "Typography is what language looks like.",
    author: "Ellen Lupton",
  },
  {
    quote: "The details are not the details. They make the design.",
    author: "Charles Eames",
  },
];

export const LAPTOP_SHORTCUTS = [
  {
    software: 'Figma (Essential Laptop Shortcuts)',
    items: [
      { key: 'V / P', action: 'Move tool / Pen tool' },
      { key: 'R / O / T', action: 'Rectangle / Ellipse / Text tool' },
      { key: 'Option / Alt + Drag', action: 'Duplicate selection' },
      { key: 'Cmd / Ctrl + G', action: 'Group selection' },
      { key: 'Shift + A', action: 'Auto Layout (fundamental layout tool)' },
      { key: 'Option / Alt + Hover', action: 'Measure distance between elements in pixels' },
      { key: 'Cmd / Ctrl + /', action: 'Search menu and plugins' },
      { key: 'Shift + R', action: 'Toggle Rulers & Guides' },
    ],
  },
  {
    software: 'Adobe Illustrator & Inkscape (Vector Curves)',
    items: [
      { key: 'P / A', action: 'Pen tool / Direct Selection tool' },
      { key: 'Shift + C', action: 'Anchor Point Convert tool' },
      { key: 'Shift + M', action: 'Shape Builder tool' },
      { key: 'Cmd / Ctrl + Y', action: 'Toggle Outline mode (inspect nodes)' },
      { key: 'Cmd / Ctrl + 8', action: 'Make Compound Path' },
      { key: 'Cmd / Ctrl + Shift + O', action: 'Outline Stroke / Convert Font to Outlines' },
    ],
  },
  {
    software: 'Photoshop & Photopea (Laptop Mockups & Retouching)',
    items: [
      { key: 'Cmd / Ctrl + J', action: 'Duplicate layer' },
      { key: 'Cmd / Ctrl + T', action: 'Free Transform' },
      { key: 'B / E', action: 'Brush / Eraser tool' },
      { key: 'Option / Alt + Click between layers', action: 'Create Clipping Mask' },
      { key: 'Cmd / Ctrl + Shift + Alt + E', action: 'Stamp visible layers onto a new layer' },
      { key: 'Z + Scrub', action: 'Smooth Zoom' },
    ],
  },
];
