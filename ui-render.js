let _galleryIdx = 0;
let _dealsIdx = 0;
window.currentSelectedCategory = null;

function initHomeCoverSlider(){
  const track = document.getElementById("coverSliderTrack");
  const banner = document.getElementById("coverBanner");
  if(!track || !banner) return;
  banner.classList.add("static-cover");
  banner.style.display = "block";
  track.style.transform = "none";
  if(!track.querySelector("img")){
    track.innerHTML = '<div class="cover-slide"><img src="cover.png" alt="Cover" onerror="this.src=\'icon-512.png\'"></div>';
  }
}

function paintProductGallery(urls){
  const track = document.getElementById("productStripTrack");
  const wrap = document.getElementById("productStripWrap");
  if(!track || !wrap) return;
  let list = (urls || []).filter(u => u && u.indexOf("data:image") !== 0);
  const uniq = []; list.forEach(u => { if(uniq.indexOf(u)<0) uniq.push(u); });
  list = uniq;
  if(list.length === 0) list = ["cover.png", "icon-512.png"];
  window.HOME_GALLERY = list.slice(0, 30);
  track.style.direction = "ltr";
  track.innerHTML = window.HOME_GALLERY.map(src => `<div class="product-strip-slide"><img src="${src}" loading="lazy" onerror="this.src='icon-192.png'"></div>`).join("");
  wrap.style.display = "block";
  _galleryIdx = 0;
  track.style.transform = "translate3d(0,0,0)";
  if(window._galleryTimer) clearInterval(window._galleryTimer);
  window._galleryTimer = setInterval(() => {
    if(!window.HOME_GALLERY.length) return;
    _galleryIdx = (_galleryIdx + 1) % window.HOME_GALLERY.length;
    track.style.transform = `translate3d(${-_galleryIdx * 100}%,0,0)`;
  }, 3200);
}

