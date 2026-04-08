'use client';

import { Bell, Search, User, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
        <span className="font-display font-bold text-blue-600">SIGMA</span>
      </div>

      <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-96 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Cari sekolah, guru, atau materi..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-1" />
        <button className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-100 rounded-xl transition-all">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">Admin MGMP</p>
            <p className="text-[10px] text-slate-500 font-medium">Kabupaten Buol</p>
          </div>
        </button>
      </div>
    </header>
  );
}
