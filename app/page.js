import Link from 'next/link'; // 1. Tambahkan import ini

export default function MobileHomePage() {
  return (
    <div 
      className="relative mx-auto w-full max-w-md h-[100dvh] overflow-hidden flex flex-col items-center pt-0"
      style={{
        backgroundImage: "url('/bg-forest.png')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Maskot Foxy */}
      <div className="relative z-10 w-[200px] self-start ml-[10%] -mb-12 -mt-2">
        <img 
          src="/foxy.png" 
          alt="Foxy si Rubah" 
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Kotak Putih / Chat Bubble */}
      <div className="relative z-0 w-[80%] bg-white rounded-[1.5rem] px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-extrabold text-black mb-2">
          Halo, Teman!
        </h1>
        <p className="text-[13px] font-bold text-[#BA5D12]">
          Foxy si Rubah
        </p>
      </div>

      {/* Tombol Menu Utama (Tengah Vertikal) */}
      <div className="relative z-10 flex-1 w-full flex flex-col justify-center gap-5 px-10 pb-12">
        
        {/* Tombol Belajar (Biru) - Diubah menjadi Link */}
        <Link 
          href="/belajar" 
          className="block text-center w-full bg-[#3B82F6] active:translate-y-1 text-white font-black text-xl py-4 rounded-[1.5rem] shadow-[0_6px_0_#1D4ED8] transition-all"
        >
          Belajar
        </Link>
        
        {/* Tombol Latihan (Hijau) */}
        <Link 
        href="/latihan"
        className="block text-center w-full bg-[#22C55E] active:translate-y-1 text-white font-black text-xl py-4 rounded-[1.5rem] shadow-[0_6px_0_#15803D] transition-all">
          Latihan
        </Link>
        
        {/* Tombol Bermain (Merah Muda) */}
        <Link 
        href="/bermain"
        className="block text-center w-full bg-[#EC4899] active:translate-y-1 text-white font-black text-xl py-4 rounded-[1.5rem] shadow-[0_6px_0_#BE185D] transition-all">
          Bermain
        </Link>
      </div>
    </div>
  );
}