/* ==========================================
   SJ Foods Online — PWA & App Installer (js/install.js)
   ========================================== */

let deferredPrompt = null;

// ==========================================
// 1. Listen for BeforeInstallPrompt Event
// ==========================================
window.addEventListener("beforeinstallprompt", (e) => {
  // براؤزر کا ڈیفالٹ برانڈ بینر روکیں
  e.preventDefault();
  deferredPrompt = e;

  // ویب سائٹ پر انسٹال بٹن یا بینر دکھائیں
  showInstallBanner(true);
});

// ==========================================
// 2. Install App Action
// ==========================================
async function installPWA() {
  if (!deferredPrompt) return;

  // انسٹال پاپ اپ دکھائیں
  deferredPrompt.prompt();

  // صارف کا جواب چیک کریں
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === "accepted") {
    if (typeof showToast === "function") {
      showToast("🎉 SJ Foods Online ایپ انسٹال ہو گئی!");
    }
  }

  // پرامپٹ صاف کریں
  deferredPrompt = null;
  showInstallBanner(false);
}

// ==========================================
// 3. Banner Visibility Helper
// ==========================================
function showInstallBanner(show) {
  const installBtn = document.getElementById("installAppBtn");
  const installBanner = document.getElementById("installBanner");

  if (installBtn) {
    installBtn.style.display = show ? "inline-flex" : "none";
  }

  if (installBanner) {
    if (show) {
      installBanner.classList.remove("hidden");
    } else {
      installBanner.classList.add("hidden");
    }
  }
}

// ==========================================
// 4. App Installed Listener & Auto Init
// ==========================================
window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  showInstallBanner(false);
  if (typeof showToast === "function") {
    showToast("✅ SJ Foods Online کامیابی سے ہوم اسکرین پر شامل کر دی گئی");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("installAppBtn");
  if (installBtn) {
    installBtn.addEventListener("click", installPWA);
  }
});
