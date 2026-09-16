// ---- App Store links: the single place they live. Every <a data-store="mac"|"ipad"> is filled from here.
const STORE_LINKS = {
  mac:  'https://apps.apple.com/us/app/backstage-midiassistant/id6769863515?mt=12',
  ipad: 'https://apps.apple.com/us/app/midiassistant-remote/id6785053481',
};
document.querySelectorAll('[data-store]').forEach((a) => {
  const url = STORE_LINKS[a.dataset.store];
  if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
  else { a.classList.add('pending'); a.setAttribute('aria-disabled', 'true'); a.title = 'App Store link coming soon'; }
});

// ---- Nav: mark the current page, go solid once the page scrolls.
// Cloudflare serves clean URLs (/features for features.html), so compare with the extension stripped.
const here = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
document.querySelectorAll('.links a').forEach((a) => { if (a.getAttribute('href').replace(/\.html$/, '') === here) a.setAttribute('aria-current', 'page'); });
const nav = document.querySelector('nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// ---- Hero stage (home page only): scale the 1280x720 stage to cover the hero, map the real
// screenshots onto the iPad and laptop screens, and loop the clip with a crossfade at the seam.
const hero = document.getElementById('hero');
if (hero) {
  const stage = document.getElementById('stage');

  // 4-point homography: a w×h image -> a quad in 1280×720 video space, as a CSS matrix3d.
  function homography(w, h, d) {
    const s = [[0,0],[w,0],[w,h],[0,h]], A = [], b = [];
    for (let i = 0; i < 4; i++) {
      const [x, y] = s[i], [u, v] = d[i];
      A.push([x, y, 1, 0, 0, 0, -u*x, -u*y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v*x, -v*y]); b.push(v);
    }
    for (let i = 0; i < 8; i++) {
      let m = i; for (let r = i + 1; r < 8; r++) if (Math.abs(A[r][i]) > Math.abs(A[m][i])) m = r;
      [A[i], A[m]] = [A[m], A[i]]; [b[i], b[m]] = [b[m], b[i]];
      for (let r = 0; r < 8; r++) { if (r === i) continue; const f = A[r][i] / A[i][i]; for (let c = i; c < 8; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
    }
    const H = b.map((v, i) => v / A[i][i]);
    return `matrix3d(${H[0]},${H[3]},0,${H[6]},${H[1]},${H[4]},0,${H[7]},0,0,1,0,${H[2]},${H[5]},0,1)`;
  }
  // Screen corners measured on the first frame of assets/stage-loop.mp4 (TL, TR, BR, BL).
  const ipadQuad   = [[310,330],[415,332.5],[427.5,399],[314,401]];
  const laptopQuad = [[892,315],[994,318],[985,382],[885,383]];
  const tIpad = homography(1400, 1050, ipadQuad);
  document.getElementById('scr').style.transform = tIpad;
  document.getElementById('glw').style.transform = tIpad;
  document.getElementById('lap').style.transform = homography(1600, 1005, laptopQuad);

  const fit = () => { const r = hero.getBoundingClientRect(); stage.style.setProperty('--s', Math.max(r.width / 1280, r.height / 720)); };
  addEventListener('resize', fit); fit();

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vids = stage.querySelectorAll('video');
  if (!reduced && vids.length === 2) {
    let [cur, nxt] = vids, switching = false; const FADE = 0.9;
    const tick = () => {
      const d = cur.duration || 10;
      if (!switching && cur.currentTime >= d - FADE) {
        switching = true; nxt.currentTime = 0;
        nxt.play().then(() => {
          nxt.style.opacity = 1; cur.style.opacity = 0;
          setTimeout(() => { cur.pause(); [cur, nxt] = [nxt, cur]; switching = false; }, FADE * 1000);
        }).catch(() => { switching = false; });
      }
      requestAnimationFrame(tick);
    };
    cur.play().then(() => { cur.style.opacity = 1; tick(); }).catch(() => { /* autoplay blocked: poster stays */ });
  }
}
