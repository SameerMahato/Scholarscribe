"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Reviews", href: "#reviews" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "border-b border-slate-200 bg-background/80 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <span className={cn("text-xl font-bold font-heading transition-colors", isScrolled ? "text-slate-900" : "text-white")}>
                        Scholarscribe
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {["Services", "How It Works", "Reviews", "FAQ"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isScrolled ? "text-slate-700" : "text-slate-100 hover:text-white"
                            )}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className={cn(
                            "transition-colors",
                            isScrolled ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100" : "text-slate-100 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button size="sm" className="rounded-full px-6" asChild>
                        <Link href="/auth/signup">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className={cn("md:hidden", isScrolled ? "text-slate-900" : "text-white")}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 pt-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-border" />
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" asChild>
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/auth/signup">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
