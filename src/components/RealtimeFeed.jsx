import React, { useEffect, useState } from 'react';
import { getRealtimeIntents } from '../api/client';
import { ArrowRight, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RealtimeFeed = () => {
    const [intents, setIntents] = useState([]);

    useEffect(() => {
        // Initial fetch
        getRealtimeIntents().then(data => setIntents(data));

        // Polling for "realtime" effect
        const interval = setInterval(async () => {
            const newIntents = await getRealtimeIntents();
            setIntents(prev => {
                // Add new intents to the top, keep max 10
                const combined = [...newIntents, ...prev].slice(0, 10);
                // Deduplicate by ID just in case
                return Array.from(new Map(combined.map(item => [item.id, item])).values());
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-[400px]">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
                <h3 className="font-semibold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Intent Stream
                </h3>
                <span className="text-xs text-muted-foreground">Polling every 3s</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                <AnimatePresence initial={false}>
                    {intents.map((intent) => (
                        <motion.div
                            key={intent.id}
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">
                                    <User size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground truncate">{intent.text}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs">
                                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium border border-border/50">
                                            {intent.intent}
                                        </span>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <ArrowRight size={10} />
                                            <Bot size={12} />
                                            {intent.agent}
                                        </span>
                                        <span className="ml-auto text-emerald-500 font-mono">
                                            {(intent.confidence * 100).toFixed(0)}% match
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {intents.length === 0 && (
                    <div className="text-center text-muted-foreground py-10">
                        Waiting for incoming chats...
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealtimeFeed;
