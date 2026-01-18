import Sidebar from './components/Sidebar'
import Header from './components/Header'
import HeaderMobile from './components/layout/HeaderMobile'
import DashboardHeader from './components/dashboard/DashboardHeader'
import SummaryCards from './components/SummaryCards'
import ExpensesByCategoryCarousel from './components/dashboard/ExpensesByCategoryCarousel'
import FinancialFlowChart from './components/dashboard/FinancialFlowChart'
import CreditCardsWidget from './components/dashboard/CreditCardsWidget'
import UpcomingExpenses from './components/dashboard/UpcomingExpenses'
import GoalsWidget from './components/dashboard/GoalsWidget'
import TransactionList from './components/TransactionList'

function App() {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - Desktop (≥1280px) */}
            <Sidebar />

            <main className="flex-1 flex flex-col transition-all duration-300">
                {/* Header Mobile (<1280px) */}
                <HeaderMobile />

                {/* Header Desktop (≥1280px) */}
                <div className="hidden lg:block">
                    <Header />
                </div>

                <div className="px-4 md:px-6 lg:px-8 py-8 flex flex-col gap-10 max-w-dashboard xl:max-w-wide mx-auto w-full">
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
                </div>
            </main>
        </div>
    )
}

export default App
