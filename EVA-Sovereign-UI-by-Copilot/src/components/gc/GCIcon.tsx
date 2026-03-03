import { cn } from '@/lib/utils';
import * as PhosphorIcons from '@phosphor-icons/react';

interface GCIconProps {
  name: keyof typeof PhosphorIcons;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  className?: string;
}

export function GCIcon({ name, size = 24, weight = 'regular', className }: GCIconProps) {
  const IconComponent = PhosphorIcons[name] as React.ComponentType<{
    size?: number;
    weight?: string;
    className?: string;
  }>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} weight={weight} className={cn(className)} />;
}
