"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AdminReportsPage() {
    return (
        <div className="space-y-6 text-white min-h-screen">
            <h1 className="text-3xl font-bold font-heading">Analytics & Reports</h1>

            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm text-white">
                <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
                    <BarChart3 className="h-16 w-16 text-slate-700 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Detailed Analytics Coming Soon</h3>
                    <p className="text-slate-500">We are currently gathering data to build your charts.</p>
                </CardContent>
            </Card>
        </div>
    );
}
