/* =====================================================
   observer.js
   IntersectionObserver utilities:
   - Fade-in for sections marked .fade
   - Active-section highlighting in the navbar
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Fade-in on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));
  } else {
    // Fallback: just show everything
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Active navbar link ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === '#' + id;
        if (isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const navObserver = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose center is closest to viewport top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((sec) => navObserver.observe(sec));
  }
})();
