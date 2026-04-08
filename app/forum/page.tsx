import { getForum } from '@/lib/api';
import { MessageSquare, User, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default async function ForumPage() {
  const forum = await getForum();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Forum Diskusi</h1>
          <p className="text-slate-500 mt-1">Ruang kolaborasi dan tanya jawab antar guru matematika.</p>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          Buat Diskusi Baru
        </button>
      </div>

      <div className="space-y-4">
        {forum.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.penulis}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.tanggal}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.judul}</h3>
                <div className="text-slate-500 text-sm line-clamp-2 prose prose-slate max-w-none">
                  <ReactMarkdown>{item.isi}</ReactMarkdown>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <MessageCircle className="w-4 h-4" /> 12 Komentar
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <Calendar className="w-4 h-4" /> Terakhir aktif 2 jam lalu
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:border-l md:border-slate-50 md:pl-6">
                <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {forum.length === 0 && (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Belum ada diskusi yang dimulai.</p>
          </div>
        )}
      </div>
    </div>
  );
}
