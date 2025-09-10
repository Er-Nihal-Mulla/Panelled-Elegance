'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { submitInquiry } from '@/app/actions';
import { Mail, MessageSquare, User, Loader2, Phone } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Inquiry
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const initialState = { message: '', isSuccess: false };
  const [state, dispatch] = useFormState(submitInquiry, initialState);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.isSuccess ? 'Success!' : 'Oops!',
        description: state.message,
        variant: state.isSuccess ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="max-w-2xl mx-auto mt-12 shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Name
            </Label>
            <Input id="name" name="name" placeholder="Your Name" required />
            {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> Email
            </Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" required />
            {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> Phone Number
            </Label>
            <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
            {state.errors?.phone && <p className="text-sm text-destructive">{state.errors.phone[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> Message (Optional)
            </Label>
            <Textarea id="message" name="message" placeholder="Tell us about your project..." rows={5} />
            {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