function shuffleArray(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function paintTopDealsPair(){
  const homeBox = document.getElementById("dealBox");
  if(!homeBox) return;
  let pool = window.HOME_DEALS_POOL && window.HOME_DEALS_POOL.length ? window.HOME_DEALS_POOL : (window.ITEMS || []).filter(i => i.available !== false);
  if(!pool.length){
    homeBox.innerHTML = '<div class="deal-card"><div class="deal-icon-box">🌿</div><div class="d-name">Deals</div></div><div class="deal-card"><div class="deal-icon-box">🛒</div><div class="d-name">Shop</div></div>';
    return;
  }
  const a = pool[_dealsIdx % pool.length];
  const b = pool[(_dealsIdx + 1) % pool.length];
  _dealsIdx = (_dealsIdx + 2) % Math.max(pool.length, 2);
  function card(it){
    if(!it) return '<div class="deal-card"><div class="deal-icon-box">⭐</div></div>';
    let fImg = (it.images && it.images[0]) ? it.images[0] : "";
    const nm = it.name_roman || it.name || "";
    const rate = (it.units && it.units[0]) ? it.units[0].rate : 0;
    const cat = it.cat || "";
    const id = it.id || "";
    return `<div class="deal-card" onclick="jumpToItem('${String(cat).replace(/'/g,"")}','${String(id).replace(/'/g,"")}')">
      ${fImg ? `<img src="${fImg}" loading="lazy">` : `<div class="deal-icon-box">${it.icon||"⭐"}</div>`}
      <div class="d-name">${nm}</div>
      <div class="d-rate">${typeof fmt==="function"?fmt(rate):("Rs. "+Math.round(rate||0))}</div></div>`;
  }
  homeBox.innerHTML = card(a) + card(b);
}

function startTopDealsShuffle(){
  paintTopDealsPair();
  if(window._dealsTimer) clearInterval(window._dealsTimer);
  window._dealsTimer = setInterval(() => {
    const box = document.getElementById("dealBox");
    if(!box) return;
    box.querySelectorAll(".deal-card").forEach(el => el.classList.add("shuffle-out"));
    setTimeout(() => { paintTopDealsPair(); }, 280);
  }, 4500);
}

window.initHomeVisuals = function(){
  initHomeCoverSlider();
  loadData();
};

const DEFAULT_FALLBACK_CATEGORIES = [
  { file: "sabzi", category: "سبزی", category_roman: "Sabzi", icon: "🥦" },
  { file: "phal", category: "پھل", category_roman: "Phal", icon: "🍎" },
  { file: "bakery", category: "بیکری", category_roman: "Bakery", icon: "🍞" },
  { file: "dairy", category: "ڈیری", category_roman: "Dairy", icon: "🥛" },
  { file: "grocery", category: "کرانہ", category_roman: "Grocery", icon: "🛒" }
];

async function loadData(){
  try{
    let index = null;
    try{
      const fr = await fetch("https://sj-foods-default-rtdb.firebaseio.com/site_categories.json");
      index = await fr.json();
    }catch(e){}
    
    if(!Array.isArray(index) || !index.length){
      index = DEFAULT_FALLBACK_CATEGORIES;
    }

    const catResults = await Promise.all(index.map(async e => {
      let cleanKey = String(e.file||e.category_roman||"general").toLowerCase().replace(/[^a-z0-9_]/g,"");
      try{
        const fbRes = await fetch(`https://sj-foods-default-rtdb.firebaseio.com/site_products/${cleanKey}.json?t=${Date.now()}`);
        if(fbRes.ok){
          const data = await fbRes.json();
          if(Array.isArray(data) && data.length > 0) return data;
        }
      }catch(err){}
      return [];
    }));

    window.CATEGORIES_META = index.map((e, i) => {
      let itemsList = catResults[i] || [];
      let defaultImg = e.image || "";
      if(!defaultImg && itemsList.length > 0){
        let firstWithImg = itemsList.find(it => (it.images && it.images.length > 0) || it.image);
        if(firstWithImg){
          defaultImg = (firstWithImg.images && firstWithImg.images.length > 0) ? firstWithImg.images[0] : firstWithImg.image;
        }
      }
      return { name: e.category, name_roman: e.category_roman||e.category, icon: e.icon||"📦", image: defaultImg };
    });

    window.ITEMS = []; window.CATEGORIES_DATA = {};
    const gallery = [];
    index.forEach((entry, i) => {
      let itemsList = catResults[i] || [];
      window.CATEGORIES_DATA[entry.category] = itemsList;
      itemsList.forEach((it, ii) => {
        let imgs = it.images || (it.image ? [it.image] : []);
        let img0 = imgs[0] || "";
        if(img0 && String(img0).indexOf("data:") !== 0) gallery.push(img0);
        window.ITEMS.push({
          id: i+"-"+ii, cat: entry.category, icon: entry.icon||"📦",
          name: it.name, name_roman: it.name_roman||it.name||"",
          units: it.units || [{label: it.unit||"KG", rate: it.rate||0}], unitIndex: 0,
          available: it.available !== false, images: imgs, featured: it.featured === true, qty: 0
        });
      });
    });

    paintProductGallery(shuffleArray(gallery).slice(0, 24));
    window.HOME_DEALS_POOL = shuffleArray(window.ITEMS.slice());
    startTopDealsShuffle();

    renderChips(); renderMainView();
    const loadingMsg = document.getElementById("loadingMsg");
    if(loadingMsg) loadingMsg.style.display = "none";
  }catch(e){
    const loadingMsg = document.getElementById("loadingMsg");
    if(loadingMsg) loadingMsg.textContent = "⚠️ ڈیٹا لوڈ کرنے میں خرابی";
  }
}

window.loadShopsList = async function(){
  const grid = document.getElementById("shopGrid");
  if(!grid) return;
  const RTDB = "https://sj-foods-default-rtdb.firebaseio.com";
  const instant = {
    v001: { shop_name: "SJ Foods", status: "approved", city: "Mingora", cover_image: "cover.png", blocked: false }
  };
  function countItems(v){
    let n = 0;
    const items = (v && v.items) || {};
    if(typeof items !== "object") return 0;
    Object.keys(items).forEach(cat => {
      const obj = items[cat];
      if(!obj) return;
      if(Array.isArray(obj)) n += obj.length;
      else if(typeof obj === "object"){
        if(obj.name || obj.rate != null || obj.units) n += 1;
        else n += Object.keys(obj).length;
      }
    });
    return n;
  }
  function paint(data){
    window.ALL_VENDORS = Object.assign({}, window.ALL_VENDORS, data || {});
    let ids = Object.keys(data).filter(id => {
      if(id === "_market") return false;
      const v = data[id];
      if(!v || typeof v !== "object") return false;
      if(v.blocked === true) return false;
      if(id === "v001") return true;
      const st = String(v.status || "approved").toLowerCase();
      return st === "approved" || st === "active";
    });
    if(ids.indexOf("v001") < 0) ids.unshift("v001");
    if(!data.v001) data.v001 = instant.v001;
    grid.innerHTML = ids.map(id => {
      const v = data[id] || {};
      const isOwn = (id === "v001");
      const name = v.shop_name || (isOwn ? "SJ Foods" : id);
      const city = v.city || "Mingora";
      const n = isOwn ? -1 : countItems(v);
      const isComingSoon = !isOwn && n >= 0 && n < 5;
      let cover = v.cover_image || (isOwn ? "cover.png" : "");
      let coverHtml = cover ? `<img class="shop-cover" src="${cover}" loading="lazy">` : `<div class="shop-cover ph">${isOwn?"🥬":"🏪"}</div>`;
      const countLabel = isOwn ? "SJ Foods" : ("آئٹمز: " + (n < 0 ? "—" : n));
      return `<div class="shop-card" onclick="tryEnterShop('${id}')">
        ${isComingSoon ? '<div class="coming-soon-badge">Coming Soon</div>' : ''}
        ${coverHtml}
        <div class="shop-body"><div class="sname">${name}</div><div class="scity">${city}</div>
        <div class="stag">${countLabel}</div></div></div>`;
    }).join("");
  }
  paint(instant);
  try{
    const res = await fetch(RTDB + "/vendors.json");
    const data = await res.json();
    if(data) paint(data);
  }catch(e){}
};

window.tryEnterShop = function(vendorId){
  let activeShop = window.getActiveCartShopId();
  if(activeShop && activeShop !== vendorId){
    let shopName = (window.ALL_VENDORS[activeShop] && window.ALL_VENDORS[activeShop].shop_name) || "دوسری دکان";
    let confirmSwitch = confirm(`⚠️ توجہ فرمائیں!\n\nآپ اس وقت "${shopName}" سے خریداری کر رہے ہیں۔ ہر دکاندار اپنی ڈلیوری خود کرتا ہے!\n\nکیا آپ پرانی دکان کا سامان ختم کر کے نئی دکان پر جانا چاہتے ہیں؟`);
    if(!confirmSwitch) return;
    clearActiveCart();
  }
  enterShop(vendorId);
};

window.enterShop = async function(vendorId){
  const ok = await window.loadActiveVendor(vendorId);
  if(!ok){ alert("شاپ دستیاب نہیں"); return; }
  window.SHOP_ENTERED = true;
  window.currentSelectedCategory = null;
  try{ history.pushState({ page: 'shop', id: vendorId }, "", "#shop-" + vendorId); }catch(e){}
  
  document.getElementById("shopPicker").style.display = "none";
  document.getElementById("homePageWrapper").style.display = "none";
  document.getElementById("shopWorkspace").classList.remove("hidden");
  document.getElementById("shopWorkspace").style.display = "block";
  document.getElementById("billbar").style.display = "flex";

  const coverEl = document.getElementById("shopInnerCover");
  const nameEl = document.getElementById("shopInnerName");
  let cover = window.ACTIVE_VENDOR.cover_image || "";
  if(vendorId === "v001") cover = "cover.png";
  if(coverEl){
    if(cover){ coverEl.src = cover; coverEl.style.display = "block"; }
    else { coverEl.style.display = "none"; }
  }
  if(nameEl){
    nameEl.innerHTML = (window.ACTIVE_VENDOR.shop_name || "Shop") + ' <span style="font-size:11px;opacity:.9;font-weight:bold;">· شاپ کھلی ہوئی ہے</span>';
  }

  if(vendorId === "v001"){
    await loadData();
  } else {
    await loadVendorCatalog(vendorId);
  }
  window.restoreShopCart();
  renderBill();
  window.scrollTo(0,0);
};

async function loadVendorCatalog(vendorId){
  try{
    const res = await fetch("https://sj-foods-default-rtdb.firebaseio.com/vendors/" + vendorId + "/items.json");
    const data = await res.json() || {};
    window.CATEGORIES_META = []; window.ITEMS = []; window.CATEGORIES_DATA = {};
    const byCat = {};
    Object.keys(data).forEach(key => {
      const val = data[key];
      if(!val || typeof val !== "object") return;
      if(val.name || val.units || val.rate != null || val.image){
        const cat = val.category || val.cat || "General";
        if(!byCat[cat]) byCat[cat] = {};
        byCat[cat][key] = val;
      } else {
        byCat[key] = val;
      }
    });
    Object.keys(byCat).forEach(cat => {
      window.CATEGORIES_META.push({ name: cat, name_roman: cat, icon: "🛒", image: "" });
      window.CATEGORIES_DATA[cat] = [];
      Object.keys(byCat[cat] || {}).forEach(k => {
        const it = byCat[cat][k] || {};
        let units = it.units || [{ label: it.unit || "KG", rate: it.rate || 0 }];
        let imgs = it.images || (it.image ? [it.image] : []);
        const row = {
          id: k, cat: cat, name: it.name, name_roman: it.name_roman,
          units: units, unitIndex: 0, available: it.available !== false,
          images: imgs, qty: 0, premium: it.premium === true || it.no_qty === true,
          no_qty: it.no_qty === true
        };
        window.ITEMS.push(row);
        window.CATEGORIES_DATA[cat].push(it);
        if(!window.CATEGORIES_META[window.CATEGORIES_META.length-1].image && imgs[0]){
          window.CATEGORIES_META[window.CATEGORIES_META.length-1].image = imgs[0];
        }
      });
    });
    renderChips(); renderMainView();
    document.getElementById("loadingMsg").style.display = "none";
  }catch(e){
    document.getElementById("loadingMsg").textContent = "Catalog load failed";
  }
}

window.backToShops = function(){
  window.saveShopCart();
  window.SHOP_ENTERED = false;
  window.currentSelectedCategory = null;
  window.ITEMS.forEach(i => i.qty = 0);
  document.getElementById("shopPicker").style.display = "";
  document.getElementById("shopWorkspace").style.display = "none";
  document.getElementById("billbar").style.display = "none";
  document.getElementById("homePageWrapper").style.display = "block";
  try{ history.pushState({ page: 'home' }, '', '#home'); }catch(e){}
  window.loadShopsList();
  window.scrollTo(0,0);
};

function renderChips(){
  const chipsEl = document.getElementById("chips");
  if(chipsEl) {
    chipsEl.innerHTML = window.CATEGORIES_META.map(c => 
      `<button class="cat-chip ${window.currentSelectedCategory===c.name?'active':''}" onclick="selectCategory('${c.name}')">${c.icon} ${c.name_roman||c.name}</button>`
    ).join("");
  }
}

window.selectCategory = function(catName){
  window.currentSelectedCategory = catName;
  renderChips(); renderMainView();
  window.scrollTo({top:0, behavior:'auto'});
  if(window.SHOP_ENTERED && catName){
    try{ history.pushState({ page:'category', cat: catName }, '', '#cat'); }catch(e){}
  }
};

window.resetToHome = function(){ if(window.SHOP_ENTERED) window.backToShops(); window.selectCategory(null); };

function renderMainView(filter=""){
  const main = document.getElementById("list");
  if(!main) return; main.innerHTML = "";
  if(filter){
    let filtered = window.ITEMS.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()) || (i.name_roman && i.name_roman.toLowerCase().includes(filter.toLowerCase())));
    let div = document.createElement("div"); div.innerHTML = `<div class="cat-title">🔍 تلاش کے نتائج</div>`;
    filtered.forEach(it => div.appendChild(createItemRow(it)));
    main.appendChild(div);
  } else if(window.currentSelectedCategory){
    let catObj = window.CATEGORIES_META.find(c => c.name === window.currentSelectedCategory) || {icon:"📦", name: window.currentSelectedCategory};
    let items = window.ITEMS.filter(i => i.cat === window.currentSelectedCategory);
    let div = document.createElement("div");
    div.innerHTML = `<div class="cat-title"><span>${catObj.icon} ${catObj.name}</span> <button class="back-cat-btn" onclick="resetToHome()">⬅ Back</button></div>`;
    items.forEach(it => div.appendChild(createItemRow(it)));
    main.appendChild(div);
  } else {
    let grid = document.createElement("div"); grid.className = "home-cats-grid";
    window.CATEGORIES_META.forEach(cat => {
      grid.innerHTML += `<div class="home-cat-card" onclick="selectCategory('${cat.name}')">
        <div class="home-cat-img-wrap">${cat.image ? `<img src="${cat.image}" loading="lazy">` : `<div style="font-size:32px;">${cat.icon}</div>`}</div>
        <div class="home-cat-name">${cat.name_roman||cat.name}</div>
      </div>`;
    });
    main.appendChild(grid);
  }
}

