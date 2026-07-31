/* ==========================================
   SJ Foods Online — Cart Manager Engine (js/cart.js)
   ========================================== */

const EASYPAISA_NUMBER = "03135166034";
const EASYPAISA_NAME = "SJ Foods Online";
const DELIVERY_CHARGE = 200;

// Local Cart State
let cartItems = JSON.parse(localStorage.getItem("sjfoods_cart")) || [];

// ==========================================
// 1. Cart Core Operations
// ==========================================

// کارٹ میں سامان شامل کرنا
function addToCart(product, selectedUnitIndex = 0) {
  if (!product) return;

  const unit = (product.units && product.units.length > 0)
    ? product.units[selectedUnitIndex]
    : { label: product.unit || "کلو", rate: product.rate || 0 };

  const itemId = `${product.name}-${unit.label}`;
  const existingIndex = cartItems.findIndex(item => item.id === itemId);

  if (existingIndex > -1) {
    cartItems[existingIndex].qty += 1;
  } else {
    cartItems.push({
      id: itemId,
      name: product.name,
      unitLabel: unit.label,
      rate: unit.rate,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  if (typeof showToast === "function") {
    showToast(`✅ "${product.name}" کارٹ میں شامل ہو گیا`);
  }
}

// مقدار میں تبدیلی کرنا (+ / -)
function updateCartQty(index, delta) {
  if (!cartItems[index]) return;

  cartItems[index].qty += delta;

  if (cartItems[index].qty <= 0) {
    cartItems.splice(index, 1);
  }

  saveCart();
  updateCartUI();
}

// کارٹ بالکل خالی کرنا
function clearCart() {
  if (cartItems.length === 0) return;

  if (confirm("کیا آپ کارٹ خالی کرنا چاہتے ہیں؟")) {
    cartItems = [];
    saveCart();
    updateCartUI();
    if (typeof showToast === "function") {
      showToast("کارٹ خالی کر دیا گیا ہے");
    }
  }
}

// LocalStorage میں ڈیٹا محفوظ کرنا
function saveCart() {
  localStorage.setItem("sjfoods_cart", JSON.stringify(cartItems));
}

// ==========================================
// 2. Calculation Helpers
// ==========================================
function getCartSubtotal() {
  return cartItems.reduce((sum, item) => sum + (item.rate * item.qty), 0);
}

function getCartTotalCount() {
  return cartItems.reduce((sum, item) => sum + item.qty, 0);
}

function getGrandTotal() {
  const subtotal = getCartSubtotal();
  return subtotal > 0 ? subtotal + DELIVERY_CHARGE : 0;
}

// ==========================================
// 3. UI Rendering & Sync
// ==========================================
function updateCartUI() {
  const cartCountEl = document.getElementById("cartCount");
  const cartTotalEl = document.getElementById("cartTotal");
  const finalTotalEl = document.getElementById("finalTotal");
  const billbarEl = document.getElementById("billbar");
  const cartItemsListEl = document.getElementById("cartItemsList");

  const totalCount = getCartTotalCount();
  const subtotal = getCartSubtotal();
  const grandTotal = getGrandTotal();

  if (cartCountEl) cartCountEl.textContent = totalCount;
  if (cartTotalEl) cartTotalEl.textContent = `Rs. ${subtotal}`;
  if (finalTotalEl) finalTotalEl.textContent = `Rs. ${grandTotal}`;

  // نیچے والی بل بار (Bill Bar) کی نمائش
  if (billbarEl) {
    if (totalCount > 0) {
      billbarEl.classList.remove("hidden");
    } else {
      billbarEl.classList.add("hidden");
      toggleCartDetails(false);
    }
  }

  // کارٹ آئٹمز رینڈر کرنا
  if (cartItemsListEl) {
    if (cartItems.length === 0) {
      cartItemsListEl.innerHTML = `<div class="empty-msg">آپ کا کارٹ خالی ہے</div>`;
    } else {
      cartItemsListEl.innerHTML = cartItems.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; font-size:12px; border-bottom:1px solid var(--line,#eee); padding-bottom:6px;">
          <div>
            <strong>${item.name}</strong> (${item.unitLabel})
            <div style="color:var(--muted,#666);">Rs. ${item.rate} × ${item.qty}</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <button onclick="updateCartQty(${idx}, -1)" style="width:24px; height:24px; border:1px solid #ccc; border-radius:4px; background:#fff; cursor:pointer;">-</button>
            <span style="font-weight:700;">${item.qty}</span>
            <button onclick="updateCartQty(${idx}, 1)" style="width:24px; height:24px; border:1px solid #ccc; border-radius:4px; background:#fff; cursor:pointer;">+</button>
            <span style="font-weight:700; margin-right:8px; color:var(--price,#d32f2f);">Rs. ${item.rate * item.qty}</span>
          </div>
        </div>
      `).join("");
    }
  }
}

function toggleCartDetails(forceState) {
  const cartDetailsEl = document.getElementById("cartDetails");
  if (!cartDetailsEl) return;

  if (typeof forceState === "boolean") {
    if (forceState) cartDetailsEl.classList.remove("hidden");
    else cartDetailsEl.classList.add("hidden");
  } else {
    cartDetailsEl.classList.toggle("hidden");
  }
}

// ==========================================
// 4. WhatsApp Checkout Order
// ==========================================
function sendWhatsAppOrder() {
  if (cartItems.length === 0) {
    if (typeof showToast === "function") showToast("کارٹ خالی ہے!", true);
    return;
  }

  const nameEl = document.getElementById("custName");
  const addressEl = document.getElementById("custAddress");
  const paymentEl = document.getElementById("custPayment");

  const name = nameEl ? nameEl.value.trim() : "";
  const address = addressEl ? addressEl.value.trim() : "";
  const paymentMethod = paymentEl ? paymentEl.value : "کیش آن ڈیلیوری";

  if (!name || !address) {
    if (typeof showToast === "function") {
      showToast("براہ کرم اپنا نام اور مکمل پتہ درج کریں", true);
    } else {
      alert("براہ کرم اپنا نام اور مکمل پتہ درج کریں");
    }
    return;
  }

  const subtotal = getCartSubtotal();
  const grandTotal = getGrandTotal();

  let msg = `🛒 *نیا آرڈر — SJ Foods Online*\n`;
  msg += `------------------------------------\n`;
  msg += `👤 *گاہک کا نام:* ${name}\n`;
  msg += `📍 *پتہ:* ${address}\n`;
  msg += `💳 *طریقہ ادائیگی:* ${paymentMethod}\n`;
  msg += `------------------------------------\n\n`;
  msg += `📋 *سامان کی فہرست:*\n`;

  cartItems.forEach((item, i) => {
    msg += `${i + 1}) ${item.name} (${item.unitLabel}) — ${item.qty} عدد = Rs. ${item.rate * item.qty}\n`;
  });

  msg += `\n------------------------------------\n`;
  msg += `💵 *سامان کی قیمت:* Rs. ${subtotal}\n`;
  msg += `🚚 *ڈیلیوری چارجز:* Rs. ${DELIVERY_CHARGE}\n`;
  msg += `💰 *کل رقم:* *Rs. ${grandTotal}*\n`;
  msg += `------------------------------------\n`;
  msg += `شکریہ! براہ کرم آرڈر کی تصدیق کریں۔`;

  const waNumber = "923135166034";
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ایزی پیسہ نمبر کاپی کرنے کا فنکشن
function copyEasypaisaNumber() {
  navigator.clipboard.writeText(EASYPAISA_NUMBER).then(() => {
    if (typeof showToast === "function") {
      showToast("📋 ایزی پیسہ نمبر کاپی ہو گیا!");
    } else {
      alert("ایزی پیسہ نمبر کاپی ہو گیا!");
    }
  }).catch(() => {
    if (typeof showToast === "function") showToast("نمبر کاپی نہیں ہو سکا", true);
  });
}

// پیج لوڈ ہونے پر کارٹ ہسٹری سیٹ کرنا
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
