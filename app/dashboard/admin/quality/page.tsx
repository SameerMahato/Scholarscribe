"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileSearch, XCircle } from "lucide-react";

export default function QualityControlPage() {
    return (
        <div className="space-y-6 min-h-screen bg-slate-50/50 p-6">
            <h1 className="text-3xl font-bold font-heading text-slate-900">Quality Control</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
                            <FileSearch className="h-5 w-5 text-amber-500" />
                            Pending Reviews
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-slate-900">Order #ORD-0099</h4>
                                <p className="text-sm text-slate-600">Subject: Advanced Macroeconomics</p>
                                <p className="text-xs text-slate-500 mt-1">Writer: Dr. Alan Grant</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">Approve</Button>
                                <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">Revision</Button>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-slate-900">Order #ORD-0102</h4>
                                <p className="text-sm text-slate-600">Subject: Nursing Ethics</p>
                                <p className="text-xs text-slate-500 mt-1">Writer: Sarah Harding</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">Approve</Button>
                                <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">Revision</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Plagiarism Flags
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                            <CheckCircle className="h-12 w-12 mb-3 opacity-20" />
                            <p className="font-medium">No active plagiarism alerts.</p>
                            <p className="text-xs">System is monitoring all uploads.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
