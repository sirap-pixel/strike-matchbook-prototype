/* ===================================================================
   TESTING MODE BAR — internal-only utility strip, not part of the
   customer-facing product. Lets a tester jump between the 4 guided
   "I don't know what I want" prototypes from anywhere in the site.
   Included on every page; shifts existing fixed chrome down by its
   own height so nothing overlaps.
=================================================================== */
(function () {
  const BAR_H = 36;
  const MODES = [
    { id: '1', label: 'Upload + Guide',        path: 'mode-1/index.html' },
    { id: '2', label: 'Upload + Guide + Human', path: 'mode-2/index.html' },
    { id: '3', label: 'Upload + Guide + AI',    path: 'mode-3/index.html' },
    { id: '4', label: 'Guide only, no upload',  path: 'mode-4/index.html' },
  ];

  function basePath() {
    return /\/mode-\d\//.test(location.pathname) ? '../' : '';
  }

  function currentMode() {
    const m = location.pathname.match(/\/mode-(\d)\//);
    if (m) return m[1];
    return new URLSearchParams(location.search).get('mode');
  }

  function build() {
    const base = basePath();
    const active = currentMode();

    const bar = document.createElement('div');
    bar.id = 'testing-mode-bar';
    bar.innerHTML =
      '<span class="tmb-label">Testing mode</span>' +
      '<div class="tmb-pills">' +
      MODES.map(function (m) {
        return '<a class="tmb-pill' + (m.id === active ? ' active' : '') + '" href="' + base + m.path + '">' +
          m.id + '<span class="tmb-tip">' + m.label + '</span></a>';
      }).join('') +
      '</div>' +
      '<a class="tmb-home" href="' + base + 'index.html">All flows</a>';
    document.body.prepend(bar);

    const nav = document.querySelector('.nav');
    if (nav) nav.style.top = BAR_H + 'px';

    const progress = document.querySelector('.progress-bar');
    if (progress) {
      const curTop = parseFloat(getComputedStyle(progress).top) || 0;
      progress.style.top = (curTop + BAR_H) + 'px';
    }

    const curBodyPad = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = (curBodyPad + BAR_H) + 'px';

    const layout = document.querySelector('.layout');
    if (layout) {
      const curPad = parseFloat(getComputedStyle(layout).paddingTop) || 0;
      layout.style.paddingTop = (curPad + BAR_H) + 'px';
    }

    ['.talk-fab', '.chat-fab', '.chat-panel', '.modal-overlay'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.style.zIndex = 500;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
