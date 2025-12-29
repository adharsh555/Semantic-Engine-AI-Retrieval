import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowUpRight, ChevronDown } from "lucide-react";

export default function ResultsList({ results, query }) {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (!query) return (
        <div className="text-center py-32">
            <p className="text-slate-500 text-sm font-medium">Begin your journey by searching for a concept or topic.</p>
        </div>
    );

    if (results.length === 0) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 space-y-2">
                <p className="text-slate-300 font-medium">No matches found for "{query}"</p>
                <p className="text-slate-500 text-xs">Try broader terms or double-check the database status.</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/40" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Top Findings</span>
                <div className="h-px flex-1 bg-border/40" />
            </div>

            <div className="grid gap-6">
                <AnimatePresence mode='popLayout'>
                    {results.map((r, index) => {
                        const isExpanded = expandedId === r.id;
                        return (
                            <motion.div
                                key={r.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 25 }}
                                className={`group p-6 rounded-3xl bg-surface border transition-all cursor-default ${isExpanded ? 'border-primary-500/40 shadow-2xl shadow-primary-500/5' : 'border-border/40 hover:border-primary-500/20'}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-10 h-10 rounded-2xl bg-slate-900 border flex items-center justify-center transition-colors ${isExpanded ? 'border-primary-500/50 text-primary-400' : 'border-border text-slate-400 group-hover:text-primary-400'}`}>
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-white font-medium text-lg leading-tight tracking-tight">{r.title}</h3>
                                    </div>
                                    <div className="bg-primary-500/5 px-3 py-1 rounded-full border border-primary-500/10">
                                        <span className="text-[10px] font-mono font-bold text-primary-400 uppercase tracking-tighter">
                                            {((1 - r.distance) * 100).toFixed(0)}% Rank
                                        </span>
                                    </div>
                                </div>

                                <motion.div
                                    initial={false}
                                    animate={{ height: isExpanded ? 'auto' : '2.5rem' }}
                                    className="overflow-hidden"
                                >
                                    <p className={`text-slate-400 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                        {r.content}
                                    </p>
                                </motion.div>

                                <div className="flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity pt-4 border-t border-border/30 mt-6">
                                    <span className="text-[10px] font-mono text-slate-600 uppercase">Vector ID: {r.id.split('-')[0]}</span>
                                    <button
                                        onClick={() => toggleExpand(r.id)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-primary-400 flex items-center gap-1 hover:text-primary-300 transition-colors"
                                    >
                                        {isExpanded ? 'Collapse' : 'Expand'}
                                        {isExpanded ? <ChevronDown className="w-3 h-3 rotate-180 transition-transform" /> : <ArrowUpRight className="w-3 h-3" />}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
