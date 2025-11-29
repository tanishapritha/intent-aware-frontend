import React, { useEffect, useState } from 'react';
import { getAgents } from '../api/client';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const Agents = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        getAgents().then(setAgents);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Agent Roster</h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Add New Agent
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => (
                    <div key={agent.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {agent.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                                    <p className="text-sm text-muted-foreground">{agent.specialty}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${agent.status === 'Online'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                }`}>
                                {agent.status}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Current Load</span>
                                <span className="font-medium">{agent.load}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-500"
                                    style={{ width: agent.load }}
                                ></div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-muted-foreground">
                                <button className="p-2 hover:bg-accent rounded-lg transition-colors"><Mail size={18} /></button>
                                <button className="p-2 hover:bg-accent rounded-lg transition-colors"><Phone size={18} /></button>
                                <button className="p-2 hover:bg-accent rounded-lg transition-colors"><MapPin size={18} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agents;
