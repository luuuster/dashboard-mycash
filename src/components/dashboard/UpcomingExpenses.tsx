import { Calendar, CheckCircle2 } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

export default function UpcomingExpenses() {
    const { transactions } = useFinance();

    const internalTransactions = transactions
        .filter(t => t.type === 'expense' && !t.isPaid)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(date));
    };

    return (
        <div className="bg-surface border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-sm h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-text-primary">Próximas Despesas</h2>
                <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {internalTransactions.length} Pendentes
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {internalTransactions.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-text-secondary group-hover:bg-white transition-colors">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-primary">{expense.description}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-text-secondary">{formatDate(expense.date)}</span>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className="text-xs text-text-secondary">{expense.category}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-bold text-text-primary">{formatCurrency(expense.amount)}</p>
                            <button className="text-[10px] font-bold text-primary hover:text-primary-hover mt-1 uppercase tracking-wider flex items-center justify-end gap-1">
                                Pagar <CheckCircle2 size={12} />
                            </button>
                        </div>
                    </div>
                ))}

                {internalTransactions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50/30 rounded-3xl border border-dashed border-border">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm text-green-500">
                            <CheckCircle2 size={24} />
                        </div>
                        <p className="text-sm text-text-primary font-bold">Tudo em dia!</p>
                        <p className="text-xs text-text-secondary mt-1">Nenhuma despesa pendente para os próximos dias.</p>
                    </div>
                )}
            </div>

            <button className="mt-auto w-full py-3 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-all rounded-xl border border-transparent hover:border-gray-100">
                Ver agenda completa
            </button>
        </div>
    );
}
