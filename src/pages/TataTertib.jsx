import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// IMPORT DATA & KOMPONEN EXTERNAL (PERFORMANCE BOOST)
import { KETENTUAN_UMUM, KETERLAMBATAN_ABSENSI, PINDAH_SHIFT } from '../data/rulesData';
import { RuleItem, SpecialRuleItem, WarningIcon } from '../components/RuleItem';

export default function TataTertib() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Tata Tertib Praktikum - Laboratorium Pajak Gunadarma</title>
        <meta name="description" content="Aturan berpakaian, ketentuan keterlambatan, absensi, dan tata tertib resmi pelaksanaan praktikum di Laboratorium Akuntansi Lanjut B (TaxLaboratory)." />
        <link rel="canonical" href="https://www.taxlaboratory.my.id/tata-tertib" />
      </Helmet>
    {/* SEMANTIC HTML: Menggunakan <main> untuk SEO */}
    <main className="pt-32 pb-32 min-h-screen bg-[#fafafa] font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER (SEO OPTIMIZED) */}
        <header className="text-center mb-24">
          {/* H1 Disuntik Keyword Utama */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Tata Tertib <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Laboratorium Pajak</span>
          </h1>
          {/* Deskripsi disuntik Keyword Turunan */}
          <p className="text-slate-500 text-lg">Seluruh praktikan <strong>Laboratorium Akuntansi Lanjut B</strong> (TaxLaboratorium) wajib membaca dan mematuhi pedoman praktikum berikut.</p>
        </header>

        {/* ====================================
            SECTION 1: KETENTUAN BERPAKAIAN
        ==================================== */}
        <section className="mb-20" aria-labelledby="aturan-pakaian">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-lg shadow-sm">1</span>
            <h2 id="aturan-pakaian" className="text-2xl font-bold text-slate-900">Ketentuan Berpakaian</h2>
          </div>
          
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
              
              {/* KIRI: WANITA */}
              <div>
                <div className="flex flex-col items-center text-center gap-3 mb-6 pb-5 border-b border-slate-100">
                  <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center p-3 shadow-sm">
                    {/* Lazy Load & Alt Text SEO */}
                    <img src="/img-template/logo-wanita.png" alt="Standar Pakaian Praktikan Wanita Lab Akuntansi Pajak" loading="lazy" decoding="async" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Praktikan Wanita</h3>
                </div>

                <ul className="flex flex-col gap-2">
                  <RuleItem letter="A">Kemeja berkerah atau batik (dimasukkan). Bukan kaos/blouse/flannel/berkarakter. Tidak ketat & tidak transparan.</RuleItem>
                  <RuleItem letter="B">Rok hitam berbahan kain & bersleting (bukan kaos).</RuleItem>
                  <RuleItem letter="C">Panjang rok di bawah lutut (non-hijab) atau menutupi mata kaki (berhijab).</RuleItem>
                  <RuleItem letter="D">Wajib memakai kerudung segi empat (bagi yang berhijab).</RuleItem>
                </ul>
              </div>

              {/* KANAN: PRIA */}
              <div>
                <div className="flex flex-col items-center text-center gap-3 mb-6 pb-5 border-b border-slate-100">
                  <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center p-3 shadow-sm">
                    {/* Lazy Load & Alt Text SEO */}
                    <img src="/img-template/logo-laki.png" alt="Standar Pakaian Praktikan Pria TaxLaboratorium" loading="lazy" decoding="async" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Praktikan Pria</h3>
                </div>

                <ul className="flex flex-col gap-2">
                  <RuleItem letter="A">Kemeja berkerah atau batik (tidak bermotif bola). Bukan berbahan kaos/flanel/berkarakter.</RuleItem>
                  <RuleItem letter="B">Celana panjang hitam bahan kain. Bukan hipster / kargo / celana gunung / gombrong / chino.</RuleItem>
                  <RuleItem letter="C">Panjang celana wajib menutupi mata kaki.</RuleItem>
                </ul>
              </div>

            </div>

            {/* Peringatan Tambahan */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex gap-4 items-start shadow-sm mx-2 mb-2">
              <div className="text-amber-500 mt-0.5"><WarningIcon /></div>
              <div className="flex flex-col gap-1.5">
                <span className="font-bold uppercase tracking-widest text-amber-800 text-sm">Peringatan Tambahan</span>
                <p className="text-amber-900 text-[15px] leading-relaxed">
                  Tidak menggunakan perhiasan yang berlebihan (termasuk tindik) kecuali jam tangan. Bagi praktikan yang berambut panjang/gondrong <strong className="font-bold">wajib diikat</strong> selama praktikum berlangsung dan juga Segala bentuk kehilangan barang pribadi<strong> bukan menjadi tanggung jawab </strong> Laboratorium Akuntansi Lanjut B.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================
            SECTION 2: KETENTUAN UMUM
        ==================================== */}
        <section className="mb-20" aria-labelledby="ketentuan-umum">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-lg shadow-sm">2</span>
            <h2 id="ketentuan-umum" className="text-2xl font-bold text-slate-900">Ketentuan Umum</h2>
          </div>
          
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-200">
            <ul className="flex flex-col gap-2">
              {/* LOOPING DARI DATA EXTERNAL */}
              {KETENTUAN_UMUM.map((text, idx) => (
                <RuleItem key={`umum-${idx}`} letter={String.fromCharCode(97 + idx)}>
                  {text}
                </RuleItem>
              ))}
            </ul>
          </div>
        </section>

        {/* ====================================
            SECTION 3: KETERLAMBATAN
        ==================================== */}
        <section className="mb-20" aria-labelledby="keterlambatan">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-lg shadow-sm">3</span>
            <h2 id="keterlambatan" className="text-2xl font-bold text-slate-900">Keterlambatan dan Absensi</h2>
          </div>
          
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-200">
            <ul className="flex flex-col gap-2">
              {/* LOOPING DARI DATA EXTERNAL */}
              {KETERLAMBATAN_ABSENSI.map((text, idx) => (
                <RuleItem key={`absen-${idx}`} letter={String.fromCharCode(97 + idx)}>
                  {text}
                </RuleItem>
              ))}
              
              <SpecialRuleItem letter="g">
                Batas maksimal ketidakhadiran <span className="font-bold">2 kali</span>, jika pada ke-3 kalinya tetap tidak hadir maka praktikan akan di <span className="bg-rose-600 text-white font-black px-2 py-0.5 rounded text-sm tracking-wider mx-1 shadow-sm">DELETE</span> dari praktikum bersangkutan (Region Depok, Kalimalang, dan Salemba).
              </SpecialRuleItem>
              <SpecialRuleItem letter="h">
                Batas maksimal ketidakhadiran <span className="font-bold">1 kali</span>, jika pada ke-2 kalinya tetap tidak hadir maka praktikan akan di <span className="bg-rose-600 text-white font-black px-2 py-0.5 rounded text-sm tracking-wider mx-1 shadow-sm">DELETE</span> dari praktikum yang bersangkutan (Region Karawaci, dan Cengkareng).
              </SpecialRuleItem>
            </ul>
          </div>
        </section>

        {/* ====================================
            SECTION 4: PINDAH SHIFT
        ==================================== */}
        <section className="mb-12" aria-labelledby="pindah-shift">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-lg shadow-sm">4</span>
            <h2 id="pindah-shift" className="text-2xl font-bold text-slate-900">Ketentuan Pindah Shift</h2>
          </div>
          
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-200">
            <ul className="flex flex-col gap-2">
              {/* LOOPING DARI DATA EXTERNAL */}
              {PINDAH_SHIFT.map((text, idx) => (
                <RuleItem key={`shift-${idx}`} letter={String.fromCharCode(97 + idx)}>
                  {text}
                </RuleItem>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </main>
    </PageTransition>
  );
}