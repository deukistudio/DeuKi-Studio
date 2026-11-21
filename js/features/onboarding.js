/* ==========================================================================
   Onboarding flow
   Page sequence, Continue button, tap-to-skip on intro pages
   ========================================================================== */

async function go(n) {
  if (busy) return;
  busy = true;
  clearTimeout(timer);
  next.classList.remove('show', 'dim');
  loginCard.classList.remove('show');
  if (flightAnim && flightAnim.playState === 'running') flightAnim.updatePlaybackRate(4); // let the flight finish quickly when skipping
  const p = pages[n],
    prev = pages[cur],
    same = !!cur && prev.t === p.t;
  stage.classList.toggle('same', same);
  await Promise.all([hideChips(), !same && cur ? eraseText() : 0]);
  const w0 = bub.offsetWidth;
  if (typeof resetMascotDrag === 'function') resetMascotDrag();
  stage.dataset.p = p.L;
  if (cur) retrigger(hop, 'go'); // mascot hops on each page change
  if (!same) typeText(p.t);
  place(p.L);
  if (!same && cur) growBubble(w0);
  cur = n;
  await skippable(same ? 1100 : 700 + p.t.length * 55);
  if (p.q) {
    showChips(p.q);
    await wait(1000);
    next.classList.add('show', 'dim');
  }
  if (p.login) {
    await wait(600);
    loginCard.classList.add('show');
  }
  busy = false;
  if (skipAdv) {
    skipAdv = false;
    go(n + 1);
    return;
  }
  if (p.auto) timer = setTimeout(() => go(n + 1), p.auto);
}
next.onclick = () => {
  if (!busy && next.classList.contains('show') && !next.classList.contains('dim') && pages[cur + 1])
    go(cur + 1);
};
addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.tagName !== 'INPUT') next.click();
});

/* Skip the intro (pages 1–3): 1st tap shows the full sentence, next tap jumps to the following page */
function skipIntro() {
  if (cur < 1 || cur > 3) return;
  if (typing) {
    finishTyping();
    return;
  }
  if (inWait) {
    skipAdv = true;
    wake();
    return;
  }
  if (!busy && pages[cur].auto) {
    clearTimeout(timer);
    go(cur + 1);
  }
}
stage.addEventListener('pointerdown', e => {
  if (!e.target.closest('button,input,a,#login,#mascot')) skipIntro();
});
addEventListener('keydown', e => {
  if (['Enter', ' ', 'ArrowRight'].includes(e.key) && !/INPUT|BUTTON|A/.test(e.target.tagName)) skipIntro();
});
