/* =========================================================
   Ember & Oak — Main JavaScript
   js/main.js
   ========================================================= */

'use strict';

/* ─── Page Loader ────────────────────────────────────────── */
const loader = document.getElementById('page-loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader?.classList.add('hidden');
    document.body.style.overflow = '';
  }, 800);
});
document.body.style.overflow = 'hidden';

/* ─── Navbar ─────────────────────────────────────────────── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('nav-hamburger');
const navDrawer   = document.getElementById('nav-drawer');
const navLinks    = document.querySelectorAll('.nav-link');

// Scrolled state
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
  updateFloatBtn();
  updateBackToTop();
}, { passive: true });

// Hamburger toggle
hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navDrawer?.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close drawer on nav link click
navDrawer?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ─── Scroll Reveal (Intersection Observer) ──────────────── */
const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale', '.stagger'];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealClasses.forEach(cls => {
  document.querySelectorAll(cls).forEach(el => revealObserver.observe(el));
});

/* ─── Animated Counters ──────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ─── Testimonials Slider ────────────────────────────────── */
const track    = document.getElementById('testimonials-track');
const prevBtn  = document.getElementById('testimonials-prev');
const nextBtn  = document.getElementById('testimonials-next');
const dotsWrap = document.getElementById('testimonials-dots');

if (track) {
  const cards    = Array.from(track.children);
  let current    = 0;
  let autoTimer;

  function getVisible() {
    if (window.innerWidth < 480)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function buildDots() {
    if (!dotsWrap) return;
    const count = Math.ceil(cards.length / getVisible());
    dotsWrap.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(idx) {
    const total   = Math.ceil(cards.length / getVisible());
    current       = (idx + total) % total;
    const offset  = current * (100 / getVisible());
    track.style.transform = `translateX(-${offset}%)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    dotsWrap?.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  buildDots();
  resetAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}

/* ─── Floating Reserve Button ────────────────────────────── */
const floatBtn = document.getElementById('float-reserve');

function updateFloatBtn() {
  if (!floatBtn) return;
  floatBtn.classList.toggle('visible', window.scrollY > 400);
}

/* ─── Back to Top ────────────────────────────────────────── */
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  backToTop?.classList.toggle('visible', window.scrollY > 500);
}

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Hero parallax ──────────────────────────────────────── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });

  // Trigger the loaded state for smooth zoom-in
  setTimeout(() => heroBg.classList.add('loaded'), 100);
}

/* ─── Smooth anchor scrolling ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Ripple effect on buttons ───────────────────────────── */
document.querySelectorAll('.btn.ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const circle = document.createElement('span');
    const size   = Math.max(rect.width, rect.height) * 2;
    circle.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      border-radius:50%; background:rgba(255,255,255,0.2);
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      transform:scale(0); animation:rippleAnim 0.6s ease-out;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

/* ─── Ripple keyframe injection ──────────────────────────── */
if (!document.getElementById('ripple-style')) {
  const s = document.createElement('style');
  s.id = 'ripple-style';
  s.textContent = '@keyframes rippleAnim{to{transform:scale(1);opacity:0}}';
  document.head.appendChild(s);
}


