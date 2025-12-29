import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Database, Layers, BrainCircuit, Github, MessageSquare, Search, Sparkles } from "lucide-react";
import { searchContent } from "../api/client";
import ContentForm from "../components/ContentForm";
import SearchBox from "../components/SearchBox";
import ResultsList from "../components/ResultsList";
import ChatInterface from "../components/ChatInterface";

export default function Home() {
    const [viewMode, setViewMode] = useState("search"); // "search" or "chat"
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [lastQuery, setLastQuery] = useState("");

    const handleSearch = async (query) => {
        setSearching(true);
        setLastQuery(query);
        try {
            const data = await searchContent(query);
            setResults(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Navigation / Control Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30">
                            <BrainCircuit className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tighter">SemanticEngine</h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Knowledge Base</p>
                        </div>
                    </div>

                    <div className="bg-surface border border-border/50 p-2 rounded-2xl flex gap-1">
                        <button
                            onClick={() => setViewMode("search")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${viewMode === 'search' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Search className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Search</span>
                        </button>
                        <button
                            onClick={() => setViewMode("chat")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${viewMode === 'chat' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Advisor</span>
                        </button>
                    </div>

                    <ContentForm onAdded={() => { }} />

                    <div className="bg-surface border border-border/50 p-7 rounded-3xl space-y-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stack Infrastructure</h3>
                        <div className="space-y-4">
                            <NavItem icon={<Database />} label="PostgreSQL" value="Connected" active />
                            <NavItem icon={<Layers />} label="Embedding" value="Gemini v4" />
                            <NavItem icon={<LayoutGrid />} label="Environment" value="Production" />
                        </div>
                    </div>

                    <footer className="px-6 flex items-center gap-4 text-slate-600">
                        <a href="#" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                        <span className="text-[10px] font-medium uppercase tracking-widest">v1.2.0-STABLE</span>
                    </footer>
                </aside>

                {/* Search & Experience Area */}
                <main className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {viewMode === "search" ? (
                            <motion.div
                                key="search"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="w-full h-24" /> {/* Spacer */}
                                <header className="space-y-4 px-2">
                                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                        A deeper way to <br />
                                        <span className="text-slate-500">understand your data.</span>
                                    </h2>
                                    <p className="text-slate-500 max-w-lg leading-relaxed">
                                        Experience the future of search. Instead of matching words, we match meaning.
                                        Built on vector-similarity and high-fidelity embeddings.
                                    </p>
                                </header>

                                <section className="space-y-16">
                                    <SearchBox onSearch={handleSearch} loading={searching} />
                                    <ResultsList results={results} query={lastQuery} />
                                </section>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="pt-24 h-full"
                            >
                                <div className="px-2 mb-8">
                                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                                        Conversational <br />
                                        <span className="text-slate-500">Intelligence.</span>
                                    </h2>
                                    <p className="text-slate-500 max-w-lg leading-relaxed">
                                        Chat with your Knowledge Base. Our AI Advisor uses RAG to provide
                                        answers exclusively grounded in your uploaded documents.
                                    </p>
                                </div>
                                <ChatInterface />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

            </div>

            {/* Floating Advisor Button (FAB) */}
            <AnimatePresence>
                {viewMode === "search" && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 260, damping: 20 }
                        }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setViewMode("chat")}
                        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-2xl shadow-primary-600/40 z-50 group overflow-hidden"
                    >
                        {/* Pulse Effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.1, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-white rounded-full"
                        />

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <Sparkles className="w-7 h-7 relative z-10" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}

function NavItem({ icon, label, value, active }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl border border-border flex items-center justify-center text-slate-500 group-hover:text-slate-300 transition-colors ${active ? 'bg-slate-900 border-border/80' : ''}`}>
                    {cloneElement(icon, { size: 14 })}
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">{label}</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${active ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-border/50 border-border text-slate-600'}`}>
                {value}
            </span>
        </div>
    );
}

// Minimal cloneElement polyfill if needed or just use regular components
import { cloneElement } from "react";
