import { ReactNode } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, CheckCircle } from '@phosphor-icons/react';

export function GCBasicTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Current Page' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            Basic Page Template
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-line-length">
            This demonstrates the standard Government of Canada page layout with proper typography, spacing, and semantic HTML structure.
          </p>
        </section>

        <Alert className="border-[#0535d2] bg-[#0535d2]/5">
          <Info size={20} weight="fill" className="text-[#0535d2]" />
          <AlertDescription className="text-base">
            <strong>Before you start:</strong> Make sure you have all required documents ready before beginning your application.
          </AlertDescription>
        </Alert>

        <section aria-labelledby="content-heading">
          <h2 id="content-heading" className="text-3xl font-bold mb-4">Main Content Section</h2>
          <div className="space-y-4 max-line-length">
            <p className="text-base leading-relaxed">
              The Government of Canada is committed to providing accessible, user-friendly services to all Canadians. 
              This page demonstrates proper content structure, readability, and accessibility standards.
            </p>
            <p className="text-base leading-relaxed">
              All content should be organized logically with clear headings, descriptive links, and plain language 
              that is easy to understand for all reading levels.
            </p>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="bg-muted/30 -mx-6 px-6 py-8 rounded-lg">
          <h2 id="features-heading" className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Accessible Design', desc: 'WCAG 2.2 AAA compliant with proper contrast and semantics' },
              { title: 'Responsive Layout', desc: 'Works perfectly on desktop, tablet, and mobile devices' },
              { title: 'Official Branding', desc: 'Government of Canada visual identity standards' },
              { title: 'Bilingual Support', desc: 'Full English and French language support' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle size={24} weight="fill" className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="text-3xl font-bold mb-6">Take Action</h2>
          <div className="flex flex-wrap gap-4">
            <GCButton variant="primary" size="large">
              Start Application
            </GCButton>
            <GCButton variant="secondary" size="large">
              Save for Later
            </GCButton>
            <GCButton variant="link">
              Download PDF Version
            </GCButton>
          </div>
        </section>

        <section aria-labelledby="help-heading">
          <h2 id="help-heading" className="text-3xl font-bold mb-6">Need Help?</h2>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Get support with your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Phone:</p>
                <p className="text-lg">1-800-622-6232</p>
                <p className="text-sm text-muted-foreground">Monday to Friday, 8:30 am to 4:30 pm (local time)</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Email:</p>
                <p className="text-lg">support@example.gc.ca</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
