import { Calendar, ChevronDown } from 'lucide-react';

export default function PeriodSelector() {
    return (
        <button className="flex items-center gap-3 px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium text-text-primary hover:bg-gray-50 transition-all shadow-sm">
            <Calendar size={18} className="text-text-secondary" />
            <span>01 jan - 31 jan, 2026</span>
            <ChevronDown size={16} className="text-text-secondary" />
        </button>
    );
}