function createItemRow(it){
  const u = it.units[it.unitIndex];
  const row = document.createElement("div");
  row.className = "item" + (it.qty>0?" active":"");
  row.id = "row-"+it.id;
  let mainImg = (it.images && it.images.length > 0) ? it.images[0] : "";
  let imgCount = (it.images && it.images.length > 1) ? `<div class="thumb-badge">+${it.images.length-1}</div>` : "";
  row.innerHTML = `
    <div class="item-row-top">
      <div class="item-thumb" onclick="openLightboxItem('${it.id}')">
        ${mainImg ? `<img src="${mainImg}" loading="lazy">` : it.icon}
        ${imgCount}
      </div>
      <div class="info"><div class="name">${it.name_roman||it.name}</div><div class="meta"><b>${fmt(u.rate)}</b> / ${u.label}</div></div>
    </div>
    <div class="item-row-bottom">
      ${it.units.length>1 ? `<div class="unit-wrap"><select class="unit-select" onchange="changeUnit('${it.id}',this.value)">${it.units.map((x,idx)=>`<option value="${idx}" ${idx===it.unitIndex?'selected':''}>${x.label} — ${fmt(x.rate)}</option>`).join("")}</select></div>` : '<span></span>'}
      ${(it.premium || it.no_qty) ? `
      <div style="text-align:left;font-size:11px;">
        <div style="color:${it.available===false?'#B71C1C':'#2E7D32'};font-weight:bold;">${it.available===false?'Sold Out':'Available · شاپ/کال'}</div>
        <button type="button" style="margin-top:4px;background:var(--dark);color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:bold;" onclick="inquirePremium('${it.id}')">${it.qty>0?'✓ کارٹ میں':'💎 استفسار / کارٹ'}</button>
      </div>` : `
      <div class="qty-box"><button type="button" onclick="changeQty('${it.id}',-1)">−</button><input type="number" value="${it.qty}" readonly><button type="button" class="plus" onclick="changeQty('${it.id}',1)">+</button></div>`}
    </div>`;
  return row;
}

