import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';

// IMPORT KOMPONEN DARI LUAR (Meringankan Render)
import { EmailIcon, InstagramIcon } from '../components/ContactIcons';
import ContactCard from '../components/ContactCard';

export default function Kontak() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
    {/* SEMANTIC HTML: Menggunakan <main> untuk menaikkan skor SEO */}
    <main className="pt-32 pb-32 min-h-screen bg-[#fafafa] font-sans text-slate-800 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION (SEO OPTIMIZED) */}
        <header className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6 bg-white border border-slate-200 px-5 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Pusat Bantuan</span>
          </div>
          
          {/* Inject Keyword Utama di H1 */}
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Hubungi Tim <span className="text-purple-900">TaxLaboratory</span>
          </h1>
          
          {/* Inject Keyword Turunan di Paragraf */}
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
            Punya pertanyaan seputar praktikum di <strong>Laboratorium Akuntansi Lanjut B</strong>, pendaftaran asisten, atau butuh bantuan teknis terkait <strong>Lab Akuntansi Pajak</strong>? Tim kami siap merespon pesan Anda.
          </p>
        </header>

        {/* CONTACT GRID - Diperbarui agar di HP posisinya di tengah dan proporsional */}
        <section aria-label="Jalur Komunikasi Laboratorium" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 max-w-md mx-auto md:max-w-none w-full">
          
          {/* Card Email */}
          <ContactCard delay={0}>
            <article className="w-full group bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-purple-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full transform-gpu">
              <div className="w-20 h-20 bg-purple-50 text-purple-900 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-purple-900 group-hover:text-white transition-all duration-500 shadow-inner transform-gpu">
                <EmailIcon />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Email Resmi</h2>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Kirimkan pertanyaan atau surat resmi Anda melalui alamat email institusi kami.
              </p>
              <a 
                href="mailto:taxlaboratory@gunadarma.ac.id"
                aria-label="Kirim email ke taxlaboratory@gunadarma.ac.id" 
                className="mt-auto w-full md:w-auto bg-slate-900 text-white font-black px-6 py-4 rounded-2xl hover:bg-purple-900 transition-colors shadow-lg break-all md:break-normal text-sm md:text-base"
              >
                taxlaboratory@gunadarma.ac.id
              </a>
            </article>
          </ContactCard>

          {/* Card Instagram */}
          <ContactCard delay={200}>
            <article className="w-full group bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-orange-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full transform-gpu">
              <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner transform-gpu">
                <InstagramIcon />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Instagram</h2>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Ikuti info praktikum terbaru dan kegiatan asisten melalui akun media sosial kami.
              </p>
              <a 
                href="https://www.instagram.com/taxlaboratory/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Kunjungi Instagram resmi TaxLaboratorium Gunadarma"
                className="mt-auto w-full md:w-auto bg-orange-500 text-white font-black px-8 py-4 rounded-2xl hover:bg-orange-600 transition-colors shadow-lg"
              >
                @taxlaboratory
              </a>
            </article>
          </ContactCard>

        </section>

        {/* INFO TAMBAHAN (Mindful Note) */}
        <aside className="max-w-2xl mx-auto bg-purple-900 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <h3 className="text-white text-xl font-bold mb-4 relative z-10">Waktu Operasional Pesan</h3>
          <p className="text-purple-200 font-medium relative z-10">
            Tim kami akan membalas pesan Anda pada jam kerja operasional Laboratorium (Senin - Sabtu, 08:00 - 17:00 WIB). Mohon menunggu respon dengan sabar.
          </p>
        </aside>

      </div>
    </main>
    </PageTransition>
  );
}