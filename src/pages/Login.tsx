import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.session) {
                navigate('/');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError('Email ou senha incorretos.');
            if (err.message && (err.message.includes('Invalid login') || err.message.includes('not found'))) {
                setError('Conta não encontrada ou senha incorreta.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#84CC16]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#820AD1]/20 rounded-full blur-[120px]" />
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative z-10">

                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#84CC16] mb-6 shadow-[0_0_40px_-5px_rgba(132,204,22,0.5)]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F172A]">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Bem-vindo de volta!</h1>
                    <p className="text-gray-400 text-sm">Acesse sua conta para gerenciar suas finanças</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                            {error}
                            {error.includes('não encontrada') && (
                                <Link to="/register" className="block mt-2 text-[#84CC16] font-bold hover:underline">
                                    Criar uma conta
                                </Link>
                            )}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Mail size={20} className="text-gray-500 group-focus-within:text-[#84CC16] transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1F2937]/50 border border-gray-700 text-white text-sm rounded-2xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent block w-full pl-12 p-4 placeholder-gray-500 transition-all outline-none group-hover:bg-[#1F2937]/80"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Lock size={20} className="text-gray-500 group-focus-within:text-[#84CC16] transition-colors" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1F2937]/50 border border-gray-700 text-white text-sm rounded-2xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent block w-full pl-12 pr-12 p-4 placeholder-gray-500 transition-all outline-none group-hover:bg-[#1F2937]/80"
                                placeholder="Sua senha secreta"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-[#84CC16] focus:ring-[#84CC16] bg-[#1F2937]" />
                            <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Lembrar de mim</span>
                        </label>
                        <a href="#" className="text-[#84CC16] hover:text-[#a3e635] font-medium transition-colors">
                            Esqueceu a senha?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#84CC16] hover:bg-[#65a30d] text-[#0F172A] font-extrabold rounded-2xl p-4 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_0_20px_-5px_rgba(132,204,22,0.3)]"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Entrar na Plataforma
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Não tem uma conta?{' '}
                        <Link to="/register" className="text-white font-bold hover:underline">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
