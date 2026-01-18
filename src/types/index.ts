// Tipos principais do sistema mycash+

export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'pending' | 'completed';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    date: Date;
    accountId: string;
    memberId: string | null;
    installments: number;
    status: TransactionStatus;
    isRecurring: boolean;
    isPaid: boolean;
}

export interface Goal {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    targetAmount: number;
    currentAmount: number;
    category?: string;
    deadline: Date;
    status?: 'active' | 'archived';
    color: string;
    memberId: string | null;
}

export interface CreditCard {
    id: string;
    name: string;
    closingDay: number;
    dueDay: number;
    limit: number;
    currentBill: number;
    theme: 'black' | 'lime' | 'white';
    logoUrl?: string;
    lastDigits?: string;
    holderId: string;
}

export interface BankAccount {
    id: string;
    name: string;
    type: 'checking' | 'savings';
    balance: number;
    color: string;
    holderId: string;
}

export interface FamilyMember {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    monthlyIncome: number;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    type: TransactionType;
}

// Filtros globais
export interface DateRange {
    startDate: Date;
    endDate: Date;
}

export interface GlobalFilters {
    selectedMember: string | null;
    dateRange: DateRange | null;
    transactionType: 'all' | TransactionType;
    searchText: string;
}
