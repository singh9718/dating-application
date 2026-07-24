'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { CalendarDays, User, StickyNote } from 'lucide-react';

import { preferenceSchema, type PreferenceFormValues } from '@/lib/validations';
import { submitPreference } from '@/app/actions/submitPreference';

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import TimeSelector from '@/components/TimeSelector';
import DateTypeCards from '@/components/DateTypeCards';
import CuisineSelector from '@/components/CuisineSelector';
import BudgetSlider from '@/components/BudgetSlider';
import MoodSelector from '@/components/MoodSelector';
import OutfitSelector from '@/components/OutfitSelector';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Section({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-3xl p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600">{icon}</div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function DatePreferenceForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PreferenceFormValues>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: { budget: 2000 },
  });

  const noteValue = watch('note') ?? '';

  const onSubmit = async (data: PreferenceFormValues) => {
    try {
      const result = await submitPreference(data);
      if (result?.error) {
        toast.error(result.error);
      }
    } catch {
      // redirect throws — this is expected on success
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 max-w-2xl mx-auto">
      {/* Personal */}
      <Section title="Personal" icon={<User size={18} />} delay={0}>
        <Input
          id="name"
          label="Your Name"
          placeholder="What should I call you?"
          error={errors.name?.message}
          {...register('name')}
        />
      </Section>

      {/* Date */}
      <Section title="Date" icon={<CalendarDays size={18} />} delay={0.05}>
        <Input
          id="preferred_date"
          label="Preferred Date"
          type="date"
          min={today}
          error={errors.preferred_date?.message}
          {...register('preferred_date')}
        />
      </Section>

      {/* Time */}
      <Section title="Time of Day" icon={<span className="text-base">🕐</span>} delay={0.1}>
        <Controller
          name="preferred_time"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TimeSelector value={field.value} onChange={field.onChange} error={errors.preferred_time?.message} />
          )}
        />
      </Section>

      {/* Date Type */}
      <Section title="Type of Date" icon={<span className="text-base">📍</span>} delay={0.15}>
        <Controller
          name="date_type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <DateTypeCards value={field.value} onChange={field.onChange} error={errors.date_type?.message} />
          )}
        />
      </Section>

      {/* Cuisine */}
      <Section title="Cuisine" icon={<span className="text-base">🍴</span>} delay={0.2}>
        <Controller
          name="cuisine"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CuisineSelector value={field.value} onChange={field.onChange} error={errors.cuisine?.message} />
          )}
        />
      </Section>

      {/* Budget */}
      <Section title="Budget" icon={<span className="text-base">💰</span>} delay={0.25}>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <BudgetSlider value={field.value} onChange={field.onChange} error={errors.budget?.message} />
          )}
        />
      </Section>

      {/* Mood */}
      <Section title="Mood" icon={<span className="text-base">🌸</span>} delay={0.3}>
        <Controller
          name="mood"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MoodSelector value={field.value} onChange={field.onChange} error={errors.mood?.message} />
          )}
        />
      </Section>

      {/* Outfit */}
      <Section title="Outfit Preference" icon={<span className="text-base">👗</span>} delay={0.35}>
        <Controller
          name="outfit"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <OutfitSelector value={field.value} onChange={field.onChange} error={errors.outfit?.message} />
          )}
        />
      </Section>

      {/* Notes */}
      <Section title="Additional Notes" icon={<StickyNote size={18} />} delay={0.4}>
        <div className="space-y-1">
          <Textarea
            id="note"
            label="Anything you'd like me to know..."
            placeholder="Allergies, special requests, your favourite song to play…"
            rows={4}
            error={errors.note?.message}
            {...register('note')}
          />
          <p className="text-xs text-gray-400 text-right">{noteValue.length}/500</p>
        </div>
      </Section>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="pt-2"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold shadow-xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <span className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Planning your date…</span>
            </>
          ) : (
            <>
              <span>Plan Our Date</span>
              <span>❤️</span>
            </>
          )}
        </button>
      </motion.div>
    </form>
  );
}
