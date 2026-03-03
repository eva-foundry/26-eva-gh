import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCAlert } from '@/components/gc/GCAlert';
import { GCAccordion } from '@/components/gc/GCAccordion';
import { CheckCircle, Clock, FileText, Users } from '@phosphor-icons/react';

export function GCServiceTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Employment Insurance' },
  ];

  const faqItems = [
    {
      id: '1',
      title: 'Who is eligible for Employment Insurance?',
      content: 'You may be eligible for EI regular benefits if you lost your job through no fault of your own, have been without work and without pay for at least seven consecutive days in the last 52 weeks, and have worked for the required number of insurable employment hours in the last 52 weeks or since the start of your last EI claim, whichever is shorter.'
    },
    {
      id: '2',
      title: 'How much will I receive?',
      content: 'Your benefit amount is based on your earnings. The basic rate for calculating EI benefits is 55% of your average insurable weekly earnings, up to a maximum amount. As of January 1, 2024, the maximum yearly insurable earnings amount is $63,200. This means you can receive a maximum payment of $668 per week.'
    },
    {
      id: '3',
      title: 'How long can I receive benefits?',
      content: 'The length of time you can receive EI regular benefits will depend on: the unemployment rate in your area at the time of filing your claim, and the number of hours of insurable employment you accumulated in the last 52 weeks or since your last claim, whichever is shorter. You can receive EI from 14 weeks up to a maximum of 45 weeks.'
    },
    {
      id: '4',
      title: 'When should I apply?',
      content: 'You should apply for EI benefits as soon as you stop working. You can apply for benefits even if you have not yet received your Record of Employment (ROE). If you delay filing your claim for benefits for more than four weeks after your last day of work, you may lose benefits.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            Employment Insurance (EI) Regular Benefits
          </h1>
          <p className="text-xl mb-6 max-line-length">
            Get financial assistance if you lost your job through no fault of your own while you look for work or upgrade your skills.
          </p>
        </section>

        <section className="bg-muted/30 -mx-6 px-6 py-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">What you need to know</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock size={24} className="text-primary" weight="duotone" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Processing time</h3>
                <p className="text-muted-foreground">28 days for a complete application</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText size={24} className="text-primary" weight="duotone" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">What you need</h3>
                <p className="text-muted-foreground">Social Insurance Number, employment history</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users size={24} className="text-primary" weight="duotone" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Who can apply</h3>
                <p className="text-muted-foreground">Workers who lost their job through no fault of their own</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle size={24} className="text-primary" weight="duotone" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Cost</h3>
                <p className="text-muted-foreground">Free to apply</p>
              </div>
            </div>
          </div>
        </section>

        <GCAlert variant="info">
          Apply for EI benefits as soon as you stop working. Waiting more than four weeks may result in lost benefits.
        </GCAlert>

        <section aria-labelledby="eligibility-heading">
          <h2 id="eligibility-heading" className="text-3xl font-bold mb-4">Eligibility</h2>
          <div className="space-y-4 max-line-length">
            <p className="text-base leading-relaxed">
              To be eligible for EI regular benefits, you must meet all of the following conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base ml-4">
              <li>You lost your job through no fault of your own</li>
              <li>You have been without work and without pay for at least 7 consecutive days in the last 52 weeks</li>
              <li>You have worked for the required number of insurable employment hours in the last 52 weeks or since the start of your last EI claim, whichever is shorter</li>
              <li>You are ready, willing, and capable of working each day</li>
              <li>You are actively looking for work</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="how-to-apply-heading" className="bg-card border rounded-lg p-6">
          <h2 id="how-to-apply-heading" className="text-3xl font-bold mb-6">How to apply</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                Gather your information
              </h3>
              <p className="ml-10 text-base max-line-length">
                You will need your Social Insurance Number (SIN) and details about your employment for the last 52 weeks, including employer names, addresses, and dates of employment.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                Apply online
              </h3>
              <p className="ml-10 text-base max-line-length mb-4">
                The fastest way to apply is online through My Service Canada Account. You can apply 24 hours a day, 7 days a week.
              </p>
              <div className="ml-10">
                <GCButton variant="primary" size="large">
                  Apply for EI benefits
                </GCButton>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                Submit your reports
              </h3>
              <p className="ml-10 text-base max-line-length">
                Once approved, you must complete mandatory bi-weekly reports to confirm you are still eligible for benefits. You can complete these reports online or by telephone.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="after-apply-heading">
          <h2 id="after-apply-heading" className="text-3xl font-bold mb-4">After you apply</h2>
          <div className="space-y-4 max-line-length">
            <p className="text-base leading-relaxed">
              After you submit your application:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base ml-4">
              <li>We will review your application and contact you if we need more information</li>
              <li>We will send you an Access Code by mail within 5 business days. You will need this code to access your claim online</li>
              <li>You will receive a decision on your application within 28 days if your application is complete</li>
              <li>If approved, you must complete bi-weekly reports to receive your payments</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl font-bold mb-6">Frequently asked questions</h2>
          <GCAccordion items={faqItems} />
        </section>

        <section aria-labelledby="contact-heading" className="border-t pt-8">
          <h2 id="contact-heading" className="text-3xl font-bold mb-6">Contact us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Telephone</h3>
              <p className="text-2xl font-bold text-primary mb-2">1-800-206-7218</p>
              <p className="text-sm text-muted-foreground mb-4">
                Monday to Friday<br />
                8:30 am to 4:30 pm (local time)
              </p>
              <p className="text-sm">
                Closed on statutory holidays
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">My Service Canada Account</h3>
              <p className="text-base mb-4">
                Manage your EI claim, view payments, and update your information online.
              </p>
              <GCButton variant="secondary">
                Sign in to My Account
              </GCButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
