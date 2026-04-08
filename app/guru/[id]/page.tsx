import { getGuru, getSekolah, getKompetensi, getPortofolio } from '@/lib/api';
import { 
  User, 
  School, 
  GraduationCap, 
  Award, 
  FileText, 
  Link as LinkIcon, 
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function GuruDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [allGuru, allSekolah, allKompetensi, allPortofolio] = await Promise.all([
    getGuru(),
    getSekolah(),
    getKompetensi(),
    getPortofolio()
  ]);

  const guru = allGuru.find(g => g.id === id);
  if (!guru) notFound();

  const sekolah = allSekolah.find(s => s.id === guru.sekolah_id);
  const kompetensi = allKompetensi.find(k => k.guru_id === guru.id);
  const portofolio = allPortofolio.filter(p => p.guru_id === guru.id);

  const radarStats = [
    { label: 'Pedagogik', value: kompetensi?.pedagogik || '0' },
    { label: 'Profesional', value: kompetensi?.profesional || '0' },
    { label: 'Sosial', value: kompetensi?.sosial || '0' },
    { label: 'Kepribadian', value: kompetensi?.kepribadian || '0' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Link 
        href="/guru" 
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Guru
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-800" />
            <div className="px-6 pb-8">
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-xl mx-auto">
                  <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                    <User className="w-16 h-16" />
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-display font-bold text-slate-900">{guru.nama}</h1>
                <p className="text-sm text-slate-500 font-medium">NIP. {guru.nip}</p>
                <div className="pt-4 flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {guru.status}
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Guru Aktif
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <School className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sekolah</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{sekolah?.nama_sekolah || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pendidikan</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{guru.pendidikan}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors">
                  <Phone className="w-4 h-4" /> WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" /> Lencana Kontribusi
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {['Inovator', 'Aktif', 'Mentor'].map((badge) => (
                <div key={badge} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border-2 border-white shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Competency & Portfolio */}
        <div className="lg:col-span-2 space-y-8">
          {/* Competency Stats */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold text-slate-900">Analisis Kompetensi</h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skala 1-100</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {radarStats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-slate-700">{stat.label}</span>
                      <span className="text-lg font-display font-bold text-blue-600">{stat.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-center">
                <h4 className="font-bold text-slate-900 mb-2">Riwayat Pelatihan</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {kompetensi?.pelatihan || 'Belum ada data pelatihan yang tercatat.'}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
                  <Briefcase className="w-4 h-4" /> Terverifikasi oleh MGMP
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-slate-900">E-Portfolio & Karya</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{portofolio.length} Karya</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portofolio.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
                      {item.jenis}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-4 line-clamp-2">{item.judul}</h3>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                  >
                    Buka Dokumen <LinkIcon className="w-4 h-4" />
                  </a>
                </div>
              ))}
              {portofolio.length === 0 && (
                <div className="md:col-span-2 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Belum ada portofolio digital yang diunggah.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
