/* ================================================================
   ALMINI PORTFOLIO — script.js
   Vanilla JS only. No frameworks, no build tools.
   ================================================================ */


/* ----------------------------------------------------------------
   HEADER: transparent on top, opaque on scroll
   ---------------------------------------------------------------- */
(function initHeader() {
  const header = document.getElementById('header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run once in case page loads mid-scroll
}());


/* ----------------------------------------------------------------
   SCROLL REVEAL: fade + slide up elements when they enter viewport
   Elements must already have the hidden state set in CSS:
     opacity: 0; transform: translateY(Xpx);
   This script adds .revealed to trigger the transition.
   ---------------------------------------------------------------- */
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.work-card, .about-text, .stack-wrap, .contact-heading'
  );

  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal everything immediately for older browsers
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // animate once, then stop watching
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}());


/* ----------------------------------------------------------------
   ACTIVE NAV: highlight current section link as user scrolls
   ---------------------------------------------------------------- */
(function initActiveNav() {
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window) || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    // Section is "active" when it occupies more than 40% of the viewport
    threshold: 0.4
  });

  sections.forEach(section => observer.observe(section));
}());


/* ----------------------------------------------------------------
   MOBILE MENU: toggle open/close with { } button
   ---------------------------------------------------------------- */
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('header-nav');

  if (!toggle || !nav) return;

  function setMenu(open) {
    const isOpen = open !== undefined ? open : !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu();
  });

  // Close when clicking any nav link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Close when clicking outside header
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
    }
  });
}());

