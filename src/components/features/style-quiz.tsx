'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BedDouble, Building, Drama, Hand, Heart, Landmark, Palette, Sparkles, Wallet } from 'lucide-react';

const quizSteps = [
  {
    question: 'Which room are you designing for?',
    key: 'room',
    options: [
      { value: 'living-room', label: 'Living Room', icon: <Drama /> },
      { value: 'bedroom', label: 'Bedroom', icon: <BedDouble /> },
      { value: 'office', label: 'Office', icon: <Building /> },
      { value: 'other', label: 'Other', icon: <Sparkles /> },
    ],
  },
  {
    question: "What's your preferred style?",
    key: 'style',
    options: [
      { value: 'modern', label: 'Modern & Clean', icon: <Palette /> },
      { value: 'classic', label: 'Classic & Timeless', icon: <Landmark /> },
      { value: 'rustic', label: 'Rustic & Cozy', icon: <Hand /> },
      { value: 'bold', label: 'Bold & Dramatic', icon: <Heart /> },
    ],
  },
  {
    question: 'What is your approximate budget?',
    key: 'budget',
    options: [
      { value: 'economical', label: 'Economical', icon: <Wallet className="opacity-50" /> },
      { value: 'moderate', label: 'Moderate', icon: <Wallet /> },
      { value: 'premium', label: 'Premium', icon: <Wallet className="text-primary" /> },
    ],
  },
];

const recommendations: Record<string, string[]> = {
  modern: ["Sleek, geometric patterns.", "Vertical slat wood paneling.", "Minimalist flat panels with subtle reveals."],
  classic: ["Traditional wainscoting.", "Elegant picture frame moulding.", "Raised panel designs for a formal look."],
  rustic: ["Reclaimed wood or shiplap.", "Board and batten for a farmhouse feel.", "Natural, textured wood finishes."],
  bold: ["3D geometric wall panels.", "Dark, moody colors with dramatic lighting.", "Floor-to-ceiling paneling for maximum impact."],
};

export function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleNext = () => setStep((s) => Math.min(s + 1, quizSteps.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleReset = () => {
    setStep(0);
    setAnswers({});
  };

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  
  const progress = ((step) / quizSteps.length) * 100;
  const currentStep = quizSteps[step];
  const selectedStyle = answers['style'] as keyof typeof recommendations;

  return (
    <Card className="max-w-3xl mx-auto mt-12 shadow-lg border-primary/20">
      <CardHeader>
        {step < quizSteps.length && (
            <Progress value={progress} className="w-full mb-4 h-2" />
        )}
        <CardTitle className="text-2xl font-headline text-center">{step < quizSteps.length ? currentStep.question : 'Your Style Profile'}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[250px] flex flex-col justify-center">
        {step < quizSteps.length ? (
          <RadioGroup
            onValueChange={(value) => handleSelect(currentStep.key, value)}
            value={answers[currentStep.key]}
            className="grid grid-cols-2 gap-4"
          >
            {currentStep.options.map((opt) => (
              <Label key={opt.value} htmlFor={opt.value} className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 hover:bg-accent/10 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent/20 cursor-pointer">
                <RadioGroupItem value={opt.value} id={opt.value} className="sr-only" />
                <div className="text-primary">{opt.icon}</div>
                <span className="font-semibold">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        ) : (
          <div className="text-center">
            <CardDescription className="text-lg">Based on your choices, we recommend a <span className="text-primary font-bold">{answers.style}</span> style for your <span className="text-primary font-bold">{answers.room?.replace('-', ' ')}</span>.</CardDescription>
            <h3 className="font-headline text-xl mt-6 mb-3 text-secondary">Style Suggestions:</h3>
            <ul className="space-y-2 list-disc list-inside text-left max-w-md mx-auto">
              {recommendations[selectedStyle]?.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        )}
      </CardContent>
      <div className="flex items-center justify-between p-6">
        {step > 0 ? (
          <Button variant="outline" onClick={step < quizSteps.length ? handleBack : handleReset}>
            {step < quizSteps.length ? 'Back' : 'Start Over'}
          </Button>
        ) : <div />}
        {step < quizSteps.length -1 && (
            <Button onClick={handleNext} disabled={!answers[currentStep.key]}>Next</Button>
        )}
        {step === quizSteps.length -1 && (
            <Button onClick={handleNext} disabled={!answers[currentStep.key]}>View Results</Button>
        )}
        {step === quizSteps.length && (
            <Button asChild><a href="#contact">Get In Touch</a></Button>
        )}
      </div>
    </Card>
  );
}
