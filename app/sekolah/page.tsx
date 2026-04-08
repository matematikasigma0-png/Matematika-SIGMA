import { getSekolah } from '@/lib/api';
import { School, MapPin, Users, FlaskConical, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default async function SekolahPage() {
  const sekolah = await getSekolah();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Data Sekolah</h1>
          <p className="text-slate-500 mt-1">Daftar sekolah menengah pertama di Kabupaten Buol.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari sekolah..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sekolah.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <School className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                  {item.kecamatan}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.nama_sekolah}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="line-clamp-1">{item.alamat}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Users className="w-3 h-3" /> Guru Matematika
                    </div>
                    <p className="text-sm font-bold text-slate-900">{item.jumlah_guru} Orang</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <FlaskConical className="w-3 h-3" /> Lab Matematika
                    </div>
                    <p className="text-sm font-bold text-slate-900">{item.fasilitas_lab === 'Ada' ? 'Tersedia' : 'Tidak Ada'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link 
                  href={`/sekolah/peta?id=${item.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  <MapPin className="w-4 h-4" /> Lihat di Peta
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