window.inquirePremium = function(id){
  const it = window.ITEMS.find(x => x.id === id);
  if(!it) return;
  if(it.available === false){ alert("Sold Out"); return; }
  it.qty = it.qty > 0 ? 0 : 1;
  renderMainView(document.getElementById("search").value);
  renderBill();
  document.getElementById("billbar").classList.remove("collapsed");
  window.saveShopCart();
};

window.changeUnit = function(id, idx){ const it = window.ITEMS.find(x => x.id === id); if(it){ it.unitIndex = parseInt(idx); renderMainView(document.getElementById("search").value); renderBill(); window.saveShopCart(); } };

window.changeQty = function(id, delta){
  const it = window.ITEMS.find(x => x.id === id);
  if(!it) return;
  it.qty = Math.max(0, it.qty + delta);
  renderMainView(document.getElementById("search").value);
  renderBill();
  window.saveShopCart();
};

window.removeItemFromCart = function(id){ const it = window.ITEMS.find(x => x.id === id); if(it){ it.qty = 0; renderMainView(document.getElementById("search").value); renderBill(); window.saveShopCart(); } };
window.clearActiveCart = function(){ window.ITEMS.forEach(i => i.qty = 0); renderMainView(document.getElementById("search").value); renderBill(); window.saveShopCart(); };
function fmt(n){ return "Rs. " + Math.round(n).toLocaleString("en-US"); }

