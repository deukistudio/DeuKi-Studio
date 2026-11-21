/* ==========================================================================
   Speech bubble text
   Human-like typing / erasing, bubble width animation, centring
   ========================================================================== */

const seg = t =>
  window.Intl && Intl.Segmenter ? [...new Intl.Segmenter().segment(t)].map(x => x.segment) : [...t];
const delay = c => (/[,]/.test(c) ? 230 : /[!.?]/.test(c) ? 280 : 28 + Math.random() * 42);
async function typeText(str) {
  const id = ++typeId,
    ch = seg(str);
  typing = true;
  txt.innerHTML = '<span class="on"></span><span class="off"></span>';
  const on = txt.firstChild,
    off = txt.lastChild;
  off.textContent = str;
  mascot.classList.add('talking');
  await wait(350);
  for (let k = 1; k <= ch.length; k++) {
    if (id !== typeId) return;
    on.textContent = ch.slice(0, k).join('');
    off.textContent = ch.slice(k).join('');
    await wait(delay(ch[k - 1]));
  }
  typing = false;
  mascot.classList.remove('talking');
}
function finishTyping() {
  // show the whole sentence at once
  if (!typing) return;
  typeId++;
  typing = false;
  const on = txt.querySelector('.on'),
    off = txt.querySelector('.off');
  if (!on) return;
  on.textContent = on.textContent + off.textContent;
  off.textContent = '';
  mascot.classList.remove('talking');
}
async function eraseText() {
  typeId++;
  typing = false;
  const on = txt.querySelector('.on'),
    off = txt.querySelector('.off');
  if (!on) return;
  const all = seg(on.textContent + off.textContent);
  let k = seg(on.textContent).length;
  mascot.classList.add('talking');
  while (k > 0) {
    k--;
    on.textContent = all.slice(0, k).join('');
    off.textContent = all.slice(k).join('');
    await wait(10);
  }
  mascot.classList.remove('talking');
}
function growBubble(w0) {
  bub.style.width = 'auto';
  const w1 = bub.offsetWidth;
  bub.style.width = w0 + 'px';
  void bub.offsetWidth;
  bub.style.width = w1 + 'px';
  setTimeout(() => (bub.style.width = ''), 700);
}
/* keep mascot + bubble centred as a group on layouts 3 and 4, whatever the font width */
function place(L) {
  const F = { 3: 19, 4: 18 }[L];
  if (!F) return;
  const f0 = parseFloat(getComputedStyle(txt).fontSize),
    bw = (txt.offsetWidth * F) / f0 + 60;
  const MW = L === 3 ? 227 : 196,
    start = (960 - (MW + 22 + bw)) / 2;
  stage.style.setProperty('--tx', (L === 3 ? start - 100 : start - 115.4) + 'px');
  stage.style.setProperty('--bl', start + MW + 22 + 'px');
}
