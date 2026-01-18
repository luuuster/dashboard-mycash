import { useState, useEffect } from 'react';
import { User, Moon, Trash2, Bell, Shield, LogOut, Camera } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const { familyMembers } = useFinance();
    const navigate = useNavigate();

    // Auth State
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, []);

    // Derived State
    const currentMember = familyMembers.find(m => m.id === user?.id);
    const displayName = currentMember?.name || user?.user_metadata?.full_name || '';
    const displayEmail = user?.email || '';
    const displayAvatar = currentMember?.avatarUrl || `https://ui-avatars.com/api/?name=${displayName || 'User'}&background=random`;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) return <div className="p-8 text-center text-text-secondary">Carregando perfil...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-text-primary">Configurações</h1>
                <p className="text-text-secondary">Gerencie suas preferências e dados do sistema.</p>
            </div>

            <div className="space-y-6">
                {/* Perfil */}
                <section className="bg-surface rounded-2xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-text-primary">
                            <User size={20} className="text-primary" />
                            Perfil do Usuário
                        </h2>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row items-center gap-8">
                        {/* Avatar Section */}
                        <div className="relative group cursor-pointer shrink-0">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface shadow-lg ring-2 ring-border">
                                <img
                                    src={displayAvatar}
                                    alt={displayName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=User&background=random';
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>

                        {/* Fields Section */}
                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Nome Completo</label>
                                    <input
                                        type="text"
                                        defaultValue={displayName}
                                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary transition-all"
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        value={displayEmail}
                                        disabled
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-border rounded-xl text-text-secondary cursor-not-allowed"
                                        title="O email não pode ser alterado"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-border flex justify-end">
                        <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-surface-900 rounded-xl transition-all font-bold text-sm shadow-sm hover:shadow-md active:scale-95">
                            Salvar Alterações
                        </button>
                    </div>
                </section>

                {/* Preferências */}
                <section className="bg-surface rounded-2xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-text-primary">
                            <Shield size={20} className="text-blue-500" />
                            Preferências do Sistema
                        </h2>
                    </div>
                    <div className="p-6 divide-y divide-border">
                        <div className="flex items-center justify-between py-4 first:pt-0">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                                    <Moon size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary">Modo Escuro</p>
                                    <p className="text-sm text-text-secondary">Alternar entre tema claro e escuro</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors duration-300">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary">Notificações</p>
                                    <p className="text-sm text-text-secondary">Receber alertas de vencimento</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 bg-lime-500 rounded-full relative transition-colors duration-300">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Zona de Perigo */}
                <section className="bg-surface rounded-2xl border border-red-100 overflow-hidden">
                    <div className="p-6 border-b border-red-100 bg-red-50/30">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-red-600">
                            <Trash2 size={20} />
                            Zona de Perigo
                        </h2>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-bold text-text-primary">Limpar todos os dados</p>
                            <p className="text-sm text-text-secondary mt-1">
                                Esta ação não pode ser desfeita. Todos os dados serão apagados permanentemente.
                            </p>
                        </div>
                        <button className="whitespace-nowrap px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-bold text-sm">
                            Resetar Dados
                        </button>
                    </div>
                </section>

                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-text-secondary hover:text-red-500 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Sair da Conta</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
