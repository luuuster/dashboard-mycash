import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import MenuDropdown from './MenuDropdown';

export default function HeaderMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="lg:hidden h-16 bg-surface border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <LayoutGrid size={20} className="text-primary" />
                    </div>
                    <span className="text-lg font-bold text-text-primary">MyCash+</span>
                </div>

                {/* User Avatar - Trigger */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-all active:scale-95"
                    aria-label="Abrir menu"
                >
                    <img
                        src="https://ui-avatars.com/api/?name=Franklin+V&background=84CC16&color=fff"
                        alt="Usuário"
                        className="w-10 h-10 rounded-full border-2 border-surface shadow-sm"
                    />
                </button>
            </header>

            <MenuDropdown
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                currentPath="/"
            />
        </>
    );
}
