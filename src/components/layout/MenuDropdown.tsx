import { X, LogOut, Home, CreditCard, Users, Settings, LayoutGrid } from 'lucide-react';

interface MenuDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    currentPath: string;
}

export default function MenuDropdown({ isOpen, onClose, currentPath }: MenuDropdownProps) {
    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: CreditCard, label: 'Transações', path: '/transactions' },
        { icon: Users, label: 'Membros', path: '/members' },
        { icon: Settings, label: 'Configurações', path: '/settings' },
    ];

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Dropdown Menu */}
            <div className="fixed top-0 left-0 right-0 bg-surface z-[100] border-b border-border shadow-2xl animate-in slide-in-from-top duration-300">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                <LayoutGrid size={20} className="text-primary" />
                            </div>
                            <span className="text-lg font-bold text-text-primary">MyCash+</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-text-secondary hover:bg-gray-50 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.path === currentPath;
                            return (
                                <a
                                    key={item.label}
                                    href="#"
                                    className={`flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all ${isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-text-secondary hover:bg-gray-50'
                                        }`}
                                    onClick={() => {
                                        // Update navigation logic here
                                        onClose();
                                    }}
                                >
                                    <Icon size={20} className={isActive ? 'text-primary' : ''} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>

                    <footer className="mt-6 pt-6 border-t border-border">
                        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-500 font-medium hover:bg-red-50 transition-all">
                            <LogOut size={20} />
                            <span>Sair</span>
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
}
