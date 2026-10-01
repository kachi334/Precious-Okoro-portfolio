// Fade-up reveal as content scrolls into view. Plain IntersectionObserver +
// a CSS class toggle — no animation library, so it adds no network weight.
(function () {
  var items = document.querySelectorAll('.reveal-on-scroll');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

// How I Think scattered cards: fade in as each one scrolls into view and
// fade back out as it leaves, rather than staying permanently visible —
// repeats on every pass, unlike the one-time reveal above.
(function () {
  var cards = document.querySelectorAll('.think-art');
  if (!cards.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // stay fully visible, no fade
  }

  cards.forEach(function (el) { el.classList.add('is-faded'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle('is-faded', !entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  cards.forEach(function (el) { observer.observe(el); });
})();
