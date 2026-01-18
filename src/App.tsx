import { MainLayout } from './components/layout/MainLayout';
import { SummaryCards } from './components/finance/SummaryCards';
import { TransactionList } from './components/finance/TransactionList';

function App() {
  return (
    <MainLayout>
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm lg:text-base">Bem-vindo de volta, Lucas Marte.</p>
      </header>

      <SummaryCards />

      <div className="mt-8">
        <TransactionList />
      </div>
    </MainLayout>
  );
}

export default App;
