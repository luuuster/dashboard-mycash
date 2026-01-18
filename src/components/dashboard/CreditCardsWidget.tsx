import { CreditCard, Plus, ArrowRight, Wallet } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

export default function CreditCardsWidget() {
    const { creditCards, bankAccounts } = useFinance();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    // Combine cards and accounts for display
    const items = [
        ...creditCards.map(c => ({
            id: c.id,
            name: c.name,
            type: 'card',
            // For cards, we might show currentBill or limit? Let's show currentBill.
            balance: c.currentBill,
            dateLabel: `Fatura dia ${c.dueDay}`,
            theme: c.theme, // 'black' | 'lime' | 'white'
            lastDigits: c.lastDigits || '****'
        })),
        ...bankAccounts.map(a => ({
            id: a.id,
            name: a.name,
            type: 'account',
            balance: a.balance,
            dateLabel: 'Saldo disponível',
            theme: a.color === '#000000' ? 'black' : 'white', // Simple mapping
            lastDigits: '----'
        }))
    ];

    // Take top 3
    const displayItems = items.slice(0, 3);

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <CreditCard size={24} className="text-gray-900" />
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Cards & Contas</h2>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                        <Plus size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {displayItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1">
                        {/* Top Row: Logo/Name + Masked Number */}
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-white ${item.type === 'card' ? 'bg-purple-600' : 'bg-green-600'}`}>
                                    {item.type === 'card' ? <CreditCard size={14} /> : <Wallet size={14} />}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-900 tracking-wider">**** {item.lastDigits}</span>
                        </div>

                        {/* Middle Row: Amount */}
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                {formatCurrency(item.balance)}
                            </h3>
                        </div>

                        {/* Bottom Row: Due Date */}
                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                {item.dateLabel}
                            </p>
                        </div>
                    </div>
                ))}

                {displayItems.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        Nenhum cartão ou conta vinculada.
                    </div>
                )}
            </div>
        </div>
    );
}
