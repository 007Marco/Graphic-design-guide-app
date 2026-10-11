export type MilestoneStatus = 'not-started' | 'in-progress' | 'completed';

export type DesignCategory =
  | 'Typography'
  | 'Color Theory'
  | 'Layout & Grid'
  | 'Vector & Pen Tool'
  | 'Brand Identity'
  | 'Editorial & Print'
  | 'UI/UX & Design Systems'
  | 'Portfolio & Delivery';

export interface RubricPoint {
  title: string;
  criteria: string;
  benchmark: string; // What university examiners look for
}

export interface WorkCriteria {
  bachelorStandard: string;
  simpleExplanation?: string; // Plain-English explanation for diploma students
  simpleAnalogy?: string; // Everyday analogy (e.g., ceiling height, parking spaces)
  goldenRule?: string; // The 1 non-negotiable rule
  rubric: RubricPoint[];
  commonPitfalls: string[];
}

export interface StudyInteractionProtocol {
  step1_theoryDeconstruct: string;
  step2_analogThumbnailing: string;
  step3_digitalExecution: string;
  step4_studioCritique: string;
}

export interface PracticeGuide {
  artboardSetup: string;
  softwareWorkflow: string[];
  keyShortcuts: string[];
  deliverableSpec: string;
}

export interface YouTubeReference {
  title: string;
  channel: string;
  description: string;
  url: string;
  focusArea: string;
}

export type GraphicalExampleType =
  | 'typography-anatomy'
  | 'modular-scale'
  | 'swiss-grid'
  | 'bezier-curves'
  | 'color-contrast'
  | 'icon-grid'
  | 'ui-components'
  | 'brand-tokens'
  | 'responsive-layout';

export interface GraphicalExample {
  type: GraphicalExampleType;
  caption: string;
  keyPrinciples: string[];
}

export interface TrialAttempt {
  id: string;
  attemptNumber: number;
  date: string;
  versionTitle: string;
  score: number; // 0 - 100
  critiqueNotes: string;
  fileOrLink: string;
  status: 'needs-refinement' | 'passed-critique' | 'portfolio-ready';
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Milestone {
  id: string;
  phaseId: number;
  title: string;
  category: DesignCategory;
  shortDesc: string;
  estimatedHours: number;
  status: MilestoneStatus;
  completedAt?: string;
  startedAt?: string;
  userNotes?: string;
  difficultyRating?: number;
  workCriteria: WorkCriteria;
  interactionProtocol: StudyInteractionProtocol;
  practiceGuide: PracticeGuide;
  youtubeReferences: YouTubeReference[];
  graphicalExample: GraphicalExample;
  trials: TrialAttempt[];
  checklistItems: ChecklistItem[];
  isCustom?: boolean;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
}

export interface LearningSession {
  id: string;
  date: string;
  durationHours: number;
  topic: string;
  category: DesignCategory;
  toolsUsed: string[];
  takeaway: string;
  rating: number;
  milestoneId?: string;
  createdAt: string;
}

export interface PracticeBrief {
  id: string;
  title: string;
  category: DesignCategory;
  client: string;
  description: string;
  deliverables: string[];
  constraints: string[];
  suggestedColors: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'unstarted' | 'in-progress' | 'completed';
  completedAt?: string;
  notes?: string;
}

export interface ClientCoachModule {
  id: string;
  title: string;
  phase: string;
  summary: string;
  keyQuestionsToAsk: string[];
  thingsToFocusOn: string[];
  whatToAvoid: string[];
  psychologicalInsight: string;
  scriptTemplate: string;
}

export interface UserSettings {
  userName: string;
  weeklyGoalHours: number;
  themeMode: 'dark' | 'light' | 'system';
  primaryLaptopTool: string;
  targetPortfolioPieces: number;
  learningMode: 'diploma' | 'bachelor';
}

export interface AppState {
  version: number;
  settings: UserSettings;
  milestones: Milestone[];
  sessions: LearningSession[];
  briefs: PracticeBrief[];
  lastBackupDate?: string;
}
