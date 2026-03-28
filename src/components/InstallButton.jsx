import { useState, useEffect } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Cek apakah web INI SUDAH DI-INSTALL (Berlaku di semua device)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      setIsInstalled(true);
      return; // Kalau udah di-install, stop di sini, tombol nggak usah muncul
    }

    // 2. Cek apakah device-nya buatan Apple (iPhone/iPad/iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    
    if (isAppleDevice) {
      setIsIOS(true);
      setShowInstallBtn(true); // Munculin tombol, tapi nanti fungsinya beda
    }

    // 3. Tangkap event PWA untuk Android & PC
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // Kalau yang ngeklik user iPhone, munculin pop-up petunjuk
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    // Kalau Android/PC, jalanin install otomatis
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  // Jangan render apa-apa kalau udah di-install atau state tombol false
  if (isInstalled || !showInstallBtn) return null;

  return (
    <>
      {/* Tombol Melayang Utama */}
      <button
        onClick={handleInstallClick}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Install App TaxLab
      </button>

      {/* Pop-up Petunjuk Khusus Apple/iOS */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <button 
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
            <div className="text-5xl mb-4">🍎</div>
            <h3 className="text-xl font-extrabold text-purple-900 mb-2">Cara Install di iPhone</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Sistem Apple mewajibkan instalasi secara manual. Ikuti 2 langkah mudah ini:
            </p>
            <div className="text-left bg-purple-50 p-4 rounded-xl mb-6 border border-purple-100">
              <ol className="list-decimal ml-4 text-sm text-gray-700 space-y-3">
                <li>
                  Tekan ikon <strong>Share</strong> (kotak dengan panah ke atas) di menu bagian bawah browser Safari Anda.
                </li>
                <li>
                  Gulir menu ke bawah, lalu pilih <strong>"Tambahkan ke Layar Utama"</strong> (Add to Home Screen).
                </li>
              </ol>
            </div>
            <button 
              onClick={() => setShowIOSInstructions(false)}
              className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Oke, Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}