"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Download, Search, UploadCloud } from "lucide-react";

const steps = [
    {
        title: "Submit Your Assignment",
        description: "Fill out the order form with your requirements, subject, and deadline.",
        icon: UploadCloud,
    },
    {
        title: "Get an Expert Writer",
        description: "We match you with a subject matter expert who starts working immediately.",
        icon: Search,
    },
    {
        title: "Track Progress",
        description: "Chat with your writer and track the status of your order in real-time.",
        icon: ClipboardCheck,
    },
    {
        title: "Download Quality Work",
        description: "Receive your plagiarism-free paper before the deadline and request edits if needed.",
        icon: Download,
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-heading">
                        How It Works
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                        Get your assignment done in 4 simple steps.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[50%] top-0 h-full w-px bg-border hidden md:block" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className={`p-6 rounded-2xl bg-white/50 border border-white/20 shadow-sm backdrop-blur-sm dark:bg-slate-900/50 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>

                                {/* Icon Wrapper (Center) */}
                                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                                    <step.icon className="h-6 w-6" />
                                </div>

                                {/* Empty Space for alignment */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
