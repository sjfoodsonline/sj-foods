/* ==========================================
   SJ Foods Online — Main App Engine (js/app.js)
   ========================================== */

const CATEGORIES_INDEX_FILE = "categories_index.json";
const EASYPAISA_NUMBER = "03135166034";
const EASYPAISA_NAME = "SJ Foods Online";

// Application State
let appState = {
  categories: [],
  activeCategoryFile: "",
  products: [],
  cart: [],
  deliveryCharge: 50,
  searchTerm: "",
  theme: localStorage.getItem("sjfoods-theme") || "light"
};

// ==========================================
// 1. DOM Elements Reference
// ==========================================
const DOM = {
  categoryChips: document.getElementById("categoryChips"),
  productList: document.getElementById("list"),
  searchInput: document.getElementById("searchInput"),
  billbar: document.getElementById("billbar"),
  cartCount: document.getElementById("cartCount"),
  cartTotal: document.getElementById("cartTotal"),
  cartDetails: document.getElementById("cartDetails"),
  cartItemsList: document.getElementById("cartItemsList"),
  finalTotal: document.getElementById("finalTotal"),
  custName: document.getElementById("custName"),
  custAddress: document.getElementById("custAddress"),
  custPayment: document.getElementById("custPayment"),
  waBtn: document.getElementById("waBtn"),
  clearBtn: document.getElementById("clearBtn"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  toast: document.getElementById("toast"),
  lightbox: document.getElementById("lightbox"),
  lightboxImg: document.getElementById("lightboxImg")
};

// ==========================================
// 2. Initialization & Core Data Fetching
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadCategories();
  setupEventListeners();
});

function initTheme() {
  document.documentElement.setAttribute("data-theme", appState.theme);
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.textContent = appState.theme === "dark" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  appState.theme = appState.theme === "light" ? "dark" : "light";
  localStorage.setItem("sjfoods-theme", appState.theme);
  initTheme();
}

async function loadCategories() {
  try {
    const res = await fetch(CATEGORIES_INDEX_FILE);
    if (!res.ok) throw new Error("کیٹگریز انڈیکس لوڈ نہ ہو سکا");
    appState.categories = await res.json();
    renderCategories();
    if (appState.categories.length > 0) {
      loadProducts(appState.categories[0].file);
    }
  } catch (err) {
    console.error("Categories Load Error:", err);
    showToast("❌ کیٹگریز لوڈ کرنے میں مسئلہ پیش آیا", true);
  }
}

async function loadProducts(categoryFile) {
  appState.activeCategoryFile = categoryFile;
  renderCategories();
  
  if (DOM.productList) {
    DOM.productList.innerHTML = `<div class="empty-msg">⏳ پروڈکٹس لوڈ ہو رہے ہیں...</div>`;
  }

  try {
    const res = await fetch(categoryFile);
    if (!res.ok) throw new Error("پروڈکٹس فائل لوڈ نہ ہو سکی");
    const rawProducts = await res.json();
    appState.products = rawProducts.filter(item => item.available !== false);
    renderProducts();
  } catch (err) {
    console.error("Products Load Error:", err);
    if (DOM.productList) {
      DOM.productList.innerHTML = `<div class="empty-msg">❌ اس کیٹگری کے پروڈکٹس لوڈ نہیں ہو سکے</div>`;
    }
  }
}

// ==========================================
// 3. UI Rendering
// ==========================================
function renderCategories() {
  if (!DOM.categoryChips) return;
  DOM.categoryChips.innerHTML = appState.categories.map(cat => {
    const isActive = cat.file === appState.activeCategoryFile ? "active" : "";
    return `
      <button class="chip-item ${isActive}" onclick="loadProducts('${cat.file}')">
        ${cat.icon || "🛒"} ${cat.category}
      </button>
    `;
  }).join("");
}

