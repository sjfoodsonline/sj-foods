/* ==========================================
   SJ Foods Online — Search Engine (js/search.js)
   ========================================== */

// Search State
let searchState = {
  debounceTimer: null,
  lastQuery: ""
};

// ==========================================
// 1. Search Logic & Filtering
// ==========================================
function handleSearchInput(event) {
  const query = event.target.value.trim().toLowerCase();
  
  // Debounce تاکہ ہر کی اسٹروک پر بلاوجہ رینڈرنگ نہ ہو
  clearTimeout(searchState.debounceTimer);
  searchState.debounceTimer = setTimeout(() => {
    executeSearch(query);
  }, 200);
}

function executeSearch(query) {
  searchState.lastQuery = query;

  // اگر global appState موجود ہو (جو app.js میں ہے)
  if (window.appState && Array.isArray(window.appState.products)) {
    window.appState.searchTerm = query;
    
    if (typeof renderProducts === "function") {
      renderProducts();
    }
  } else {
    // اگر مستقل سرچ ایلیمنٹس کو ڈائریکٹ فلٹر کرنا ہو
    filterDOMProducts(query);
  }
}

// ڈائریکٹ DOM فلٹرنگ (اگر app.js کا گلوبل اسٹیٹ استعمال نہ ہو رہا ہو)
function filterDOMProducts(query) {
  const productCards = document.querySelectorAll(".product-item");
  let foundCount = 0;

  productCards.forEach((card) => {
    const titleEl = card.querySelector(".product-title");
    const romanEl = card.querySelector(".product-roman");
    
    const titleText = titleEl ? titleEl.textContent.toLowerCase() : "";
    const romanText = romanEl ? romanEl.textContent.toLowerCase() : "";

    if (titleText.includes(query) || romanText.includes(query)) {
      card.style.display = "";
      foundCount++;
    } else {
      card.style.display = "none";
    }
  });

  // اگر کوئی پروڈکٹ نہ ملے تو پیغام دکھائیں
  showNoResultsMessage(foundCount === 0 && query.length > 0);
}

function showNoResultsMessage(show) {
  let emptyMsgEl = document.getElementById("searchEmptyMsg");
  const productList = document.getElementById("list");

  if (!productList) return;

  if (show) {
    if (!emptyMsgEl) {
      emptyMsgEl = document.createElement("div");
      emptyMsgEl.id = "searchEmptyMsg";
      emptyMsgEl.className = "empty-msg";
      emptyMsgEl.innerHTML = `🔍 <strong>"${searchState.lastQuery}"</strong> سے ملتا جلتا کوئی پروڈکٹ نہیں ملا`;
      productList.appendChild(emptyMsgEl);
    } else {
      emptyMsgEl.innerHTML = `🔍 <strong>"${searchState.lastQuery}"</strong> سے ملتا جلتا کوئی پروڈکٹ نہیں ملا`;
      emptyMsgEl.style.display = "block";
    }
  } else if (emptyMsgEl) {
    emptyMsgEl.style.display = "none";
  }
}

// سرچ باکس کو صاف (Clear) کرنے کا فنکشن
function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
    executeSearch("");
    searchInput.focus();
  }
}

// ==========================================
// 2. Event Listeners Setup
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", clearSearch);
  }
});
