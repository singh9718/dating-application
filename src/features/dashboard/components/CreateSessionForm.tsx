'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CopyLinkButton } from '@/components/shared/CopyLinkButton';
import { createSessionSchema, type CreateSessionFormValues } from '@/validations/sessionSchema';
import { createSessionAction } from '@/actions/sessionActions';
import { ROUTES } from '@/constants/routes';
import { buildShareUrl } from '@/utils/sessionCode';

export function CreateSessionForm() {
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState('');
  const [sessionCode, setSessionCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSessionFormValues>({
    resolver: zodResolver(createSessionSchema),
  });

  const onSubmit = async (data: CreateSessionFormValues) => {
    const formData = new FormData();
    formData.set('title', data.title);
    if (data.description) formData.set('description', data.description);
    if (data.expires_at) formData.set('expires_at', data.expires_at);

    const result = await createSessionAction(formData);
    if (result.code === 'success' && result.data) {
      setShareUrl(result.data.shareUrl);
      setSessionCode(result.data.session.code);
    }
  };

  if (shareUrl) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm font-medium text-green-800 mb-1">Session created!</p>
          <p className="text-xs text-green-700">Share this link with your partner.</p>
        </div>

        <div className="rounded-xl border border-border bg-muted p-4 text-sm break-all text-muted-foreground font-mono">
          {shareUrl}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <CopyLinkButton url={shareUrl} className="flex-1" />
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(shareUrl, '_blank')}
          >
            Open form
          </Button>
          <Button
            variant="gradient"
            className="flex-1"
            onClick={() => router.push(ROUTES.dashboardSession(sessionCode))}
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="title">Session title <span className="text-destructive">*</span></Label>
        <Input
          id="title"
          placeholder="e.g. Our anniversary date"
          {...register('title')}
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
        <Textarea
          id="description"
          placeholder="A short note for your partner…"
          rows={3}
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="expires_at">Expiry date <span className="text-muted-foreground text-xs">(optional)</span></Label>
        <Input
          id="expires_at"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          {...register('expires_at')}
        />
        {errors.expires_at && <p className="text-xs text-destructive">{errors.expires_at.message}</p>}
      </div>

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        <Plus className="size-4" />
        Create session
      </Button>
    </form>
  );
}
