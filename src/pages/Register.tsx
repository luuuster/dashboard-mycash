import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Lock, Mail, User, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                    },
                },
            });

            if (authError) throw authError;

            if (data.user) {
                setSuccess(true);
                // Optional: Redirect after delay if verified
            }
        } catch (err: any) {
            console.error('Erro ao registrar:', err);
            setError(err.message || 'Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#84CC16]/20 text-[#84CC16] mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Conta criada com sucesso!</h2>
                    <p className="text-gray-400 mb-8">
                        Enviamos um email de confirmação para <strong>{formData.email}</strong>.
                        Verifique sua caixa de entrada para ativar sua conta.
                    </p>
                    <Link
                        to="/login"
                        className="w-full bg-[#84CC16] hover:bg-[#65a30d] text-[#0F172A] font-extrabold rounded-2xl p-4 flex items-center justify-center gap-2 transition-all"
                    >
                        Ir para Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#84CC16]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#820AD1]/20 rounded-full blur-[120px]" />
            </div>

            {/* Register Card */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative z-10">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Criar Conta</h1>
                    <p className="text-gray-400 text-sm">Comece a controlar suas finanças hoje</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Name Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <User size={20} className="text-gray-500 group-focus-within:text-[#84CC16] transition-colors" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#1F2937]/50 border border-gray-700 text-white text-sm rounded-2xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent block w-full pl-12 p-4 placeholder-gray-500 transition-all outline-none group-hover:bg-[#1F2937]/80"
                            placeholder="Seu nome completo"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Mail size={20} className="text-gray-500 group-focus-within:text-[#84CC16] transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#1F2937]/50 border border-gray-700 text-white text-sm rounded-2xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent block w-full pl-12 pr-12 p-4 placeholder-gray-500 transition-all outline-none group-hover:bg-[#1F2937]/80"
                            placeholder="Crie uma senha forte"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Lock size={20} className="text-gray-500 group-focus-within:text-[#84CC16] transition-colors" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-[#1F2937]/50 border border-gray-700 text-white text-sm rounded-2xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent block w-full pl-12 pr-12 p-4 placeholder-gray-500 transition-all outline-none group-hover:bg-[#1F2937]/80"
                            placeholder="Confirme sua senha"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#84CC16] hover:bg-[#65a30d] text-[#0F172A] font-extrabold rounded-2xl p-4 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_0_20px_-5px_rgba(132,204,22,0.3)] mt-2"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Criar Conta Grátis
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-white font-bold hover:underline">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
