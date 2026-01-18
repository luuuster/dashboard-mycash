import { CreditCard, Plus, ArrowRight } from 'lucide-react';

export default function CreditCardsWidget() {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const accounts = [
        {
            id: 1,
            bank: 'Nubank',
            logoColor: 'bg-[#820AD1]', // Nubank Purple
            balance: 120.00,
            dueDate: '10',
            lastDigits: '5897'
        },
        {
            id: 2,
            bank: 'Inter',
            logoColor: 'bg-[#FF7A00]', // Inter Orange
            balance: 2300.00,
            dueDate: '21',
            lastDigits: '5897'
        },
        {
            id: 3,
            bank: 'Picpay',
            logoColor: 'bg-[#11C76F]', // Picpay Green
            balance: 17000.00,
            dueDate: '12',
            lastDigits: '5897'
        }
    ];

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <CreditCard size={24} className="text-gray-900" />
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Cards & contas</h2>
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
                {accounts.map((account) => (
                    <div key={account.id} className="flex flex-col gap-1">
                        {/* Top Row: Logo/Name + Masked Number */}
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-[6px] ${account.logoColor} flex items-center justify-center text-white`}>
                                    {/* Simple SVG Logo approximation */}
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-5-2 5zm0 0L2 17l10 5 10-5-10-5z" opacity="0" />
                                        {/* Just a white shape for now, or text initials */}
                                        <path d="M4 12h16v2H4z" fillOpacity="0" />
                                        <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" fillOpacity="0.2" />
                                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
                                            {account.bank[0]}
                                        </text>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{account.bank}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-900 tracking-wider">**** {account.lastDigits}</span>
                        </div>

                        {/* Middle Row: Amount */}
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                {formatCurrency(account.balance)}
                            </h3>
                        </div>

                        {/* Bottom Row: Due Date */}
                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                Vence dia {account.dueDate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
