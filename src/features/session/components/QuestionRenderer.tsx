'use client';

import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { Question } from '@/types/template';
import type { DateResponseFormValues } from '@/validations/responseSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';

interface QuestionRendererProps {
  question: Question;
  control: Control<DateResponseFormValues>;
  errors: FieldErrors<DateResponseFormValues>;
}

export function QuestionRenderer({ question, control, errors }: QuestionRendererProps) {
  const error = errors[question.id as keyof DateResponseFormValues]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={question.id}>
        {question.label}
        {question.required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
      </Label>

      <Controller
        name={question.id as keyof DateResponseFormValues}
        control={control}
        render={({ field }) => {
          if (question.type === 'text') {
            return (
              <Input
                id={question.id}
                placeholder={question.placeholder}
                {...field}
                value={field.value as string ?? ''}
              />
            );
          }

          if (question.type === 'date') {
            return (
              <Input
                id={question.id}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...field}
                value={field.value as string ?? ''}
              />
            );
          }

          if (question.type === 'textarea') {
            return (
              <div>
                <Textarea
                  id={question.id}
                  placeholder={question.placeholder}
                  rows={4}
                  maxLength={question.maxLength}
                  {...field}
                  value={field.value as string ?? ''}
                />
                {question.maxLength && (
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {((field.value as string) ?? '').length}/{question.maxLength}
                  </p>
                )}
              </div>
            );
          }

          if (question.type === 'range' && question.min != null && question.max != null) {
            const numVal = (field.value as number) ?? question.min;
            const percent = ((numVal - question.min) / (question.max - question.min)) * 100;
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{question.unit}{question.min.toLocaleString('en-IN')}</span>
                  <span className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1.5 text-sm font-bold text-white">
                    {question.unit}{numVal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-muted-foreground">{question.unit}{question.max.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id={question.id}
                  type="range"
                  min={question.min}
                  max={question.max}
                  step={question.step ?? 1}
                  value={numVal}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  aria-valuemin={question.min}
                  aria-valuemax={question.max}
                  aria-valuenow={numVal}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) ${percent}%, hsl(var(--muted)) ${percent}%)`,
                  }}
                />
              </div>
            );
          }

          if ((question.type === 'card_select' || question.type === 'time_select') && question.options) {
            return (
              <div className={cn(
                'grid gap-3',
                question.options.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3',
              )}>
                {question.options.map((opt) => {
                  const selected = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        selected
                          ? 'border-primary bg-rose-50 shadow-sm'
                          : 'border-border bg-background hover:border-rose-300',
                      )}
                    >
                      {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                      <span className={cn('text-sm font-medium', selected ? 'text-primary' : 'text-foreground')}>
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="text-xs text-muted-foreground">{opt.description}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          }

          if (question.type === 'chip_select' && question.options) {
            return (
              <div className="flex flex-wrap gap-2">
                {question.options.map((opt) => {
                  const selected = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        'flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        selected
                          ? 'border-primary bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                          : 'border-border bg-background text-foreground hover:border-rose-300',
                      )}
                    >
                      {opt.emoji && <span>{opt.emoji}</span>}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            );
          }

          return <span className="text-sm text-muted-foreground">Unsupported question type</span>;
        }}
      />

      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}
