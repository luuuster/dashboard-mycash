import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

export default function TransactionList() {
    const { getFilteredTransactions } = useFinance();
    const transactions = getFilteredTransactions().slice(0, 10);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

    return (
        <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-text-primary">Transações Recentes</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Data</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Descrição</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Membro</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {transactions.map((transaction, index) => (
                            <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                    {formatDate(transaction.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                                            {transaction.type === 'income' ? (
                                                <ArrowDownCircle size={16} className="text-green-500" />
                                            ) : (
                                                <ArrowUpCircle size={16} className="text-red-500" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-text-primary">{transaction.description}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-text-secondary">
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                    {transaction.memberId ? 'Membro' : 'Família'}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {transactions.length === 0 && (
                <div className="p-12 text-center">
                    <p className="text-text-secondary">Nenhuma transação encontrada.</p>
                </div>
            )}
        </div>
    );
}
