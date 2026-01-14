"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, GraduationCap, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Essay Writing",
        description: "Custom essays on any topic, formatted to academic standards.",
        icon: PenTool,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "Research Papers",
        description: "In-depth research with proper citations and reputable sources.",
        icon: BookOpen,
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "Case Studies",
        description: "Detailed analysis and real-world application of theories.",
        icon: FileText,
        color: "bg-green-500/10 text-green-500",
    },
    {
        title: "Dissertations",
        description: "Comprehensive thesis support from proposal to final edit.",
        icon: GraduationCap,
        color: "bg-orange-500/10 text-orange-500",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-heading">
                        Our Academic Services
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                        We provide comprehensive writing assistance across all subjects and academic levels.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70">
                                <CardHeader>
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}
                                    >
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
