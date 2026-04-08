import { getGuru, getSekolah } from '@/lib/api';
import { Users, Search, Filter, Mail, Phone, GraduationCap, BadgeCheck, ExternalLink, School } from 'lucide-react';
import Link from 'next/link';

export default async function GuruPage() {
  const [guru, sekolah] = await Promise.all([getGuru(), getSekolah()]);

  const getSekolahName = (id: string) => {
    return sekolah.find(s => s.id === id)?.nama_sekolah || 'Sekolah Tidak Diketahui';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Data Guru Matematika</h1>
          <p className="text-slate-500 mt-1">Profil profesional anggota MGMP Matematika SMP Kabupaten Buol.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama atau NIP..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {guru.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 bg-white rounded-2xl p-1 shadow-lg">
                  <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur bg-white/20 text-white border border-white/30`}>
                  {item.status}
                </span>
              </div>
            </div>
            
            <div className="pt-12 p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{item.nama}</h3>
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-xs text-slate-400 font-medium mb-4">NIP. {item.nip}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-slate-500 text-xs">
                  <School className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span className="font-medium">{getSekolahName(item.sekolah_id)}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{item.pendidikan}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
                <Link 
                  href={`/guru/${item.id}`}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  Profil Lengkap <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
