import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, LayoutGrid, Users, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface NavItem {
    icon: typeof Home;
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: CreditCard, label: 'Transações', path: '/transactions' },
    { icon: Users, label: 'Membros', path: '/members' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <aside
            className={`hidden lg:flex lg:flex-col lg:justify-between lg:h-screen lg:sticky lg:top-0 bg-surface border-r border-border transition-all duration-300 ease-in-out relative ${isExpanded ? 'lg:w-[280px]' : 'lg:w-[88px]'
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-4 top-9 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 z-10 text-text-secondary"
                aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
            >
                {isExpanded ? (
                    <ChevronLeft size={16} />
                ) : (
                    <ChevronRight size={16} />
                )}
            </button>

            <div className={`flex flex-col gap-8 transition-all duration-300 ${isExpanded ? 'p-6' : 'p-4'}`}>
                {/* Logo */}
                <div className={`flex items-center gap-3 h-12 transition-all duration-300 ${isExpanded ? '' : 'justify-center'}`}>
                    <div className="w-10 h-10 bg-[#E5F9C6] rounded-xl flex items-center justify-center flex-shrink-0">
                        <LayoutGrid size={22} className="text-[#4D7C0F]" />
                    </div>
                    <span
                        className={`text-xl font-bold text-text-primary whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4 overflow-hidden'
                            }`}
                    >
                        MyCash+
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="relative group">
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={({ isActive }) => `flex items-center ${isExpanded ? 'gap-3 px-4' : 'justify-center'} py-3.5 rounded-2xl font-medium transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-[#E5F9C6] text-[#365314]'
                                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                                        }`}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon size={22} className={`${isActive ? 'text-[#4D7C0F]' : 'transition-colors'} flex-shrink-0`} />
                                            <span
                                                className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4 overflow-hidden'
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>

                                {/* Tooltip quando colapsada */}
                                {!isExpanded && (
                                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50 shadow-xl">
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
            <div className={`mb-6 mx-4 transition-all duration-300`}>
                <div className={`flex items-center gap-3 p-3 rounded-2xl border border-border bg-gray-50/50 ${isExpanded ? '' : 'justify-center border-0 bg-transparent p-0'}`}>
                    <img
                        src="https://ui-avatars.com/api/?name=Franklin+V&background=F97316&color=fff"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                    />
                    <div
                        className={`flex-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 h-0 hidden'
                            }`}
                    >
                        <p className="text-sm font-bold text-text-primary whitespace-nowrap leading-tight">Franklin Vieira</p>
                        <p className="text-[11px] text-text-secondary truncate">frank@example.com</p>
                    </div>
                    <button
                        className={`text-text-secondary hover:text-red-500 transition-colors ${isExpanded ? 'p-1' : 'hidden'}`}
                        aria-label="Sair"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
