/* ==========================================================================
   Level & roadmap progression
   - Each roadmap stop unlocks once the previous stop is finished.
   - A level (A2, B1…) unlocks once every stop/lesson of the previous level is done.
   - A1 is always open. Used by the Từ Vựng buttons and the Khóa Học page.
   ========================================================================== */

const isTopicComplete = tp => tp.lessons.every((_, i) => LDONE.has(lid(tp, i)));

function isTopicUnlocked(idx) {
  return idx <= 0 || isTopicComplete(ROADMAP_TOPICS[idx - 1]);
}

/* lesson ids tagged with a level (e.g. 'A1') across roadmap topics (or fallback to skills) */
function lessonsOfLevel(lv) {
  const r = ROADMAP_TOPICS.filter(tp => tp.level === lv).flatMap(tp => tp.lessons.map((_, i) => lid(tp, i)));
  if (r.length) return r;
  return SKILLS.flatMap(s => s.lessons.map((l, i) => (l[2] === lv ? lid(s, i) : null))).filter(Boolean);
}

function isLevelComplete(lv) {
  const ids = lessonsOfLevel(lv);
  return ids.length > 0 && ids.every(id => LDONE.has(id));
}

function isLevelUnlocked(lv) {
  const i = LEVELS.indexOf(lv);
  return i <= 0 || isLevelComplete(LEVELS[i - 1]);
}

const lockedMessage = lv => `Hoàn thành Level ${LEVELS[LEVELS.indexOf(lv) - 1]} để mở khóa nhé!`;
const lockedTopicMessage = idx => `Hoàn thành chủ đề "${ROADMAP_TOPICS[idx - 1].name}" để mở khóa nhé!`;

const LOCK_ICON = 'assets/images/icons/lock.png';
