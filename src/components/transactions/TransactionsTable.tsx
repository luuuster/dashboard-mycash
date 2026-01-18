import { ArrowUpCircle, ArrowDownCircle, Trash2, Edit, Search } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

export default function TransactionsTable() {
    const { getFilteredTransactions, deleteTransaction } = useFinance();
    const transactions = getFilteredTransactions();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            await deleteTransaction(id);
        }
    };

    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-surface border border-border rounded-2xl border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search size={24} className="text-text-secondary" />
                </div>
                <p className="text-text-primary font-medium">Nenhuma transação encontrada</p>
                <p className="text-text-secondary text-sm mt-1">Tente ajustar seus filtros ou realizar uma nova busca.</p>
            </div>
        );
    }

    return (
        <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Data</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Descrição</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Membro</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="group hover:bg-gray-50 transition-colors">
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
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-text-secondary border border-gray-200">
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
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(transaction.id)}
                                            className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

