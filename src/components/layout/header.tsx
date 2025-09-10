import Link from "next/link";

export function Header() {
    return (
        <header className="px-4 lg:px-6 h-20 flex items-center bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <span className="text-3xl font-headline font-extrabold text-primary">B4</span>
                <span className="sr-only">B4 – The Panelling Experts</span>
            </Link>
            <p className="ml-4 font-body text-sm text-foreground/90 hidden md:block">The Panelling Experts</p>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href="#portfolio" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                    Portfolio
                </Link>
                <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                    Services
                </Link>
                <Link href="#quiz" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                    Quiz
                </Link>
                <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80">
                    Contact
                </Link>
            </nav>
        </header>
    );
}
