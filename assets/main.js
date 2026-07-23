document.addEventListener('DOMContentLoaded', function () {
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    function reflectTheme(theme) {
      var isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    reflectTheme(document.documentElement.getAttribute('data-theme'));
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      reflectTheme(next);
    });
  }

  var timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      timelineItems.forEach(function (item) { item.classList.add('is-visible'); });
    } else {
      var timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var index = Array.prototype.indexOf.call(timelineItems, entry.target);
            setTimeout(function () { entry.target.classList.add('is-visible'); }, index * 90);
            timelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
      timelineItems.forEach(function (item) { timelineObserver.observe(item); });
    }
  }

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

  function initSlider(slider) {
    var slides = slider.querySelectorAll('.hero-slide');
    var dots = slider.querySelectorAll('.hero-dot');
    var badge = slider.querySelector('.hero-visual-badge');
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
      if (badge && slides[current].dataset.badge) { badge.textContent = slides[current].dataset.badge; }
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
  }

  document.querySelectorAll('.hero-slider').forEach(initSlider);
});
