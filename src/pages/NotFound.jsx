import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      {/* SEO: Kasih tau Google buat jangan ngindeks halaman ini (noindex) */}
      <Helmet>
        <title>404 Halaman Tidak Ditemukan - TaxLaboratory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans pt-20">
        
        {/* Efek Latar Belakang Khas TaxLab */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 text-center flex flex-col items-center animate-in fade-in zoom-in duration-700">
          
          {/* Teks 404 Gede dengan Gradient */}
          <h1 className="text-[8rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-900 via-purple-700 to-orange-500 leading-none mb-4 md:mb-0 drop-shadow-sm select-none">
            404
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Page Not Found !
          </h2>
          
          <p className="text-slate-500 text-base md:text-lg max-w-lg mb-10 font-medium leading-relaxed">
            Halaman yang Anda cari mungkin sudah dipindahkan, dihapus, atau Anda salah memasukkan alamat URL. Mari kembali ke jalan yang benar!
          </p>
          
          <Link 
            to="/" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Beranda
          </Link>

        </div>
      </main>
    </PageTransition>
  );
}