import { z } from 'zod';

export const createSessionSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(80, 'Title too long'),
  description: z.string().max(300, 'Description too long').optional(),
  expires_at: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return new Date(val) > new Date();
      },
      { message: 'Expiration date must be in the future' },
    ),
});

export type CreateSessionFormValues = z.infer<typeof createSessionSchema>;
