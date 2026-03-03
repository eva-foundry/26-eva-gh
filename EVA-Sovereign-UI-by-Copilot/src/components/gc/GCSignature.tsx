import { cn } from '@/lib/utils';

interface GCSignatureProps {
  variant?: 'en' | 'fr';
  inverted?: boolean;
  className?: string;
}

export function GCSignature({ variant = 'en', inverted = false, className }: GCSignatureProps) {
  const imageUrl = variant === 'en'
    ? 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg'
    : 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg';

  const altText = variant === 'en'
    ? 'Government of Canada'
    : 'Gouvernement du Canada';

  return (
    <img
      src={imageUrl}
      alt={altText}
      className={cn(
        'h-8',
        inverted && 'brightness-0 invert',
        className
      )}
    />
  );
}
