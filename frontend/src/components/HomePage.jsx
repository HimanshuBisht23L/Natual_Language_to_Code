import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { steps } from "../utils/PhasesSteps.jsx"

function HomePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
            <Navbar />

            <section className="relative overflow-hidden px-6 pt-24 pb-20 max-w-7xl mx-auto w-full text-center">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6 tracking-wide animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        COMPILER DESIGN PBL WORKSPACE
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
                        Natural Language to{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Executable Code
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Experience an educational, state-of-the-art compiler pipeline that maps natural language algorithm prompts into clean Python and C source code, complete with live token streams and realistic Three-Address Code (3AC).
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            to="/compiler"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group"
                        >
                            Launch Compiler Workspace
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link
                            to="/about"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-xl transition-all text-center"
                        >
                            Explore Compiler Phases
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 bg-slate-900/30 border-y border-slate-900 w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            The Compilation Pipeline
                        </h2>
                        <p className="text-slate-400">
                            Discover how English language logic transforms through a fully detailed seven-stage compiler architecture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${step.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                            {step.icon}
                                        </div>
                                        <span className="text-2xl font-black text-slate-800 select-none group-hover:text-indigo-950/40 transition-colors">
                                            {step.num}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-400 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:border-slate-800 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-200 mb-2">Automated Optimization</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Detects structural program types, applies automated name spelling suggestions, and targets optimized algorithm structures.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:border-slate-800 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-200 mb-2">Full Semantic Checks</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Maintains high compilation safety standards via strict spell check helpers, structure integrity parsing, and verification modules.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:border-slate-800 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-200 mb-2">Intermediate 3AC Output</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Provides detailed, realistic register-based Three-Address Code output for each program to assist in understanding compiler designs.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="mt-auto py-8 border-t border-slate-900 bg-slate-950 px-6 text-center text-xs text-slate-600">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 LingoComp PBL. Built for Compiler Design Theory & Project-Based Learning.</p>
                    <div className="flex gap-4">
                        <Link to="/compiler" className="hover:text-indigo-400 transition-colors">Compiler</Link>
                        <Link to="/about" className="hover:text-indigo-400 transition-colors">About</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage