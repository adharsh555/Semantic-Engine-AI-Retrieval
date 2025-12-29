import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Loader2, Check, AlertCircle } from "lucide-react";
import { createContent } from "../api/client";

export default function ContentForm({ onAdded }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'

    const submit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setLoading(true);
        setStatus(null);
        try {
            await createContent({ title, content });
            setTitle("");
            setContent("");
            setStatus('success');
            if (onAdded) onAdded();
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus(null), 4000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-border/50 p-7 rounded-3xl shadow-sm"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400">
                    <PlusCircle className="w-4 h-4" />
                </div>
                <h2 className="text-white font-semibold text-lg">New Document</h2>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <input
                    className="w-full bg-transparent border-b border-border/50 py-3 text-white placeholder:text-slate-600 focus:border-primary-500/50 transition-colors outline-none text-sm px-1"
                    placeholder="Give it a title..."
                    value={title}
                    disabled={loading}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full bg-transparent border-b border-border/50 py-3 text-white placeholder:text-slate-600 focus:border-primary-500/50 transition-colors outline-none text-sm resize-none px-1"
                    placeholder="Describe the content details here..."
                    rows={3}
                    value={content}
                    disabled={loading}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="pt-2 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 flex items-center gap-1.5 text-xs font-medium">
                                <Check className="w-3.5 h-3.5" /> Saved
                            </motion.div>
                        ) : status === 'error' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-rose-400 flex items-center gap-1.5 text-xs font-medium">
                                <AlertCircle className="w-3.5 h-3.5" /> Failed
                            </motion.div>
                        ) : <div />}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={loading || !title || !content}
                        className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Save Document"}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
