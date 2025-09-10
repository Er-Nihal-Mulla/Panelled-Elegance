'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Building } from 'lucide-react';

export function ContactForm() {
  return (
    <Card className="max-w-2xl mx-auto mt-12 shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <p className="text-foreground/80">
          We'd love to hear from you. Reach out to us through any of the channels below.
        </p>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-primary" />
            <a href="tel:+919284224763" className="text-lg hover:underline">+91 92842 24763</a>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:contact@b4paneling.com" className="text-lg hover:underline">contact@b4paneling.com</a>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="text-lg">123 Panelling Drive, Design District, 400051</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
