'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, BrainCircuit, FileQuestion, BookOpen } from 'lucide-react';

const prompts = [
  {
    id: 1,
    category: 'Soal',
    title: 'Pembuat Soal HOTS Aljabar',
    description: 'Prompt untuk membuat soal matematika tingkat tinggi (HOTS) pada materi aljabar kelas 8.',
    content: 'Buatkan 5 soal pilihan ganda HOTS (Higher Order Thinking Skills) tentang materi Persamaan Linear Dua Variabel untuk kelas 8 SMP. Sertakan kunci jawaban dan pembahasan singkat yang mudah dipahami siswa.',
    icon: FileQuestion,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    id: 2,
    category: 'Modul',
    title: 'Rancangan Modul Ajar Kurmer',
    description: 'Prompt untuk menyusun kerangka modul ajar Kurikulum Merdeka yang inovatif.',
    content: 'Buatkan kerangka Modul Ajar Kurikulum Merdeka untuk materi Bangun Ruang Sisi Datar kelas 7. Sertakan Tujuan Pembelajaran, Langkah Pembelajaran berbasis Problem Based Learning, dan instrumen asesmen formatif.',
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 3,
    category: 'Evaluasi',
    title: 'Refleksi Pembelajaran Menarik',
    description: 'Prompt untuk membuat pertanyaan refleksi akhir pembelajaran yang tidak membosankan.',
    content: 'Berikan 3 pertanyaan refleksi akhir pembelajaran matematika yang kreatif untuk siswa SMP agar mereka bisa mengekspresikan apa yang mereka pahami dan apa yang masih membingungkan dengan cara yang menyenangkan.',
    icon: BrainCircuit,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    id: 4,
    category: 'Soal',
    title: 'Bank Soal Literasi Numerasi',
    description: 'Prompt untuk membuat soal berbasis konteks nyata (literasi numerasi).',
    content: 'Buatkan soal cerita matematika tentang perbandingan senilai yang menggunakan konteks kearifan lokal Kabupaten Buol (misalnya tentang produksi kelapa sawit atau cengkeh).',
    icon: FileQuestion,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
];

export default function AIPromptLibrary() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-600" /> AI Prompt Library
        </h1>
        <p className="text-slate-500 mt-1">Kumpulan prompt AI untuk membantu produktivitas guru matematika.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className={`${prompt.bg} ${prompt.color} p-4 rounded-2xl`}>
                <prompt.icon className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">
                {prompt.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{prompt.title}</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {prompt.description}
            </p>

            <div className="mt-auto">
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 relative group">
                <p className="text-xs text-slate-600 italic line-clamp-3 pr-8">
                  &quot;{prompt.content}&quot;
                </p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MessageSquare className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              <button 
                onClick={() => handleCopy(prompt.id, prompt.content)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg ${
                  copiedId === prompt.id 
                    ? 'bg-emerald-500 text-white shadow-emerald-200' 
                    : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                }`}
              >
                {copiedId === prompt.id ? (
                  <><Check className="w-4 h-4" /> Berhasil Disalin</>
                ) : (
                  <><Copy className="w-4 h-4" /> Salin Prompt</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-display font-bold">Butuh prompt khusus?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Anda bisa meminta AI untuk membuatkan materi yang lebih spesifik dengan menyebutkan: 
              Materi, Kelas, Tingkat Kesulitan, dan Konteks yang diinginkan.
            </p>
          </div>
          <div className="w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
            <BrainCircuit className="w-16 h-16 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
