import FloatingShapes from "@/components/FloatingShapes";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#3F51B5]">
            <FloatingShapes />

            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <div className="relative z-10 w-full max-w-[1000px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl mx-4 flex min-h-[600px]">
                {children}
            </div>
        </div>
    );
}
