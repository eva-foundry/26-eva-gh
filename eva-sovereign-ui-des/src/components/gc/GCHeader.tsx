import { cn } from '@/lib/utils';
import { GCContainer } from './GCContainer';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface GCHeaderProps {
  siteName?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function GCHeader({ 
  siteName = 'Government of Canada', 
  searchPlaceholder = 'Search Canada.ca',
  onSearch,
  className 
}: GCHeaderProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch?.(query);
  };

  return (
    <header className={cn('bg-card border-b border-border', className)}>
      <div className="bg-primary text-primary-foreground">
        <GCContainer>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <img
                src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
                alt="Government of Canada"
                className="h-6 brightness-0 invert"
              />
            </div>
            <button className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-2 py-1">
              Français
            </button>
          </div>
        </GCContainer>
      </div>

      <GCContainer>
        <div className="py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-xl font-bold text-foreground">{siteName}</h1>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="search"
                  name="search"
                  placeholder={searchPlaceholder}
                  className="w-full px-4 py-2 pr-10 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-3 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                  aria-label="Search"
                >
                  <MagnifyingGlass size={20} className="text-foreground" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </GCContainer>
    </header>
  );
}
