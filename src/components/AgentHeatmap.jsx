import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAgentLoadHeatmap } from '../api/client';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-popover border border-border p-3 rounded-lg shadow-xl">
                <p className="font-medium mb-1">{label}</p>
                <p className="text-sm text-primary">Load: {payload[0].value} chats</p>
                <p className="text-xs text-muted-foreground">Capacity: {payload[0].payload.capacity}</p>
            </div>
        );
    }
    return null;
};

const AgentHeatmap = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAgentLoadHeatmap().then(setData);
    }, []);

    return (
        <div className="bg-card border border-border rounded-xl p-6 h-[400px] flex flex-col">
            <div className="mb-6">
                <h3 className="font-semibold text-lg">Agent Load Distribution</h3>
                <p className="text-sm text-muted-foreground">Hourly chat volume across all agents</p>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.2)' }} />
                        <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.load > 60 ? 'hsl(var(--destructive))' : entry.load > 40 ? 'hsl(var(--warning))' : 'hsl(var(--primary))'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AgentHeatmap;
