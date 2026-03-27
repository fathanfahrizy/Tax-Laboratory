import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PageTransition from '../components/PageTransition';
import { LOKASI_DATA } from '../data/lokasiData';
import { SearchIcon, MapPinIcon, CloseIcon } from '../components/LokasiIcons';
import { Helmet } from 'react-helmet-async';

export default function Lokasi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState(LOKASI_DATA[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // =========================================
  // STATE & LOGIC: LIVE JAM OPERASIONAL
  // =========================================
  const [now, setNow] = useState(new Date());

  // Update waktu setiap 1 menit biar statusnya akurat tanpa perlu refresh
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi cerdas buat ngecek status berdasar jadwal spesifik tiap lokasi
  const getLiveStatus = (hoursArray) => {
    const daysMap = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const currentDayStr = daysMap[now.getDay()];
    // Cari jadwal hari ini untuk lokasi yang sedang dicek
    const todaySchedule = hoursArray.find(h => h.day === currentDayStr)?.time;

    // 1. Cek kalau jadwalnya "Tutup" (Misal hari Minggu)
    if (!todaySchedule || todaySchedule === "Tutup") {
      return { text: "TUTUP", badgeBg: "bg-rose-50", badgeText: "text-rose-600", dotColor: "bg-rose-500", pulse: false };
    }

    // 2. Parse jam "08:00 - 17:00" atau "08:00 - 12:00"
    const [startStr, endStr] = todaySchedule.split(" - ");
    if (!startStr || !endStr) {
      return { text: "TUTUP", badgeBg: "bg-rose-50", badgeText: "text-rose-600", dotColor: "bg-rose-500", pulse: false };
    }

    const startVal = parseInt(startStr.split(":")[0]) + parseInt(startStr.split(":")[1]) / 60;
    const endVal = parseInt(endStr.split(":")[0]) + parseInt(endStr.split(":")[1]) / 60;
    const currentVal = now.getHours() + now.getMinutes() / 60;

    // 3. Cek apakah saat ini di luar jam operasional yang ditentukan?
    if (currentVal < startVal || currentVal >= endVal) {
      return { text: "TUTUP", badgeBg: "bg-rose-50", badgeText: "text-rose-600", dotColor: "bg-rose-500", pulse: false };
    }

    // 4. Cek Jam Istirahat (Khusus Hari Kerja: Senin - Jumat)
    const dayIdx = now.getDay();
    if (dayIdx >= 1 && dayIdx <= 5) {
      const isFriday = dayIdx === 5;
      const isBreak = isFriday ? (currentVal >= 11.5 && currentVal < 13.5) : (currentVal >= 12 && currentVal < 13);
      if (isBreak) {
        return { text: "ISTIRAHAT", badgeBg: "bg-amber-50", badgeText: "text-amber-700", dotColor: "bg-amber-500", pulse: true };
      }
    }

    // 5. Kalau lolos semua filter di atas, berarti BUKA!
    return { text: "BUKA", badgeBg: "bg-emerald-50", badgeText: "text-emerald-600", dotColor: "bg-emerald-500", pulse: true };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isModalOpen]);

  const filteredLocations = useMemo(() => {
    return LOKASI_DATA.filter(loc => 
      loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleOpenModal = (loc) => {
    setModalData(loc);
    setIsModalOpen(true);
  };

  return (
    <PageTransition>
    <>
      <Helmet>
        <title>Lokasi Lab Pajak - Kampus Universitas Gunadarma</title>
        <meta name="description" content="Informasi lengkap lokasi, alamat, dan jam operasional Laboratorium Akuntansi Lanjut B (TaxLaboratory)." />
      </Helmet>
      
      <main className="pt-32 pb-24 min-h-screen bg-[#fafafa] font-sans text-slate-800 flex flex-col relative z-0">
        
        {/* HEADER TEXT (SEO OPTIMIZED) */}
        <header className="max-w-7xl mx-auto w-full px-6 mb-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-[2.75rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Lokasi <span className="text-orange-500">Laboratorium Pajak</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            Cari dan temukan letak <strong>Laboratorium Akuntansi Lanjut B</strong> (TaxLaboratorium) di berbagai region kampus.
          </p>
        </header>

        {/* CONTAINER UTAMA */}
        <section aria-label="Peta dan Daftar Lokasi" className="max-w-7xl mx-auto w-full px-6 flex-grow flex flex-col">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[75vh]">
            
            {/* KOLOM KIRI: SEARCH & LIST */}
            {/* FIX: Border ditebelin jadi 8px (border-b-[8px]) dan z-index dinaikin biar shadow-nya jatuh ke atas map */}
            <div className="w-full lg:w-[35%] flex flex-col border-b-[8px] lg:border-b-0 lg:border-r-[8px] border-orange-500 bg-white z-20 h-[450px] lg:h-full shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
              
              <div className="p-6 border-b border-slate-100 bg-white relative z-20 shadow-sm">
                <div className="relative flex items-center bg-slate-50 rounded-xl border border-transparent focus-within:border-slate-200 focus-within:bg-white transition-all">
                  <input 
                    type="text" 
                    placeholder="Cari Lokasi Kampus..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-slate-800 px-5 py-3.5 focus:outline-none font-medium placeholder-slate-400"
                  />
                  <div className="absolute right-4">
                    <SearchIcon />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 bg-slate-50/50">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => {
                    const liveStatus = getLiveStatus(loc.hours); // Hitung Live Status di sini

                    return (
                      <div 
                        key={loc.id} 
                        onClick={() => setActiveLocation(loc)}
                        className={`p-6 cursor-pointer border-b border-slate-200/50 last:border-0 transition-all duration-300 relative group
                          ${activeLocation.id === loc.id ? 'bg-white shadow-sm z-10' : 'hover:bg-white/50'}
                        `}
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
                          ${activeLocation.id === loc.id ? 'bg-orange-500' : 'bg-transparent group-hover:bg-slate-200'}
                        `}></div>

                        <div className="flex items-center justify-between gap-3 mb-3">
                          <h3 className={`font-black text-lg tracking-wide transition-colors
                            ${activeLocation.id === loc.id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}
                          `}>
                            {loc.title}
                          </h3>
                          
                          {/* BADGE LIVE STATUS (LIST) */}
                          <div className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${liveStatus.badgeBg} ${liveStatus.badgeText}`}>
                            <div className="relative flex items-center justify-center">
                              {liveStatus.pulse && <span className={`absolute inline-flex h-full w-full rounded-full ${liveStatus.dotColor} opacity-40 animate-ping`}></span>}
                              <div className={`w-1.5 h-1.5 rounded-full ${liveStatus.dotColor}`}></div>
                            </div>
                            {liveStatus.text}
                          </div>
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed mb-5 pr-2 line-clamp-2">
                          {loc.address}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <a href={loc.directionUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto shadow-sm">
                            <MapPinIcon /> Get Direction
                          </a>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(loc);
                            }}
                            className="border-2 border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto"
                          >
                            More Info
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-400 font-medium">
                    Lokasi tidak ditemukan.
                  </div>
                )}
              </div>
            </div>

            {/* KOLOM KANAN: MAPS */}
            <div className="w-full lg:w-[65%] h-[50vh] lg:h-full bg-slate-100 relative overflow-hidden">
              {activeLocation ? (
                <iframe
                  key={activeLocation.id} 
                  title={`Peta Lokasi Lab Akuntansi Pajak ${activeLocation.title}`}
                  src={activeLocation.mapUrl}
                  className="w-full h-full border-0" 
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
                  Pilih lokasi untuk melihat peta
                </div>
              )}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-slate-900/10 to-transparent pointer-events-none hidden lg:block"></div>
            </div>

          </div>
        </section>

        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        `}} />
      </main>

      {/* =========================================
          MODAL "MORE INFO"
      ========================================= */}
      {isModalOpen && modalData && createPortal(
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 pt-[100px] sm:pt-[120px] md:px-8">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm cursor-pointer transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 max-h-[85vh] lg:max-h-[75vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-orange-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all border border-slate-200">
               <CloseIcon />
            </button>
            
            <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-slate-100 shrink-0">
               <img src={modalData.image} className="w-full h-full object-fill" alt={`Gedung ${modalData.title}`} loading="lazy" decoding="async" onError={(e) => { e.target.src = "https://placehold.co/600x800/1e293b/ffffff?text=FOTO+GEDUNG" }} />
            </div>
            
            <div className="w-full md:w-7/12 p-6 sm:p-8 lg:p-10 overflow-y-auto custom-scrollbar flex flex-col bg-white">
               <h2 className="text-[1.35rem] font-black text-slate-900 mb-1">Detail Lokasi</h2>
               <div className="flex flex-wrap items-center gap-3 mb-2 mt-3">
                  <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">{modalData.title}</h3>
                  
                  {/* BADGE LIVE STATUS (MODAL) */}
                  {(() => {
                    const modalLiveStatus = getLiveStatus(modalData.hours);
                    return (
                      <div className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${modalLiveStatus.badgeBg} ${modalLiveStatus.badgeText}`}>
                          <div className="relative flex items-center justify-center">
                            {modalLiveStatus.pulse && <span className={`absolute inline-flex h-full w-full rounded-full ${modalLiveStatus.dotColor} opacity-40 animate-ping`}></span>}
                            <div className={`w-2 h-2 rounded-full ${modalLiveStatus.dotColor}`}></div>
                          </div>
                          {modalLiveStatus.text}
                      </div>
                    );
                  })()}
               </div>
               
               <p className="text-slate-600 text-[15px] leading-relaxed mb-8 border-b border-slate-100 pb-6">{modalData.address}</p>
               <h4 className="font-extrabold text-slate-900 mb-4 text-base">Jam Operasional</h4>
               <div className="grid grid-cols-1 gap-2 mb-8 text-[14px] text-slate-600 font-medium">
                  {modalData.hours.map((h, i) => (
                     <div key={i} className="flex">
                        <span className="w-24 text-slate-500">{h.day}</span>
                        <span className={h.time === "Tutup" ? "text-rose-500 font-bold" : "text-slate-800"}>{h.time}</span>
                     </div>
                  ))}
               </div>
               <h4 className="font-extrabold text-slate-900 mb-3 text-base">Fasilitas tersedia:</h4>
               <ul className="list-disc pl-5 space-y-1.5 mb-10 text-[14px] font-bold text-slate-700">
                  {modalData.facilities.map((f, i) => (<li key={i}>{f}</li>))}
               </ul>
               <div className="mt-auto pt-2">
                  <a href={modalData.directionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-orange-500 text-slate-50 font-black px-8 py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg w-fit">
                     <MapPinIcon /> Get Direction
                  </a>
               </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
    </PageTransition>
  );
}