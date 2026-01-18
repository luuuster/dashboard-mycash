import React, { useState } from 'react';
import {
    Home,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    User
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
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'cartoes', label: 'Cartões', icon: CreditCard },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300 sticky top-0 z-[100]",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className="p-8 flex items-center justify-between">
                {!isCollapsed && (
                    <h1 className="text-3xl font-bold text-black tracking-tight">
                        Mycash<span className="text-primary-val">+</span>
                    </h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors absolute -right-3.5 top-10"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-400" /> : <ChevronLeft className="w-4 h-4 text-gray-400" />}
                </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 py-3.5 px-6 rounded-2xl transition-all group relative font-semibold",
                                isActive
                                    ? "bg-primary-val text-black"
                                    : "text-gray-400 hover:text-black hover:bg-gray-50"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5",
                                isActive ? "text-black" : "text-gray-400 group-hover:text-black"
                            )} />

                            {!isCollapsed && (
                                <span>{item.label}</span>
                            )}

                            {isCollapsed && (
                                <div className="absolute left-20 bg-black text-white px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* User Info Section */}
            <div className="p-6 border-t border-gray-100">
                <div className={cn(
                    "flex items-center gap-3",
                    isCollapsed ? "justify-center" : ""
                )}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                        <User className="w-6 h-6 text-gray-400" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-black truncate">Lucas Marte</p>
                            <p className="text-[10px] text-gray-500 truncate">lucasmarte@gmail.com</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
