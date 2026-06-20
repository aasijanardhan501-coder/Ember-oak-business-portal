/* =========================================================
   Ember & Oak — Reservation Form JS
   js/reservation.js
   ========================================================= */

'use strict';

const form     = document.getElementById('reservation-form');
const successEl= document.getElementById('reservation-success');

/* ─── Set min date to today ──────────────────────────────── */
const dateInput = document.getElementById('res-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

/* ─── Party size stepper ─────────────────────────────────── */
const guestDisplay = document.getElementById('guest-display');
const guestInput   = document.getElementById('res-guests');
const guestMinus   = document.getElementById('guest-minus');
const guestPlus    = document.getElementById('guest-plus');

let guestCount = 2;

function updateGuests(val) {
  guestCount = Math.max(1, Math.min(20, val));
  if (guestDisplay) guestDisplay.textContent = guestCount + (guestCount === 1 ? ' Guest' : ' Guests');
  if (guestInput) guestInput.value = guestCount;
  if (guestMinus) guestMinus.disabled = guestCount <= 1;
  if (guestPlus)  guestPlus.disabled  = guestCount >= 20;
}

guestMinus?.addEventListener('click', () => updateGuests(guestCount - 1));
guestPlus?.addEventListener('click',  () => updateGuests(guestCount + 1));
updateGuests(2);

/* ─── Form validation ────────────────────────────────────── */
function validateField(el) {
  const val = el.value.trim();
  let error = '';

  if (el.required && !val) {
    error = 'This field is required.';
  } else if (el.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    error = 'Please enter a valid email address.';
  } else if (el.type === 'tel' && val && !/^\+?[\d\s\-]{8,}$/.test(val)) {
    error = 'Please enter a valid phone number.';
  } else if (el.id === 'res-date' && val) {
    const chosen = new Date(val);
    const today  = new Date(); today.setHours(0,0,0,0);
    if (chosen < today) error = 'Please choose a future date.';
  }

  showFieldError(el, error);
  return !error;
}

function showFieldError(el, msg) {
  let errEl = el.parentElement.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.style.cssText = 'display:block;font-size:0.75rem;color:#ff8080;margin-top:4px;';
    el.parentElement.appendChild(errEl);
  }
  errEl.textContent = msg;
  el.style.borderColor = msg ? '#ff8080' : '';
}

/* ─── Live validation ────────────────────────────────────── */
form?.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('blur', () => validateField(el));
  el.addEventListener('input', () => {
    if (el.style.borderColor === 'rgb(255, 128, 128)') validateField(el);
  });
});

/* ─── Submit ─────────────────────────────────────────────── */
form?.addEventListener('submit', async e => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll('input[required], select[required], textarea[required]').forEach(el => {
    if (!validateField(el)) valid = false;
  });

  if (!valid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  // Simulate async submission (replace with Formspree endpoint)
  await new Promise(r => setTimeout(r, 1400));

  form.style.display = 'none';
  if (successEl) {
    successEl.style.display = 'block';
    successEl.classList.add('success-pop');
  }
});
