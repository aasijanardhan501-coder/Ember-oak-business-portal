/* =========================================================
   Ember & Oak — Gallery JS (Lightbox)
   js/gallery.js
   ========================================================= */

'use strict';

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lightbox-img');
const lbClose      = document.getElementById('lightbox-close');
const lbPrev       = document.getElementById('lightbox-prev');
const lbNext       = document.getElementById('lightbox-next');

let activeImages = [];
let activeIndex  = 0;

function updateActiveImages() {
  const visibleCards = Array.from(document.querySelectorAll('.gallery-item')).filter(card => {
    return card.style.display !== 'none';
  });
  activeImages = visibleCards.map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt
  }));
}

function openLightbox(element) {
  updateActiveImages();
  const src = element.querySelector('img').src;
  activeIndex = activeImages.findIndex(img => img.src === src);
  if (activeIndex === -1) activeIndex = 0;

  lbImg.src = activeImages[activeIndex].src;
  lbImg.alt = activeImages[activeIndex].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

function showPrev() {
  if (activeImages.length === 0) return;
  activeIndex = (activeIndex - 1 + activeImages.length) % activeImages.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = activeImages[activeIndex].src;
    lbImg.alt = activeImages[activeIndex].alt;
    lbImg.style.opacity = '1';
  }, 150);
}

function showNext() {
  if (activeImages.length === 0) return;
  activeIndex = (activeIndex + 1) % activeImages.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = activeImages[activeIndex].src;
    lbImg.alt = activeImages[activeIndex].alt;
    lbImg.style.opacity = '1';
  }, 150);
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item));
});

lbClose?.addEventListener('click', closeLightbox);
lbPrev?.addEventListener('click', showPrev);
lbNext?.addEventListener('click', showNext);

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});

lbImg.style.transition = 'opacity 0.15s ease';

/* ─── Gallery filter ─────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryCards = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* ─── Scroll reveal for gallery items ────────────────────── */
const gObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'scale(1)';
      gObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

galleryCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'scale(0.93)';
  card.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
  gObserver.observe(card);
});
