/* ==========================================================================
   Onboarding content
   Dialogue pages, answer icons, card grids and questions
   ========================================================================== */

const T3 = 'Hãy trả lời những câu hỏi để mình hiểu bạn nào!';
const pages = [
  null,
  { t: 'Chào mừng bạn đến với DeuKi Education', L: 1, auto: 3600 },
  { t: 'Mình là Alin, một trợ lý đắc lực của bạn!', L: 2, auto: 3400 },
  { t: T3, L: 3, auto: 2800 },
  { t: T3, L: 4, q: 4 },
  { t: 'Tại sao bạn học tiếng Anh?', L: 4, q: 5 },
  { t: 'Trình độ của bạn ở mức nào', L: 4, q: 6 },
  { t: 'Bạn muốn dành bao nhiêu phút để học?', L: 4, q: 7 },
  { t: 'Chờ mình chút nhé!', L: 3, auto: 3600 },
  { t: '', L: 6, login: true }
];
const IC = {
  fb: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path d="M13.3 19v-6.4h2.1l.4-2.5h-2.5V8.6c0-.7.3-1.3 1.4-1.3h1.2V5.1c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.7H8.6v2.5h2.1V19z" fill="#fff"/></svg>',
  yt: '<svg viewBox="0 0 24 24"><rect y="3" width="24" height="18" rx="5" fill="#F00"/><path d="M10 8.5v7l6-3.5z" fill="#fff"/></svg>',
  gg: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
  tt: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#000"/><path d="M13 5v9.5a2.3 2.3 0 1 1-2.3-2.3M13 5c.3 2 1.7 3.3 3.7 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
  ig: '<svg viewBox="0 0 24 24"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".4" stop-color="#FA7E1E"/><stop offset=".7" stop-color="#D62976"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><rect width="24" height="24" rx="7" fill="url(#ig)"/><rect x="5.5" y="5.5" width="13" height="13" rx="4" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="3.2" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="16.2" cy="7.8" r="1" fill="#fff"/></svg>',
  dots: '<svg viewBox="0 0 24 24"><circle cx="4" cy="12" r="2.4"/><circle cx="12" cy="12" r="2.4"/><circle cx="20" cy="12" r="2.4"/></svg>'
};
const GRID = {
  std: {
    left: '175px',
    top: '262px',
    width: '610px',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridAutoRows: '72px',
    gap: '22px 20px'
  },
  wide: {
    left: '110px',
    top: '290px',
    width: '740px',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridAutoRows: '96px',
    gap: '22px 40px'
  }
};
const Q = {
  4: {
    g: 'std',
    o: [
      ['fb', 'Facebook'],
      ['yt', 'Youtube'],
      ['gg', 'Google'],
      ['tt', 'TikTok'],
      ['ig', 'Instagram'],
      ['dots', 'Khác']
    ]
  },
  5: {
    g: 'std',
    o: [
      [0, 'Du Lịch'],
      [0, 'Công Việc'],
      [0, 'Học tập'],
      [0, 'Giải Trí'],
      [0, 'Trải Nghiệm'],
      ['dots', 'Khác']
    ]
  },
  6: {
    g: 'wide',
    o: [
      [0, 'Chưa biết gì'],
      [0, 'Biết ít từ'],
      [0, 'Giao tiếp cơ bản']
    ]
  },
  7: { g: 'std', o: [5, 10, 15, 20, 25, 30].map(m => [0, m + ' phút']) }
}; // design shows "25 phút" twice; last card set to 30
