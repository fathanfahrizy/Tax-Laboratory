import { useState, useEffect } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Tangkap event saat browser mendeteksi PWA siap di-install
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Tahan pop-up bawaan browser biar nggak muncul otomatis
      setDeferredPrompt(e); // Simpan event-nya
      setShowButton(true); // Munculin tombol buatan kita
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Munculin pop-up install bawaan browser pas tombol kita diklik
    deferredPrompt.prompt();

    // Cek apakah mahasiswa ngeklik "Install" atau "Cancel"
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Mahasiswa berhasil install aplikasi!');
      setShowButton(false); // Sembunyiin tombol kalau udah di-install
    }
    setDeferredPrompt(null);
  };

  // Kalau aplikasi udah di-install atau nggak support, tombolnya ngilang
  if (!showButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Install App TaxLab
    </button>
  );
}