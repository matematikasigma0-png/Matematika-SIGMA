'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import { saveData, getBerita, getKegiatan, getResources } from '@/lib/api';
import { 
  Settings, 
  Plus, 
  FileText, 
  Calendar, 
  BookOpen, 
  Save, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Code,
  ExternalLink,
  School
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'news' | 'agenda' | 'resources' | 'sekolah' | 'settings'>('news');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // Form States
  const [newsForm, setNewsForm] = useState({ judul: '', isi: '', tanggal: new Date().toLocaleDateString('id-ID'), gambar: '' });
  const [agendaForm, setAgendaForm] = useState({ nama_kegiatan: '', tanggal: '', lokasi: '', deskripsi: '' });
  const [resourceForm, setResourceForm] = useState({ judul: '', kategori: 'Modul', link: '', deskripsi: '' });
  const [sekolahForm, setSekolahForm] = useState({ nama_sekolah: '', kecamatan: '', alamat: '', jumlah_guru: '', jumlah_siswa: '' });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleSave = async (sheet: string, data: any, resetForm: () => void) => {
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });
    
    try {
      const result = await saveData(sheet, { ...data, id: `${sheet.charAt(0).toUpperCase()}-${Date.now()}` });
      if (result.success) {
        setStatus({ type: 'success', message: `Data ${sheet} berhasil ditambahkan!` });
        resetForm();
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Gagal menghubungi API.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Panel Administrasi</h1>
          <p className="text-slate-500 mt-1">Kelola konten dan sistem SIGMA Buol secara real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {[
            { id: 'news', label: 'Update Berita', icon: FileText },
            { id: 'agenda', label: 'Tambah Agenda', icon: Calendar },
            { id: 'sekolah', label: 'Data Sekolah', icon: School },
            { id: 'resources', label: 'Kelola Resource', icon: BookOpen },
            { id: 'settings', label: 'Pengaturan API', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8">
              {status.type && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
                  status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
              )}

              {activeTab === 'news' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-display font-bold text-slate-900">Publikasi Berita Baru</h2>
                  <div className="space-y-4">
                    <input 
                      type="text" placeholder="Judul Berita" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={newsForm.judul} onChange={e => setNewsForm({...newsForm, judul: e.target.value})}
                    />
                    <textarea 
                      placeholder="Isi Berita..." rows={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={newsForm.isi} onChange={e => setNewsForm({...newsForm, isi: e.target.value})}
                    />
                    <input 
                      type="text" placeholder="URL Gambar (Opsional)" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={newsForm.gambar} onChange={e => setNewsForm({...newsForm, gambar: e.target.value})}
                    />
                    <button 
                      onClick={() => handleSave('berita', newsForm, () => setNewsForm({ judul: '', isi: '', tanggal: new Date().toLocaleDateString('id-ID'), gambar: '' }))}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Simpan Berita
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'sekolah' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-display font-bold text-slate-900">Tambah Data Sekolah Induk</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nama Sekolah</label>
                      <input 
                        type="text" placeholder="Contoh: SMP Negeri 1 Buol" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        value={sekolahForm.nama_sekolah} onChange={e => setSekolahForm({...sekolahForm, nama_sekolah: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Kecamatan</label>
                      <input 
                        type="text" placeholder="Kecamatan" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        value={sekolahForm.kecamatan} onChange={e => setSekolahForm({...sekolahForm, kecamatan: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Alamat</label>
                      <input 
                        type="text" placeholder="Alamat Lengkap" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        value={sekolahForm.alamat} onChange={e => setSekolahForm({...sekolahForm, alamat: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Jumlah Guru Matematika</label>
                      <input 
                        type="number" placeholder="0" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        value={sekolahForm.jumlah_guru} onChange={e => setSekolahForm({...sekolahForm, jumlah_guru: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Total Siswa</label>
                      <input 
                        type="number" placeholder="0" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        value={sekolahForm.jumlah_siswa} onChange={e => setSekolahForm({...sekolahForm, jumlah_siswa: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleSave('sekolah', sekolahForm, () => setSekolahForm({ nama_sekolah: '', kecamatan: '', alamat: '', jumlah_guru: '', jumlah_siswa: '' }))}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Simpan Data Sekolah
                  </button>
                </div>
              )}

              {activeTab === 'agenda' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-display font-bold text-slate-900">Tambah Agenda MGMP</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" placeholder="Nama Kegiatan" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={agendaForm.nama_kegiatan} onChange={e => setAgendaForm({...agendaForm, nama_kegiatan: e.target.value})}
                    />
                    <input 
                      type="text" placeholder="Tanggal (Contoh: 15 April 2026)" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={agendaForm.tanggal} onChange={e => setAgendaForm({...agendaForm, tanggal: e.target.value})}
                    />
                    <input 
                      type="text" placeholder="Lokasi" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={agendaForm.lokasi} onChange={e => setAgendaForm({...agendaForm, lokasi: e.target.value})}
                    />
                    <textarea 
                      placeholder="Deskripsi Kegiatan..." className="md:col-span-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                      value={agendaForm.deskripsi} onChange={e => setAgendaForm({...agendaForm, deskripsi: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={() => handleSave('kegiatan', agendaForm, () => setAgendaForm({ nama_kegiatan: '', tanggal: '', lokasi: '', deskripsi: '' }))}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Tambah Agenda
                  </button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold">Penting untuk Pemula!</p>
                        <p className="text-xs">Ikuti langkah di bawah ini secara berurutan agar database terhubung sempurna.</p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-display font-bold text-slate-900">Langkah 1: Bagikan Spreadsheet</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Buka Google Spreadsheet Anda, klik tombol <strong>Share</strong> di pojok kanan atas, lalu ubah akses menjadi <strong>&quot;Anyone with the link&quot;</strong> sebagai <strong>Viewer</strong>. Tanpa ini, sistem tidak bisa membaca data.
                    </p>

                    <h2 className="text-xl font-display font-bold text-slate-900">Langkah 2: Pasang Script Penulisan & Setup Otomatis</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Agar fitur Registrasi dan Update Admin berfungsi, serta untuk <strong>membuat semua tabel secara otomatis</strong>, ikuti instruksi ini:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 ml-2">
                      <li>Di Spreadsheet, klik menu <strong>Extensions</strong> &gt; <strong>Apps Script</strong>.</li>
                      <li>Hapus semua kode yang ada, lalu tempel (paste) kode di bawah ini.</li>
                      <li>Klik ikon <strong>Save</strong> (disket).</li>
                      <li>Pilih fungsi <strong>setupDatabase</strong> di bagian atas editor, lalu klik <strong>Run</strong>. Ini akan membuat semua sheet (sekolah, guru, dll) secara otomatis.</li>
                      <li>Klik tombol <strong>Deploy</strong> &gt; <strong>New Deployment</strong>.</li>
                      <li>Pilih type: <strong>Web App</strong>.</li>
                      <li>Setel &quot;Who has access&quot; ke <strong>&quot;Anyone&quot;</strong>.</li>
                      <li>Klik <strong>Deploy</strong> dan salin (copy) <strong>Web App URL</strong> yang muncul.</li>
                    </ol>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <Code className="w-4 h-4 text-blue-400" /> Salin Kode Lengkap Ini
                        </h3>
                      </div>
                      <pre className="text-[10px] bg-black/30 p-4 rounded-xl overflow-x-auto text-blue-200 font-mono leading-relaxed">
{`// 1. FUNGSI UNTUK MEMBUAT TABEL OTOMATIS (Jalankan ini sekali)
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = {
    "sekolah": ["id", "nama_sekolah", "kecamatan", "alamat", "latitude", "longitude", "jumlah_guru", "jumlah_siswa", "fasilitas_lab"],
    "guru": ["id", "nama", "nip", "sekolah_id", "pendidikan", "status_guru", "kontak"],
    "kompetensi": ["id", "guru_id", "pedagogik", "profesional", "sosial", "kepribadian", "pelatihan"],
    "portofolio": ["id", "guru_id", "judul", "jenis", "link"],
    "berita": ["id", "judul", "tanggal", "isi", "gambar"],
    "resources": ["id", "judul", "kategori", "link", "deskripsi"],
    "forum": ["id", "judul", "isi", "penulis", "tanggal"],
    "kegiatan": ["id", "nama_kegiatan", "tanggal", "lokasi", "deskripsi"]
  };

  for (var name in sheets) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.getRange(1, 1, 1, sheets[name].length).setValues([sheets[name]]).setFontWeight("bold");
    }
  }
  Browser.msgBox("Setup Berhasil! Semua sheet telah dibuat.");
}

// 2. FUNGSI UNTUK MENERIMA DATA DARI APLIKASI
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var sheet = ss.getSheetByName(data.sheet);
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({success: false, message: "Sheet tidak ditemukan"})).setMimeType(ContentService.MimeType.JSON);
  }

  if (data.action === 'insert') {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newRow = headers.map(h => data.data[h] || "");
    sheet.appendRow(newRow);
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: false, message: "Aksi tidak dikenal"})).setMimeType(ContentService.MimeType.JSON);
}`}
                      </pre>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-display font-bold text-slate-900">Langkah 3: Hubungkan ke Aplikasi</h2>
                      <p className="text-sm text-slate-500">
                        Tempelkan URL yang Anda salin tadi ke dalam panel <strong>Secrets</strong> di AI Studio dengan nama:
                      </p>
                      <div className="p-4 bg-slate-100 rounded-2xl font-mono text-sm text-blue-600 font-bold flex items-center justify-between">
                        <span>NEXT_PUBLIC_WRITE_API_URL</span>
                        <button 
                          onClick={async () => {
                            const url = process.env.NEXT_PUBLIC_WRITE_API_URL;
                            if (!url) {
                              alert("URL belum diatur di Secrets!");
                              return;
                            }
                            setIsSubmitting(true);
                            try {
                              const res = await fetch(url, { method: 'POST', mode: 'no-cors', body: JSON.stringify({action: 'ping'}) });
                              alert("Koneksi berhasil terdeteksi! (Aplikasi dapat menjangkau script)");
                            } catch (e) {
                              alert("Koneksi Gagal: " + (e instanceof Error ? e.message : String(e)));
                            } finally {
                              setIsSubmitting(false);
                            }
                          }}
                          className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all"
                        >
                          Tes Koneksi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
