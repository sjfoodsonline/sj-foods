/* ==========================================
   SJ Foods Online — Theme Controller (js/theme.js)
   ========================================== */

const THEME_KEY = "sj_foods_theme";

// Theme State Management
let themeState = {
  currentTheme: "light" // Default theme
};

// ==========================================
// 1. Core Theme Functions
// ==========================================

// ذخیرہ شدہ یا سسٹم تھیم لوڈ کریں
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  
  if (savedTheme) {
    themeState.currentTheme = savedTheme;
  } else {
    // اگر پہلی بار ڈیوائس پر اوپن ہو تو ڈیوائس کی سسٹم تھیم چیک کریں
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    themeState.currentTheme = prefersDark ? "dark" : "light";
  }

  applyTheme(themeState.currentTheme);
}

// تھیم کو HTML پر لاگو کریں
function applyTheme(theme) {
  themeState.currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  // تھیم ٹوگل بٹنز اور آئیکنز کو اپ ڈیٹ کریں
  updateThemeUI();
}

// تھیم تبدیل کریں (Toggle)
function toggleTheme() {
  const newTheme = themeState.currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);

  if (typeof showToast === "function") {
    const themeName = newTheme === "dark" ? "ڈارک موڈ" : "لائٹ موڈ";
    showToast(`🌙 ${themeName} آن کر دیا گیا ہے`);
  }
}

// ==========================================
// 2. UI Helper Functions
// ==========================================
function updateThemeUI() {
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const isDark = themeState.currentTheme === "dark";

  themeToggleBtns.forEach((btn) => {
    const iconEl = btn.querySelector(".theme-icon");
    const textEl = btn.querySelector(".theme-text");

    if (iconEl) {
      iconEl.textContent = isDark ? "☀️" : "🌙";
    }

    if (textEl) {
      textEl.textContent = isDark ? "لائٹ موڈ" : "ڈارک موڈ";
    }

    btn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
  });
}

// ==========================================
// 3. Event Listeners Setup
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  // تھیم ٹوگل بٹن کے ایونٹس
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});

// سسٹم کی تھیم چینج ہونے پر خودکار تبدیلی
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? "dark" : "light");
  }
});
