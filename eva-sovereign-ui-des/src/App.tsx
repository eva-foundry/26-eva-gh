import { useState } from 'react';
import { Toaster } from 'sonner';
import { ESDCDemo } from '@/pages/ESDCDemo';
import { GCTemplatesDemo } from '@/pages/GCTemplatesDemo';
import { FiveEyesDemo } from '@/pages/FiveEyesDemo';
import { FiveEyesComplianceGuide } from '@/pages/FiveEyesComplianceGuide';

type Page = 'esdc' | 'templates' | 'five-eyes' | 'compliance-guide';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('compliance-guide');

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      <div>
        {currentPage === 'esdc' && (
          <ESDCDemo 
            onNavigateToTemplates={() => setCurrentPage('templates')}
            onNavigateToFiveEyes={() => setCurrentPage('five-eyes')}
          />
        )}
        {currentPage === 'templates' && (
          <GCTemplatesDemo onNavigateToESDC={() => setCurrentPage('esdc')} />
        )}
        {currentPage === 'five-eyes' && (
          <FiveEyesDemo 
            onNavigateToESDC={() => setCurrentPage('esdc')}
            onNavigateToGuide={() => setCurrentPage('compliance-guide')}
          />
        )}
        {currentPage === 'compliance-guide' && (
          <FiveEyesComplianceGuide onNavigateToDemo={() => setCurrentPage('five-eyes')} />
        )}
      </div>
    </div>
  );
}

export default App;
