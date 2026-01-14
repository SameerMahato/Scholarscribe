"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
        };

        const name = target.name.value;
        const email = target.email.value;
        const password = target.password.value;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Account created! Redirecting to login...");
                router.push("/auth/login");
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Left Side (Visual/Brand) */}
            <div className="hidden w-1/2 flex-col justify-between bg-white/5 p-12 text-white md:flex bg-gradient-to-br from-white/10 to-transparent">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-purple-900">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold font-heading">Scholarscribe</span>
                    </Link>
                    <h1 className="text-4xl font-bold leading-tight font-heading">
                        Join the <br />
                        Top 1% of <br />
                        Students.
                    </h1>
                </div>
                <div>
                    <p className="text-sm opacity-70">
                        Get started with 50% off your first assignment.
                    </p>
                </div>
            </div>

            {/* Right Side (Form) */}
            <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 text-white">
                <div className="w-full max-w-md mx-auto space-y-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-bold font-heading">Create Account</h2>
                        <p className="text-white/60">Fill in your details to get started.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="student@university.edu"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/50"
                                required
                            />
                        </div>

                        <Button className="w-full bg-white text-purple-900 hover:bg-white/90" size="lg" disabled={loading}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-white/60">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-semibold text-white hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
