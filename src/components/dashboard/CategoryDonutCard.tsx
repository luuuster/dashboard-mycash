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

    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex-shrink-0 w-44 bg-white rounded-[24px] p-6 flex flex-col items-center justify-between gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 border border-transparent hover:border-border group h-[180px]">
            {/* Donut Chart */}
            <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="transparent"
                        stroke="#F3F4F6"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-xs font-bold text-gray-900">
                    {percentage.toFixed(1)}%
                </span>
            </div>

            <div className="text-center w-full">
                <p className="text-xs font-medium text-gray-500 mb-1 truncate px-2" title={category}>
                    {category}
                </p>
                <p className="text-sm font-extrabold text-gray-900">
                    {formatCurrency(value)}
                </p>
            </div>
        </div>
    );
}