function formatPayDisplay(digits){
  const d = String(digits||"").replace(/[^0-9]/g,"");
  if(d.length===11 && d[0]==="0") return d.slice(0,4)+"-"+d.slice(4);
  if(d.length===12 && d.indexOf("92")===0) return "0"+d.slice(2,5)+"-"+d.slice(5);
  return d || "—";
}

function getActivePayNumber(){
  const v = window.ACTIVE_VENDOR || {};
  let d = String(v.pay_number || "").replace(/[^0-9]/g,"");
  if(!d && v.isMaster) d = "03349353799";
  if(d.indexOf("92")===0 && d.length>=12) d = "0"+d.slice(2);
  return d;
}

window.copyPayNumber = function(){
  const d = getActivePayNumber();
  if(!d){ alert("ادائیگی نمبر دستیاب نہیں"); return; }
  navigator.clipboard.writeText(d).then(() => alert("نمبر کاپی: "+d)).catch(() => alert(d));
};

function renderBill(){
  const chosen = window.ITEMS.filter(i => i.qty > 0);
  let subtotal = 0;
  document.getElementById("billLines").innerHTML = chosen.map(it => {
    const u = it.units[it.unitIndex] || it.units[0];
    const t = it.qty * (u.rate||0); subtotal += t;
    return `<div class="cart-item-row"><span>• ${it.name} — ${it.qty} ${u.label||''} = <b>${fmt(t)}</b></span>
      <button type="button" class="cart-item-del" onclick="removeItemFromCart('${it.id}')">✕</button></div>`;
  }).join("");
  document.getElementById("itemCount").textContent = chosen.length;
  document.getElementById("summaryTotal").textContent = fmt(subtotal);
  document.getElementById("payAmount").textContent = fmt(subtotal);
  
  const pay = getActivePayNumber();
  const numEl = document.getElementById("payNumberDisplay");
  if(numEl) numEl.textContent = formatPayDisplay(pay);

  if(chosen.length === 0) document.getElementById("billbar").classList.add("collapsed");
}

