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

  // ===== Proof / metrics module (homepage) =====
  var proofModule = document.querySelector('.proof-module');
  if (proofModule) {
    var nodes = proofModule.querySelectorAll('.proof-node');
    var panel = proofModule.querySelector('.proof-panel');
    var panelMethod = panel ? panel.querySelector('.proof-method-label') : null;
    var panelLabel = panel ? panel.querySelector('.proof-label-text') : null;
    var panelLink = panel ? panel.querySelector('.proof-case-link') : null;
    var panelLinkName = panelLink ? panelLink.querySelector('.proof-case-name') : null;

    function selectMetric(index) {
      nodes.forEach(function (node, i) {
        node.classList.toggle('is-active', i === index);
      });
      var data = nodes[index];
      if (!data) return;
      var method = data.getAttribute('data-method');
      var label = data.getAttribute('data-label');
      var href = data.getAttribute('data-href');
      var name = data.getAttribute('data-name');
      if (panelMethod) panelMethod.textContent = method + '… ';
      if (panelLabel) panelLabel.textContent = label;
      if (panelLink) panelLink.setAttribute('href', href);
      if (panelLinkName) panelLinkName.textContent = name;
    }

    nodes.forEach(function (node, i) {
      node.addEventListener('click', function () { selectMetric(i); });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectMetric(i); }
      });
    });
    selectMetric(0);
  }

  // ===== How I Think tabs (homepage) =====
  var thinkSection = document.querySelector('.think-section');
  if (thinkSection) {
    var tabs = thinkSection.querySelectorAll('.think-tab');
    var titleEl = thinkSection.querySelector('.think-body h2');
    var detailEl = thinkSection.querySelector('.pillar-detail');
    var pillars = [
      { title: 'Language is infrastructure.', pre: "I don’t think of content as something added to an interface after the product is designed. Language shapes ", hi: 'what people understand, what they expect, what they can do', post: ', and how the system responds.' },
      { title: 'I think in systems.', pre: 'I look beyond individual screens to ', hi: 'patterns, states, edge cases, governance', post: ', and the structures that make content scalable.' },
      { title: 'Intelligent products change the job.', pre: 'When software starts planning, deciding, and acting, content design expands beyond conversation. It becomes about ', hi: 'intent, delegation, transparency, confidence, recovery, and human control', post: '.' }
    ];
    function selectPillar(index) {
      tabs.forEach(function (tab, i) { tab.classList.toggle('active', i === index); });
      var p = pillars[index];
      if (!p) return;
      if (titleEl) titleEl.textContent = p.title;
      if (detailEl) {
        detailEl.innerHTML = '';
        detailEl.appendChild(document.createTextNode(p.pre));
        var mark = document.createElement('mark');
        mark.textContent = p.hi;
        detailEl.appendChild(mark);
        detailEl.appendChild(document.createTextNode(p.post));
      }
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectPillar(i); });
    });
    selectPillar(1);
  }
});
