import { Suspense, lazy } from 'react'; // Pakai lazy buat Code Splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react"; // Import Analytics Vercel

// IMPORT KOMPONEN TETAP (Non-Lazy)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import InstallButton from './components/InstallButton';

// IMPORT HALAMAN DENGAN LAZY LOADING (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const Oprec = lazy(() => import('./pages/Oprec'));
const TentangKami = lazy(() => import('./pages/TentangKami'));
const Team = lazy(() => import('./pages/Team'));
const Staff = lazy(() => import('./pages/Staff'));
const TataTertib = lazy(() => import('./pages/TataTertib'));
const Modul = lazy(() => import('./pages/Modul'));
const SoftwarePajak = lazy(() => import('./pages/SoftwarePajak'));
const Lokasi = lazy(() => import('./pages/Lokasi'));
const Faq = lazy(() => import('./pages/Faq'));
const Kontak = lazy(() => import('./pages/Kontak'));
const NotFound = lazy(() => import('./pages/NotFound'));


// Komponen Loading Sederhana saat transisi antar halaman
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-900 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth">
          <Navbar />
          
          {/* Suspense wajib ada buat ngebungkus komponen Lazy */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/oprec" element={<Oprec />} />
              <Route path="/tentang-kami" element={<TentangKami />} />
              <Route path="/team" element={<Team />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/tata-tertib" element={<TataTertib />} />
              <Route path="/modul" element={<Modul />} />
              <Route path="/software-pajak" element={<SoftwarePajak />} />
              <Route path="/lokasi" element={<Lokasi />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <InstallButton />
          <Footer />
          
          {/* Vercel Analytics terpasang otomatis di sini */}
          <Analytics />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}