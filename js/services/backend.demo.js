/* ==========================================================================
   Backend: DEMO (in-memory)
   All account work goes through `backend`. To use real cloud accounts, swap this
   file in index.html for a backend.firebase.js that exposes the same API:
   demo, register, login, checkIn, loadDone, saveDone (+ optional restore, logout, msg)
   ========================================================================== */

/*BACKEND:START*/
/* Preview build: no server and no storage. Names live in memory only and are lost on refresh.
   The Firebase build (deuki-onboarding-firebase.html) replaces this block with real cloud accounts. */
const _mem = new Map();
let _st = { streak: 0, last: null, days: [] },
  _done = {};
const backend = {
  demo: true,
  async register(name, email) {
    name = name || 'User';
    _mem.set(email, name);
    return name;
  },
  async login(email) {
    const l = email.split('@')[0] || 'User';
    return _mem.get(email) || l.charAt(0).toUpperCase() + l.slice(1);
  },
  async checkIn() {
    _st = tick(_st);
    return _st;
  },
  async loadDone() {
    return _done;
  },
  async saveDone(ids) {
    _done = ids;
  }
};
/*BACKEND:END*/
