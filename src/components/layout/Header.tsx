import React from 'react';
import { Search, SlidersHorizontal, Calendar, Plus } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

interface HeaderProps {
    onNewTransaction: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewTransaction }) => {
    const { filters, setFilters } = useFinance();

    return (
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4 flex-1">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-val/20 transition-all text-black"
                        value={filters.search}
                        onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                </div>

                {/* Filters Button */}
                <button className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <div className="flex items-center gap-6">
                {/* Date Range Picker Placeholder */}
                <button className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl py-2.5 px-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>01 Jan - 31 Jan 2026</span>
                </button>

                {/* Family Avatars */}
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        {[1, 2].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gray-200 overflow-hidden">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i === 1 ? 'Lucas' : 'Ana'}`}
                                    alt="Member"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <button className="w-10 h-10 rounded-full border-2 border-background bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors ml-2">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* New Transaction Button */}
                <button
                    onClick={onNewTransaction}
                    className="flex items-center gap-2 bg-black text-white rounded-2xl py-3 px-6 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-black/10"
                >
                    <Plus className="w-5 h-5 text-primary-val" />
                    <span>Nova transação</span>
                </button>
            </div>
        </header>
    );
};
