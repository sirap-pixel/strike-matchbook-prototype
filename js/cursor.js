(function () {
  const H = 32;

  // Kill ALL cursors globally
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { cursor: none !important; }';
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'pointer-events:none',
    'z-index:99999',
    'height:' + H + 'px',
    'width:' + H + 'px',
    'will-change:transform',
    'transition:opacity .1s',
  ].join(';');

  const unlit = document.createElement('img');
  unlit.src = 'img/unlit.png';
  unlit.style.cssText = 'height:' + H + 'px;width:' + H + 'px;object-fit:contain;object-position:top center;display:block;position:absolute;top:0;left:0;transition:transform .15s ease;transform-origin:top center;';

  const lit = document.createElement('img');
  lit.src = 'img/lit.png';
  lit.style.cssText = 'height:' + H + 'px;width:' + H + 'px;object-fit:contain;object-position:top center;display:none;position:absolute;top:0;left:0;transition:transform .15s ease;transform-origin:top center;';

  wrap.appendChild(unlit);
  wrap.appendChild(lit);
  document.body.appendChild(wrap);

  let mx = -200, my = -200;
  let tilted = false;
  let clicked = false;

  function setTilt(on) {
    tilted = on;
    const r = on ? 'rotate(-25deg)' : 'rotate(0deg)';
    unlit.style.transform = r;
    lit.style.transform = r;
  }

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    wrap.style.transform = 'translate(' + (mx - H / 2) + 'px,' + my + 'px)';
  });

  // Detect hovering over clickable elements
  document.addEventListener('mouseover', function (e) {
    const el = e.target.closest('a, button, [role="button"], input, select, textarea, label, [onclick]');
    setTilt(!!el);
  });

  document.addEventListener('mousedown', function () {
    clicked = true;
    unlit.style.display = 'none';
    lit.style.display = 'block';
  });

  document.addEventListener('mouseup', function () {
    clicked = false;
    lit.style.display = 'none';
    unlit.style.display = 'block';
  });

  document.addEventListener('mouseleave', function () { wrap.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { wrap.style.opacity = '1'; });
})();
