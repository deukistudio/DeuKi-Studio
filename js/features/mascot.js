/* ==========================================================================
   Mascot life
   Eye tracking, lean, blinking, page-1 flight, tap reaction
   ========================================================================== */

addEventListener('pointermove', e => {
  const r = mascot.getBoundingClientRect(),
    cx = r.left + r.width / 2,
    cy = r.top + r.height * 0.35;
  const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 300)),
    dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 300));
  eye.style.transform = `translate(${dx * 16}px,${dy * 10}px)`;
  mascot.style.setProperty('--lean', dx * 4 + 'deg');
  lastMove = Date.now();
});
const blinkOnce = () =>
  blinkEl.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.08)' }, { transform: 'scaleY(1)' }], {
    duration: 170
  });
function blinkLoop() {
  blinkOnce();
  if (Math.random() < 0.25) setTimeout(blinkOnce, 260);
  setTimeout(blinkLoop, 2200 + Math.random() * 3800);
}
setTimeout(blinkLoop, 1500);
setInterval(() => {
  if (Date.now() - lastMove > 3500) {
    eye.style.transform = `translate(${(Math.random() * 2 - 1) * 12}px,${(Math.random() * 2 - 1) * 8}px)`;
    mascot.style.setProperty('--lean', (Math.random() * 2 - 1) * 2 + 'deg');
  }
}, 2600);
function fly() {
  // page 1: fly to the top right, hover, come back
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || cur !== 1) return;
  const P = [
    [0, 0, 0],
    [250, -160, 12],
    [590, -195, 8],
    [590, -195, -4],
    [260, -110, -10],
    [0, 0, 0]
  ];
  mascot.classList.add('flying');
  const a = mascot.animate(
    P.map(([x, y, r], i) => ({
      translate: `${x}px ${y}px`,
      rotate: `${r}deg`,
      offset: i / (P.length - 1),
      easing: 'ease-in-out'
    })),
    { duration: 4200 }
  );
  flightAnim = a;
  a.onfinish = a.oncancel = () => mascot.classList.remove('flying');
}

/* ---------- Dragging & tap reaction ---------- */
let dragState = null,
  dragX = 0,
  dragY = 0;

function resetMascotDrag() {
  dragX = 0;
  dragY = 0;
  mascot.style.setProperty('--drag-x', '0px');
  mascot.style.setProperty('--drag-y', '0px');
}

mascot.addEventListener('pointerdown', e => {
  if (e.button && e.button !== 0) return;
  if (stage.dataset.p === '9') {
    retrigger(hop, 'go');
    mascot.classList.add('talking');
    setTimeout(() => mascot.classList.remove('talking'), 900);
    return;
  }
  e.stopPropagation();
  const sr = stage.getBoundingClientRect();
  const scale = sr.width / (stage.offsetWidth || 1120);
  dragState = {
    id: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    origX: dragX,
    origY: dragY,
    scale,
    moved: false
  };
  mascot.setPointerCapture(e.pointerId);
});

mascot.addEventListener('pointermove', e => {
  if (!dragState || e.pointerId !== dragState.id) return;
  const dx = e.clientX - dragState.startX;
  const dy = e.clientY - dragState.startY;
  if (!dragState.moved && Math.hypot(dx, dy) > 4) {
    dragState.moved = true;
    mascot.classList.add('dragging', 'flying');
  }
  if (dragState.moved) {
    dragX = dragState.origX + dx / dragState.scale;
    dragY = dragState.origY + dy / dragState.scale;
    mascot.style.setProperty('--drag-x', dragX + 'px');
    mascot.style.setProperty('--drag-y', dragY + 'px');
  }
});

function endMascotDrag(e) {
  if (!dragState || e.pointerId !== dragState.id) return;
  const wasMoved = dragState.moved;
  dragState = null;
  mascot.classList.remove('dragging', 'flying');
  if (wasMoved) {
    retrigger(hop, 'go');
  } else if (['7', '8', '9'].includes(stage.dataset.p)) {
    retrigger(hop, 'go');
    mascot.classList.add('talking');
    setTimeout(() => mascot.classList.remove('talking'), 900);
  }
}

mascot.addEventListener('pointerup', endMascotDrag);
mascot.addEventListener('pointercancel', endMascotDrag);
