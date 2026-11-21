/* ==========================================================================
   Answer cards
   ========================================================================== */

function showChips(q) {
  const d = Q[q];
  chips.innerHTML = '';
  chips.classList.remove('ready');
  Object.assign(chips.style, GRID[d.g]);
  d.o.forEach(([ic, label], i) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.style.setProperty('--i', i);
    b.innerHTML = (IC[ic] || '') + `<span>${label}</span>`;
    b.onclick = () => {
      // single choice
      const was = b.classList.contains('sel');
      chips.querySelectorAll('.chip').forEach(o => o.classList.remove('sel'));
      if (!was) b.classList.add('sel');
      next.classList.toggle('dim', was);
      mascot.classList.add('talking');
      setTimeout(() => mascot.classList.remove('talking'), 700);
    };
    chips.appendChild(b);
  });
  void chips.offsetWidth;
  [...chips.children].forEach(b => b.classList.add('show'));
  setTimeout(() => chips.classList.add('ready'), d.o.length * 80 + 700);
}
async function hideChips() {
  if (!chips.children.length) return;
  chips.classList.remove('ready');
  [...chips.children].forEach(b => b.classList.remove('show'));
  await wait(380);
  chips.innerHTML = '';
}
