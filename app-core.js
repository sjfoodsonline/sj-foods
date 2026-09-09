import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const app = initializeApp({ databaseURL: "https://sj-foods-default-rtdb.firebaseio.com" });
window.dbRef = { ref, set, db: getDatabase(app) };

window.safeStorage = (function(){
  var mem = {};
  return {
    getItem: function(k){ try{ return localStorage.getItem(k)||mem[k]||null; }catch(e){return mem[k]||null;} },
    setItem: function(k,v){ try{ localStorage.setItem(k,v); }catch(e){ mem[k]=String(v); } }
  };
})();

window.CATEGORIES_DATA = {};
window.CATEGORIES_META = [];
window.ITEMS = [];
window.SHOP_WHATSAPP = "923349353799";
window.ACTIVE_VENDOR = { id: null, shop_name: "", whatsapp: "923349353799" };
window.SHOP_ENTERED = false;
window.ALL_VENDORS = {};
window.LIGHTBOX_OPEN = false;

window.addEventListener('popstate', (e) => {
  if(window.LIGHTBOX_OPEN){ window.closeLightbox(true); return; }
  if(window.SHOP_ENTERED && window.currentSelectedCategory){
    window.currentSelectedCategory = null;
    if(typeof renderChips === 'function') renderChips();
    if(typeof renderMainView === 'function') renderMainView();
    history.pushState({ page: 'shop', id: (window.ACTIVE_VENDOR && window.ACTIVE_VENDOR.id) || '' }, '', '#shop-' + ((window.ACTIVE_VENDOR && window.ACTIVE_VENDOR.id) || ''));
    return;
  }
  if(window.SHOP_ENTERED){ window.backToShops(); return; }
  history.replaceState({ page: 'home' }, '', '#home');
});
history.replaceState({ page: 'home' }, '', '#home');

function toggleDrawer(open){
  try{
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");
    if(!drawer || !overlay) return;
    const show = (open === true) ? true : (open === false) ? false : !drawer.classList.contains("active");
    if(show){
      drawer.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }catch(e){}
}
window.toggleDrawer = toggleDrawer;

window.openModal = function(modalId){ toggleDrawer(false); const m = document.getElementById(modalId); if(m) m.classList.add("active"); };
window.closeModal = function(modalId){ const m = document.getElementById(modalId); if(m) m.classList.remove("active"); };

function normalizePkPhone(raw){
  let s = String(raw || "").trim().replace(/[\s\-()]/g, "");
  let digits = s.replace(/[^0-9]/g, "");
  if(s.startsWith("+92") || digits.startsWith("0092")){
    digits = digits.replace(/^0092/, "92");
    if(digits.startsWith("92")) digits = "0" + digits.slice(2);
  } else if(digits.startsWith("92") && digits.length >= 12){
    digits = "0" + digits.slice(2);
  }
  if(/^03\d{9}$/.test(digits)) return digits;
  return null;
}

document.addEventListener("DOMContentLoaded", function(){
  var mb = document.getElementById("menuBtn");
  if(mb){ mb.addEventListener("click", function(e){ e.preventDefault(); e.stopPropagation(); toggleDrawer(true); }); }
  var ov = document.getElementById("drawerOverlay");
  if(ov){ ov.addEventListener("click", function(){ toggleDrawer(false); }); }
});

function getCartStore(){ try{ return JSON.parse(window.safeStorage.getItem("sj_cart_store") || "{}"); }catch(e){ return {}; } }
function saveCartStore(store){ window.safeStorage.setItem("sj_cart_store", JSON.stringify(store)); }
window.getActiveCartShopId = function(){
  let store = getCartStore();
  for(let sid in store){
    if(Object.values(store[sid] || {}).some(q => q > 0)) return sid;
  }
  return null;
};

window.loadActiveVendor = async function(vendorId){
  vendorId = vendorId || "v001";
  function toWaDigits(raw, isMaster){
    let d = String(raw || "").replace(/[^0-9]/g, "");
    if(!d) return isMaster ? "923349353799" : "";
    if(d.indexOf("00")==0) d = d.slice(2);
    if(d[0]==="0") d = "92" + d.slice(1);
    if(d.indexOf("92")!==0 && d.length===10) d = "92" + d;
    return d;
  }
  function pickVendor(v, id){
    const isMaster = (id === "v001");
    const wa = toWaDigits(v.whatsapp || v.phone || "", isMaster);
    let pay = String(v.pay_number || v.easypaisa || v.phone || "").replace(/[^0-9]/g,"");
    if(isMaster && !pay) pay = "03349353799";
    return {
      id: id,
      shop_name: v.shop_name || (isMaster ? "SJ Foods" : "Shop"),
      owner_name: v.owner_name || (isMaster ? "سلیمان جان" : ""),
      whatsapp: wa || (isMaster ? "923349353799" : ""),
      phone: v.phone || "",
      pay_number: pay,
      cover_image: v.cover_image || "",
      isMaster: isMaster
    };
  }
  if(window.ALL_VENDORS[vendorId]){
    window.ACTIVE_VENDOR = pickVendor(window.ALL_VENDORS[vendorId], vendorId);
    window.SHOP_WHATSAPP = window.ACTIVE_VENDOR.whatsapp;
    return !!window.ACTIVE_VENDOR.whatsapp || vendorId === "v001";
  }
  try{
    const res = await fetch("https://sj-foods-default-rtdb.firebaseio.com/vendors/" + vendorId + ".json");
    const v = await res.json();
    if(v && !v.blocked){
      window.ALL_VENDORS[vendorId] = v;
      window.ACTIVE_VENDOR = pickVendor(v, vendorId);
      window.SHOP_WHATSAPP = window.ACTIVE_VENDOR.whatsapp;
      return true;
    }
  }catch(e){}
  if(vendorId === "v001"){
    window.ACTIVE_VENDOR = { id: "v001", shop_name: "SJ Foods", owner_name: "سلیمان جان", whatsapp: "923349353799", pay_number: "03349353799", cover_image: "cover.png", isMaster: true };
    window.SHOP_WHATSAPP = window.ACTIVE_VENDOR.whatsapp;
    return true;
  }
  return false;
};

window.restoreShopCart = function(){
  if(!window.ACTIVE_VENDOR.id) return;
  let store = getCartStore();
  let shopCart = store[window.ACTIVE_VENDOR.id] || {};
  window.ITEMS.forEach(i => { i.qty = shopCart[i.id] || 0; });
};

window.saveShopCart = function(){
  if(!window.ACTIVE_VENDOR.id) return;
  let store = getCartStore();
  let shopCart = {};
  window.ITEMS.forEach(i => { if(i.qty > 0) shopCart[i.id] = i.qty; });
  if(Object.keys(shopCart).length > 0) store[window.ACTIVE_VENDOR.id] = shopCart;
  else delete store[window.ACTIVE_VENDOR.id];
  saveCartStore(store);
};