function renderProducts() {
  if (!DOM.productList) return;

  let filtered = appState.products;
  if (appState.searchTerm) {
    const query = appState.searchTerm.toLowerCase();
    filtered = filtered.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.name_roman && item.name_roman.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    DOM.productList.innerHTML = `<div class="empty-msg">کوئی پروڈکٹ نہیں ملا</div>`;
    return;
  }

  DOM.productList.innerHTML = filtered.map((item, pIdx) => {
    const defaultUnit = (item.units && item.units.length > 0) ? item.units[0] : { label: item.unit || "کلو", rate: item.rate || 0 };
    const imgSrc = item.image ? item.image : "cover.png";

    return `
      <div class="product-item">
        <img src="${imgSrc}" alt="${item.name}" onclick="openLightbox('${imgSrc}')">
        <div class="product-info">
          <div class="product-title">${item.name}</div>
          ${item.name_roman ? `<div class="product-roman">${item.name_roman}</div>` : ""}
          <div class="product-price" id="price-display-${pIdx}">Rs. ${defaultUnit.rate}</div>
          
          <div style="margin-top:6px; display:flex; gap:6px; align-items:center;">
            ${item.units && item.units.length > 1 ? `
              <select id="unit-select-${pIdx}" onchange="updateProductPrice(${pIdx})" style="padding:4px; border-radius:6px; font-size:11px;">
                ${item.units.map((u, uIdx) => `<option value="${uIdx}">${u.label}</option>`).join("")}
              </select>
            ` : `<span style="font-size:11px; color:var(--muted);">${defaultUnit.label}</span>`}
            
            <button onclick="addToCart(${pIdx})" style="background:var(--dark); color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11.5px; font-weight:700; cursor:pointer; margin-right:auto;">
              + شامل کریں
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateProductPrice(pIdx) {
  const item = appState.products[pIdx];
  const selectEl = document.getElementById(`unit-select-${pIdx}`);
  const priceEl = document.getElementById(`price-display-${pIdx}`);
  if (item && selectEl && priceEl) {
    const selectedUnit = item.units[selectEl.value];
    priceEl.textContent = `Rs. ${selectedUnit.rate}`;
  }
}

// ==========================================
// 4. Cart Management & Calculations
// ==========================================
function addToCart(pIdx) {
  const item = appState.products[pIdx];
  if (!item) return;

  const selectEl = document.getElementById(`unit-select-${pIdx}`);
  const unitIndex = selectEl ? parseInt(selectEl.value) : 0;
  const selectedUnit = (item.units && item.units.length > 0) ? item.units[unitIndex] : { label: item.unit || "کلو", rate: item.rate || 0 };

  const cartItemId = `${item.name}-${selectedUnit.label}`;
  const existingIndex = appState.cart.findIndex(c => c.id === cartItemId);

  if (existingIndex > -1) {
    appState.cart[existingIndex].qty += 1;
  } else {
    appState.cart.push({
      id: cartItemId,
      name: item.name,
      unitLabel: selectedUnit.label,
      rate: selectedUnit.rate,
      qty: 1
    });
  }

  showToast(`✅ "${item.name}" کارٹ میں شامل ہو گیا`);
  updateCartUI();
}

function updateCartQty(index, delta) {
  if (!appState.cart[index]) return;
  appState.cart[index].qty += delta;
  if (appState.cart[index].qty <= 0) {
    appState.cart.splice(index, 1);
  }
  updateCartUI();
}

function clearCart() {
  if (appState.cart.length === 0) return;
  if (confirm("کیا آپ کارٹ خالی کرنا چاہتے ہیں؟")) {
    appState.cart = [];
    updateCartUI();
    toggleCartDetails(false);
    showToast("کارٹ خالی کر دیا گیا ہے");
  }
}

function updateCartUI() {
  const totalItems = appState.cart.reduce((sum, item) => sum + item.qty, 0);
  const itemsSubtotal = appState.cart.reduce((sum, item) => sum + (item.rate * item.qty), 0);
  const grandTotal = itemsSubtotal > 0 ? itemsSubtotal + appState.deliveryCharge : 0;

  if (DOM.cartCount) DOM.cartCount.textContent = totalItems;
  if (DOM.cartTotal) DOM.cartTotal.textContent = `Rs. ${itemsSubtotal}`;
  if (DOM.finalTotal) DOM.finalTotal.textContent = `Rs. ${grandTotal}`;

  if (totalItems > 0) {
    if (DOM.billbar) DOM.billbar.classList.remove("hidden");
  } else {
    if (DOM.billbar) DOM.billbar.classList.add("hidden");
    toggleCartDetails(false);
  }

  renderCartItems();
}

function renderCartItems() {
  if (!DOM.cartItemsList) return;

  if (appState.cart.length === 0) {
    DOM.cartItemsList.innerHTML = `<div class="empty-msg">آپ کا کارٹ خالی ہے</div>`;
    return;
  }

  DOM.cartItemsList.innerHTML = appState.cart.map((item, idx) => `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:12px;">
      <div>
        <strong>${item.name}</strong> (${item.unitLabel})
        <div style="color:var(--muted);">Rs. ${item.rate} × ${item.qty}</div>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <button onclick="updateCartQty(${idx}, -1)" style="width:24px; height:24px; border:1px solid var(--line); border-radius:4px; background:#fff;">-</button>
        <span style="font-weight:700;">${item.qty}</span>
        <button onclick="updateCartQty(${idx}, 1)" style="width:24px; height:24px; border:1px solid var(--line); border-radius:4px; background:#fff;">+</button>
        <span style="font-weight:700; margin-right:8px; color:var(--price);">Rs. ${item.rate * item.qty}</span>
      </div>
    </div>
  `).join("");
}

function toggleCartDetails(forceState) {
  if (!DOM.cartDetails) return;
  if (typeof forceState === "boolean") {
    if (forceState) DOM.cartDetails.classList.remove("hidden");
    else DOM.cartDetails.classList.add("hidden");
  } else {
    DOM.cartDetails.classList.toggle("hidden");
  }
}

// ==========================================
// 5. WhatsApp Order Generation
// ==========================================
function sendWhatsAppOrder() {
  if (appState.cart.length === 0) {
    showToast("کارٹ خالی ہے!", true);
    return;
  }

  const name = DOM.custName ? DOM.custName.value.trim() : "";
  const address = DOM.custAddress ? DOM.custAddress.value.trim() : "";
  const paymentMethod = DOM.custPayment ? DOM.custPayment.value : "کیش آن ڈیلیوری";

  if (!name || !address) {
    showToast("براہ کرم اپنا نام اور مکمل پتہ درج کریں", true);
    return;
  }

  const subtotal = appState.cart.reduce((sum, item) => sum + (item.rate * item.qty), 0);
  const total = subtotal + appState.deliveryCharge;

  let msg = `🛒 *نیا آرڈر — SJ Foods Online*\n`;
  msg += `------------------------------------\n`;
  msg += `👤 *گاہک کا نام:* ${name}\n`;
  msg += `📍 *پتہ:* ${address}\n`;
  msg += `💳 *طریقہ ادائیگی:* ${paymentMethod}\n`;
  msg += `------------------------------------\n\n`;
  msg += `📋 *سامان کی فہرست:*\n`;

  appState.cart.forEach((item, i) => {
    msg += `${i + 1}) ${item.name} (${item.unitLabel}) — ${item.qty} عدد = Rs. ${item.rate * item.qty}\n`;
  });

  msg += `\n------------------------------------\n`;
  msg += `💵 *سامان کی قیمت:* Rs. ${subtotal}\n`;
  msg += `🚚 *ڈیلیوری چارجز:* Rs. ${appState.deliveryCharge}\n`;
  msg += `💰 *کل رقم:* *Rs. ${total}*\n`;
  msg += `------------------------------------\n`;
  msg += `شکریہ! براہ کرم آرڈر کی تصدیق کریں۔`;

  const waNumber = "923135166034";
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ==========================================
// 6. Utility Helpers (Toast, Lightbox, Copy)
// ==========================================
function showToast(msg, isErr = false) {
  if (!DOM.toast) return;
  DOM.toast.textContent = msg;
  DOM.toast.style.background = isErr ? "#B71C1C" : "var(--dark)";
  DOM.toast.classList.add("show");
  setTimeout(() => DOM.toast.classList.remove("show"), 2600);
}

function openLightbox(src) {
  if (DOM.lightbox && DOM.lightboxImg) {
    DOM.lightboxImg.src = src;
    DOM.lightbox.classList.remove("hidden");
  }
}

function closeLightbox() {
  if (DOM.lightbox) DOM.lightbox.classList.add("hidden");
}

function copyEasypaisaNumber() {
  navigator.clipboard.writeText(EASYPAISA_NUMBER).then(() => {
    showToast("📋 ایزی پیسہ نمبر کاپی ہو گیا!");
  }).catch(() => {
    showToast("نمبر کاپی نہیں ہو سکا", true);
  });
}

// ==========================================
// 7. Event Listeners Setup
// ==========================================
function setupEventListeners() {
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener("input", (e) => {
      appState.searchTerm = e.target.value.trim();
      renderProducts();
    });
  }

  if (DOM.waBtn) DOM.waBtn.addEventListener("click", sendWhatsAppOrder);
  if (DOM.clearBtn) DOM.clearBtn.addEventListener("click", clearCart);
  if (DOM.themeToggleBtn) DOM.themeToggleBtn.addEventListener("click", toggleTheme);
}
