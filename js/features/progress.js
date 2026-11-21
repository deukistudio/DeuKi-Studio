/* ==========================================================================
   Tien Trinh (progress) page
   Renders the mascot level banner, 7x7 activity heatmap (T2..CN), and streak
   Auto-synced with the user's daily check-in history (STREAK.days & STREAK.streak)
   ========================================================================== */

const PG_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function monOf(d) {
  const m = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
  return m;
}

function renderProgress() {
  const el = $('#progress');
  const doneCount = LDONE.size;
  const lv = 1 + Math.floor(doneCount / 5);
  const pct = doneCount === 0 ? 73 : Math.max(18, Math.round(((doneCount % 5) / 5) * 100) || 100);

  const st = (typeof STREAK !== 'undefined' && STREAK) || { streak: 0, days: [] };
  const streakDays = st.streak || 0;
  const daysList = st.days || [];
  const set = new Set(daysList);

  const today = new Date();
  const todayIso = iso(today);
  const curMon = monOf(today);
  const minWindowMon = new Date(curMon);
  minWindowMon.setDate(curMon.getDate() - 6 * 7);

  /* Anchor col 0 to the Monday of the user's first check-in week (within the 7-week window) */
  let startMon = curMon;
  daysList.forEach(ds => {
    const p = ds.split('-').map(Number);
    if (p.length === 3) {
      const m = monOf(new Date(p[0], p[1] - 1, p[2]));
      if (m < startMon) startMon = m;
    }
  });
  if (startMon < minWindowMon) startMon = minWindowMon;

  const rows = PG_DAYS.map((d, r) => {
    const cells = Array.from({ length: 7 }, (_, c) => {
      const cellDate = new Date(startMon);
      cellDate.setDate(startMon.getDate() + c * 7 + r);
      const key = iso(cellDate);
      const on = set.has(key);
      const isToday = key === todayIso;
      return `<i class="pg-cell${on ? ' on' : ''}${isToday ? ' today' : ''}" title="${key}"></i>`;
    }).join('');
    return `<div class="pg-row"><span class="pg-day">${d}</span>${cells}</div>`;
  }).join('');

  el.innerHTML =
    `<div class="pg-banner up" style="--k:0"><div class="pg-lv" id="pgLv">Lv. ${lv}</div><div class="pg-bar"><span class="pg-fill" id="pgFill" style="width:${pct}%"></span></div></div>` +
    `<div class="pg-body">` +
    `<div class="pg-act up" style="--k:1"><h3>Hoạt động của bạn</h3><div class="pg-grid">${rows}</div></div>` +
    `<div class="pg-streak up" style="--k:2"><div class="pg-fire-wrap"><img class="pg-fire" alt="" src="assets/images/icons/fire.png"></div><div class="pg-days"><b id="pgDays">${streakDays}</b><span>Ngày</span></div></div>` +
    `</div>`;
}
