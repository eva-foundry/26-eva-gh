import { useState } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCTabs } from '@/components/gc/GCTabs';
import { GCCard } from '@/components/gc/GCCard';
import { GCAlert } from '@/components/gc/GCAlert';
import { Download, EnvelopeSimple, Phone, MapPin, Clock } from '@phosphor-icons/react';

export function GCContactTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact us' },
  ];

  const officeHours = [
    { day: 'Monday to Friday', hours: '8:30 am to 4:30 pm (local time)' },
    { day: 'Saturday and Sunday', hours: 'Closed' },
    { day: 'Statutory holidays', hours: 'Closed' }
  ];

  const regionalOffices = [
    {
      region: 'Atlantic Canada',
      address: '1045 Main Street, Moncton, NB E1C 1H1',
      phone: '1-800-206-7218',
      email: 'atlantic.region@servicecanada.gc.ca'
    },
    {
      region: 'Quebec',
      address: '200 René-Lévesque Blvd West, Montreal, QC H2Z 1X4',
      phone: '1-800-277-9914',
      email: 'quebec.region@servicecanada.gc.ca'
    },
    {
      region: 'Ontario',
      address: '25 St. Clair Avenue East, Toronto, ON M4T 1M2',
      phone: '1-800-622-6232',
      email: 'ontario.region@servicecanada.gc.ca'
    },
    {
      region: 'Prairies and Northern Territories',
      address: '9700 Jasper Avenue, Edmonton, AB T5J 4C3',
      phone: '1-800-206-7218',
      email: 'prairies.region@servicecanada.gc.ca'
    },
    {
      region: 'British Columbia',
      address: '125 10th Avenue SW, Vancouver, BC V5T 1Z3',
      phone: '1-800-622-6232',
      email: 'bc.region@servicecanada.gc.ca'
    }
  ];

  const phoneServices = [
    {
      service: 'Employment Insurance',
      phone: '1-800-206-7218',
      description: 'Questions about EI claims, reports, and payments',
      availability: 'Monday to Friday, 8:30 am to 4:30 pm'
    },
    {
      service: 'Canada Pension Plan',
      phone: '1-800-277-9914',
      description: 'Questions about CPP retirement, disability, and survivor benefits',
      availability: 'Monday to Friday, 8:00 am to 8:00 pm'
    },
    {
      service: 'Old Age Security',
      phone: '1-800-277-9915',
      description: 'Questions about OAS pension and Guaranteed Income Supplement',
      availability: 'Monday to Friday, 8:00 am to 8:00 pm'
    },
    {
      service: 'Social Insurance Number',
      phone: '1-866-274-6627',
      description: 'Questions about applying for or replacing your SIN',
      availability: 'Monday to Friday, 8:30 am to 4:30 pm'
    }
  ];

  const tabs = [
    {
      id: 'phone',
      label: 'By phone',
      content: (
        <div className="space-y-6">
          <GCAlert variant="info">
            Before you call, have your Social Insurance Number ready. Wait times may be longer during peak periods (Monday mornings and after holidays).
          </GCAlert>

          <div className="grid gap-6">
            {phoneServices.map((service, index) => (
              <div key={index} className="border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone size={24} className="text-primary" weight="duotone" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.service}</h3>
                    <p className="text-muted-foreground mb-3">{service.description}</p>
                    <p className="text-2xl font-bold text-primary mb-2">{service.phone}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      <span>{service.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Telephone device for the deaf (TTY)</h3>
            <p className="mb-3">If you are deaf or hard of hearing, you can use TTY to contact us:</p>
            <p className="text-2xl font-bold text-primary">1-800-926-9105</p>
          </div>
        </div>
      )
    },
    {
      id: 'online',
      label: 'Online',
      content: (
        <div className="space-y-6">
          <GCAlert variant="info">
            The fastest way to get answers is through your My Service Canada Account. Sign in to view your information and submit secure messages.
          </GCAlert>

          <div className="grid md:grid-cols-2 gap-6">
            <GCCard variant="bordered">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <EnvelopeSimple size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3">My Service Canada Account</h3>
                <p className="text-muted-foreground mb-4">
                  Sign in to your account to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm mb-4">
                  <li>View your EI claim and payment information</li>
                  <li>Submit EI reports</li>
                  <li>View your CPP and OAS information</li>
                  <li>Update your personal information</li>
                  <li>Submit secure messages to Service Canada</li>
                </ul>
                <GCButton variant="primary" fullWidth>
                  Sign in
                </GCButton>
              </div>
            </GCCard>

            <GCCard variant="bordered">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3">Forms and publications</h3>
                <p className="text-muted-foreground mb-4">
                  Download forms and guides for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm mb-4">
                  <li>Employment Insurance applications</li>
                  <li>CPP retirement and disability benefits</li>
                  <li>Old Age Security pension</li>
                  <li>Social Insurance Number applications</li>
                  <li>Direct deposit enrollment</li>
                </ul>
                <GCButton variant="secondary" fullWidth>
                  Browse forms
                </GCButton>
              </div>
            </GCCard>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Help Centre</h3>
            <p className="text-muted-foreground mb-4">
              Find answers to common questions about Service Canada programs and services.
            </p>
            <div className="flex flex-wrap gap-3">
              <GCButton variant="link">Employment Insurance</GCButton>
              <GCButton variant="link">Canada Pension Plan</GCButton>
              <GCButton variant="link">Old Age Security</GCButton>
              <GCButton variant="link">Social Insurance Number</GCButton>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'in-person',
      label: 'In person',
      content: (
        <div className="space-y-6">
          <GCAlert variant="info">
            Some Service Canada Centres require an appointment. Call ahead or book online to avoid wait times.
          </GCAlert>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Find a Service Canada Centre</h3>
            <p className="text-muted-foreground mb-4">
              Visit a Service Canada Centre near you for in-person assistance with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base mb-6">
              <li>Social Insurance Number applications</li>
              <li>Employment Insurance questions</li>
              <li>Canada Pension Plan and Old Age Security information</li>
              <li>Passport services</li>
              <li>Document verification</li>
            </ul>
            <GCButton variant="primary">
              Find a Service Canada Centre
            </GCButton>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Office hours</h3>
            <div className="border rounded-lg overflow-hidden">
              {officeHours.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between p-4 ${index !== officeHours.length - 1 ? 'border-b' : ''}`}
                >
                  <span className="font-semibold">{item.day}</span>
                  <span className="text-muted-foreground">{item.hours}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Note: Hours may vary by location. Some centres offer extended hours. Check the location details before you visit.
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3">What to bring</h3>
            <p className="mb-3">When visiting a Service Canada Centre, bring:</p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Two pieces of identification (one must include a photo)</li>
              <li>Your Social Insurance Number</li>
              <li>Any relevant documents or correspondence from Service Canada</li>
              <li>Completed application forms (if applicable)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'mail',
      label: 'By mail',
      content: (
        <div className="space-y-6">
          <GCAlert variant="warning">
            Mailing documents may take several weeks for processing. For faster service, use online options or visit a Service Canada Centre.
          </GCAlert>

          <div>
            <h3 className="text-xl font-bold mb-4">Regional offices</h3>
            <p className="text-muted-foreground mb-6">
              Send your documents and correspondence to the appropriate regional office:
            </p>

            <div className="space-y-4">
              {regionalOffices.map((office, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin size={24} className="text-primary" weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2">{office.region}</h4>
                      <div className="space-y-2 text-base">
                        <p className="flex items-start gap-2">
                          <MapPin size={18} className="flex-shrink-0 mt-0.5" weight="regular" />
                          <span>{office.address}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={18} weight="regular" />
                          <span>{office.phone}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <EnvelopeSimple size={18} weight="regular" />
                          <span className="text-primary">{office.email}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3">Important mailing tips</h3>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Always include your Social Insurance Number on all correspondence</li>
              <li>Keep copies of all documents you send</li>
              <li>Use registered mail for important documents</li>
              <li>Include a return address on your envelope</li>
              <li>Allow 4-6 weeks for processing</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            Contact Service Canada
          </h1>
          <p className="text-xl mb-6 max-line-length">
            Get help with Employment Insurance, Canada Pension Plan, Old Age Security, Social Insurance Number, and other government services.
          </p>
        </section>

        <section>
          <GCTabs tabs={tabs} />
        </section>

        <section aria-labelledby="feedback-heading" className="bg-card border rounded-lg p-8">
          <h2 id="feedback-heading" className="text-3xl font-bold mb-4">Share your feedback</h2>
          <p className="text-base mb-6 max-line-length">
            Help us improve our services by sharing your experience with Service Canada. Your feedback is important to us and helps ensure we provide the best possible service to all Canadians.
          </p>
          <GCButton variant="secondary">
            Submit feedback
          </GCButton>
        </section>

        <section aria-labelledby="fraud-heading" className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-6">
          <h2 id="fraud-heading" className="text-2xl font-bold mb-4 text-destructive">Report fraud or scams</h2>
          <p className="text-base mb-4">
            If you suspect fraud related to Employment Insurance, Canada Pension Plan, or Old Age Security:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base mb-6">
            <li>Call the Canadian Anti-Fraud Centre at <strong>1-888-495-8501</strong></li>
            <li>Report online at <a href="#" className="text-primary hover:underline">antifraudcentre.ca</a></li>
            <li>Contact your local police</li>
          </ul>
          <GCButton variant="danger">
            Report suspected fraud
          </GCButton>
        </section>
      </div>
    </div>
  );
}
