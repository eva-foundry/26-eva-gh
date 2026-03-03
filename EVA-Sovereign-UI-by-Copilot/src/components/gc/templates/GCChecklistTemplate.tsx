import { useState } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCInput } from '@/components/gc/GCInput';
import { GCCheckbox } from '@/components/gc/GCCheckbox';
import { GCRadio } from '@/components/gc/GCRadio';
import { GCAlert } from '@/components/gc/GCAlert';
import { GCProgressBar } from '@/components/gc/GCProgressBar';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { toast } from 'sonner';

export function GCChecklistTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Immigration', href: '/immigration' },
    { label: 'Work in Canada', href: '/immigration/work' },
    { label: 'Find out if you\'re eligible' },
  ];

  const [responses, setResponses] = useState<Record<string, any>>({
    citizenship: '',
    age: '',
    education: '',
    workExperience: '',
    languageTest: false,
    jobOffer: false,
    provincialNomination: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const totalSteps = 7;

  const handleNext = () => {
    const requiredFields: Record<number, string> = {
      1: 'citizenship',
      2: 'age',
      3: 'education',
      4: 'workExperience'
    };

    if (currentStep <= 4 && !responses[requiredFields[currentStep]]) {
      toast.error('Please select an option to continue');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowResult(false);
    }
  };

  const calculateEligibility = () => {
    let score = 0;
    
    if (responses.citizenship === 'other') score += 20;
    if (responses.age === '18-35') score += 25;
    else if (responses.age === '36-45') score += 20;
    
    if (responses.education === 'masters') score += 25;
    else if (responses.education === 'bachelors') score += 20;
    else if (responses.education === 'college') score += 15;
    
    if (responses.workExperience === '3plus') score += 20;
    else if (responses.workExperience === '1-3') score += 15;
    
    if (responses.languageTest) score += 20;
    if (responses.jobOffer) score += 15;
    if (responses.provincialNomination) score += 30;

    return score;
  };

  const progress = ((currentStep - 1) / totalSteps) * 100;
  const eligibilityScore = showResult ? calculateEligibility() : 0;
  const isEligible = eligibilityScore >= 67;

  return (
    <div className="max-w-4xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            Find out if you're eligible to work in Canada
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-line-length">
            Answer a few questions to determine if you may be eligible for a work permit or permanent residence through Express Entry.
          </p>
        </section>

        {!showResult && (
          <>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">Progress</span>
                <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
              </div>
              <GCProgressBar value={progress} max={100} showPercentage={false} />
            </div>

            <GCAlert variant="info">
              This tool provides a preliminary assessment only. A complete eligibility determination requires submitting a formal application.
            </GCAlert>
          </>
        )}

        <div className="bg-card border rounded-lg p-8">
          {!showResult ? (
            <>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What is your citizenship status?</h2>
                  <div className="space-y-3">
                    <GCRadio
                      id="citizenship-canadian"
                      name="citizenship"
                      value="canadian"
                      checked={responses.citizenship === 'canadian'}
                      onChange={() => setResponses({ ...responses, citizenship: 'canadian' })}
                      label="Canadian citizen or permanent resident"
                    />
                    <GCRadio
                      id="citizenship-other"
                      name="citizenship"
                      value="other"
                      checked={responses.citizenship === 'other'}
                      onChange={() => setResponses({ ...responses, citizenship: 'other' })}
                      label="Citizen of another country"
                    />
                  </div>
                  {responses.citizenship === 'canadian' && (
                    <GCAlert variant="warning">
                      If you are a Canadian citizen or permanent resident, you do not need a work permit. This tool is for foreign nationals.
                    </GCAlert>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What is your age?</h2>
                  <div className="space-y-3">
                    <GCRadio
                      id="age-under18"
                      name="age"
                      value="under18"
                      checked={responses.age === 'under18'}
                      onChange={() => setResponses({ ...responses, age: 'under18' })}
                      label="Under 18"
                    />
                    <GCRadio
                      id="age-18-35"
                      name="age"
                      value="18-35"
                      checked={responses.age === '18-35'}
                      onChange={() => setResponses({ ...responses, age: '18-35' })}
                      label="18 to 35 years old"
                    />
                    <GCRadio
                      id="age-36-45"
                      name="age"
                      value="36-45"
                      checked={responses.age === '36-45'}
                      onChange={() => setResponses({ ...responses, age: '36-45' })}
                      label="36 to 45 years old"
                    />
                    <GCRadio
                      id="age-over45"
                      name="age"
                      value="over45"
                      checked={responses.age === 'over45'}
                      onChange={() => setResponses({ ...responses, age: 'over45' })}
                      label="Over 45"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What is your highest level of education?</h2>
                  <div className="space-y-3">
                    <GCRadio
                      id="education-secondary"
                      name="education"
                      value="secondary"
                      checked={responses.education === 'secondary'}
                      onChange={() => setResponses({ ...responses, education: 'secondary' })}
                      label="High school diploma"
                    />
                    <GCRadio
                      id="education-college"
                      name="education"
                      value="college"
                      checked={responses.education === 'college'}
                      onChange={() => setResponses({ ...responses, education: 'college' })}
                      label="College diploma or trade certificate"
                    />
                    <GCRadio
                      id="education-bachelors"
                      name="education"
                      value="bachelors"
                      checked={responses.education === 'bachelors'}
                      onChange={() => setResponses({ ...responses, education: 'bachelors' })}
                      label="Bachelor's degree"
                    />
                    <GCRadio
                      id="education-masters"
                      name="education"
                      value="masters"
                      checked={responses.education === 'masters'}
                      onChange={() => setResponses({ ...responses, education: 'masters' })}
                      label="Master's degree or PhD"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">How many years of skilled work experience do you have?</h2>
                  <p className="text-muted-foreground">
                    Skilled work experience means work in National Occupational Classification (NOC) TEER 0, 1, 2, or 3.
                  </p>
                  <div className="space-y-3">
                    <GCRadio
                      id="work-none"
                      name="workExperience"
                      value="none"
                      checked={responses.workExperience === 'none'}
                      onChange={() => setResponses({ ...responses, workExperience: 'none' })}
                      label="None or less than 1 year"
                    />
                    <GCRadio
                      id="work-1-3"
                      name="workExperience"
                      value="1-3"
                      checked={responses.workExperience === '1-3'}
                      onChange={() => setResponses({ ...responses, workExperience: '1-3' })}
                      label="1 to 3 years"
                    />
                    <GCRadio
                      id="work-3plus"
                      name="workExperience"
                      value="3plus"
                      checked={responses.workExperience === '3plus'}
                      onChange={() => setResponses({ ...responses, workExperience: '3plus' })}
                      label="3 or more years"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Language proficiency</h2>
                  <p className="text-muted-foreground mb-4">
                    Have you taken a language test in English or French in the past 2 years?
                  </p>
                  <GCCheckbox
                    id="language-test"
                    checked={responses.languageTest}
                    onChange={(e) => setResponses({ ...responses, languageTest: e.target.checked })}
                    label="Yes, I have valid language test results (IELTS, CELPIP, or TEF)"
                  />
                  {!responses.languageTest && (
                    <GCAlert variant="warning">
                      Language test results are required for most immigration programs. You will need to take an approved language test.
                    </GCAlert>
                  )}
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Job offer</h2>
                  <p className="text-muted-foreground mb-4">
                    Do you have a valid job offer from a Canadian employer?
                  </p>
                  <GCCheckbox
                    id="job-offer"
                    checked={responses.jobOffer}
                    onChange={(e) => setResponses({ ...responses, jobOffer: e.target.checked })}
                    label="Yes, I have a job offer with a positive Labour Market Impact Assessment (LMIA)"
                  />
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Provincial nomination</h2>
                  <p className="text-muted-foreground mb-4">
                    Have you been nominated by a Canadian province or territory?
                  </p>
                  <GCCheckbox
                    id="provincial-nomination"
                    checked={responses.provincialNomination}
                    onChange={(e) => setResponses({ ...responses, provincialNomination: e.target.checked })}
                    label="Yes, I have a provincial nomination certificate"
                  />
                  {responses.provincialNomination && (
                    <GCAlert variant="success">
                      A provincial nomination gives you additional points and significantly increases your chances of receiving an invitation to apply.
                    </GCAlert>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-8 border-t mt-8">
                {currentStep > 1 && (
                  <GCButton variant="secondary" onClick={handlePrevious}>
                    Previous
                  </GCButton>
                )}
                <GCButton variant="primary" onClick={handleNext}>
                  {currentStep === totalSteps ? 'See Results' : 'Next'}
                </GCButton>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center pb-6 border-b">
                {isEligible ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={48} weight="fill" className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-green-700 mb-2">
                      You may be eligible!
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Based on your answers, you may qualify to work in Canada through Express Entry.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                      <XCircle size={48} weight="fill" className="text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-orange-700 mb-2">
                      You may not be eligible at this time
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Based on your answers, you may need to improve certain factors to qualify.
                    </p>
                  </>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Your estimated score</h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-3xl font-bold text-primary">{eligibilityScore} points</span>
                    <span className="text-muted-foreground">Pass mark: 67 points</span>
                  </div>
                  <GCProgressBar value={eligibilityScore} max={100} />
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Your responses</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="font-semibold">Citizenship:</dt>
                    <dd className="text-muted-foreground capitalize">{responses.citizenship}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Age:</dt>
                    <dd className="text-muted-foreground">{responses.age}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Education:</dt>
                    <dd className="text-muted-foreground capitalize">{responses.education}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Work experience:</dt>
                    <dd className="text-muted-foreground">{responses.workExperience} years</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Language test:</dt>
                    <dd className="text-muted-foreground">{responses.languageTest ? 'Yes' : 'No'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Job offer:</dt>
                    <dd className="text-muted-foreground">{responses.jobOffer ? 'Yes' : 'No'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Provincial nomination:</dt>
                    <dd className="text-muted-foreground">{responses.provincialNomination ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
              </div>

              {isEligible ? (
                <GCAlert variant="success">
                  <strong>Next steps:</strong> Create an Express Entry profile and submit your application. Make sure you have all required documents ready, including language test results and educational credential assessments.
                </GCAlert>
              ) : (
                <GCAlert variant="warning">
                  <strong>How to improve:</strong> Consider taking a language test, gaining more work experience, or pursuing additional education. You may also explore Provincial Nominee Programs for alternative pathways.
                </GCAlert>
              )}

              <div className="flex flex-wrap gap-4 pt-6 border-t">
                <GCButton variant="primary" size="large">
                  {isEligible ? 'Start your application' : 'Explore other options'}
                </GCButton>
                <GCButton variant="secondary" onClick={() => {
                  setShowResult(false);
                  setCurrentStep(1);
                  setResponses({
                    citizenship: '',
                    age: '',
                    education: '',
                    workExperience: '',
                    languageTest: false,
                    jobOffer: false,
                    provincialNomination: false
                  });
                }}>
                  Start over
                </GCButton>
              </div>
            </div>
          )}
        </div>

        {!showResult && (
          <section aria-labelledby="help-heading" className="border-t pt-8">
            <h2 id="help-heading" className="text-2xl font-bold mb-4">Need help?</h2>
            <p className="text-base mb-4">
              If you have questions about working in Canada or immigration programs:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base mb-6">
              <li>Call 1-888-242-2100 (in Canada)</li>
              <li>Visit the IRCC Help Centre online</li>
              <li>Contact a licensed immigration consultant</li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
