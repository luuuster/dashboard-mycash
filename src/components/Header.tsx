import { Search, Bell, HelpCircle } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-3 bg-background px-4 py-2.5 rounded-full border border-transparent focus-within:border-primary focus-within:bg-surface focus-within:shadow-sm transition-all w-full max-w-md">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Pesquisar por transações..."
                    className="bg-transparent border-none outline-none w-full text-sm text-text-primary placeholder:text-text-secondary"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-text-secondary hover:bg-background hover:text-text-primary rounded-full transition-colors">
                    <HelpCircle size={20} />
                </button>
                <button className="p-2 text-text-secondary hover:bg-background hover:text-text-primary rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
