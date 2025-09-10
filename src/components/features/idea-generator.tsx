'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateIdeas } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Loader2, Lightbulb } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Ideas
    </Button>
  );
}

export function IdeaGenerator() {
  const initialState = {};
  const [state, dispatch] = useActionState(generateIdeas, initialState);

  return (
    <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Idea Generator</CardTitle>
          <CardDescription className="text-center">Fill out the form to get 3 unique ideas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select name="roomType" defaultValue="living-room" required>
                <SelectTrigger id="roomType">
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="living-room">Living Room</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="dining-room">Dining Room</SelectItem>
                  <SelectItem value="hallway">Hallway</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Desired Style</Label>
              <Select name="style" defaultValue="modern" required>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="rustic">Rustic</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Select name="budget" defaultValue="medium" required>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select a budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg h-full border-dashed border-primary/30 min-h-[300px]">
        <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <Lightbulb className="text-primary" /> AI Suggestions
            </CardTitle>
        </CardHeader>
        <CardContent>
            {state.message && <p className="text-destructive">{state.message}</p>}
            {state.ideas ? (
                <ul className="space-y-4 list-disc list-inside text-foreground/90">
                    {state.ideas.map((idea, index) => (
                        <li key={index}>{idea}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">Your generated ideas will appear here...</p>
            )}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">Powered by Google AI</p>
        </CardFooter>
      </Card>
    </div>
  );
}
