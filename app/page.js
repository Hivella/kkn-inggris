import Link from 'next/link';

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
        <h1 className="text-[20px] font-extrabold text-black mb-2 leading-snug">
          Halo, Teman! Yuk, belajar bahasa Inggris!
        </h1>
        <p className="text-[13px] font-bold text-[#BA5D12]">
          Foxy si Rubah (Foxy the Fox)
        </p>
      </div>

      {/* Tombol Menu Utama (Tengah Vertikal) */}
      <div className="relative z-10 flex-1 w-full flex flex-col justify-center gap-5 px-10 pb-12">
        
        {/* Tombol Belajar (Biru) */}
        <Link 
          href="/belajar" 
          className="flex flex-col items-center justify-center w-full bg-[#3B82F6] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#1D4ED8] transition-all"
        >
          <span className="font-black text-xl leading-none">Belajar</span>
          <span className="text-sm font-bold text-blue-200 mt-1 tracking-wide">Study</span>
        </Link>
        
        {/* Tombol Latihan (Hijau) */}
        <Link 
          href="/latihan"
          className="flex flex-col items-center justify-center w-full bg-[#22C55E] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#15803D] transition-all"
        >
          <span className="font-black text-xl leading-none">Latihan</span>
          <span className="text-sm font-bold text-green-200 mt-1 tracking-wide">Practice</span>
        </Link>
        
        {/* Tombol Bermain (Merah Muda) */}
        <Link 
          href="/bermain"
          className="flex flex-col items-center justify-center w-full bg-[#EC4899] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#BE185D] transition-all"
        >
          <span className="font-black text-xl leading-none">Bermain</span>
          <span className="text-sm font-bold text-pink-200 mt-1 tracking-wide">Play</span>
        </Link>
      </div>
    </div>
  );
}