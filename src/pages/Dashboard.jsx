import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api/client';
import StatCard from '../components/StatCard';
import RealtimeFeed from '../components/RealtimeFeed';
import AgentHeatmap from '../components/AgentHeatmap';
import RoutingSuccessChart from '../components/RoutingSuccessChart';
import RecentChatsTable from '../components/RecentChatsTable';
import { MessageSquare, Users, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        getDashboardStats().then(setStats);
    }, []);

    if (!stats) return <div className="flex items-center justify-center h-full text-muted-foreground">Loading Dashboard...</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Routed Chats"
                    value={stats.total_routed}
                    trend="up"
                    trendValue="12%"
                    icon={MessageSquare}
                    color="primary"
                />
                <StatCard
                    title="Success Rate"
                    value={`${stats.success_rate}%`}
                    trend="up"
                    trendValue="0.5%"
                    icon={Activity}
                    color="success"
                />
                <StatCard
                    title="Active Agents"
                    value={stats.active_agents}
                    trend="down"
                    trendValue="2"
                    icon={Users}
                    color="warning"
                />
                <StatCard
                    title="Avg Response Time"
                    value={stats.avg_response_time}
                    trend="down"
                    trendValue="0.1s"
                    icon={Clock}
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RoutingSuccessChart />
                </div>
                <div>
                    <RealtimeFeed />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AgentHeatmap />
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">System Health</h3>
                        <p className="text-muted-foreground">All routing nodes are operational.</p>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden max-w-xs">
                        <div className="bg-emerald-500 h-full w-[98%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">99.9% Uptime</p>
                </div>
            </div>

            <RecentChatsTable />
        </div>
    );
};

export default Dashboard;
