import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import CreditCardItem from './CreditCardItem';

export default function CreditCardsWidget() {
    const { creditCards } = useFinance();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">Meus Cartões</h2>
                <button className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 transition-colors">
                    <Plus size={16} />
                    Ver todos
                </button>
            </div>

            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-surface border border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-gray-50"
                >
                    <ChevronLeft size={20} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth p-2 -m-2"
                >
                    {creditCards.length === 0 && (
                        <div className="flex-shrink-0 w-80 h-48 rounded-[32px] bg-gray-50/50 border border-dashed border-border flex flex-col items-center justify-center text-center p-6">
                            <p className="text-sm font-bold text-text-secondary">Nenhum cartão cadastrado</p>
                            <p className="text-xs text-gray-400 mt-1">Adicione seu primeiro cartão para gerenciar faturas.</p>
                        </div>
                    )}

                    {creditCards.map((card) => (
                        <CreditCardItem
                            key={card.id}
                            name={card.name}
                            limit={card.limit}
                            currentBill={card.currentBill}
                            lastDigits={card.lastDigits || '0000'}
                            theme={card.theme}
                            bankName={card.name.split(' ')[0] || 'Card'}
                        />
                    ))}

                    {/* Add New Card Placeholder */}
                    <button className="flex-shrink-0 w-80 h-48 rounded-[32px] border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-gray-50 transition-all text-text-secondary hover:text-primary">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold">Adicionar Cartão</span>
                    </button>
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-surface border border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-gray-50"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
