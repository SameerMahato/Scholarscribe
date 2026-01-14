"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const testimonials = [
    {
        name: "Alex Johnson",
        role: "Law Student",
        content: "Saved my semester! The research paper was impeccable and delivered 2 days early.",
        avatar: "AJ",
    },
    {
        name: "Sarah Lee",
        role: "Nursing Major",
        content: "I was struggling with my case study. The writer understood the requirements perfectly.",
        avatar: "SL",
    },
    {
        name: "Michael Chen",
        role: "MBA Candidate",
        content: "Highly professional service. The business plan they wrote helped me ace the module.",
        avatar: "MC",
    },
];

function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
            >
                {children}
            </div>
        </motion.div>
    );
}

export default function Testimonials() {
    return (
        <section className="py-20 perspective-1000 bg-[#F8FAFC] dark:bg-slate-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-12 font-heading text-[#0F172A] dark:text-slate-100">
                    Trusted by Students Worldwide
                </h2>
                <div className="grid gap-8 md:grid-cols-3 perspective-1000">
                    {testimonials.map((t) => (
                        <div key={t.name} className="relative group perspective-1000">
                            <TiltCard>
                                <Card
                                    className="border-none h-full transition-shadow duration-300 bg-[#FFFFFF] dark:bg-black/40 backdrop-blur-md"
                                    style={{
                                        boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)"
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <Avatar className="h-12 w-12 border-2 border-[#E0E7FF]">
                                            <AvatarFallback className="bg-[#E0E7FF] text-[#2563EB] font-bold">{t.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-lg text-[#0F172A] dark:text-slate-100">{t.name}</p>
                                            <p className="text-sm text-[#64748B] dark:text-slate-400">{t.role}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="italic leading-relaxed text-base text-[#64748B] dark:text-slate-300">
                                            <span className="text-[#2563EB] text-xl font-bold mr-1">"</span>
                                            {t.content}
                                            <span className="text-[#2563EB] text-xl font-bold ml-1">"</span>
                                        </p>
                                    </CardContent>
                                </Card>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
