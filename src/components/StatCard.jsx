import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color = "primary" }) => {
    const isPositive = trend === 'up';

    const colorMap = {
        primary: "text-primary bg-primary/10",
        success: "text-emerald-500 bg-emerald-500/10",
        warning: "text-amber-500 bg-amber-500/10",
        purple: "text-purple-500 bg-purple-500/10",
    };

    return (
        <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">{title}</span>
                <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                    <Icon size={20} />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
                    {trendValue && (
                        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span>{trendValue}</span>
                            <span className="text-muted-foreground ml-1">vs last hour</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
