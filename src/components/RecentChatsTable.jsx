import React, { useEffect, useState } from 'react';
import { getRecentChats } from '../api/client';
import { MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react';

const RecentChatsTable = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getRecentChats().then(setChats);
    }, []);

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-lg">Recent Routing History</h3>
                <p className="text-sm text-muted-foreground">Last 20 routed interactions</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Intent Detected</th>
                            <th className="px-6 py-4">Routed To</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {chats.map((chat) => (
                            <tr key={chat.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-medium">{chat.customer}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                                        {chat.intent}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{chat.agent}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {chat.status === 'Resolved' ? (
                                            <CheckCircle size={16} className="text-emerald-500" />
                                        ) : (
                                            <AlertCircle size={16} className="text-amber-500" />
                                        )}
                                        <span className={chat.status === 'Resolved' ? 'text-emerald-500' : 'text-amber-500'}>
                                            {chat.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{chat.time}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentChatsTable;
