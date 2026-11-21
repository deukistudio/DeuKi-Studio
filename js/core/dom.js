/* ==========================================================================
   DOM helpers & shared element references
   ========================================================================== */

const $ = s => document.querySelector(s);
const stage = $('#stage'),
  fit = $('#fit'),
  bub = $('#bubbleIn'),
  txt = $('#txt'),
  next = $('#next'),
  mascot = $('#mascot'),
  hop = $('#hop'),
  eye = $('#eyeTrack'),
  chips = $('#chips'),
  blinkEl = $('#blink'),
  loginCard = $('#login');
const wait = ms => new Promise(r => setTimeout(r, ms));
const retrigger = (el, c) => {
  el.classList.remove(c);
  void el.offsetWidth;
  el.classList.add(c);
};

/* yyyy-mm-dd in local time */
const iso = d =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
