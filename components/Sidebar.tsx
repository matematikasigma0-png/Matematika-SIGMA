'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  School, 
  Users, 
  Map as MapIcon, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Sparkles,
  ChevronRight,
  LogIn,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthContext';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Pemetaan GIS', href: '/sekolah/peta', icon: MapIcon },
  { name: 'Data Sekolah', href: '/sekolah', icon: School },
  { name: 'Data Guru', href: '/guru', icon: Users },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'AI Prompts', href: '/ai-prompts', icon: Sparkles },
  { name: 'Forum Diskusi', href: '/forum', icon: MessageSquare },
  { name: 'Kegiatan', href: '/kegiatan', icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  return (
    <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-slate-200 sticky top-0 h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <span className="font-bold text-xl">Σ</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-slate-900 leading-tight">SIGMA BUOL</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">MGMP Matematika SMP</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}>
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active-pill">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </motion.div>
                )}
              </div>
            </Link>
          );
        })}

        {user?.role === 'admin' && (
          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Admin Panel</p>
            <Link href="/admin">
              <div className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                pathname === '/admin' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
              )}>
                <Settings className="w-5 h-5" />
                <span className="font-medium text-sm">Kelola Sistem</span>
              </div>
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        {!isLoading && (
          user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{user.nama}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm"
              >
                <LogOut className="w-5 h-5" /> Keluar
              </button>
            </div>
          ) : (
            <Link href="/login">
              <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all font-bold text-sm">
                <LogIn className="w-5 h-5" /> Masuk Sistem
              </div>
            </Link>
          )
        )}
      </div>
    </aside>
  );
}
