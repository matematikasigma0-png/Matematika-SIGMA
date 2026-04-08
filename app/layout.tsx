import type { Metadata } from 'next';
import './globals.css';
import { inter, outfit } from '@/lib/fonts';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthContext';

export const metadata: Metadata = {
  title: 'SIGMA Buol - Komunitas Matematika SMP',
  description: 'Sistem Informasi Komunitas Guru Matematika SMP Kabupaten Buol',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-slate-50 font-sans text-slate-900">
        <AuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />
              <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
