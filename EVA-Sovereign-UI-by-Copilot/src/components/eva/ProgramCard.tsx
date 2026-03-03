import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
  linkText?: string;
  onLearnMore?: () => void;
  className?: string;
}

export function ProgramCard({ icon, title, description, linkText = 'Learn more', onLearnMore, className }: ProgramCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow duration-200', className)}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="text-5xl" aria-hidden="true">{icon}</div>
          <div className="flex-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2 text-base">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      {onLearnMore && (
        <CardContent>
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-primary hover:underline flex items-center gap-2 group"
            onClick={onLearnMore}
          >
            {linkText}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" weight="bold" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
