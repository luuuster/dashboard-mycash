import TransactionList from '../components/TransactionList';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionsTable from '../components/transactions/TransactionsTable';

export default function TransactionsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-text-primary">Transações</h1>
                <p className="text-text-secondary">Gerencie e visualize todo o seu histórico financeiro.</p>
            </div>

            <TransactionFilters />

            {/* Desktop View (Table) */}
            <div className="hidden lg:block">
                <TransactionsTable />
            </div>

            {/* Mobile/Tablet View (Cards) */}
            <div className="lg:hidden">
                <TransactionList />
            </div>
        </div>
    );
}