function toggleCartDrawer(){ document.getElementById("billbar").classList.toggle("collapsed"); }
const summaryEl = document.getElementById("summary");
if(summaryEl) summaryEl.onclick = toggleCartDrawer;
const searchEl = document.getElementById("search");
if(searchEl) searchEl.oninput = (e) => renderMainView(e.target.value);

const waBtnEl = document.getElementById("waBtn");
if(waBtnEl){
  waBtnEl.onclick = function(){
    if(window.ITEMS.filter(i => i.qty > 0).length === 0){ alert("کارٹ خالی ہے"); return; }
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const addr = document.getElementById("custAddr").value.trim();
    if(!name){ alert("براہ کرم نام درج کریں"); document.getElementById("custName").focus(); return; }
    if(!phone){ alert("براہ کرم فون نمبر درج کریں شہر"); document.getElementById("custPhone").focus(); return; }
    if(!addr){ alert("براہ کرم مکمل پتہ درج کریں"); document.getElementById("custAddr").focus(); return; }
    
    let s = phone.replace(/[\s\-()]/g, "");
    let digits = s.replace(/[^0-9]/g, "");
    if(!/^03\d{9}$/.test(digits)){
      alert("❌ غلط فون نمبر!\n\nدرست مثال: 03349353799");
      document.getElementById("custPhone").focus();
      return;
    }
    
    var chk = document.getElementById("popupTermsCheck");
    if(chk) chk.checked = false;
    document.getElementById("confirmPopupOverlay").classList.add("active");
  };
}

