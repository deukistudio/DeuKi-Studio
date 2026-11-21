/* ==========================================================================
   Homepage & navigation
   Shows the homepage after login, sidebar nav, page switching, mascot toast
   ========================================================================== */

const home = $('#home');
function showHome() {
  mascot.classList.remove('enter');
  stage.dataset.p = '7';
  home.classList.add('show');
  setTimeout(refreshStreak, 1000);
  setTimeout(openLessons, 600);
  setTimeout(() => home.classList.add('done'), 2400);
}
document.querySelectorAll('.ni').forEach(
  (n, i) =>
    (n.onclick = () => {
      // highlight pill slides to the chosen item; Trang Chủ / Khóa Học are real pages
      document.querySelectorAll('.ni').forEach(o => o.classList.remove('on'));
      n.classList.add('on');
      $('#navPill').style.transform = `translateY(${n.offsetTop}px)`;
      const soon = $('#soon');
      clearTimeout(soon._t);
      soon.classList.remove('show');
      if (i === 0) setPage('home');
      else if (i === 1) {
        cView = { t: 'grid' };
        if (page === 'courses') renderCourses();
        else setPage('courses');
      } else if (i === 2) setPage('progress');
      else showSoon(); // other sections: "wait for update"
    })
);

let page = 'home';
function showSoon(msg) {
  // the mascot says something short; sits below the small mascot on the Khóa Học page
  const soon = $('#soon');
  clearTimeout(soon._t);
  soon.textContent = msg || 'Chờ mình cập nhật nhé!';
  soon.classList.toggle('top', page === 'courses');
  soon.classList.add('show');
  soon._t = setTimeout(() => soon.classList.remove('show'), 2800);
  retrigger(hop, 'go');
  mascot.classList.add('talking');
  setTimeout(() => mascot.classList.remove('talking'), 900);
}
function setPage(n) {
  // 'home' | 'courses' | 'progress'
  if (n === page) return;
  page = n;
  if (typeof resetMascotDrag === 'function') resetMascotDrag();
  const homeOnly = ['#lessons', '#topStreak', '#streak'].map(s => $(s));
  const search = $('#search');
  if (n === 'courses') {
    stage.dataset.p = '8';
    homeOnly.forEach(e => e.classList.add('away'));
    search.classList.remove('away');
    $('#progress').classList.remove('on');
    renderCourses();
    $('#courses').classList.add('on');
  } else if (n === 'progress') {
    stage.dataset.p = '9';
    homeOnly.forEach(e => e.classList.add('away'));
    search.classList.add('away');
    $('#courses').classList.remove('on');
    renderProgress();
    $('#progress').classList.add('on');
  } else {
    stage.dataset.p = '7';
    $('#courses').classList.remove('on');
    $('#progress').classList.remove('on');
    homeOnly.forEach(e => e.classList.remove('away'));
    search.classList.remove('away');
    goLessonsHome();
  }
  retrigger(hop, 'go');
}
