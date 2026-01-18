interface CategoryDonutCardProps {
    category: string;
    value: number;
    percentage: number;
    color: string;
}

export default function CategoryDonutCard({ category, value, percentage, color }: CategoryDonutCardProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex-shrink-0 w-40 bg-surface border border-border rounded-3xl p-4 flex flex-col items-center gap-3 hover:border-primary transition-all shadow-sm group">
            {/* Donut Chart */}
            <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-gray-100"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-text-primary">
                    {percentage.toFixed(1)}%
                </span>
            </div>

            <div className="text-center overflow-hidden w-full">
                <p className="text-xs font-medium text-text-secondary truncate" title={category}>
                    {category}
                </p>
                <p className="text-sm font-bold text-text-primary mt-0.5">
                    {formatCurrency(value)}
                </p>
            </div>
        </div>
    );
}
