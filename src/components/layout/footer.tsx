import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="w-full bg-card/50">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-2xl font-headline font-bold text-primary">B4</p>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link href="#portfolio" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                            Portfolio
                        </Link>
                        <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                            Services
                        </Link>
                        <Link href="#quiz" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                            Style Quiz
                        </Link>
                        <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                            Contact
                        </Link>
                    </nav>
                </div>
                <Separator className="my-6" />
                <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} B4 – The Panelling Experts. All rights reserved.</p>
            </div>
        </footer>
    )
}
