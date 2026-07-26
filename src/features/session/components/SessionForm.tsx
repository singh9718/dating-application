'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Heart, User, Calendar, Clock, MapPin, UtensilsCrossed, Wallet, Smile, Shirt, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormSection } from './FormSection';
import { QuestionRenderer } from './QuestionRenderer';
import { dateResponseSchema, type DateResponseFormValues } from '@/validations/responseSchema';
import { DATE_PLANNING_TEMPLATE } from '@/constants/templates';
import { submitResponseAction } from '@/actions/responseActions';

const SECTION_ICONS: Record<string, React.ReactNode> = {
  name: <User className="size-4" />,
  preferred_date: <Calendar className="size-4" />,
  preferred_time: <Clock className="size-4" />,
  date_type: <MapPin className="size-4" />,
  cuisine: <UtensilsCrossed className="size-4" />,
  budget: <Wallet className="size-4" />,
  mood: <Smile className="size-4" />,
  outfit: <Shirt className="size-4" />,
  notes: <StickyNote className="size-4" />,
};

interface SessionFormProps {
  sessionCode: string;
}

export function SessionForm({ sessionCode }: SessionFormProps) {
  const [serverError, setServerError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DateResponseFormValues>({
    resolver: zodResolver(dateResponseSchema),
    defaultValues: { budget: 2000 },
  });

  const onSubmit = async (data: DateResponseFormValues) => {
    setServerError('');
    const result = await submitResponseAction(sessionCode, data);
    if (result?.code !== 'success') {
      setServerError(result?.message ?? 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {DATE_PLANNING_TEMPLATE.questions.map((question) => (
        <FormSection
          key={question.id}
          title={question.label}
          icon={SECTION_ICONS[question.id]}
        >
          <QuestionRenderer question={question} control={control} errors={errors} />
        </FormSection>
      ))}

      {serverError && (
        <p className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="xl"
        className="w-full"
        loading={isSubmitting}
      >
        <Heart className="size-5" />
        Submit my preferences
      </Button>
    </form>
  );
}
