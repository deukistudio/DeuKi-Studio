/* ==========================================================================
   Streak
   Counts each calendar day the user opens the app; missing a day resets it
   ========================================================================== */

let STREAK = { streak: 0, last: null, days: [] };

function tick(st) {
  // st = {streak,last,days}
  const t = new Date(),
    today = iso(t),
    y = new Date(t);
  y.setDate(t.getDate() - 1);
  let { streak = 0, last = null, days = [] } = st || {};
  if (last !== today) {
    streak = last === iso(y) ? streak + 1 : 1;
    last = today;
    days = [...days.filter(d => d !== today), today].slice(-60);
  }
  return { streak, last, days };
}
function renderStreak(st) {
  // top counter + this week's checkmarks
  STREAK = st || { streak: 0, last: null, days: [] };
  const n = STREAK.streak || 0,
    set = new Set(STREAK.days || []),
    t = new Date(),
    mon = new Date(t);
  mon.setDate(t.getDate() - ((t.getDay() + 6) % 7));
  document.querySelectorAll('.week span').forEach((sp, i) => {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    sp.classList.toggle('on', set.has(iso(d)));
    sp.classList.toggle('today', iso(d) === iso(t));
  });
  $('#topStreak').classList.toggle('cold', n === 0);
  $('#congrats').textContent =
    n > 0 ? `Chúc mừng bạn đã đạt chuỗi ${n} ngày` : 'Học bài hôm nay để bắt đầu chuỗi ngày nhé!';
  const el = $('#topN');
  let k = 0;
  const step = () => {
    k = Math.min(n, k + 1);
    el.textContent = k;
    if (k < n) setTimeout(step, Math.max(40, 700 / n));
  };
  step();
  if (typeof renderProgress === 'function' && $('#progress').classList.contains('on')) {
    renderProgress();
  }
}
async function refreshStreak() {
  try {
    renderStreak(await backend.checkIn());
  } catch (e) {
    renderStreak({ streak: 0, days: [] });
  }
}
