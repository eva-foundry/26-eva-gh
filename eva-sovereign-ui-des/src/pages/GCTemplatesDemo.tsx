import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Buildings } from '@phosphor-icons/react';
import { 
  GCBasicTemplate,
  GCFormTemplate,
  GCServiceTemplate,
  GCTopicTemplate,
  GCCalculatorTemplate,
  GCChecklistTemplate,
  GCContactTemplate,
  GCNewsTemplate,
  GCDashboardTemplate,
  GCComponentsShowcase,
  GCCSSShortcutsTemplate
} from '@/components/gc/templates';

interface GCTemplatesDemoProps {
  onNavigateToESDC?: () => void;
}

export function GCTemplatesDemo({ onNavigateToESDC }: GCTemplatesDemoProps = {}) {
  const [selectedTemplate, setSelectedTemplate] = useState('components');

  const templates = [
    { id: 'components', label: 'Components', component: GCComponentsShowcase },
    { id: 'css-shortcuts', label: 'CSS Shortcuts', component: GCCSSShortcutsTemplate },
    { id: 'basic', label: 'Basic Page', component: GCBasicTemplate },
    { id: 'form', label: 'Application Form', component: GCFormTemplate },
    { id: 'service', label: 'Service Page', component: GCServiceTemplate },
    { id: 'topic', label: 'Topic Page', component: GCTopicTemplate },
    { id: 'calculator', label: 'Calculator', component: GCCalculatorTemplate },
    { id: 'checklist', label: 'Checklist', component: GCChecklistTemplate },
    { id: 'contact', label: 'Contact Page', component: GCContactTemplate },
    { id: 'news', label: 'News', component: GCNewsTemplate },
    { id: 'dashboard', label: 'Dashboard', component: GCDashboardTemplate },
  ];

  const SelectedComponent = templates.find(t => t.id === selectedTemplate)?.component || GCComponentsShowcase;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">GC Design System Templates</h1>
              <p className="text-sm text-muted-foreground">
                Production-ready page templates following Government of Canada standards
              </p>
            </div>
            {onNavigateToESDC && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToESDC}
                className="flex items-center gap-2"
              >
                <Buildings size={18} weight="duotone" />
                <span className="hidden sm:inline">ESDC Demo</span>
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {templates.map(template => (
              <Button
                key={template.id}
                variant={selectedTemplate === template.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTemplate(template.id)}
                className="whitespace-nowrap"
              >
                {template.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <SelectedComponent />
      </div>
    </div>
  );
}
