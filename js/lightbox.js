/* ==========================================
   SJ Foods Online — Lightbox Engine (js/lightbox.js)
   ========================================== */

// Lightbox State
let lightboxState = {
  isOpen: false,
  currentImgSrc: ""
};

// ==========================================
// 1. Core Lightbox Functions
// ==========================================

// لائٹ باکس کھولیں (صرف تصویر پر کلک کرنے پر)
function openLightbox(src) {
  if (!src) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (lightbox && lightboxImg) {
    lightboxState.isOpen = true;
    lightboxState.currentImgSrc = src;

    lightboxImg.src = src;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // سکرول بند کریں
  }
}

// لائٹ باکس بند کریں
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (lightbox) {
    lightboxState.isOpen = false;
    lightbox.classList.add("hidden");
    document.body.style.overflow = ""; // سکرول دوبارہ بحال کریں

    if (lightboxImg) {
      lightboxImg.src = "";
    }
  }
}

// ==========================================
// 2. Event Listeners Setup
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("closeLightboxBtn");

  // بیک گراؤنڈ پر کلک کرنے سے لائٹ باکس بند کریں
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.id === "lightboxImgContainer") {
        closeLightbox();
      }
    });
  }

  // کراس (X) بٹن پر کلک کرنے سے بند کریں
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // کی بورڈ کے Escape (ESC) بٹن سے بند کریں
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxState.isOpen) {
      closeLightbox();
    }
  });
});
