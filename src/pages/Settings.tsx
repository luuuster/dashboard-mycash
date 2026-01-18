import { User, Moon, Trash2, Bell, Shield, LogOut } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

export default function Settings() {
    const { familyMembers } = useFinance();
    const currentUser = familyMembers[0]; // Mock user logged in

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
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <User size={20} className="text-primary" />
                            Perfil do Usuário
                        </h2>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative group cursor-pointer">
                            <img
                                src={currentUser?.avatarUrl}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-md"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-medium">Alterar</span>
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left space-y-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Nome</label>
                                    <input
                                        type="text"
                                        defaultValue={currentUser?.name}
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                                    <input
                                        type="email"
                                        defaultValue="frank@example.com"
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 flex justify-end">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-lime-600 transition-colors font-medium text-sm">
                            Salvar Alterações
                        </button>
                    </div>
                </section>

                {/* Preferências */}
                <section className="bg-surface rounded-2xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Shield size={20} className="text-blue-500" />
                            Preferências do Sistema
                        </h2>
                    </div>
                    <div className="p-6 divide-y divide-border">
                        <div className="flex items-center justify-between py-4 first:pt-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                    <Moon size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">Modo Escuro</p>
                                    <p className="text-sm text-text-secondary">Alternar entre tema claro e escuro</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors duration-300">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">Notificações</p>
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
                    <div className="p-6 border-b border-red-100 bg-red-50/50">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-red-700">
                            <Trash2 size={20} />
                            Zona de Perigo
                        </h2>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-primary">Limpar todos os dados</p>
                            <p className="text-sm text-text-secondary">Esta ação não pode ser desfeita. Todos os dados serão apagados.</p>
                        </div>
                        <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
                            Resetar Dados
                        </button>
                    </div>
                </section>

                <div className="flex justify-center pt-8">
                    <button className="flex items-center gap-2 text-text-secondary hover:text-red-500 transition-colors">
                        <LogOut size={18} />
                        <span className="font-medium">Sair da Conta</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
