/* ==========================================
   SJ Foods Online — Category Engine (js/category.js)
   ========================================== */

const CATEGORIES_INDEX = "categories_index.json";

// Category Manager State
let categoryState = {
  categories: [],
  activeCategory: null,
  productsCache: {}
};

// ==========================================
// 1. Fetch & Render Categories
// ==========================================
async function initCategories() {
  const chipsContainer = document.getElementById("categoryChips");
  if (!chipsContainer) return;

  try {
    const response = await fetch(CATEGORIES_INDEX);
    if (!response.ok) throw new Error("کیٹگریز انڈیکس لوڈ نہیں ہو سکا");

    categoryState.categories = await response.json();
    renderCategoryChips();

    // پہلی کیٹگری کو بائی ڈیفالٹ ایکٹیو کریں
    if (categoryState.categories.length > 0) {
      selectCategory(categoryState.categories[0].file);
    }
  } catch (error) {
    console.error("Category Load Error:", error);
    if (typeof showToast === "function") {
      showToast("❌ کیٹگریز لوڈ کرنے میں ناکامی", true);
    }
  }
}

function renderCategoryChips() {
  const chipsContainer = document.getElementById("categoryChips");
  if (!chipsContainer) return;

  chipsContainer.innerHTML = categoryState.categories.map((cat) => {
    const isActive = cat.file === categoryState.activeCategory ? "active" : "";
    return `
      <button class="chip-item ${isActive}" onclick="selectCategory('${cat.file}')">
        <span class="chip-icon">${cat.icon || "🛒"}</span>
        <span class="chip-label">${cat.category}</span>
      </button>
    `;
  }).join("");
}

// ==========================================
// 2. Select Category & Load Products
// ==========================================
async function selectCategory(categoryFile) {
  categoryState.activeCategory = categoryFile;
  renderCategoryChips();

  // اگر پروڈکٹس پہلے سے کیشے (Cache) میں موجود نہ ہوں تو فیچ کریں
  if (!categoryState.productsCache[categoryFile]) {
    try {
      if (typeof showProductsLoading === "function") {
        showProductsLoading();
      }

      const response = await fetch(categoryFile);
      if (!response.ok) throw new Error("پروڈکٹس فائل نہ مل سکی");

      const products = await response.json();
      // صرف وہی پروڈکٹس دکھائیں جو دستیاب (available) ہوں
      categoryState.productsCache[categoryFile] = products.filter(
        (p) => p.available !== false
      );
    } catch (error) {
      console.error("Products Fetch Error:", error);
      categoryState.productsCache[categoryFile] = [];
      if (typeof showToast === "function") {
        showToast("❌ اس کیٹگری کے پروڈکٹس لوڈ نہیں ہو سکے", true);
      }
    }
  }

  // مین ایپ (app.js) کے ذریعے پروڈکٹس رینڈر کریں
  const currentProducts = categoryState.productsCache[categoryFile] || [];
  if (typeof displayProducts === "function") {
    displayProducts(currentProducts);
  } else if (typeof renderProducts === "function") {
    // اگر appState استعمال ہو رہا ہو
    if (window.appState) {
      window.appState.products = currentProducts;
    }
    renderProducts();
  }
}

// ==========================================
// 3. Auto Initialize
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initCategories();
});
