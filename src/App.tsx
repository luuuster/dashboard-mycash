import { MainLayout } from './components/layout/MainLayout';
import { SummaryCards } from './components/finance/SummaryCards';
import { TransactionList } from './components/finance/TransactionList';
import { FinancialChart } from './components/finance/FinancialChart';
import { CreditCardsGrid } from './components/finance/CreditCardsGrid';

function App() {
  return (
    <MainLayout>
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm lg:text-base">Bem-vindo de volta, Lucas Marte.</p>
      </header>

      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
        <div className="xl:col-span-2 space-y-8">
          <FinancialChart />
          <TransactionList />
        </div>

        <div className="space-y-8">
          <CreditCardsGrid />

          {/* Quick Actions / Goals Preview Placeholder */}
          <div className="bg-primary p-6 rounded-3xl text-black">
            <h4 className="font-bold text-lg mb-1">Meta de Economia</h4>
            <p className="text-sm font-medium mb-4 opacity-80">Você já atingiu 75% da sua meta mensal!</p>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-6">
              <div className="bg-black h-full w-3/4" />
            </div>
            <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-black/90 transition-all">
              Ver Objetivos
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
