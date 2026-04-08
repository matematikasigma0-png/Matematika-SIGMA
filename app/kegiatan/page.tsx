import { getKegiatan, getBerita } from '@/lib/api';
import { Calendar, MapPin, Clock, ArrowRight, Bell, Info } from 'lucide-react';
import Image from 'next/image';

export default async function KegiatanPage() {
  const [kegiatan, berita] = await Promise.all([getKegiatan(), getBerita()]);

  return (
    <div className="space-y-12">
      {/* Agenda Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900">Agenda MGMP</h2>
            <p className="text-slate-500 mt-1">Jadwal pertemuan, workshop, dan kegiatan komunitas.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            <Bell className="w-4 h-4" /> Aktifkan Notifikasi
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kegiatan.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-blue-100">
                    <span className="text-sm font-bold leading-none">{item.tanggal.split(' ')[0]}</span>
                    <span className="text-[10px] font-medium uppercase">{item.tanggal.split(' ')[1]}</span>
                  </div>
                  <div className="bg-slate-50 px-3 py-1 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workshop</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.nama_kegiatan}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>08:00 - Selesai</span>
                  </div>
                </div>

                <p className="text-sm text-slate-500 line-clamp-3 pt-2">
                  {item.deskripsi}
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  Lihat Detail Agenda
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Warta SIGMA</h2>
          <p className="text-slate-500 mt-1">Artikel edukasi dan berita terkini dari komunitas.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {berita.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row">
              <div className="md:w-48 h-48 md:h-auto bg-slate-100 relative overflow-hidden flex-shrink-0">
                <Image 
                  src={item.gambar || `https://picsum.photos/seed/${item.id}/400/400`} 
                  alt={item.judul}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                    <Calendar className="w-3 h-3" /> {item.tanggal}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{item.judul}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {item.isi}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50">
                  <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Banner */}
      <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-display font-bold mb-2">Punya berita atau agenda untuk dibagikan?</h3>
            <p className="text-blue-100 text-sm">Hubungi pengurus MGMP untuk mempublikasikan kegiatan atau artikel Anda di sini.</p>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 whitespace-nowrap">
            Hubungi Pengurus
          </button>
        </div>
      </div>
    </div>
  );
}
