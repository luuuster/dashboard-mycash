import { Target, ChevronRight } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

export default function GoalsWidget() {
    const { goals } = useFinance();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className="bg-surface border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-sm h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary">Objetivos</h2>
                <button className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 transition-colors">
                    Novo <Target size={16} />
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {goals.map((goal) => {
                    const progress = (goal.currentAmount / goal.targetAmount) * 100;
                    const remaining = goal.targetAmount - goal.currentAmount;

                    return (
                        <div key={goal.id} className="group cursor-pointer">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{goal.name}</p>
                                    <p className="text-xs text-text-secondary mt-0.5">Faltam {formatCurrency(remaining)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-text-primary">{progress.toFixed(0)}%</p>
                                    <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">{formatCurrency(goal.targetAmount)}</p>
                                </div>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                                    style={{
                                        width: `${progress}%`,
                                        backgroundColor: goal.color
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}

                {goals.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-border">
                        <p className="text-sm text-text-secondary">Nenhum objetivo definido</p>
                    </div>
                )}
            </div>

            <button className="mt-auto flex items-center justify-center gap-2 group text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
                Ver todos os objetivos
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
