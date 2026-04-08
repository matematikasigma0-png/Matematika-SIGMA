import { getSekolah, getGuru, getKegiatan, getBerita } from '@/lib/api';
import { 
  School, 
  Users, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function DashboardPage() {
  const [sekolah, guru, kegiatan, berita] = await Promise.all([
    getSekolah(),
    getGuru(),
    getKegiatan(),
    getBerita()
  ]);

  const stats = [
    { name: 'Total Sekolah', value: sekolah.length, icon: School, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Total Guru', value: guru.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Kegiatan MGMP', value: kegiatan.length, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Berita & Info', value: berita.length, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const hasNoData = sekolah.length === 0 && guru.length === 0;

  return (
    <div className="space-y-8">
      {hasNoData && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-amber-900">Database Belum Terhubung</h3>
            <p className="text-sm text-amber-700 mt-1">
              Sistem tidak dapat membaca data dari Google Spreadsheet Anda. Pastikan Spreadsheet sudah di-set ke <strong>&quot;Anyone with the link&quot;</strong>.
            </p>
          </div>
          <Link href="/login" className="px-6 py-3 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all text-sm whitespace-nowrap">
            Buka Panduan Setup
          </Link>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard Utama</h1>
        <p className="text-slate-500 mt-1">Selamat datang di Sistem Informasi SIGMA Kabupaten Buol.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                Active <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent News */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-slate-900">Warta SIGMA Terbaru</h2>
            <Link href="/kegiatan" className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {berita.slice(0, 4).map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  <Image 
                    src={item.gambar || `https://picsum.photos/seed/${item.id}/800/450`} 
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Berita
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] font-medium mb-2 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">{item.judul}</h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.isi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-xl font-display font-bold text-slate-900">Agenda Terdekat</h2>
          <div className="space-y-4">
            {kegiatan.slice(0, 5).map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 hover:border-blue-200 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600">
                  <span className="text-xs font-bold leading-none">{item.tanggal.split(' ')[0]}</span>
                  <span className="text-[10px] font-medium uppercase">{item.tanggal.split(' ')[1]}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{item.nama_kegiatan}</h4>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                </div>
              </div>
            ))}
            {kegiatan.length === 0 && (
              <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 text-center">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Belum ada agenda terdekat</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
