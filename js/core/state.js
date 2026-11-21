/* ==========================================================================
   Shared onboarding state
   Read and written by typing.js, mascot.js and onboarding.js
   ========================================================================== */

let typeId = 0,
  cur = 0,
  busy = false,
  timer,
  lastMove = 0;
let flightAnim = null,
  typing = false,
  inWait = false,
  skipAdv = false,
  wake = () => {};
/* a pause that a tap can cut short */
const skippable = ms =>
  new Promise(r => {
    inWait = true;
    const t = setTimeout(done, ms);
    function done() {
      clearTimeout(t);
      inWait = false;
      wake = () => {};
      r();
    }
    wake = done;
  });
