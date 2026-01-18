import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import CategoryDonutCard from './CategoryDonutCard';

export default function ExpensesByCategoryCarousel() {
    const { calculateExpensesByCategory } = useFinance();
    const categories = calculateExpensesByCategory();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const colors = ['#84CC16', '#080B12', '#6B7280', '#3B82F6', '#EF4444', '#F59E0B'];

    return (
        <div className="relative group">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">Gastos por Categoria</h2>
            </div>

            <div className="relative">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-surface border border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-gray-50"
                >
                    <ChevronLeft size={20} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth relative pb-2"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
                >
                    {categories.map((cat, idx) => (
                        <CategoryDonutCard
                            key={cat.category}
                            category={cat.category}
                            value={cat.value}
                            percentage={cat.percentage}
                            color={colors[idx % colors.length]}
                        />
                    ))}
                    {categories.length === 0 && (
                        <div className="w-full py-8 text-center text-text-secondary bg-surface border border-dashed border-border rounded-3xl">
                            Nenhum gasto registrado
                        </div>
                    )}
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
