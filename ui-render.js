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
    return `<div class="deal-card" onclick="jumpToItem('\( {String(cat).replace(/'/g,"")}',' \){String(id).replace(/'/g,"")}')">
      \( {fImg ? `<img src=" \){fImg}" loading="lazy">` : `<div class="deal-icon-box">${it.icon||"⭐"}</div>`}
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

async function loadData(){
  try{
    const RTDB = "https://sj-foods-default-rtdb.firebaseio.com";
    let firebaseProducts = {};
    let firebaseCategories = [];

    try{
      const [prodRes, catRes] = await Promise.all([
        fetch(RTDB + "/site_products.json?t=" + Date.now()),
        fetch(RTDB + "/site_categories.json?t=" + Date.now())
      ]);
      firebaseProducts = await prodRes.json() || {};
      firebaseCategories = await catRes.json() || [];
    }catch(e){}

    const CAT_MAP = {
      sabzi:     { category: "سبزی",     category_roman: "Sabzi",     icon: "🥦" },
      phal:      { category: "پھل",      category_roman: "Phal",      icon: "🍎" },
      bakery:    { category: "بیکری",    category_roman: "Bakery",    icon: "🍞" },
      dairy:     { category: "ڈیری",     category_roman: "Dairy",     icon: "🥛" },
      poultry:   { category: "پولٹری",   category_roman: "Poultry",   icon: "🍗" },
      fish:      { category: "مچھلی",    category_roman: "Fish",      icon: "🐟" },
      rice:      { category: "چاول",     category_roman: "Rice",      icon: "🍚" },
      pulses:    { category: "دالیں",    category_roman: "Pulses",    icon: "🫘" },
      oil_ghee:  { category: "گھی/آئل",  category_roman: "Oil & Ghee",icon: "🛢️" },
      spices:    { category: "مصالحہ جات", category_roman: "Spices",   icon: "🌶️" },
      biryani:   { category: "بریانی",   category_roman: "Biryani",   icon: "🍛" },
      drinks:    { category: "مشروبات",  category_roman: "Drinks",    icon: "🥤" },
      snacks:    { category: "سنیکس",    category_roman: "Snacks",    icon: "🍪" },
      cleaning:  { category: "صفائی",    category_roman: "Cleaning",  icon: "🧹" }
    };

    if(!Array.isArray(firebaseCategories) || !firebaseCategories.length){
      const productKeys = Object.keys(firebaseProducts || {}).filter(k => Array.isArray(firebaseProducts[k]) && firebaseProducts[k].length > 0);
      firebaseCategories = productKeys.map(key => {
        const map = CAT_MAP[key] || { category: key, category_roman: key, icon: "📦" };
        return { file: key, category: map.category, category_roman: map.category_roman, icon: map.icon };
      });
    }

    if(!firebaseCategories.length){
      firebaseCategories = Object.keys(CAT_MAP).map(key => ({
        file: key,
        category: CAT_MAP[key].category,
        category_roman: CAT_MAP[key].category_roman,
        icon: CAT_MAP[key].icon
      }));
    }

    window.CATEGORIES_META = [];
    window.ITEMS = [];
    window.CATEGORIES_DATA = {};
    const gallery = [];

    for(let entry of firebaseCategories){
      let catName = entry.category || entry.name || "General";
      let catRoman = entry.category_roman || entry.name_roman || catName;
      let icon = entry.icon || "📦";
      let fileKey = String(entry.file || catRoman || "").toLowerCase().replace(/[^a-z0-9_]/g, "");

      let itemsList = [];
      if(firebaseProducts[fileKey] && Array.isArray(firebaseProducts[fileKey])){
        itemsList = firebaseProducts[fileKey];
      } else if(firebaseProducts[catName] && Array.isArray(firebaseProducts[catName])){
        itemsList = firebaseProducts[catName];
      } else {
        try{
          const lRes = await fetch(fileKey + ".json?t=" + Date.now());
          if(lRes.ok){
            const lData = await lRes.json();
            if(Array.isArray(lData)) itemsList = lData;
          }
        }catch(e){}
      }

      if(!itemsList || itemsList.length === 0) continue;

      let defaultImg = entry.image || "";
      window.CATEGORIES_DATA[catName] = itemsList;

      itemsList.forEach((it, ii) => {
        let imgs = it.images || (it.image ? [it.image] : []);
        imgs = imgs.map(src => {
          if(!src) return src;
          if(src.indexOf("http") === 0 || src.indexOf("data:") === 0) return src;
          return src;
        });
        let img0 = imgs[0] || "";
        if(img0 && String(img0).indexOf("data:") !== 0) gallery.push(img0);
        if(!defaultImg && img0) defaultImg = img0;

        window.ITEMS.push({
          id: fileKey + "-" + ii,
          cat: catName,
          icon: icon,
          name: it.name || "",
          name_roman: it.name_roman || it.name || "",
          units: it.units || [{label: it.unit || "KG", rate: it.rate || 0}],
          unitIndex: 0,
          available: it.available !== false,
          images: imgs,
          featured: it.featured === true,
          qty: 0
        });
      });

      window.CATEGORIES_META.push({
        name: catName,
        name_roman: catRoman,
        icon: icon,
        image: defaultImg
      });
    }

    paintProductGallery(shuffleArray(gallery).slice(0, 24));
    window.HOME_DEALS_POOL = shuffleArray(window.ITEMS.slice());
    startTopDealsShuffle();

    renderChips();
    renderMainView();
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
      let coverHtml = cover ? `<img class="shop-cover" src="\( {cover}" loading="lazy">` : `<div class="shop-cover ph"> \){isOwn?"🥬":"🏪"}</div>`;
      const countLabel = isOwn ? "SJ Foods" : ("آئٹمز: