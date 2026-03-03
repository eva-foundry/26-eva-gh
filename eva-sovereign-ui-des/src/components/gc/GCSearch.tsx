import { cn } from '@/lib/utils';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useState } from 'react';

interface GCSearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GCSearch({ 
  placeholder = 'Search', 
  onSearch, 
  className,
  size = 'md'
}: GCSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const sizes = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-5'
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full pr-20 border border-input rounded',
            'bg-background text-foreground',
            'focus:outline-none focus:ring-3 focus:ring-ring',
            sizes[size]
          )}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 hover:bg-muted rounded transition-colors"
              aria-label="Clear search"
            >
              <X size={18} className="text-muted-foreground" />
            </button>
          )}
          <button
            type="submit"
            className="p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors"
            aria-label="Search"
          >
            <MagnifyingGlass size={18} weight="bold" />
          </button>
        </div>
      </div>
    </form>
  );
}
