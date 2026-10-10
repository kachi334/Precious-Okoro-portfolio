// Crossfade slideshow for the About page portrait. Plain class toggles on a
// timer, same no-dependency approach as the rest of the site's small scripts.
(function () {
  var root = document.querySelector('.about-slideshow');
  if (!root) return;

  var slides = root.querySelectorAll('img');
  var dots = root.querySelectorAll('.slideshow-dots button');
  if (slides.length < 2) return;

  var index = 0;
  var timer = null;

  function show(next) {
    slides[index].classList.remove('is-active');
    dots[index].classList.remove('is-active');
    index = next;
    slides[index].classList.add('is-active');
    dots[index].classList.add('is-active');
  }

  function start() {
    timer = setInterval(function () {
      show((index + 1) % slides.length);
    }, 4000);
  }

  function stop() {
    clearInterval(timer);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      if (i === index) return;
      show(i);
      stop();
      start();
    });
  });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  start();
})();
