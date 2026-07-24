import { z } from 'zod';

export const preferenceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  preferred_date: z
    .string()
    .min(1, 'Please pick a date')
    .refine((val) => {
      const picked = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, 'Date cannot be in the past'),
  preferred_time: z.string().min(1, 'Please select a time'),
  date_type: z.string().min(1, 'Please choose a date type'),
  cuisine: z.string().min(1, 'Please choose a cuisine'),
  budget: z.number().min(500, 'Minimum ₹500').max(5000, 'Maximum ₹5000'),
  mood: z.string().min(1, 'Please choose a mood'),
  outfit: z.string().min(1, 'Please choose an outfit preference'),
  note: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type PreferenceFormValues = z.infer<typeof preferenceSchema>;
