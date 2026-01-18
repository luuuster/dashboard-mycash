import React, { useState } from 'react';
import { Menu, X, Bell, User } from 'lucide-react';

interface HeaderMobileProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({ activeSection, onSectionChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'objetivos', label: 'Objetivos' },
        { id: 'cartoes', label: 'Cartões' },
        { id: 'transacoes', label: 'Transações' },
        { id: 'perfil', label: 'Perfil' },
    ];

    return (
        <>
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border px-4 flex items-center justify-between z-[100]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-sm">M</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight">mycash<span className="text-primary">+</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-white relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-primary p-1"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Drawer Menu */}
            <div className={`
        lg:hidden fixed top-16 right-0 bottom-0 w-72 bg-surface border-l border-border z-[95] transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-black rounded-2xl border border-border">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                            <User className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold">Lucas Marte</p>
                            <p className="text-xs text-gray-500">Premium Member</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onSectionChange(item.id);
                                    setIsOpen(false);
                                }}
                                className={`
                  w-full text-left p-4 rounded-xl font-medium transition-all
                  ${activeSection === item.id
                                        ? 'bg-primary text-black'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                `}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <button className="w-full mt-8 p-4 border border-border text-red-500 rounded-xl font-medium hover:bg-red-500/10 transition-all">
                        Sair da Conta
                    </button>
                </div>
            </div>

            {/* Spacer to prevent content from going under the header */}
            <div className="lg:hidden h-16" />
        </>
    );
};
