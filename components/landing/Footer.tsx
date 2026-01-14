import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-10 md:py-16">
            <div className="container mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold font-heading">Scholarscribe</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Premium academic writing assistance for students who aim for excellence.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold">Services</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Essay Writing</li>
                        <li>Research Papers</li>
                        <li>Dissertations</li>
                        <li>Case Studies</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>About Us</li>
                        <li>Join as Writer</li>
                        <li>Reviews</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold">Legal</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Refund Policy</li>
                        <li>Fair Use Policy</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-12 px-4 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Scholarscribe. All rights reserved.
            </div>
        </footer>
    );
}
