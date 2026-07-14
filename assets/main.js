document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('header.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.nav-mobile-panel a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var slider = document.querySelector('.hero-slider');
  if (!slider) return;

  var slides = slider.querySelectorAll('.hero-slide');
  var dots = slider.querySelectorAll('.hero-dot');
  var pauseBtn = slider.querySelector('.hero-slider-pause');
  var prevBtn = slider.querySelector('.hero-slider-prev');
  var nextBtn = slider.querySelector('.hero-slider-next');
  var current = 0;
  var timer = null;
  var isPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.classList.toggle('is-active', i === current); });
    dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === current); });
  }

  function startTimer() {
    stopTimer();
    if (isPaused) return;
    timer = setInterval(function () { showSlide(current + 1); }, 4500);
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { showSlide(i); startTimer(); });
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(current - 1); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(current + 1); startTimer(); });
  if (pauseBtn) {
    pauseBtn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
    pauseBtn.addEventListener('click', function () {
      isPaused = !isPaused;
      pauseBtn.setAttribute('aria-label', isPaused ? 'Resume slideshow' : 'Pause slideshow');
      pauseBtn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
      if (isPaused) stopTimer(); else startTimer();
    });
  }

  startTimer();
});
