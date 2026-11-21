/* ==========================================================================
   App start
   ========================================================================== */

/* Start once the font is ready so bubble widths are measured correctly */
Promise.race([document.fonts.load("18px 'Momo Trust Display'"), wait(1500)]).then(() => {
  if (location.hash === '#home') {
    setUser('User name');
    showHome();
    return;
  } // shortcut: add #home to the address to open the homepage directly
  go(1);
  setTimeout(fly, 1900);
});
/* Cloud builds only: if the visitor is still signed in, skip straight to the homepage; tapping the user name logs out */
if (backend.restore)
  backend
    .restore()
    .then(n => {
      if (n) {
        setUser(n);
        showHome();
      }
    })
    .catch(() => {});
if (backend.logout) {
  const u = $('.user');
  u.style.cursor = 'pointer';
  u.title = 'Log out';
  u.onclick = async () => {
    if (confirm('Log out?')) {
      await backend.logout();
      location.reload();
    }
  };
}
