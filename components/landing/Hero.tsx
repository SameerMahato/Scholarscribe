"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden py-20 lg:py-32" style={{ background: "linear-gradient(135deg, #3F51B5 0%, #7C83FD 60%, #C7D2FE 100%)" }}>
            {/* Background Gradients - Removed previous blobs in favor of strict gradient */}

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="space-y-4">
                            {/* Social Proof Badge */}
                            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-md">
                                <div className="flex -space-x-2 mr-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`h-6 w-6 rounded-full border-2 border-primary bg-gray-${i * 100 + 200}`} style={{ backgroundColor: i % 2 === 0 ? '#C7D2FE' : '#E0E7FF' }} />
                                    ))}
                                </div>
                                <span className="font-medium">Over 1,000+ students achieved top grades</span>
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl font-heading text-white">
                                Master Your Grades with{" "}
                                <span className="text-white/90">
                                    Research-Backed
                                </span>{" "}
                                Writing
                            </h1>
                            <p className="max-w-[600px] text-lg text-blue-50 md:text-xl">
                                Get expert help with essays, research papers, and assignments.
                                Zero plagiarism, on-time delivery, and 100% confidential.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" className="rounded-full text-base bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 font-bold border-none" asChild>
                                <Link href="/auth/signup">
                                    Get Assignment Help <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full text-base bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                                asChild
                            >
                                <Link href="/auth/login">Student Login</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm font-medium text-blue-100 sm:grid-cols-4">
                            {["100% Plagiarism-Free", "On-Time Delivery", "Ph.D. Writers", "24/7 Support"].map(
                                (feature) => (
                                    <div key={feature} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-[#2DD4BF]" />
                                        {feature}
                                    </div>
                                )
                            )}
                        </div>
                    </motion.div>

                    {/* Visual Element (Mockup) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Glass Card 1 */}
                            <div className="relative z-20 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
                                <div className="rounded-xl bg-slate-900/80 p-6 md:p-8">
                                    {/* Dashboard Mockup Content */}
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="h-4 w-24 rounded bg-white/20" />
                                        <div className="h-8 w-8 rounded-full bg-blue-500/50" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-24 rounded-lg bg-white/10 p-4">
                                            <div className="mb-2 h-2 w-12 rounded bg-green-400" />
                                            <div className="h-4 w-32 rounded bg-white/30" />
                                        </div>
                                        <div className="h-24 rounded-lg bg-white/10 p-4">
                                            <div className="mb-2 h-2 w-12 rounded bg-yellow-400" />
                                            <div className="h-4 w-32 rounded bg-white/30" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 z-30 rounded-xl border border-white/20 bg-background/80 p-4 shadow-xl backdrop-blur-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        A+
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Excellent</p>
                                        <p className="text-xs text-muted-foreground">Grade Achieved</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
