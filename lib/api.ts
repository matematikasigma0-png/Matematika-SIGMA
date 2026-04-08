export interface Sekolah {
  id: string;
  nama_sekolah: string;
  kecamatan: string;
  alamat: string;
  latitude: string;
  longitude: string;
  jumlah_guru: string;
  jumlah_siswa: string;
  fasilitas_lab: string;
}

export interface Guru {
  id: string;
  nama: string;
  nip: string;
  sekolah_id: string;
  pendidikan: string;
  status: string;
  kontak: string;
}

export interface Kompetensi {
  id: string;
  guru_id: string;
  pedagogik: string;
  profesional: string;
  sosial: string;
  kepribadian: string;
  pelatihan: string;
}

export interface Portofolio {
  id: string;
  guru_id: string;
  judul: string;
  jenis: string;
  link: string;
}

export interface Berita {
  id: string;
  judul: string;
  tanggal: string;
  isi: string;
  gambar: string;
}

export interface Resource {
  id: string;
  judul: string;
  kategori: string;
  link: string;
  deskripsi: string;
}

export interface Forum {
  id: string;
  judul: string;
  isi: string;
  penulis: string;
  tanggal: string;
}

export interface Kegiatan {
  id: string;
  nama_kegiatan: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
}

const BASE_URL = 'https://opensheet.elk.sh/16ggvffW2O41rZiM5n3oztSlLamxVHTbNmeCup4ihf40';

// This URL should be a Google Apps Script Web App URL that handles POST requests
// Users can set this in their environment variables
const WRITE_API_URL = process.env.NEXT_PUBLIC_WRITE_API_URL || '';

async function fetchData<T>(sheetName: string): Promise<T[]> {
  try {
    const res = await fetch(`${BASE_URL}/${sheetName}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      console.error(`Gagal mengambil data ${sheetName} (Status: ${res.status})`);
      return []; // Return empty instead of throwing
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return []; // Return empty instead of throwing
  }
}

export async function saveData(sheetName: string, data: any): Promise<{ success: boolean; message: string }> {
  if (!WRITE_API_URL) {
    return { 
      success: false, 
      message: 'Write API URL belum dikonfigurasi. Silakan hubungi admin untuk menghubungkan Google Apps Script.' 
    };
  }

  try {
    const res = await fetch(WRITE_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'insert',
        sheet: sheetName,
        data: data
      })
    });

    const result = await res.json();
    return { 
      success: result.success, 
      message: result.message || (result.success ? 'Data berhasil disimpan' : 'Gagal menyimpan data') 
    };
  } catch (error) {
    console.error(`Error saving to ${sheetName}:`, error);
    return { success: false, message: 'Terjadi kesalahan koneksi saat menyimpan data.' };
  }
}

export async function updateData(sheetName: string, id: string, data: any): Promise<{ success: boolean; message: string }> {
  if (!WRITE_API_URL) {
    return { success: false, message: 'Write API URL belum dikonfigurasi.' };
  }

  try {
    const res = await fetch(WRITE_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'update',
        sheet: sheetName,
        id: id,
        data: data
      })
    });

    const result = await res.json();
    return { success: result.success, message: result.message || 'Data berhasil diperbarui' };
  } catch (error) {
    console.error(`Error updating ${sheetName}:`, error);
    return { success: false, message: 'Terjadi kesalahan koneksi saat memperbarui data.' };
  }
}

export const getSekolah = () => fetchData<Sekolah>('sekolah');
export const getGuru = () => fetchData<Guru>('guru');
export const getKompetensi = () => fetchData<Kompetensi>('kompetensi');
export const getPortofolio = () => fetchData<Portofolio>('portofolio');
export const getResources = () => fetchData<Resource>('resources');
export const getForum = () => fetchData<Forum>('forum');
export const getKegiatan = () => fetchData<Kegiatan>('kegiatan');
export const getBerita = () => fetchData<Berita>('berita');
