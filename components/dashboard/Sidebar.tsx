"use client";
import { signOut } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FilePlus,
    ListOrdered,
    CreditCard,
    Settings,
    Sparkles,
    LogOut,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    // Determine if we are in the admin dashboard
    const isAdmin = pathname?.startsWith("/dashboard/admin");

    const studentLinks = [
        { name: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
        { name: "New Order", href: "/dashboard/student/order", icon: FilePlus },
        { name: "My Orders", href: "/dashboard/student/orders", icon: ListOrdered },
        { name: "Payments", href: "/dashboard/student/payments", icon: CreditCard },
        { name: "Settings", href: "/dashboard/student/settings", icon: Settings },
    ];

    const adminLinks = [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Orders", href: "/dashboard/admin/orders", icon: ListOrdered },
        { name: "Writers", href: "/dashboard/admin/writers", icon: FilePlus }, // Using FilePlus as placeholder for Users/Writers
        { name: "Students", href: "/dashboard/admin/students", icon: Sparkles },
        { name: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
        { name: "Quality Control", href: "/dashboard/admin/quality", icon: FilePlus },
        { name: "Reports", href: "/dashboard/admin/reports", icon: LayoutDashboard },
        { name: "Support", href: "/dashboard/admin/support", icon: Sparkles },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];

    const links = isAdmin ? adminLinks : studentLinks;

    return (
        <div className={cn("flex flex-col pb-12", className)}>
            <div className="flex h-16 items-center border-b border-border/50 px-6">
                <Link href="/" className="flex items-center gap-2 font-bold font-heading text-lg">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
                        <Sparkles className="h-4 w-4" />
                    </div>
                    Scholarscribe
                </Link>
            </div>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {links.map((link) => (
                            <Button
                                key={link.href}
                                variant={pathname === link.href ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={link.href}>
                                    <link.icon className="mr-2 h-4 w-4" />
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-auto px-4">
                <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                    <h4 className="font-semibold text-sm mb-1">Need Help?</h4>
                    <p className="text-xs text-muted-foreground mb-3">Contact support 24/7</p>
                    <Button size="sm" className="w-full" variant="outline">Support</Button>
                </div>
                <div className="mt-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-red-500 px-2"
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
}
