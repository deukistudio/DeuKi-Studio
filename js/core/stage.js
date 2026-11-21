/* ==========================================================================
   Stage scaling
   Full-screen responsive scaling of the 1120×720 base canvas
   ========================================================================== */

const BASE_W = 1120,
  BASE_H = 720;

function resize() {
  const s = Math.min(innerWidth / BASE_W, innerHeight / BASE_H);
  const w = innerWidth / s;
  const h = innerHeight / s;
  stage.style.width = w + 'px';
  stage.style.height = h + 'px';
  stage.style.transform = `scale(${s})`;
  stage.style.setProperty('--dx', w - BASE_W + 'px');
  stage.style.setProperty('--dy', h - BASE_H + 'px');
  fit.style.width = innerWidth + 'px';
  fit.style.height = innerHeight + 'px';
}
addEventListener('resize', resize);
resize();
