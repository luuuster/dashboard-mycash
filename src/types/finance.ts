export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    value: number;
    description: string;
    category: string;
    date: string;
    member: string;
    status: 'pending' | 'completed';
    account_id?: string;
}

export interface Goal {
    id: string;
    title: string;
    target_value: number;
    current_value: number;
    deadline: string;
    status: 'on_track' | 'warning' | 'completed';
}

export interface CreditCard {
    id: string;
    name: string;
    limit: number;
    used: number;
    closing_date: number;
    due_date: number;
    theme: 'black' | 'lime';
}

export interface FamilyMember {
    id: string;
    name: string;
    avatar_url?: string;
    role: 'admin' | 'member';
}
