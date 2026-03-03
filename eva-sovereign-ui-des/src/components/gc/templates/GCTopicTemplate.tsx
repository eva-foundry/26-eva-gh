import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCCard } from '@/components/gc/GCCard';
import { ArrowRight, Article, Calculator, FileText, Users } from '@phosphor-icons/react';

export function GCTopicTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Topics', href: '/topics' },
    { label: 'Employment and Social Development' },
  ];

  const services = [
    {
      title: 'Employment Insurance',
      description: 'Financial assistance if you lost your job, are on parental leave, or caring for a family member',
      icon: FileText,
      href: '/services/ei'
    },
    {
      title: 'Canada Pension Plan',
      description: 'Retirement, disability, and survivor benefits for eligible contributors',
      icon: Calculator,
      href: '/services/cpp'
    },
    {
      title: 'Old Age Security',
      description: 'Monthly payments for seniors aged 65 and older who meet residency requirements',
      icon: Users,
      href: '/services/oas'
    },
    {
      title: 'Social Insurance Number',
      description: 'Apply for or replace your 9-digit number required to work in Canada',
      icon: Article,
      href: '/services/sin'
    }
  ];

  const audiences = [
    { label: 'Individuals and families', href: '/audience/individuals' },
    { label: 'Employers', href: '/audience/employers' },
    { label: 'Newcomers to Canada', href: '/audience/newcomers' },
    { label: 'Persons with disabilities', href: '/audience/disabilities' },
    { label: 'Seniors', href: '/audience/seniors' },
    { label: 'Youth', href: '/audience/youth' }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            Employment and Social Development
          </h1>
          <p className="text-xl mb-6 max-line-length">
            Access programs and services that support Canadians throughout their lives, including employment, learning, pensions, and benefits.
          </p>
        </section>

        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-3xl font-bold mb-6">Services and information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group">
                <GCCard variant="bordered">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon size={24} className="text-primary" weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-base text-muted-foreground mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          <span>Learn more</span>
                          <ArrowRight size={16} weight="bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </GCCard>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="featured-heading" className="bg-muted/30 -mx-6 px-6 py-8 rounded-lg">
          <h2 id="featured-heading" className="text-3xl font-bold mb-6">Most requested</h2>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-lg text-primary hover:underline flex items-center gap-2">
                <ArrowRight size={16} weight="bold" />
                Apply for Employment Insurance
              </a>
            </li>
            <li>
              <a href="#" className="text-lg text-primary hover:underline flex items-center gap-2">
                <ArrowRight size={16} weight="bold" />
                Check your EI claim status
              </a>
            </li>
            <li>
              <a href="#" className="text-lg text-primary hover:underline flex items-center gap-2">
                <ArrowRight size={16} weight="bold" />
                Calculate your CPP retirement pension
              </a>
            </li>
            <li>
              <a href="#" className="text-lg text-primary hover:underline flex items-center gap-2">
                <ArrowRight size={16} weight="bold" />
                Apply for a Social Insurance Number
              </a>
            </li>
            <li>
              <a href="#" className="text-lg text-primary hover:underline flex items-center gap-2">
                <ArrowRight size={16} weight="bold" />
                Find a job with Job Bank
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="text-3xl font-bold mb-6">Information by audience</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {audiences.map((audience, index) => (
              <a
                key={index}
                href={audience.href}
                className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold group-hover:text-primary transition-colors">
                    {audience.label}
                  </span>
                  <ArrowRight size={16} weight="bold" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-heading" className="bg-card border rounded-lg p-6">
          <h2 id="about-heading" className="text-3xl font-bold mb-4">About Employment and Social Development Canada</h2>
          <div className="space-y-4 max-line-length">
            <p className="text-base leading-relaxed">
              Employment and Social Development Canada (ESDC) works to improve the standard of living and quality of life for all Canadians. We do this by promoting a labour force that is highly skilled. We also promote an efficient and inclusive labour market.
            </p>
            <p className="text-base leading-relaxed">
              The department delivers a range of programs and services that affect Canadians throughout their lives, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base ml-4">
              <li>Employment Insurance and employment services</li>
              <li>Canada Pension Plan and Old Age Security</li>
              <li>Skills development and workplace training</li>
              <li>Labour market information and workplace standards</li>
              <li>Social programs and benefits for families, children, and communities</li>
            </ul>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <GCButton variant="secondary">
              About the department
            </GCButton>
            <GCButton variant="link">
              Contact ESDC
            </GCButton>
          </div>
        </section>

        <section aria-labelledby="news-heading">
          <h2 id="news-heading" className="text-3xl font-bold mb-6">Latest news</h2>
          <div className="space-y-4">
            <article className="border-l-4 border-primary pl-4">
              <time className="text-sm text-muted-foreground">January 15, 2024</time>
              <h3 className="text-xl font-bold mt-1 mb-2">
                <a href="#" className="hover:text-primary transition-colors">
                  New measures to support Canadian workers
                </a>
              </h3>
              <p className="text-base text-muted-foreground">
                The Government of Canada announces enhancements to Employment Insurance to better support workers across the country.
              </p>
            </article>

            <article className="border-l-4 border-primary pl-4">
              <time className="text-sm text-muted-foreground">January 10, 2024</time>
              <h3 className="text-xl font-bold mt-1 mb-2">
                <a href="#" className="hover:text-primary transition-colors">
                  Canada Pension Plan increases for 2024
                </a>
              </h3>
              <p className="text-base text-muted-foreground">
                Learn about the new contribution rates and maximum pensionable earnings for the Canada Pension Plan.
              </p>
            </article>

            <div className="pt-4">
              <GCButton variant="link">
                View all news and announcements
              </GCButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
