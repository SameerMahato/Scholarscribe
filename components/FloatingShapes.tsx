"use client";

import { motion } from "framer-motion";

export default function FloatingShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large Floating Circle 1 */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Large Floating Circle 2 */}
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[100px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 3D-like Cube 1 */}
            <motion.div
                className="absolute top-[20%] right-[15%] h-24 w-24 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-md shadow-xl"
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* 3D-like Cube 2 (Small) */}
            <motion.div
                className="absolute bottom-[30%] left-[10%] h-16 w-16 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm"
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -180, -360],
                    x: [0, 20, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* 3D-like Floating Pill */}
            <motion.div
                className="absolute top-[60%] right-[30%] h-12 w-32 rounded-full bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/20 backdrop-blur-sm"
                animate={{
                    y: [0, -60, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 3D Wave Animation */}
            <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-30">
                <motion.svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-full scale-[2] origin-bottom"
                    animate={{
                        x: [-200, 0, -200],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <path
                        fill="#3F51B5"
                        fillOpacity="0.3"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </motion.svg>
                <motion.svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-full scale-[2.5] origin-bottom"
                    style={{ left: '-50%' }}
                    animate={{
                        x: [0, -200, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <path
                        fill="#7C83FD"
                        fillOpacity="0.3"
                        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </motion.svg>
            </div>
        </div>
    );
}
