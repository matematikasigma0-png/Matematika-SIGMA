'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { LogIn, User, Lock, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState<'teacher' | 'admin'>('teacher');
  
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login({
      id: formData.id,
      password: loginType === 'admin' ? formData.password : undefined
    });

    if (success) {
      router.push('/');
    } else {
      setError(loginType === 'admin' ? 'Password admin salah.' : 'NIP tidak ditemukan dalam database.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-6">
            <span className="font-bold text-3xl">Σ</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Selamat Datang</h1>
          <p className="text-slate-500">Masuk ke Sistem Informasi SIGMA Buol</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setLoginType('teacher')}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${loginType === 'teacher' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Guru
            </button>
            <button 
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${loginType === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                {loginType === 'teacher' ? 'NIP / NUPTK' : 'Username Admin'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="text" 
                  placeholder={loginType === 'teacher' ? "Masukkan NIP Anda" : "Username"}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                />
              </div>
            </div>

            {loginType === 'admin' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            )}

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <><LogIn className="w-5 h-5" /> Masuk Sekarang</>
              )}
            </button>
          </form>

          {loginType === 'teacher' && (
            <div className="text-center pt-4">
              <p className="text-sm text-slate-500">
                Belum terdaftar? {' '}
                <Link href="/register" className="text-blue-600 font-bold hover:underline">
                  Daftar di sini
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
          <Sparkles className="w-3 h-3" /> MGMP Matematika SMP Kabupaten Buol
        </div>
      </div>
    </div>
  );
}
