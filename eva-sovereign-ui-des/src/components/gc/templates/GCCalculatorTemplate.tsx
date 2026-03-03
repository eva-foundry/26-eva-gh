import { useState } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCInput } from '@/components/gc/GCInput';
import { GCSelect } from '@/components/gc/GCSelect';
import { GCProgressBar } from '@/components/gc/GCProgressBar';
import { GCAlert } from '@/components/gc/GCAlert';
import { Calculator as CalcIcon, X, Plus } from '@phosphor-icons/react';
import { toast } from 'sonner';

export function GCCalculatorTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pensions and benefits', href: '/services/pensions' },
    { label: 'CPP Retirement Pension Calculator' },
  ];

  const [birthYear, setBirthYear] = useState('');
  const [startAge, setStartAge] = useState('65');
  const [avgEarnings, setAvgEarnings] = useState('');
  const [contributionYears, setContributionYears] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 70 }, (_, i) => ({
    value: String(currentYear - 70 + i),
    label: String(currentYear - 70 + i)
  }));

  const ageOptions = [
    { value: '60', label: '60 (earliest)' },
    { value: '61', label: '61' },
    { value: '62', label: '62' },
    { value: '63', label: '63' },
    { value: '64', label: '64' },
    { value: '65', label: '65 (standard)' },
    { value: '66', label: '66' },
    { value: '67', label: '67' },
    { value: '68', label: '68' },
    { value: '69', label: '69' },
    { value: '70', label: '70 (latest)' }
  ];

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};

    if (!birthYear) newErrors.birthYear = 'Birth year is required';
    if (!avgEarnings) newErrors.avgEarnings = 'Average earnings is required';
    if (!contributionYears) newErrors.contributionYears = 'Contribution years is required';

    if (avgEarnings && (parseFloat(avgEarnings) < 0 || parseFloat(avgEarnings) > 200000)) {
      newErrors.avgEarnings = 'Please enter a realistic earnings amount';
    }

    if (contributionYears && (parseInt(contributionYears) < 0 || parseInt(contributionYears) > 50)) {
      newErrors.contributionYears = 'Years must be between 0 and 50';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const baseAmount = Math.min(parseFloat(avgEarnings) * 0.25, 1364.60);
      const years = parseInt(contributionYears);
      const yearFactor = Math.min(years / 39, 1);
      const age = parseInt(startAge);
      
      let ageFactor = 1;
      if (age < 65) {
        ageFactor = 1 - ((65 - age) * 0.006);
      } else if (age > 65) {
        ageFactor = 1 + ((age - 65) * 0.007);
      }

      const monthlyPension = baseAmount * yearFactor * ageFactor;
      setResult(Math.round(monthlyPension * 100) / 100);
      toast.success('Calculation complete!');
    } else {
      toast.error('Please correct the errors');
    }
  };

  const handleReset = () => {
    setBirthYear('');
    setStartAge('65');
    setAvgEarnings('');
    setContributionYears('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalcIcon size={24} className="text-primary" weight="duotone" />
            </div>
            <h1 className="text-4xl font-bold text-primary">
              CPP Retirement Pension Calculator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6 max-line-length">
            Estimate your monthly Canada Pension Plan retirement pension payment based on your contributions and when you plan to start receiving benefits.
          </p>
        </section>

        <GCAlert variant="info">
          This calculator provides an estimate only. Your actual CPP retirement pension amount will be based on your complete contribution history and other factors. For a personalized estimate, sign in to My Service Canada Account.
        </GCAlert>

        <div className="bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Enter your information</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <GCSelect
                id="birth-year"
                label="Year of birth"
                required
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                error={errors.birthYear}
                options={[
                  { value: '', label: 'Select year...' },
                  ...yearOptions
                ]}
              />

              <GCSelect
                id="start-age"
                label="Age you plan to start receiving CPP"
                required
                value={startAge}
                onChange={(e) => setStartAge(e.target.value)}
                error={errors.startAge}
                options={ageOptions}
                helperText="You can start as early as 60 or as late as 70"
              />
            </div>

            <GCInput
              id="avg-earnings"
              label="Average annual earnings (before tax)"
              type="number"
              required
              value={avgEarnings}
              onChange={(e) => setAvgEarnings(e.target.value)}
              error={errors.avgEarnings}
              placeholder="50000"
              helperText="Enter your average yearly employment income during your working years"
            />

            <GCInput
              id="contribution-years"
              label="Number of years contributing to CPP"
              type="number"
              required
              value={contributionYears}
              onChange={(e) => setContributionYears(e.target.value)}
              error={errors.contributionYears}
              placeholder="39"
              helperText="Maximum 39 years (from age 18 to 65)"
            />

            <div className="flex flex-wrap gap-4 pt-4">
              <GCButton variant="primary" size="large" onClick={handleCalculate}>
                Calculate pension
              </GCButton>
              <GCButton variant="secondary" size="large" onClick={handleReset}>
                <X size={18} weight="bold" className="mr-2" />
                Reset
              </GCButton>
            </div>
          </div>
        </div>

        {result !== null && (
          <div className="bg-accent/10 border-2 border-accent rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Plus size={24} weight="bold" className="text-accent" />
              Your estimated monthly pension
            </h2>
            
            <div className="mb-6">
              <div className="text-5xl font-bold text-primary mb-2">
                ${result.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-lg text-muted-foreground">
                per month starting at age {startAge}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-semibold">Compared to maximum pension ($1,364.60/month)</span>
                  <span className="font-semibold">{Math.round((result / 1364.60) * 100)}%</span>
                </div>
                <GCProgressBar 
                  value={result} 
                  max={1364.60} 
                  showPercentage={false}
                />
              </div>

              <div className="bg-card/50 rounded-lg p-4">
                <h3 className="font-bold mb-2">Annual amount</h3>
                <p className="text-2xl font-bold text-primary">
                  ${(result * 12).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <GCAlert variant="success">
              Based on {contributionYears} years of contributions with average annual earnings of ${parseFloat(avgEarnings).toLocaleString('en-CA')}.
            </GCAlert>
          </div>
        )}

        <section aria-labelledby="about-heading" className="border-t pt-8">
          <h2 id="about-heading" className="text-3xl font-bold mb-4">About this calculation</h2>
          <div className="space-y-4 max-line-length">
            <p className="text-base leading-relaxed">
              This calculator uses a simplified formula to estimate your CPP retirement pension. Your actual pension amount depends on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base ml-4">
              <li>How much you contributed to the CPP throughout your working life</li>
              <li>How long you contributed to the CPP</li>
              <li>The age when you start receiving your pension</li>
              <li>Your average earnings throughout your career</li>
            </ul>
            
            <h3 className="text-xl font-bold pt-4">Early or late pension</h3>
            <p className="text-base leading-relaxed">
              The standard age to start receiving CPP is 65. However, you can start as early as age 60 or as late as age 70:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base ml-4">
              <li><strong>Before 65:</strong> Your pension is reduced by 0.6% for each month before 65 (up to 36% at age 60)</li>
              <li><strong>After 65:</strong> Your pension increases by 0.7% for each month after 65 (up to 42% at age 70)</li>
            </ul>

            <h3 className="text-xl font-bold pt-4">Maximum pension amount</h3>
            <p className="text-base leading-relaxed">
              As of 2024, the maximum monthly CPP retirement pension at age 65 is $1,364.60. To receive the maximum amount, you must have:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base ml-4">
              <li>Contributed to the CPP for at least 39 years</li>
              <li>Contributed the maximum amount each year</li>
              <li>Started receiving your pension at age 65 or later</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="next-steps-heading" className="bg-muted/30 -mx-6 px-6 py-8 rounded-lg">
          <h2 id="next-steps-heading" className="text-3xl font-bold mb-6">Next steps</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Review your CPP Statement of Contributions</h3>
                <p className="text-muted-foreground">
                  Sign in to My Service Canada Account to see your actual contribution history and get a personalized estimate.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Decide when to start</h3>
                <p className="text-muted-foreground">
                  Consider your financial needs, health, and life expectancy when deciding when to start your pension.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Apply for your pension</h3>
                <p className="text-muted-foreground">
                  You should apply about 6 months before you want to start receiving payments.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <GCButton variant="primary">
              Sign in to My Service Canada Account
            </GCButton>
            <GCButton variant="secondary">
              Apply for CPP
            </GCButton>
          </div>
        </section>
      </div>
    </div>
  );
}
