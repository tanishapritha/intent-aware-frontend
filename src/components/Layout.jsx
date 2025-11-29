import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
            active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
    >
        <Icon size={20} className={cn("transition-colors", active ? "text-primary" : "group-hover:text-accent-foreground")} />
        <span className="font-medium">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
    </Link>
);

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl fixed h-full z-20 hidden md:flex flex-col">
                <div className="p-6 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Activity className="text-white" size={20} />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            IntentRoute
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" active={location.pathname === '/'} />
                    <SidebarItem icon={Users} label="Agents" to="/agents" active={location.pathname === '/agents'} />
                    <SidebarItem icon={Activity} label="Intents Analysis" to="/intents" active={location.pathname === '/intents'} />
                    <SidebarItem icon={Settings} label="Settings" to="/settings" active={location.pathname === '/settings'} />
                </nav>

                <div className="p-4 border-t border-border/50">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen relative">
                {/* Header (Mobile only mostly, or global actions) */}
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
                    <div className="md:hidden font-bold text-lg">IntentRoute</div>
                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-emerald-500">System Operational</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-accent border border-border flex items-center justify-center">
                            <span className="text-xs font-bold">AD</span>
                        </div>
                    </div>
                </header>

                <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
