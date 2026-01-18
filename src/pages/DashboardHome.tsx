import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummaryCards from '../components/SummaryCards';
import ExpensesByCategoryCarousel from '../components/dashboard/ExpensesByCategoryCarousel';
import FinancialFlowChart from '../components/dashboard/FinancialFlowChart';
import CreditCardsWidget from '../components/dashboard/CreditCardsWidget';
import UpcomingExpenses from '../components/dashboard/UpcomingExpenses';
import GoalsWidget from '../components/dashboard/GoalsWidget';
import TransactionList from '../components/TransactionList';

export default function DashboardHome() {
    return (
        <>
            <DashboardHeader />

            <SummaryCards />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <FinancialFlowChart />
                <div className="flex flex-col gap-10">
                    <ExpensesByCategoryCarousel />
                    <CreditCardsWidget />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 flex flex-col gap-10">
                    <TransactionList />
                </div>
                <div className="xl:col-span-1 flex flex-col gap-10">
                    <UpcomingExpenses />
                    <GoalsWidget />
                </div>
            </div>
        </>
    );
}
