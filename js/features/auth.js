/* ==========================================================================
   Login / Register
   ========================================================================== */

let regMode = false;
const setUser = n => {
  $('#userName').textContent = n;
};
function setMode(r) {
  regMode = r;
  loginCard.classList.toggle('reg', r);
  $('#lt').textContent = r ? 'Register' : 'Login';
  $('#lb').textContent = r ? 'Register' : 'Login';
  $('#sw').innerHTML = r
    ? 'Already have an account? <a role="button" tabindex="0" id="swa">Login</a>'
    : 'Don\'t have an account? <a role="button" tabindex="0" id="swa">Register</a>';
  $('#swa').onclick = () => setMode(!regMode);
  $('#err').classList.remove('on');
}
setMode(false);
loginCard.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.matches('a[role=button]')) e.target.click();
});
/* Auth is triggered by clicks/Enter, not by a form 'submit' event: sandboxed previews block form submission. */
async function doAuth() {
  if ($('#lb').disabled) return;
  const email = $('#em').value.trim().toLowerCase(),
    pw = $('#pw').value,
    nm = $('#nm').value.trim(),
    err = $('#err'),
    lb = $('#lb');
  const remember = loginCard.querySelector('.chk input').checked;
  const ok = backend.demo || (/^\S+@\S+\.\S+$/.test(email) && pw.length > 0 && (!regMode || nm.length > 0)); // fake backend accepts anything
  const fail = msg => {
    err.textContent = msg;
    err.classList.add('on');
    retrigger(loginCard, 'shake');
  };
  if (!ok)
    return fail(
      regMode
        ? 'Please enter your name, a valid email and a password.'
        : 'Please enter a valid email and password.'
    );
  err.classList.remove('on');
  lb.disabled = true;
  lb.textContent = regMode ? 'Creating account…' : 'Logging in…';
  try {
    const name = regMode
      ? await backend.register(nm, email, pw, remember)
      : await backend.login(email, pw, remember);
    setUser(name); // sidebar shows the name stored with the account
    retrigger(hop, 'go');
    mascot.classList.add('talking');
    await wait(1200);
    mascot.classList.remove('talking');
    showHome();
  } catch (ex) {
    fail(backend.msg ? backend.msg(ex) : 'Something went wrong. Please try again.');
  } finally {
    lb.disabled = false;
    lb.textContent = regMode ? 'Register' : 'Login';
  }
}
$('#lb').addEventListener('click', doAuth);
$('#lf').addEventListener('submit', e => {
  e.preventDefault();
  doAuth();
});
$('#lf').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
    e.preventDefault();
    doAuth();
  }
});
