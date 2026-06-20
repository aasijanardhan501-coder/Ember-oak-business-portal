/* =========================================================
   Ember & Oak — Menu Page JS
   js/menu.js
   ========================================================= */

'use strict';

/* ─── State ───────────────────────────────────────────────── */
let activeCategory = 'all';
let activePriceMin = 0;
let activePriceMax = 99999;
let activeSearchQuery = '';

/* ─── Elements ────────────────────────────────────────────── */
const categoryChips = document.querySelectorAll('#category-filter-group .filter-chip');
const priceChips    = document.querySelectorAll('#price-filter-group .filter-chip');
const menuItems     = document.querySelectorAll('.menu-item-card');
const visibleCount  = document.getElementById('visible-count');
const menuEmpty     = document.getElementById('menu-empty');
const resultsLine   = document.getElementById('menu-results-count');
const searchInput   = document.getElementById('menu-search');
const searchClear   = document.getElementById('search-clear');
const resetBtn      = document.getElementById('search-reset-btn');

/* ─── HTML Escaping Helper ────────────────────────────────── */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ─── Text Highlighting Helper ───────────────────────────── */
function highlightText(element, query) {
  let original = element.getAttribute('data-original-text');
  if (!original) {
    original = element.textContent.trim();
    element.setAttribute('data-original-text', original);
  }

  if (!query) {
    element.textContent = original;
    return;
  }

  const text = original;
  const queryLower = query.toLowerCase();
  let html = '';
  let lastIndex = 0;
  let currentIdx = text.toLowerCase().indexOf(queryLower, lastIndex);

  if (currentIdx === -1) {
    element.textContent = text;
    return;
  }

  while (currentIdx !== -1) {
    const before = text.substring(lastIndex, currentIdx);
    const match = text.substring(currentIdx, currentIdx + query.length);
    html += escapeHTML(before) + `<mark class="search-hl">${escapeHTML(match)}</mark>`;
    lastIndex = currentIdx + query.length;
    currentIdx = text.toLowerCase().indexOf(queryLower, lastIndex);
  }
  html += escapeHTML(text.substring(lastIndex));
  element.innerHTML = html;
}

/* ─── Core filter function (AND logic) ───────────────────── */
function applyFilters() {
  let shown = 0;
  const query = activeSearchQuery.trim();

  menuItems.forEach((item) => {
    // 1. Category filter
    const catMatch = activeCategory === 'all' || item.dataset.category === activeCategory;

    // 2. Price filter
    const price = parseInt(item.dataset.price, 10);
    const priceMatch = price >= activePriceMin && price <= activePriceMax;

    // 3. Search query filter
    let searchMatch = true;
    const nameEl = item.querySelector('.menu-item-name');
    const descEl = item.querySelector('.menu-item-desc');

    if (query) {
      const nameText = (nameEl.getAttribute('data-original-text') || nameEl.textContent).toLowerCase();
      const descText = (descEl.getAttribute('data-original-text') || descEl.textContent).toLowerCase();
      searchMatch = nameText.includes(query.toLowerCase()) || descText.includes(query.toLowerCase());
    }

    const visible = catMatch && priceMatch && searchMatch;

    if (visible) {
      item.style.display = '';
      // Stagger fade-in animation
      item.style.animation = 'none';
      item.offsetHeight; // force reflow
      item.style.animationDelay = `${(shown % 12) * 55}ms`;
      item.style.animation = 'tabFadeIn 0.42s ease both';
      shown++;

      // Highlight text matches
      highlightText(nameEl, query);
      highlightText(descEl, query);
    } else {
      item.style.display = 'none';
      // Clear highlights even when hidden to keep DOM clean
      highlightText(nameEl, '');
      highlightText(descEl, '');
    }
  });

  // Update results count label
  if (visibleCount) visibleCount.textContent = shown;

  // Toggle empty state
  if (menuEmpty) menuEmpty.style.display = shown === 0 ? 'block' : 'none';

  // Update details label and reset button state
  updateResultsLabel(shown);
}

function updateResultsLabel(count) {
  if (!resultsLine) return;
  
  let label = `Showing <strong id="visible-count">${count}</strong> item${count !== 1 ? 's' : ''}`;

  const catLabel = activeCategory !== 'all'
    ? ` in <strong style="color:var(--clr-text-2); text-transform: capitalize;">${activeCategory}</strong>` : '';

  let priceLabel = '';
  if (activePriceMax === 699)   priceLabel = ' · <strong style="color:var(--clr-text-2)">Under ₹700</strong>';
  if (activePriceMin === 700)   priceLabel = ' · <strong style="color:var(--clr-text-2)">₹700–₹1,499</strong>';
  if (activePriceMin === 1500)  priceLabel = ' · <strong style="color:var(--clr-text-2)">₹1,500–₹2,499</strong>';
  if (activePriceMin === 2500)  priceLabel = ' · <strong style="color:var(--clr-text-2)">Above ₹2,500</strong>';

  let searchLabel = '';
  if (activeSearchQuery.trim()) {
    searchLabel = ` matching "<strong style="color:var(--clr-text-2)">${escapeHTML(activeSearchQuery.trim())}</strong>"`;
  }

  resultsLine.innerHTML = label + catLabel + priceLabel + searchLabel;

  // Toggle Reset Button
  const hasActiveFilters = activeCategory !== 'all' || activePriceMin !== 0 || activeSearchQuery.trim() !== '';
  if (resetBtn) {
    if (hasActiveFilters) {
      resetBtn.classList.add('visible');
    } else {
      resetBtn.classList.remove('visible');
    }
  }
}

/* ─── Category Chips Event Listeners ──────────────────────── */
categoryChips.forEach(chip => {
  chip.addEventListener('click', () => {
    categoryChips.forEach(c => {
      c.classList.remove('active');
    });
    chip.classList.add('active');
    activeCategory = chip.dataset.filter;
    applyFilters();
  });
});

/* ─── Price Chips Event Listeners ─────────────────────────── */
priceChips.forEach(chip => {
  chip.addEventListener('click', () => {
    priceChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activePriceMin = parseInt(chip.dataset.priceMin, 10);
    activePriceMax = parseInt(chip.dataset.priceMax, 10);
    applyFilters();
  });
});

/* ─── Search Input Event Listeners ────────────────────────── */
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    activeSearchQuery = e.target.value;
    if (activeSearchQuery.trim()) {
      searchClear.classList.add('visible');
    } else {
      searchClear.classList.remove('visible');
    }
    applyFilters();
  });
}

if (searchClear) {
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    activeSearchQuery = '';
    searchClear.classList.remove('visible');
    searchInput.focus();
    applyFilters();
  });
}

/* ─── Reset Button Event Listener ─────────────────────────── */
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Reset category
    activeCategory = 'all';
    categoryChips.forEach(c => {
      if (c.dataset.filter === 'all') c.classList.add('active');
      else c.classList.remove('active');
    });

    // Reset price
    activePriceMin = 0;
    activePriceMax = 99999;
    priceChips.forEach(c => {
      if (c.dataset.priceMin === '0' && c.dataset.priceMax === '99999') c.classList.add('active');
      else c.classList.remove('active');
    });

    // Reset search query
    activeSearchQuery = '';
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.classList.remove('visible');

    applyFilters();
  });
}

/* ─── Initial render ─────────────────────────────────────── */
applyFilters();

/* ─── Intersection Observer for scroll-reveal ────────────── */
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

menuItems.forEach(card => {
  card.classList.add('reveal');
  cardObserver.observe(card);
});
