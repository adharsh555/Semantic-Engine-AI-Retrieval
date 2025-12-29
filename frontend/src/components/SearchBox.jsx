import { useState, useEffect } from "react";
import { Search, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBox({ onSearch, loading }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e?.preventDefault();
        if (!query.trim()) return;
        onSearch(query);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />

                <input
                    className="w-full bg-surface border border-border/80 text-white placeholder:text-slate-600 pl-12 pr-16 py-4 rounded-2xl focus:border-primary-500/40 transition-all outline-none text-sm shadow-2xl shadow-black/20"
                    placeholder="How can I help you find something?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <AnimatePresence>
                        {query && !loading && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                type="button"
                                onClick={() => setQuery("")}
                                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-colors disabled:bg-slate-800 disabled:text-slate-600"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Search className="w-4 h-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
}
