/* ==========================================================================
   Lessons panel
   Skill list, lesson lists, search, daily goal ring
   ========================================================================== */

let LDONE = new Map(),
  view = { t: 'home' }; // LDONE: lessonId -> date it was completed
const lid = (s, i) => s.id + '-' + i,
  nrm = t =>
    t
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .toLowerCase();
const doneN = s => s.lessons.filter((_, i) => LDONE.has(lid(s, i))).length;
const LEL = () => $('#lessons');
function minutesToday() {
  const t = iso(new Date());
  let m = 0;
  [...SKILLS, ...ROADMAP_TOPICS].forEach(s =>
    s.lessons.forEach((l, i) => {
      if (LDONE.get(lid(s, i)) === t) m += l[1];
    })
  );
  return m;
}
function renderToday() {
  // daily goal ring = minutes of lessons finished today
  const m = minutesToday();
  $('#ringC').style.strokeDashoffset = 100 - (100 * Math.min(m, GOAL)) / GOAL;
  $('#ringT').textContent = Math.min(m, GOAL) + '/' + GOAL + ' phút';
  $('.ring').classList.toggle('cold', m === 0);
}
function rowHTML(s, i, k, anim, tag) {
  const [title, min, lv] = s.lessons[i],
    id = lid(s, i);
  return `<button class="lc lr ${anim ? 'up' : ''} ${LDONE.has(id) ? 'done' : ''}" style="--k:${k}" data-lesson="${id}"><span class="no">${i + 1}</span><span class="tx"><b>${title}</b><small>${tag ? s.name + ' · ' : ''}${min} phút · ${lv}</small></span><span class="ck"></span></button>`;
}
function renderLessons(anim = true) {
  const a = anim ? 'up' : '';
  let h = '';
  if (view.t === 'home') {
    h =
      `<div class="lc bigc ${a}" style="--k:0"></div><h3 class="found ${a}" style="--k:2">Xây dựng nền tảng</h3><div class="skills">` +
      SKILLS.map((s, i) => {
        const n = s.lessons.length,
          d = doneN(s);
        return `<button class="lc sk ${a}" style="--k:${i + 3}" data-skill="${s.id}"><img class="stk" alt="" src="${IMG[s.id]}"><span class="tt"><b>${s.name}</b><small>${d ? d + '/' : ''}${n} bài</small></span><img class="arr" alt="" src="${IMG.arrow}"></button>`;
      }).join('') +
      '</div>' +
      `<div class="lc vocab ${a}" style="--k:7"><h3>Từ Vựng</h3><div class="lvls">` +
      LEVELS.map(l =>
        isLevelUnlocked(l)
          ? `<button class="lv" data-level="${l}">${l}</button>`
          : `<button class="lv lock" data-level="${l}" data-locked="1" aria-label="${l} (đã khóa)"><img class="lock-ic" alt="" src="${LOCK_ICON}">${l}</button>`
      ).join('') +
      `</div></div><div class="lc games ${a}" style="--k:8"><h3>Trò Chơi</h3></div>`;
  } else if (view.t === 'section') {
    const s = SKILLS.find(x => x.id === view.id);
    h =
      `<div class="sec-head ${a}"><button class="back" data-act="back" aria-label="Quay lại">‹</button><img class="stk2" alt="" src="${IMG[s.id]}"><h2>${s.name}</h2><span id="cnt">${doneN(s)}/${s.lessons.length} hoàn thành</span></div><p class="hint ${a}" style="--k:1">Nhấn vào bài học để đánh dấu hoàn thành</p><div class="list">` +
      s.lessons.map((_, i) => rowHTML(s, i, i + 2, anim)).join('') +
      '</div>';
  } else {
    const hits = [];
    [...SKILLS, ...ROADMAP_TOPICS].forEach(s =>
      s.lessons.forEach((l, i) => {
        if (
          nrm(l[0]).includes(view.q) ||
          nrm(s.name).includes(view.q) ||
          (s.en && nrm(s.en).includes(view.q))
        )
          hits.push([s, i]);
      })
    );
    h =
      `<div class="sec-head ${a}"><h2>Kết quả tìm kiếm</h2><span>${hits.length} bài học</span></div><p class="hint ${a}" style="margin-left:0">&nbsp;</p><div class="list">` +
      (hits.length
        ? hits.map(([s, i], k) => rowHTML(s, i, k + 1, anim, true)).join('')
        : '<div class="lc empty">Không tìm thấy bài học nào.</div>') +
      '</div>';
  }
  LEL().innerHTML = h;
}
function swapView(anim = true) {
  const L = LEL();
  if (!anim) {
    renderLessons(false);
    return;
  }
  L.classList.add('out');
  setTimeout(() => {
    renderLessons(true);
    L.classList.remove('out');
  }, 170);
}
function goLessonsHome() {
  const i = $('#search input');
  i.value = '';
  if (view.t !== 'home') {
    view = { t: 'home' };
    swapView();
  }
}
LEL().addEventListener('click', e => {
  const b = e.target.closest('[data-skill],[data-lesson],[data-act],[data-level],[data-soon]');
  if (!b) return;
  if (b.dataset.level) {
    // Từ Vựng: locked levels explain what to finish first; unlocked levels open the vocabulary roadmap
    b.dataset.locked ? showSoon(lockedMessage(b.dataset.level)) : openVocabRoadmap(b.dataset.level);
  } else if (b.dataset.soon) {
    showSoon();
  } else if (b.dataset.skill) {
    // Xây dựng nền tảng: skill cards open the Khóa Học page
    document.querySelectorAll('.ni')[1].click();
  } else if (b.dataset.act === 'back') {
    view = { t: 'home' };
    swapView();
  } else if (b.dataset.lesson) {
    const id = b.dataset.lesson;
    LDONE.has(id) ? LDONE.delete(id) : LDONE.set(id, iso(new Date()));
    b.classList.toggle('done', LDONE.has(id));
    const s = SKILLS.find(x => id.startsWith(x.id + '-')),
      c = $('#cnt');
    if (c && view.t === 'section') c.textContent = doneN(s) + '/' + s.lessons.length + ' hoàn thành';
    renderToday();
    if (LDONE.has(id)) {
      retrigger(hop, 'go');
      mascot.classList.add('talking');
      setTimeout(() => mascot.classList.remove('talking'), 800);
    }
    backend.saveDone(Object.fromEntries(LDONE)).catch(() => {});
  }
});
$('#search input').addEventListener('input', e => {
  if (page === 'courses') {
    const v = e.target.value;
    document.querySelectorAll('.ni')[0].click();
    e.target.value = v;
  } // searching returns to Trang Chủ
  const q = nrm(e.target.value.trim());
  const was = view.t;
  view = q ? { t: 'search', q } : { t: 'home' };
  swapView(was !== view.t && view.t !== 'search' ? true : false);
});
async function openLessons() {
  try {
    const d = await backend.loadDone();
    LDONE = new Map(Array.isArray(d) ? d.map(x => [x, null]) : Object.entries(d || {}));
  } catch (e) {}
  renderLessons(true);
  renderToday();
}
