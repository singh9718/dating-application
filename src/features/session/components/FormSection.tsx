import { cn } from '@/utils/cn';

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, icon, children, className }: FormSectionProps) {
  return (
    <fieldset className={cn('rounded-2xl border border-border bg-card p-6 shadow-sm', className)}>
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center gap-3 mb-5" aria-hidden="true">
        {icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            {icon}
          </div>
        )}
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </fieldset>
  );
}
