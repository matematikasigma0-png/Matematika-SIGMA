import { getResources } from '@/lib/api';
import { BookOpen, Download, Search, Filter, FileText, Video, Globe, Folder } from 'lucide-react';

export default async function ResourcesPage() {
  const resources = await getResources();

  const getIcon = (kategori: string) => {
    switch (kategori.toLowerCase()) {
      case 'modul': return FileText;
      case 'video': return Video;
      case 'web': return Globe;
      default: return Folder;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Resources Center</h1>
          <p className="text-slate-500 mt-1">Pusat sumber belajar digital untuk guru matematika.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari materi..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item) => {
          const Icon = getIcon(item.kategori);
          return (
            <div key={item.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">
                  {item.kategori}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.judul}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                {item.deskripsi}
              </p>

              <div className="pt-6 border-t border-slate-50">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                >
                  <Download className="w-4 h-4" /> Unduh Materi
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
