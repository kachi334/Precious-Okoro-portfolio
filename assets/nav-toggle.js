// Mobile hamburger menu. Plain class + aria-expanded toggle, same
// no-dependency approach as the rest of the site's small scripts.
(function () {
  var nav = document.querySelector('header.nav');
  var toggle = nav && nav.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  function close() {
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('.links a').forEach(function (link) {
    link.addEventListener('click', close);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 700) close();
  });
})();
