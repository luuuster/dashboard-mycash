import { useState } from 'react';
import { Home, CreditCard, LayoutGrid, Users, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface NavItem {
    icon: typeof Home;
    label: string;
    active?: boolean;
}

const navItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: CreditCard, label: 'Transações' },
    { icon: Users, label: 'Membros' },
    { icon: Settings, label: 'Configurações' },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <aside
            className={`hidden lg:flex lg:flex-col lg:justify-between lg:h-screen lg:sticky lg:top-0 bg-surface border-r border-border transition-all duration-300 ease-in-out relative ${isExpanded ? 'lg:w-[300px]' : 'lg:w-[88px]'
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-4 top-8 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 z-10"
                aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
            >
                {isExpanded ? (
                    <ChevronLeft size={16} className="text-text-secondary" />
                ) : (
                    <ChevronRight size={16} className="text-text-secondary" />
                )}
            </button>

            <div className={`flex flex-col gap-14 transition-all duration-300 ${isExpanded ? 'p-8' : 'p-4'}`}>
                {/* Logo */}
                <div className={`flex items-center gap-3 transition-all duration-300 ${isExpanded ? '' : 'justify-center'}`}>
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <LayoutGrid size={24} className="text-primary" />
                    </div>
                    <span
                        className={`text-xl font-bold text-text-primary whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                            }`}
                    >
                        MyCash+
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="relative group">
                                <a
                                    href="#"
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${item.active
                                            ? 'bg-gray-900 text-white'
                                            : 'text-text-secondary hover:bg-gray-50'
                                        } ${isExpanded ? '' : 'justify-center'}`}
                                >
                                    <Icon size={20} className={item.active ? 'text-primary' : ''} />
                                    <span
                                        className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </a>

                                {/* Tooltip quando colapsada */}
                                {!isExpanded && (
                                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                                        {item.label}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* User Profile */}
            <div className={`pt-6 border-t border-border transition-all duration-300 ${isExpanded ? 'p-8' : 'p-4'}`}>
                <div className={`flex items-center gap-3 ${isExpanded ? '' : 'flex-col'}`}>
                    <img
                        src="https://ui-avatars.com/api/?name=Franklin+V&background=random"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div
                        className={`flex-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 h-0'
                            }`}
                    >
                        <p className="text-sm font-semibold text-text-primary whitespace-nowrap">Franklin Vieira</p>
                        <p className="text-xs text-text-secondary truncate">frank@example.com</p>
                    </div>
                    <button
                        className={`p-1 text-text-secondary hover:text-red-500 transition-colors ${isExpanded ? '' : 'mt-2'
                            }`}
                        aria-label="Sair"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
