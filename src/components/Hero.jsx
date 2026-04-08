"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
    const [typedText, setTypedText] = useState("");
    const [particles, setParticles] = useState([]);
    const fullText = "9+ Years of Excellence in Software Engineering";

    useEffect(() => {
        // Typing animation
        let i = 0;
        const typing = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
        return () => clearInterval(typing);
    }, []);

    // Initialize particles only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const newParticles = [...Array(80)].map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                colorClass: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-[#E63946]' : 'bg-blue-500',
                duration: Math.random() * 7 + 4,
                delay: Math.random() * 10,
            }));
            setParticles(newParticles);
        }
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A]">
            {/* Hybrid Background - Deep Navy with Dynamic Accents */}
            <div className="absolute inset-0 w-full h-full">
                {/* Grid Pattern - Terminal Style */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-10"></div>
                
                {/* Neon Cyan & Red Gradient Orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] opacity-25 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E63946] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] opacity-15 animate-pulse delay-2000"></div>
                
                {/* Code-like decorative lines */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            style={{
                                top: `${i * 5}%`,
                                left: '10%',
                                right: '10%',
                                opacity: 0.3 - i * 0.015,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Particles - Hybrid Tech Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className={`absolute w-1 h-1 rounded-full ${particle.colorClass}`}
                        initial={{
                            x: `${particle.left}%`,
                            y: `${particle.top}%`,
                        }}
                        animate={{
                            y: [null, -50, 50, -50],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Section - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-center lg:text-left"
                    >
                        {/* Senior Badge - Glassmorphism with Cyan */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 rounded-full px-4 py-2 mb-6 shadow-lg shadow-cyan-500/10"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                            <span className="text-sm font-semibold text-cyan-400 tracking-wide">Senior Software Engineer L5</span>
                        </motion.div>

                        {/* Main Heading - Gradient Text */}
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-[#E63946] bg-clip-text text-transparent">
                                Defar Gobeze
                            </span>
                            <br />
                            <span className="text-white">Wondafrash</span>
                        </motion.h1>

                        {/* Typing Animation - Terminal Style */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-4"
                        >
                            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/30">
                                <span className="text-green-400 font-mono">$</span>
                                <span className="text-xl md:text-2xl text-cyan-400 font-mono">
                                    {typedText}
                                    <span className="animate-blink">█</span>
                                </span>
                            </div>
                        </motion.div>

                        {/* Senior Stats Grid - Glassmorphism Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                        >
                            {[
                                { value: "9+", label: "Years Experience" },
                                { value: "61+", label: "GitHub Repos" },
                                { value: "50+", label: "Projects Delivered" },
                                { value: "15+", label: "Enterprise Clients" },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 group">
                                    <div className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{stat.value}</div>
                                    <div className="text-xs text-gray-400 group-hover:text-gray-300">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-gray-300 mb-6 leading-relaxed text-lg"
                        >
                            <span className="text-cyan-400">⚡</span> <span className="font-semibold text-white">Senior Software Engineer</span> with 9+ years of experience architecting
                            <span className="text-cyan-400 font-medium"> high-performance, secure, and scalable solutions</span> for the Fintech & Banking industry.
                            Development Manager at startup, leading teams to deliver exceptional results.
                        </motion.p>

                        {/* Tech Stack Tags - Hybrid Theme */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
                        >
                            {["React", "Next.js", "Node.js", ".NET Core", "MongoDB", "TypeScript", "AWS", "Microservices"].map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA Buttons - High Contrast Red Action */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            {/* Primary CTA - Bright Red Gradient */}
                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(230, 57, 70, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                href="#projects"
                                className="group relative px-8 py-3 bg-gradient-to-r from-[#E63946] to-[#C1121F] rounded-full font-semibold text-white overflow-hidden shadow-lg shadow-red-500/30 transition-all duration-300"
                            >
                                <span className="relative z-10">✨ View Portfolio</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#C1121F] to-[#A4161A]"
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>

                            {/* Secondary CTA - Red Border with Glow */}
                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(230, 57, 70, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="px-8 py-3 border-2 border-[#E63946] rounded-full font-semibold text-[#E63946] hover:bg-[#E63946] hover:text-white transition-all duration-300 backdrop-blur-sm"
                            >
                                Let's Connect
                            </motion.a>

                            {/* Tertiary CTA - Glass Style */}
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/resume.pdf"
                                target="_blank"
                                className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                📄 Download Resume
                            </motion.a>
                        </motion.div>

                        {/* Social Links - Enhanced */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-8 flex gap-4 justify-center lg:justify-start"
                        >
                            {[
                                { icon: "💼", name: "LinkedIn", href: "https://linkedin.com/in/defargobeze", color: "hover:bg-blue-600", glow: "hover:shadow-blue-500/25" },
                                { icon: "🐙", name: "GitHub", href: "https://github.com/defargobeze", color: "hover:bg-gray-700", glow: "hover:shadow-gray-500/25" },
                                { icon: "🐦", name: "Twitter", href: "https://twitter.com/defargobeze", color: "hover:bg-sky-600", glow: "hover:shadow-sky-500/25" },
                                { icon: "📧", name: "Email", href: "mailto:davegbhonesty@gmail.com", color: "hover:bg-red-600", glow: "hover:shadow-red-500/25" },
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-400 transition-all duration-300 ${social.color} ${social.glow} hover:text-white hover:shadow-lg`}
                                >
                                    <span>{social.icon}</span>
                                    <span>{social.name}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Section - Visual Elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:w-1/2 flex flex-col items-center"
                    >
                        {/* Hero Image with Hybrid Effects */}
                        <div className="relative group w-full max-w-2xl">
                            {/* Animated Dual Border Glow - Cyan & Red */}
                            <motion.div
                                className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-[#E63946] to-cyan-500 opacity-40 blur-2xl group-hover:opacity-70 transition duration-500"
                                animate={{
                                    scale: [1, 1.02, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Hero Image Container with Glassmorphism */}
                            <motion.div
                                className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full aspect-[16/10]">
                                    <Image
                                        src="/assets/bg2.jpg"
                                        alt="Defar Gobeze - Senior Software Engineer coding"
                                        fill
                                        className="object-cover opacity-95"
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                    {/* Floating Tech Badges - Hybrid Colors */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute top-4 left-4 flex gap-2"
                                    >
                                        <div className="bg-black/80 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-cyan-500/50">
                                            <span className="text-sm font-semibold text-cyan-400">⚛️ React</span>
                                        </div>
                                        <div className="bg-black/80 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-cyan-500/50">
                                            <span className="text-sm font-semibold text-cyan-400">▲ Next.js</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="absolute top-4 right-4 flex gap-2"
                                    >
                                        <div className="bg-black/80 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-[#E63946]/50">
                                            <span className="text-sm font-semibold text-[#E63946]">TS</span>
                                        </div>
                                        <div className="bg-black/80 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-[#E63946]/50">
                                            <span className="text-sm font-semibold text-[#E63946]">Node.js</span>
                                        </div>
                                    </motion.div>

                                    {/* Code Snippet Overlay - Enhanced */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-cyan-500/30 font-mono text-xs"
                                    >
                                        <div className="text-cyan-400">$ git commit -m "feat: scalable fintech architecture"</div>
                                        <div className="text-green-400">✓ 9+ years of excellence delivered</div>
                                        <div className="text-[#E63946]">✓ 50+ enterprise projects completed</div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Achievement Badge - Hybrid Colors */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#E63946] to-cyan-600 rounded-2xl p-3 shadow-xl shadow-red-500/25"
                            >
                                <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur flex items-center gap-2">
                                    <span className="text-2xl animate-pulse">🏆</span>
                                    <div>
                                        <div className="text-xs text-cyan-300">Top Rated</div>
                                        <div className="text-sm font-bold text-white">Senior Engineer</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Professional Stats Cards - Enhanced */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 grid grid-cols-3 gap-4 w-full max-w-md"
                        >
                            {[
                                { label: "GitHub Stars", value: "2.5K+", icon: "⭐", color: "text-cyan-400" },
                                { label: "Code Reviews", value: "1K+", icon: "📝", color: "text-[#E63946]" },
                                { label: "Mentored", value: "20+", icon: "👨‍🏫", color: "text-cyan-400" },
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50"
                                >
                                    <div className="text-2xl mb-1">{stat.icon}</div>
                                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Expertise Tags - Hybrid Theme */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-6 flex flex-wrap gap-2 justify-center"
                        >
                            {["Fintech", "Banking", "Microservices", "Cloud Architecture", "Team Leadership", "System Design"].map((exp, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300 font-medium hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors duration-300"
                                >
                                    {exp}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - Hybrid Colors */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-400">Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center"
                        >
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1 h-2 bg-[#E63946] rounded-full mt-2"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s step-end infinite;
                }
            `}</style>
        </section>
    );
}