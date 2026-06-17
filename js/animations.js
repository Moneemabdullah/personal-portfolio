/* =====================================================
   animations.js
   Scroll-driven UI enhancements:
   - Top scroll progress indicator
   - Back-to-top button reveal
   - Loading overlay dismissal
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    let ticking = false;
    const updateProgress = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      progressBar.style.width = pct + '%';
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateProgress();
  }

  /* ---------- Back to top button ---------- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    const toggleBackBtn = () => {
      if (window.scrollY > 600) backBtn.classList.add('is-visible');
      else backBtn.classList.remove('is-visible');
    };
    window.addEventListener('scroll', toggleBackBtn, { passive: true });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleBackBtn();
  }

  /* ---------- Loader dismissal ---------- */
  const loader = document.querySelector('.app-loader');
  if (loader) {
    const hide = () => loader.classList.add('is-hidden');
    if (document.readyState === 'complete') {
      // Small delay so users see the splash briefly
      setTimeout(hide, 250);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 250));
    }
  }
})();
