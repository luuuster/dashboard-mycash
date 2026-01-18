import BalanceCard from './dashboard/BalanceCard';
import SummaryCard from './dashboard/SummaryCard';
import { useFinance } from '../contexts/FinanceContext';

export default function SummaryCards() {
    const { calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod } = useFinance();

    // Example growth - static for now as per prompt
    const growth = 12;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <BalanceCard amount={calculateTotalBalance()} growth={growth} />
            </div>
            <SummaryCard
                title="Receitas"
                amount={calculateIncomeForPeriod()}
                type="income"
            />
            <SummaryCard
                title="Despesas"
                amount={calculateExpensesForPeriod()}
                type="expense"
            />
        </div>
    );
}