window.closeConfirmPopup = function(){ document.getElementById("confirmPopupOverlay").classList.remove("active"); };

window.proceedWithOrder = function(){
  const chk = document.getElementById("popupTermsCheck");
  if(chk && !chk.checked){ alert("براہ کرم تصدیقی باکس پر ٹک کریں۔"); return; }
  const name = document.getElementById("custName").value.trim();
  const phoneRaw = document.getElementById("custPhone").value.trim();
  const addr = document.getElementById("custAddr").value.trim();
  window.closeConfirmPopup();
  
  const chosen = window.ITEMS.filter(i => i.qty > 0);
  let targetWa = String((window.ACTIVE_VENDOR && window.ACTIVE_VENDOR.whatsapp) || "").replace(/[^0-9]/g,"");
  if(!targetWa && window.ACTIVE_VENDOR && window.ACTIVE_VENDOR.id === "v001") targetWa = "923349353799";
  
  const orderCode = "SJ-" + Math.floor(1000 + Math.random() * 9000);
  let subtotal = 0;
  let msg = "*SJ ONLINE — ORDER*\nShop: " + (window.ACTIVE_VENDOR.shop_name || "Shop") + "\nCode: " + orderCode + "\nName: " + name + "\nPhone: " + phoneRaw + "\nAddress: " + addr + "\n\n*Items:*\n";
  chosen.forEach(it => {
    const u = it.units[it.unitIndex];
    const t = it.qty * u.rate;
    subtotal += t;
    msg += "- " + it.name + " x " + it.qty + " " + u.label + " = " + fmt(t) + "\n";
  });
  msg += "\n*Total: " + fmt(subtotal) + "*";

  try{
    if(window.dbRef){
      window.dbRef.set(window.dbRef.ref(window.dbRef.db, "orders/" + orderCode), {
        code: orderCode, name: name, phone: phoneRaw, address: addr, items: msg.replace(/\n/g, "<br>"),
        total: Math.round(subtotal), otp: orderCode.replace("SJ-", ""), timestamp: new Date().toISOString(),
        status: "pending", vendor_id: window.ACTIVE_VENDOR.id || "v001", shop_name: window.ACTIVE_VENDOR.shop_name || "Shop", target_whatsapp: targetWa
      });
    }
  }catch(e){}

  window.open("https://wa.me/" + targetWa + "?text=" + encodeURIComponent(msg), "_blank");
};

window.jumpToItem = function(catName, itemId){
  window.selectCategory(catName);
  setTimeout(() => {
    var el = document.getElementById("row-" + itemId);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);
};

window.openLightboxItem = function(itemId){
  let it = window.ITEMS.find(x => x.id === itemId);
  if(!it || !it.images || it.images.length === 0) return;
  showLightboxImages(it.images, 0);
};

function showLightboxImages(imgs, index){
  const box = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightboxImg");
  const thumbsEl = document.getElementById("lightboxThumbs");
  if(!box || !imgEl) return;
  imgEl.src = imgs[index];
  box.classList.remove("hidden");
  window.LIGHTBOX_OPEN = true;
  if(imgs.length > 1){
    thumbsEl.innerHTML = imgs.map((src, i) => `<img src="${src}" class="lightbox-thumb ${i===index?'active':''}" onclick="event.stopPropagation(); showLightboxImages(window._lbImgs,${i})">`).join("");
    thumbsEl.style.display = "flex";
    window._lbImgs = imgs;
  } else {
    thumbsEl.innerHTML = "";
    thumbsEl.style.display = "none";
  }
}

window.closeLightbox = function(fromPop){
  const box = document.getElementById("lightbox");
  if(box) box.classList.add("hidden");
  window.LIGHTBOX_OPEN = false;
};

async function bootApp(){
  window.initHomeVisuals();
  window.loadShopsList();
}
bootApp();