'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSekolah, Sekolah, saveData } from '@/lib/api';
import { UserPlus, School, Mail, Phone, GraduationCap, BadgeCheck, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [sekolah, setSekolah] = useState<Sekolah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    sekolah_id: '',
    pendidikan: '',
    status_guru: 'PNS',
    kontak: ''
  });

  useEffect(() => {
    getSekolah().then(setSekolah).finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await saveData('guru', {
        ...formData,
        id: `G-${Date.now()}` // Simple ID generation
      });

      if (result.success) {
        setStatus({ type: 'success', message: 'Registrasi berhasil! Silakan login menggunakan NIP Anda.' });
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Terjadi kesalahan saat menghubungkan ke server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Registrasi Guru</h1>
              <p className="text-blue-100 text-sm">Daftarkan diri Anda ke komunitas SIGMA Buol.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {status.type && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nama Lengkap & Gelar</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  placeholder="Contoh: Budi Santoso, S.Pd"
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">NIP / NUPTK</label>
              <input 
                required
                type="text" 
                placeholder="Masukkan NIP Anda"
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={formData.nip}
                onChange={(e) => setFormData({...formData, nip: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Sekolah Induk</label>
              <select 
                required
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                value={formData.sekolah_id}
                onChange={(e) => setFormData({...formData, sekolah_id: e.target.value})}
              >
                <option value="">Pilih Sekolah...</option>
                {sekolah.map(s => (
                  <option key={s.id} value={s.id}>{s.nama_sekolah}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pendidikan Terakhir</label>
              <input 
                required
                type="text" 
                placeholder="Contoh: S1 Pend. Matematika"
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={formData.pendidikan}
                onChange={(e) => setFormData({...formData, pendidikan: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status Kepegawaian</label>
              <select 
                required
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                value={formData.status_guru}
                onChange={(e) => setFormData({...formData, status_guru: e.target.value})}
              >
                <option value="PNS">PNS</option>
                <option value="PPPK">PPPK</option>
                <option value="Honorer">Honorer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">No. WhatsApp</label>
              <input 
                required
                type="tel" 
                placeholder="Contoh: 08123456789"
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={formData.kontak}
                onChange={(e) => setFormData({...formData, kontak: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              disabled={isSubmitting}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
              ) : (
                <><BadgeCheck className="w-5 h-5" /> Daftar Sekarang</>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
        <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Catatan Penting
        </h3>
        <p className="text-xs text-blue-600 leading-relaxed">
          Data yang Anda masukkan akan langsung terhubung ke database Google Spreadsheet MGMP. 
          Pastikan NIP yang Anda masukkan benar karena akan digunakan sebagai ID login untuk memperbarui profil Anda di masa mendatang.
        </p>
      </div>
    </div>
  );
}
