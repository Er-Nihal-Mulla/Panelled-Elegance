import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectShowcase } from "@/components/features/project-showcase";
import { StyleQuiz } from "@/components/features/style-quiz";
import { ContactForm } from "@/components/features/contact-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers3, PanelRight, Fence, Boxes } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40 bg-card/50">
           <Image
            src="/logo.png"
            alt="B4 - The Panelling Experts Logo"
            fill
            style={{objectFit: "cover"}}
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            priority
          />
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                Panelled Elegance, Expertly Crafted
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/80 font-body">
                At B4 Interior, we transform spaces with bespoke wall paneling, from timeless wainscoting to modern 3D designs. Discover the art of texture and shadow.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="font-bold">
                  <a href="#portfolio">View Our Work</a>
                </Button>
                <Button asChild variant="link" size="lg" className="text-secondary font-bold">
                  <a href="#contact">Get In Touch &rarr;</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl text-primary">Our Portfolio</h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              Explore a selection of our finest paneling projects, each telling a unique story of style and craftsmanship.
            </p>
            <ProjectShowcase />
          </div>
        </section>

        <Separator className="my-16 w-1/2 mx-auto" />

        <section id="services" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl text-primary">Our Services</h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              We offer a wide range of interior solutions to bring your vision to life with quality and precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <Card className="text-center bg-card/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Layers3 className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-4">PVC & POP Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Ceiling and Wall Paneling solutions to redefine your spaces.</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <PanelRight className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-4">ACP Aluminium Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Durable and modern Aluminium Composite Panel installations.</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Fence className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-4">Glass & Railings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Toughened glass applications and elegant railing systems.</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Boxes className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-4">Modular Interiors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Custom modular solutions for a fully personalized interior.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-16 w-1/2 mx-auto" />

        <section id="quiz" className="w-full py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl text-primary">Find Your Perfect Style</h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              Not sure where to start? Take our quick quiz to discover the paneling style that best suits your space and taste.
            </p>
            <StyleQuiz />
          </div>
        </section>

        <Separator className="my-16 w-1/2 mx-auto" />

        <section id="contact" className="w-full py-16 md:py-24 bg-card/50">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl text-primary">Start Your Transformation</h2>
                 <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
                    Ready to bring your vision to life? Contact us for a consultation and a complimentary quote.
                </p>
                <ContactForm />
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
