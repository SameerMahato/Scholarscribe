import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex h-screen overflow-hidden bg-background">
            {/* Background Gradients (Consistent with Landing) */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
            </div>

            {/* Sidebar */}
            <Sidebar className="relative z-20 hidden w-64 border-r border-border/50 bg-background/60 backdrop-blur-xl lg:block" />

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-1 flex-col overflow-hidden bg-transparent">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
