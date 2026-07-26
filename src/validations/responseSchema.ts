import { z } from 'zod';
import { todayISOString } from '@/utils/dates';

export const dateResponseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  preferred_date: z
    .string()
    .min(1, 'Please pick a date')
    .refine((val) => val >= todayISOString(), { message: 'Date cannot be in the past' }),
  preferred_time: z.string().min(1, 'Please select a time'),
  date_type: z.string().min(1, 'Please choose a date type'),
  cuisine: z.string().min(1, 'Please choose a cuisine'),
  budget: z.number().min(500, 'Minimum ₹500').max(5000, 'Maximum ₹5,000'),
  mood: z.string().min(1, 'Please choose a mood'),
  outfit: z.string().min(1, 'Please choose an outfit preference'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type DateResponseFormValues = z.infer<typeof dateResponseSchema>;
