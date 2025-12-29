import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Sparkles, AlertCircle, Quote } from "lucide-react";
import { sendChatMessage } from "../api/client";

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const data = await sendChatMessage(input);
            const aiMsg = {
                role: "ai",
                text: data.data.answer,
                citations: data.data.citations
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: "error",
                text: "The AI Advisor is currently offline. Please try again in a moment."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white leading-none">AI Advisor</h4>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1 block">Context Aware</span>
                    </div>
                </div>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-elegant">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                        <Quote className="w-8 h-8 text-slate-600" />
                        <p className="text-sm text-slate-400 max-w-[200px]">
                            Ask a question about your documents to get a grounded answer.
                        </p>
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user'
                                    ? 'bg-primary-600 text-white rounded-tr-none'
                                    : m.role === 'error'
                                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                                }`}>
                                <div className="whitespace-pre-wrap">{m.text}</div>

                                {m.citations && m.citations.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Sources</p>
                                        <div className="flex flex-wrap gap-2">
                                            {m.citations.map((c, ci) => (
                                                <div key={ci} className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-400">
                                                    {c.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 text-slate-400 text-xs px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                            </div>
                            Thinking...
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-white/[0.01]">
                <div className="relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Message AI Advisor..."
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-all shadow-inner"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 transition-all shadow-lg"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
