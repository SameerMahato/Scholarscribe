"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6 min-h-screen mb-12 bg-slate-50/50 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-heading text-slate-900">Platform Settings</h1>
                <Button className="bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white shadow-sm">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <div className="grid gap-6 max-w-4xl">
                {/* General Configuration */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">General Configuration</CardTitle>
                        <CardDescription className="text-slate-500">Basic platform details and SEO settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="text-slate-700">Platform Name</Label>
                            <Input defaultValue="Scholarscribe" className="bg-white border-slate-200 text-slate-900 focus:border-[#3F51B5]" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-slate-700">Support Email</Label>
                            <Input defaultValue="support@scholarscribe.com" className="bg-white border-slate-200 text-slate-900 focus:border-[#3F51B5]" />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing Rules */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Pricing & Commission</CardTitle>
                        <CardDescription className="text-slate-500">Manage base rates and writer take rates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-slate-700">Base Price per Page ($)</Label>
                                <Input type="number" defaultValue="15" className="bg-white border-slate-200 text-slate-900 focus:border-[#3F51B5]" />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-slate-700">Urgent Multiplier (x)</Label>
                                <Input type="number" defaultValue="1.5" className="bg-white border-slate-200 text-slate-900 focus:border-[#3F51B5]" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-slate-700">Writer Commission (%)</Label>
                            <Input type="number" defaultValue="70" className="bg-white border-slate-200 text-slate-900 focus:border-[#3F51B5]" />
                        </div>
                    </CardContent>
                </Card>

                {/* System Toggles */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">System Controls</CardTitle>
                        <CardDescription className="text-slate-500">Enable or disable critical platform features.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base text-slate-900">New Order Acceptance</Label>
                                <p className="text-sm text-slate-500">Allow students to place new orders.</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base text-slate-900">Writer Registration</Label>
                                <p className="text-sm text-slate-500">Allow new writers to sign up.</p>
                            </div>
                            <Switch checked={false} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base text-slate-900">Maintenance Mode</Label>
                                <p className="text-sm text-slate-500">Take the site offline for updates.</p>
                            </div>
                            <Switch checked={false} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
