import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Search, ChevronDown, ChevronLeft, ChevronRight, ArrowDown, ArrowUp } from 'lucide-react';
export const TransactionList: React.FC = () => {
    const { transactions } = useFinance();

    return (
        <div className="w-full bg-white border border-gray-50 rounded-[2.5rem] overflow-hidden shadow-sm shadow-black/5 mt-8 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <ArrowDown className="w-6 h-6 text-gray-400 rotate-45" />
                    <h3 className="font-bold text-lg text-black">Extrato detalhado</h3>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar lançamentos"
                            className="bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all">
                        <span>Despesas</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-50">
                            <th className="px-6 py-4">Membro</th>
                            <th className="px-6 py-4">Datas</th>
                            <th className="px-6 py-4">Descrição</th>
                            <th className="px-6 py-4">Categorias</th>
                            <th className="px-6 py-4">Conta/cartão</th>
                            <th className="px-6 py-4">Parcelas</th>
                            <th className="px-6 py-4">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white ring-offset-1 ring-offset-gray-100">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.member}`}
                                            alt={t.member}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-gray-400">
                                        {new Date(t.date).toLocaleDateString('pt-BR')}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        {t.type === 'income' ? (
                                            <ArrowDown className="w-4 h-4 text-primary-val" />
                                        ) : (
                                            <ArrowUp className="w-4 h-4 text-red-400" />
                                        )}
                                        <span className="text-sm font-bold text-gray-600">{t.description}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs font-bold text-gray-400">{t.category}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs font-bold text-gray-400">Conta corrente</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs font-bold text-gray-400">-</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-black">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Mostrando 1 a 5 de 17</span>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:text-black transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="w-6 h-6 flex items-center justify-center text-black">1</button>
                    <button className="w-6 h-6 flex items-center justify-center hover:text-black transition-colors">2</button>
                    <button className="w-6 h-6 flex items-center justify-center hover:text-black transition-colors">3</button>
                    <button className="w-6 h-6 flex items-center justify-center hover:text-black transition-colors">4</button>
                    <button className="w-6 h-6 flex items-center justify-center hover:text-black transition-colors">5</button>
                    <button className="p-2 hover:text-black transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};
