/* ==========================================================================
   Khoa Hoc (courses) page
   Grid of levels/cards -> Vocabulary A1-A2 winding roadmap -> Topic lessons
   ========================================================================== */

let cView = { t: 'grid' }; // {t:'grid'} | {t:'roadmap', lv:'A1'} | {t:'topic', id:'vocab-intro'}

function renderCourses() {
  const el = $('#courses');
  el.classList.toggle('rm-mode', cView.t !== 'grid');
  if (cView.t === 'roadmap') {
    renderRoadmap(el);
    return;
  }
  if (cView.t === 'topic') {
    renderTopicLessons(el);
    return;
  }
  el.innerHTML = LEVELS.map((lv, i) => {
    const lock = !isLevelUnlocked(lv);
    return (
      `<section class="lvl ${lock ? 'lock' : ''} up" style="--k:${i}"><span class="lvl-tag">Level ${lv}</span><div class="cgrid">` +
      CARDS.map(
        (c, ci) =>
          `<button class="cc ${lock ? 'lock' : ''}" data-level="${lv}" data-card="${ci}" ${lock ? 'data-locked="1"' : 'data-open="1"'}><span class="th"></span><span class="lb">${c}</span></button>`
      ).join('') +
      '</div></section>'
    );
  }).join('');
  el.scrollTop = 0;
}

function renderRoadmap(el) {
  const rowGap = 112,
    y0 = 42,
    xL = 32,
    xR = 540,
    n = ROADMAP_TOPICS.length;
  const totalH = y0 + n * rowGap + 70;
  let d = `M ${xR} ${y0} H ${xL}`;
  for (let r = 0; r < n; r++) {
    const y1 = y0 + r * rowGap,
      y2 = y1 + rowGap;
    d += r % 2 === 0 ? ` V ${y2} H ${xR}` : ` V ${y2} H ${xL}`;
  }
  d += ` V ${y0 + n * rowGap + 56}`;

  const nodes = ROADMAP_TOPICS.map((tp, i) => {
    const unlocked = isTopicUnlocked(i),
      done = isTopicComplete(tp);
    const x = i === 0 ? 404 : i % 2 === 1 ? 156 : 404;
    const y = i === 0 ? y0 : y0 + i * rowGap;
    const cls = unlocked ? `open ${done ? 'done' : ''}` : `lock ${tp.shape}`;
    const stk = IMG[tp.img] || IMG.intro;
    const inner = unlocked
      ? `<img class="rm-stk" alt="" src="${stk}"><span class="rm-lb">${tp.name}</span>`
      : `<img class="rm-lock" alt="" src="${LOCK_ICON}"><span class="rm-lb">${tp.name}</span>`;
    return `<button class="rm-node ${cls} up" style="left:${x}px;top:${y}px;--k:${i}" data-topic="${tp.id}" data-idx="${i}" ${unlocked ? '' : 'data-locked="1"'}>${inner}</button>`;
  }).join('');

  el.innerHTML =
    `<div class="rm-bar"><button class="back" data-cact="grid" aria-label="Quay lại">‹</button><span class="lvl-tag">Lộ trình A1 – A2</span></div>` +
    `<div class="rm-wrap" style="height:${totalH}px">` +
    `<svg class="rm-svg" viewBox="0 0 600 ${totalH}" width="600" height="${totalH}"><path d="${d}" fill="none" stroke="var(--sel)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/></svg>` +
    nodes +
    `</div>`;
  el.scrollTop = 0;
}

function renderTopicLessons(el) {
  const tp = ROADMAP_TOPICS.find(x => x.id === cView.id);
  const done = tp.lessons.filter((_, i) => LDONE.has(lid(tp, i))).length;
  const stk = IMG[tp.img] || IMG.intro;
  el.innerHTML =
    `<div class="rm-lessons"><div class="sec-head up"><button class="back" data-cact="roadmap" aria-label="Quay lại">‹</button><img class="stk2" alt="" src="${stk}"><h2>${tp.name} (${tp.level})</h2><span id="cnt">${done}/${tp.lessons.length} hoàn thành</span></div>` +
    `<p class="hint up" style="--k:1">Nhấn vào bài học để đánh dấu hoàn thành</p><div class="list">` +
    tp.lessons.map((_, i) => rowHTML(tp, i, i + 2, true)).join('') +
    `</div></div>`;
  el.scrollTop = 0;
}

function openVocabRoadmap(lv = 'A1') {
  if (page !== 'courses') {
    document.querySelectorAll('.ni')[1].click();
  }
  cView = { t: 'roadmap', lv };
  renderCourses();
}

$('#courses').addEventListener('click', e => {
  const b = e.target.closest('.cc,[data-topic],[data-cact],[data-lesson]');
  if (!b) return;
  if (b.dataset.cact === 'grid') {
    cView = { t: 'grid' };
    renderCourses();
  } else if (b.dataset.cact === 'roadmap') {
    cView = { t: 'roadmap', lv: 'A1' };
    renderCourses();
  } else if (b.dataset.topic) {
    const idx = +b.dataset.idx;
    if (b.dataset.locked) {
      showSoon(lockedTopicMessage(idx));
    } else {
      cView = { t: 'topic', id: b.dataset.topic };
      renderCourses();
    }
  } else if (b.dataset.lesson) {
    const id = b.dataset.lesson;
    const tp = ROADMAP_TOPICS.find(x => id.startsWith(x.id + '-'));
    const wasDone = tp ? isTopicComplete(tp) : false;
    LDONE.has(id) ? LDONE.delete(id) : LDONE.set(id, iso(new Date()));
    b.classList.toggle('done', LDONE.has(id));
    if (tp) {
      const done = tp.lessons.filter((_, i) => LDONE.has(lid(tp, i))).length;
      const c = $('#courses #cnt');
      if (c) c.textContent = `${done}/${tp.lessons.length} hoàn thành`;
      if (!wasDone && isTopicComplete(tp)) {
        const nextTp = ROADMAP_TOPICS[ROADMAP_TOPICS.indexOf(tp) + 1];
        showSoon(nextTp ? `Đã mở khóa chủ đề "${nextTp.name}"!` : 'Chúc mừng bạn đã hoàn thành lộ trình!');
      }
    }
    renderToday();
    if (LDONE.has(id) && (wasDone || !tp || !isTopicComplete(tp))) {
      retrigger(hop, 'go');
      mascot.classList.add('talking');
      setTimeout(() => mascot.classList.remove('talking'), 800);
    }
    backend.saveDone(Object.fromEntries(LDONE)).catch(() => {});
  } else if (b.classList.contains('cc')) {
    if (b.dataset.locked) {
      showSoon(lockedMessage(b.dataset.level));
    } else if (b.dataset.card === '0') {
      cView = { t: 'roadmap', lv: b.dataset.level };
      renderCourses();
    } else {
      showSoon();
    }
  }
});
