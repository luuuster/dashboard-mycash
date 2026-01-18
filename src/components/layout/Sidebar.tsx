import React, { useState } from 'react';
import {
    LayoutDashboard,
    Target,
    CreditCard,
    ArrowLeftRight,
    User,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'objetivos', label: 'Objetivos', icon: Target },
    { id: 'cartoes', label: 'Cartões', icon: CreditCard },
    { id: 'transacoes', label: 'Transações', icon: ArrowLeftRight },
    { id: 'perfil', label: 'Perfil', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col h-screen bg-surface border-r border-border transition-all duration-300 sticky top-0",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold">M</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">mycash<span className="text-primary">+</span></span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-black font-bold">M</span>
                    </div>
                )}
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative",
                                isActive
                                    ? "bg-black text-white shadow-sm"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-primary" : "group-hover:text-primary"
                            )} />

                            {!isCollapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-16 bg-surface border border-border px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-border space-y-2">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all"
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    {!isCollapsed && <span className="font-medium">Recolher</span>}
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-red-500 transition-all">
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span className="font-medium">Sair</span>}
                </button>
            </div>
        </aside>
    );
};
