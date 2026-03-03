import { useState } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCBadge } from '@/components/gc/GCBadge';
import { GCPagination } from '@/components/gc/GCPagination';
import { GCInput } from '@/components/gc/GCInput';
import { Article, CalendarBlank, Tag, MagnifyingGlass } from '@phosphor-icons/react';

export function GCNewsTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'News and updates' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const newsItems = [
    {
      id: 1,
      title: 'Government of Canada introduces new measures to support Canadian workers',
      date: 'January 15, 2024',
      category: 'Employment',
      type: 'News release',
      excerpt: 'The Government of Canada announced today enhancements to Employment Insurance that will provide better support to Canadian workers during periods of unemployment.',
      minister: 'Minister of Employment, Workforce Development and Disability Inclusion'
    },
    {
      id: 2,
      title: 'Canada Pension Plan contribution rates for 2024',
      date: 'January 10, 2024',
      category: 'Pensions',
      type: 'Backgrounder',
      excerpt: 'As of January 1, 2024, the maximum pensionable earnings under the Canada Pension Plan (CPP) have increased to $68,500. Learn about the new contribution rates.',
      minister: 'Minister of Seniors'
    },
    {
      id: 3,
      title: 'Expanded eligibility for Employment Insurance sickness benefits',
      date: 'January 5, 2024',
      category: 'Employment',
      type: 'Media advisory',
      excerpt: 'Starting this month, eligible Canadians can receive up to 26 weeks of EI sickness benefits, an increase from the previous 15 weeks.',
      minister: 'Minister of Employment, Workforce Development and Disability Inclusion'
    },
    {
      id: 4,
      title: 'Service Canada modernization update',
      date: 'December 20, 2023',
      category: 'Service delivery',
      type: 'News release',
      excerpt: 'Service Canada continues to modernize its services, making it easier for Canadians to access benefits and programs through digital channels.',
      minister: 'Minister of Citizens\' Services'
    },
    {
      id: 5,
      title: 'New online tool helps Canadians plan for retirement',
      date: 'December 15, 2023',
      category: 'Pensions',
      type: 'Backgrounder',
      excerpt: 'A new retirement planning calculator is now available to help Canadians estimate their retirement income from government programs and plan accordingly.',
      minister: 'Minister of Seniors'
    },
    {
      id: 6,
      title: 'Increased support for skills training and development',
      date: 'December 10, 2023',
      category: 'Employment',
      type: 'News release',
      excerpt: 'The Government announces $500 million in new funding to support skills training programs across Canada, helping workers adapt to changing labour markets.',
      minister: 'Minister of Employment, Workforce Development and Disability Inclusion'
    }
  ];

  const categories = ['All', 'Employment', 'Pensions', 'Service delivery'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-4 border-b-4 border-accent pb-2">
            News and Updates
          </h1>
          <p className="text-xl mb-6 max-line-length">
            Stay informed about the latest announcements, policy changes, and updates from Employment and Social Development Canada.
          </p>
        </section>

        <section className="bg-card border rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="search-news" className="sr-only">Search news</label>
              <div className="relative">
                <MagnifyingGlass 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  weight="regular"
                />
                <input
                  id="search-news"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news and updates..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3">Filter by category</label>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted-foreground/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="news-list-heading">
          <h2 id="news-list-heading" className="sr-only">News articles</h2>
          
          {displayedNews.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Article size={48} className="mx-auto mb-4 text-muted-foreground" weight="duotone" />
              <p className="text-xl font-semibold mb-2">No news found</p>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {displayedNews.map((item) => (
                <article 
                  key={item.id} 
                  className="border rounded-lg p-6 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <GCBadge variant="info">{item.type}</GCBadge>
                    <GCBadge variant="success">{item.category}</GCBadge>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    <a href={`#news-${item.id}`}>
                      {item.title}
                    </a>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarBlank size={16} weight="regular" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag size={16} weight="regular" />
                      <span>{item.minister}</span>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed mb-4 max-line-length">
                    {item.excerpt}
                  </p>

                  <GCButton variant="link">
                    Read full article
                  </GCButton>
                </article>
              ))}
            </div>
          )}

          {filteredNews.length > itemsPerPage && (
            <div className="mt-8 flex justify-center">
              <GCPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>

        <section aria-labelledby="subscribe-heading" className="bg-accent/10 border-2 border-accent rounded-lg p-8">
          <div className="max-w-2xl">
            <h2 id="subscribe-heading" className="text-3xl font-bold mb-4">Stay informed</h2>
            <p className="text-base mb-6">
              Subscribe to receive email updates when new announcements and news are published.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="email-subscribe" className="sr-only">Email address</label>
                <input
                  id="email-subscribe"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <GCButton variant="primary" size="large">
                Subscribe
              </GCButton>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              You can unsubscribe at any time. View our <a href="#" className="text-primary hover:underline">privacy policy</a>.
            </p>
          </div>
        </section>

        <section aria-labelledby="media-heading" className="border-t pt-8">
          <h2 id="media-heading" className="text-3xl font-bold mb-6">Media enquiries</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Media Relations</h3>
              <p className="text-muted-foreground mb-4">
                For media enquiries about Employment and Social Development Canada programs and services:
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Phone:</span>
                  <span>1-819-654-5555</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Email:</span>
                  <span className="text-primary">media@hrsdc-rhdcc.gc.ca</span>
                </p>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Social Media</h3>
              <p className="text-muted-foreground mb-4">
                Follow us on social media for the latest updates:
              </p>
              <div className="flex flex-wrap gap-3">
                <GCButton variant="secondary" size="small">Twitter</GCButton>
                <GCButton variant="secondary" size="small">Facebook</GCButton>
                <GCButton variant="secondary" size="small">LinkedIn</GCButton>
                <GCButton variant="secondary" size="small">YouTube</GCButton>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="archive-heading">
          <h2 id="archive-heading" className="text-3xl font-bold mb-6">News archive</h2>
          <p className="text-base mb-4">
            View archived news releases and updates from previous years:
          </p>
          <div className="flex flex-wrap gap-3">
            <GCButton variant="link">2023</GCButton>
            <GCButton variant="link">2022</GCButton>
            <GCButton variant="link">2021</GCButton>
            <GCButton variant="link">2020</GCButton>
            <GCButton variant="link">View all archives</GCButton>
          </div>
        </section>
      </div>
    </div>
  );
}
