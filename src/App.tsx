import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Header } from './components/layout/Header';
import { SummaryCards } from './components/finance/SummaryCards';
import { CategoryMetricsGrid } from './components/finance/CategoryMetricsGrid';
import { TransactionList } from './components/finance/TransactionList';
import { FinancialChart } from './components/finance/FinancialChart';
import { CreditCardsGrid } from './components/finance/CreditCardsGrid';
import { NextExpenses } from './components/finance/NextExpenses';
import { NewTransactionModal } from './components/finance/NewTransactionModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <Header onNewTransaction={() => setIsModalOpen(true)} />

      {/* Top Metrics: Circles + Summary Cards */}
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1">
          <CategoryMetricsGrid />
          <SummaryCards />
        </div>
        <div className="xl:w-96">
          <CreditCardsGrid />
        </div>
      </div>

      {/* Middle Section: Chart + Next Expenses */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
        <div className="xl:col-span-2">
          <FinancialChart />
        </div>
        <div className="h-full">
          <NextExpenses />
        </div>
      </div>

      {/* Bottom Section: Transaction List */}
      <TransactionList />

      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainLayout>
  );
}

export default App;
