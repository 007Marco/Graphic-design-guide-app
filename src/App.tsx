import React, { useState } from 'react';
import { DesignProvider, useDesign } from './context/DesignContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/views/DashboardView';
import { RoadmapView } from './components/views/RoadmapView';
import { ClientCoachingView } from './components/views/ClientCoachingView';
import { JournalView } from './components/views/JournalView';
import { BriefGeneratorView } from './components/views/BriefGeneratorView';
import { SandboxView } from './components/views/SandboxView';
import { BackupView } from './components/views/BackupView';
import { LogSessionModal } from './components/modals/LogSessionModal';
import { SubtopicMiniPage } from './components/modals/SubtopicMiniPage';
import { CustomMilestoneModal } from './components/modals/CustomMilestoneModal';
import { PhoneAccessModal } from './components/modals/PhoneAccessModal';
import { Confetti } from './components/Confetti';
import { Milestone } from './types';

const MainAppContent: React.FC = () => {
  const { activeTab } = useDesign();

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isMiniPageOpen, setIsMiniPageOpen] = useState(false);
  const [isCustomMilestoneOpen, setIsCustomMilestoneOpen] = useState(false);
  const [customPhaseId, setCustomPhaseId] = useState<number>(1);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  // Confetti celebration state
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
  };

  const handleOpenSubtopicMiniPage = (m: Milestone) => {
    setSelectedMilestone(m);
    setIsMiniPageOpen(true);
  };

  const handleOpenCustomMilestoneModal = (phaseId: number = 1) => {
    setCustomPhaseId(phaseId);
    setIsCustomMilestoneOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-100/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Celebratory Confetti on completions */}
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <Header
        onOpenLogModal={() => setIsLogModalOpen(true)}
        onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
      />

      {/* Navigation tabs */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onOpenLogModal={() => setIsLogModalOpen(true)}
            onOpenSubtopicMiniPage={handleOpenSubtopicMiniPage}
            onTriggerConfetti={triggerConfetti}
            onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            onOpenSubtopicMiniPage={handleOpenSubtopicMiniPage}
            onOpenCustomMilestoneModal={handleOpenCustomMilestoneModal}
            onTriggerConfetti={triggerConfetti}
            onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
          />
        )}

        {activeTab === 'coaching' && <ClientCoachingView />}

        {activeTab === 'journal' && (
          <JournalView onOpenLogModal={() => setIsLogModalOpen(true)} />
        )}

        {activeTab === 'briefs' && (
          <BriefGeneratorView onTriggerConfetti={triggerConfetti} />
        )}

        {activeTab === 'sandbox' && <SandboxView />}

        {activeTab === 'backup' && <BackupView />}
      </main>

      {/* Studio Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">Atelier Studio OS</span>
            <span>·</span>
            <span>Bachelor Graphic Design & UI/UX Syllabus & Client Relations Coaching</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Offline Verified</span>
            <span>·</span>
            <span>Real-time Local Storage</span>
            <span>·</span>
            <span>JSON Backup & Sync</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LogSessionModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSessionLogged={triggerConfetti}
      />

      <SubtopicMiniPage
        milestone={selectedMilestone}
        isOpen={isMiniPageOpen}
        onClose={() => {
          setIsMiniPageOpen(false);
          setSelectedMilestone(null);
        }}
        onTriggerConfetti={triggerConfetti}
      />

      <CustomMilestoneModal
        isOpen={isCustomMilestoneOpen}
        onClose={() => setIsCustomMilestoneOpen(false)}
        defaultPhaseId={customPhaseId}
      />

      <PhoneAccessModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <DesignProvider>
      <MainAppContent />
    </DesignProvider>
  );
}
