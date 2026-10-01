// Homepage hero intro: staggered word-by-word reveal on the headline,
// modeled on arjun-r.com's hero animation. Degrades gracefully if GSAP
// fails to load or the visitor prefers reduced motion — the hero is just
// static HTML either way, so there's nothing to fall back to.
(function () {
  var heroH1 = document.querySelector('.hero h1');
  if (!heroH1) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || typeof gsap === 'undefined') return;

  // Wrap each word (and each existing inline element, like .highlight-pill,
  // treated as one atomic unit) in a .reveal-item span so GSAP can stagger
  // them individually without breaking the pill/fade/italic styling.
  function wrapWords(container) {
    var nodes = Array.prototype.slice.call(container.childNodes);
    var frag = document.createDocumentFragment();
    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var parts = node.textContent.split(/(\s+)/);
        parts.forEach(function (part) {
          if (part === '') return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          var span = document.createElement('span');
          span.className = 'reveal-item';
          span.textContent = part;
          frag.appendChild(span);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add('reveal-item');
        frag.appendChild(node);
      }
    });
    container.innerHTML = '';
    container.appendChild(frag);
  }

  wrapWords(heroH1);
  var words = heroH1.querySelectorAll('.reveal-item');
  var rest = document.querySelectorAll('.hero .availability-badge, .hero .hero-sub, .hero .clients-row, .hero .hero-actions');

  gsap.set(words, { opacity: 0, y: 26 });
  gsap.set(rest, { opacity: 0, y: 16 });

  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to(words, { opacity: 1, y: 0, duration: 0.7, stagger: 0.045 }, 0.05)
    .to(rest, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.35');
})();
