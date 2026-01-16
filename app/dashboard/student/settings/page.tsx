"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences and security.</p>
                </div>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm max-w-2xl">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-10 w-10 text-primary" />
                        </div>
                        <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Your name" defaultValue={session?.user?.name || ""} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your email" disabled value={session?.user?.email || ""} />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 border-none font-bold">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
