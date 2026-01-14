"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                alert("Invalid Credentials");
            } else {
                // Fetch the session to check the role
                const { getSession } = await import("next-auth/react");
                const session = await getSession();

                if (session?.user?.role === "admin") {
                    router.push("/dashboard/admin");
                } else {
                    router.push("/dashboard/student");
                }
                router.refresh();
            }
        } catch (error) {
            console.error("Login Error:", error);
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
                        Warning: <br />
                        Excellent Grades <br />
                        Ahead.
                    </h1>
                </div>
                <div>
                    <p className="text-sm opacity-70">
                        "Whatever happens here, stays here." - Secure & Confidential.
                    </p>
                </div>
            </div>

            {/* Right Side (Form) */}
            <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 text-white">
                <div className="w-full max-w-md mx-auto space-y-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-bold font-heading">Welcome Back</h2>
                        <p className="text-white/60">Enter your details to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
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
                            <div className="flex justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-xs text-white/60 hover:text-white">Forgot password?</Link>
                            </div>

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/50"
                                required
                            />
                        </div>

                        <Button className="w-full bg-white text-purple-900 hover:bg-white/90" size="lg" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-white/60">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="font-semibold text-white hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
