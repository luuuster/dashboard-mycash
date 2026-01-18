import { useState } from 'react';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import MemberWidget from './MemberWidget';
import PeriodSelector from './PeriodSelector';
import TransactionModal from './TransactionModal';

export default function DashboardHeader() {
    const { filters, setSearchText } = useFinance();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-2">
            <div className="flex flex-col md:flex-row lg:items-center gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={filters.searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    />
                </div>

                {/* Filter Trigger */}
                <button className="flex items-center justify-center p-3 bg-surface border border-border rounded-full text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-all shadow-sm">
                    <SlidersHorizontal size={20} />
                </button>

                <div className="hidden md:block h-8 w-[1px] bg-border mx-2" />

                {/* Period Selector */}
                <PeriodSelector />
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6">
                {/* Members Widget */}
                <MemberWidget />

                <div className="h-8 w-[1px] bg-border hidden md:block" />

                {/* New Transaction Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#080B12] text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                    <Plus size={20} strokeWidth={3} />
                    <span className="hidden sm:inline">Nova Transação</span>
                    <span className="sm:hidden">Nova</span>
                </button>
            </div>

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
