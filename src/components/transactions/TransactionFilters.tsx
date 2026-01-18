import { Search, Filter, Calendar } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

export default function TransactionFilters() {
    const { filters, setTransactionType, setSearchText } = useFinance();

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-4 rounded-2xl border border-border shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por descrição ou categoria..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary transition-all placeholder:text-text-secondary"
                    value={filters.searchText || ''}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {/* Filters Group */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-border">
                    <button
                        onClick={() => setTransactionType('all')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filters.transactionType === 'all'
                            ? 'bg-white text-text-primary shadow-sm'
                            : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setTransactionType('income')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filters.transactionType === 'income'
                            ? 'bg-green-100 text-green-700 shadow-sm'
                            : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        Receitas
                    </button>
                    <button
                        onClick={() => setTransactionType('expense')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filters.transactionType === 'expense'
                            ? 'bg-red-100 text-red-700 shadow-sm'
                            : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        Despesas
                    </button>
                </div>

                <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-lg border border-border transition-colors hidden md:block" title="Mais filtros">
                    <Filter size={20} />
                </button>
                <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-lg border border-border transition-colors hidden md:block" title="Filtrar por data">
                    <Calendar size={20} />
                </button>
            </div>
        </div>
    );
}
