/* ==========================================
   SJ Foods Online — Featured & Banner Engine (js/featured.js)
   ========================================== */

const FEATURED_PRODUCTS_FILE = "categories/featured.json";
const BRAND_NAME = "SJ Foods Online";
const CONTACT_NUMBER = "03135166034";

// Featured State
let featuredState = {
  items: [],
  isLoading: false
};

// ==========================================
// 1. Core Loader Function
// ==========================================
async function loadFeaturedProducts() {
  const container = document.getElementById("featuredContainer");
  if (!container) return;

  featuredState.isLoading = true;
  container.innerHTML = `<div class="empty-msg">⏳ خاص پروڈکٹس لوڈ ہو رہے ہیں...</div>`;

  try {
    const response = await fetch(FEATURED_PRODUCTS_FILE);
    if (!response.ok) {
      throw new Error("خاص پروڈکٹس کی فائل نہیں مل سکی");
    }
    
    const data = await response.json();
    featuredState.items = data.filter(item => item.available !== false);
    renderFeaturedProducts();
  } catch (error) {
    console.error("Featured Products Error:", error);
    // اگر الگ فائل نہ ہو تو ہوم پیج خراب نہ ہو
    container.innerHTML = `<div class="empty-msg" style="font-size:11px; opacity:0.7;">بہترین پیشکشیں جلدی دستیاب ہوں گی</div>`;
  } finally {
    featuredState.isLoading = false;
  }
}

// ==========================================
// 2. UI Rendering
// ==========================================
function renderFeaturedProducts() {
  const container = document.getElementById("featuredContainer");
  if (!container) return;

  if (featuredState.items.length === 0) {
    container.innerHTML = `<div class="empty-msg">اس وقت کوئی خاص پروڈکٹ موجود نہیں</div>`;
    return;
  }

  container.innerHTML = featuredState.items.map((item, idx) => {
    const defaultUnit = (item.units && item.units.length > 0) 
      ? item.units[0] 
      : { label: item.unit || "کلو", rate: item.rate || 0 };

    const imgSrc = item.image ? item.image : "cover.png";
    const discountBadge = item.old_rate 
      ? `<span class="badge-discount">بچت!</span>` 
      : `<span class="badge-featured">خاص</span>`;

    return `
      <div class="featured-card" style="position:relative; border:1px solid var(--line,#e0e0e0); border-radius:10px; padding:10px; background:#fff;">
        ${discountBadge}
        
        <img src="${imgSrc}" alt="${item.name}" 
             onclick="if(typeof openLightbox === 'function') openLightbox('${imgSrc}')" 
             style="width:100%; height:110px; object-fit:cover; border-radius:8px; cursor:pointer;">
        
        <div style="margin-top:8px;">
          <h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text,#222);">${item.name}</h4>
          ${item.name_roman ? `<div style="font-size:10px; color:var(--muted,#777);">${item.name_roman}</div>` : ""}
          
          <div style="margin-top:4px; display:flex; align-items:center; gap:6px;">
            <span style="font-weight:700; color:var(--price,#d32f2f); font-size:13px;">Rs. ${defaultUnit.rate}</span>
            ${item.old_rate ? `<span style="text-decoration:line-through; font-size:10px; color:#888;">Rs. ${item.old_rate}</span>` : ""}
          </div>

          <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:10.5px; background:#f5f5f5; padding:2px 6px; border-radius:4px;">${defaultUnit.label}</span>
            
            <button onclick="addFeaturedToCart(${idx})" 
                    style="background:var(--dark,#111); color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">
              + شامل کریں
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================
// 3. Helper Integration for Cart
// ==========================================
function addFeaturedToCart(index) {
  const item = featuredState.items[index];
  if (!item) return;

  // اگر global addToCart موجود ہو تو اس کو استعمال کرے
  if (typeof addToCart === "function") {
    addToCart(item, 0);
  } else {
    console.warn("Cart engine (cart.js / app.js) is missing!");
  }
}

// ==========================================
// 4. Automatic Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProducts();
});
