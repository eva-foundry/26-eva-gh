import { useState } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCInput } from '@/components/gc/GCInput';
import { GCTextarea } from '@/components/gc/GCTextarea';
import { GCCheckbox } from '@/components/gc/GCCheckbox';
import { GCRadio } from '@/components/gc/GCRadio';
import { GCSelect } from '@/components/gc/GCSelect';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { toast } from 'sonner';

export function GCFormTemplate() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    province: '',
    contactMethod: 'email',
    description: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Application Form' },
  ];

  const provinces = [
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
    { value: 'MB', label: 'Manitoba' },
    { value: 'NB', label: 'New Brunswick' },
    { value: 'NL', label: 'Newfoundland and Labrador' },
    { value: 'NS', label: 'Nova Scotia' },
    { value: 'ON', label: 'Ontario' },
    { value: 'PE', label: 'Prince Edward Island' },
    { value: 'QC', label: 'Quebec' },
    { value: 'SK', label: 'Saskatchewan' },
    { value: 'NT', label: 'Northwest Territories' },
    { value: 'NU', label: 'Nunavut' },
    { value: 'YT', label: 'Yukon' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.province) {
      newErrors.province = 'Please select a province';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must consent to continue';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success('Form submitted successfully!');
      console.log('Form data:', formData);
    } else {
      toast.error('Please correct the errors in the form');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            Application Form Template
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-line-length">
            Complete all required fields marked with an asterisk (*) to submit your application.
          </p>
        </section>

        <Alert className="border-[#0535d2] bg-[#0535d2]/5">
          <Info size={20} weight="fill" className="text-[#0535d2]" />
          <AlertDescription className="text-base">
            <strong>Estimated time:</strong> 10-15 minutes. You can save your progress and return later.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section aria-labelledby="personal-info-heading" className="bg-card border rounded-lg p-6 space-y-6">
            <h2 id="personal-info-heading" className="text-2xl font-bold">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <GCInput
                  id="first-name"
                  label="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  error={errors.firstName}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <GCInput
                  id="last-name"
                  label="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  error={errors.lastName}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <GCInput
              id="email"
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="your.email@example.com"
              helperText="We'll use this to send you updates about your application"
            />

            <GCSelect
              id="province"
              label="Province or Territory"
              required
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              error={errors.province}
              options={provinces}
            />
          </section>

          <section aria-labelledby="contact-heading" className="bg-card border rounded-lg p-6 space-y-6">
            <h2 id="contact-heading" className="text-2xl font-bold">Contact Preferences</h2>
            
            <div>
              <label className="block font-semibold mb-3">Preferred Contact Method <span className="text-destructive">*</span></label>
              <div className="space-y-2">
                <GCRadio
                  id="contact-email"
                  name="contact-method"
                  value="email"
                  checked={formData.contactMethod === 'email'}
                  onChange={() => setFormData({ ...formData, contactMethod: 'email' })}
                  label="Email"
                />
                <GCRadio
                  id="contact-phone"
                  name="contact-method"
                  value="phone"
                  checked={formData.contactMethod === 'phone'}
                  onChange={() => setFormData({ ...formData, contactMethod: 'phone' })}
                  label="Phone"
                />
                <GCRadio
                  id="contact-mail"
                  name="contact-method"
                  value="mail"
                  checked={formData.contactMethod === 'mail'}
                  onChange={() => setFormData({ ...formData, contactMethod: 'mail' })}
                  label="Mail"
                />
              </div>
            </div>

            <GCTextarea
              id="description"
              label="Additional Information"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide any additional details that may help us process your application"
              helperText="Optional - Maximum 500 characters"
              rows={5}
            />
          </section>

          <section aria-labelledby="consent-heading" className="bg-muted/30 border rounded-lg p-6 space-y-4">
            <h2 id="consent-heading" className="text-2xl font-bold">Consent and Declaration</h2>
            
            <GCCheckbox
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              label="I consent to the collection and use of my personal information as described in the privacy notice"
              error={errors.consent}
            />

            {errors.consent && (
              <Alert variant="destructive">
                <WarningCircle size={20} weight="fill" />
                <AlertTitle>Consent Required</AlertTitle>
                <AlertDescription>
                  You must provide consent to submit this application.
                </AlertDescription>
              </Alert>
            )}
          </section>

          <div className="flex flex-wrap gap-4 pt-4">
            <GCButton type="submit" variant="primary" size="large">
              Submit Application
            </GCButton>
            <GCButton type="button" variant="secondary" size="large">
              Save Draft
            </GCButton>
            <GCButton type="button" variant="link">
              Cancel
            </GCButton>
          </div>
        </form>

        <section aria-labelledby="help-heading" className="border-t pt-8">
          <h2 id="help-heading" className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-base mb-4">
            If you have questions about this form, please contact our support team:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Phone: 1-800-622-6232 (Monday to Friday, 8:30 am to 4:30 pm local time)</li>
            <li>Email: support@example.gc.ca</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
