/* =========================================
   MOBILE NAVIGATION
   ========================================= */

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      String(open)
    );
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* =========================================
   SCROLL REVEAL ANIMATION
   ========================================= */

const revealTargets = document.querySelectorAll(
  '.research-card, .experience-item, .project-card, .skill-panel, .credential-columns > div, .contact-card'
);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition =
      'opacity .55s ease, transform .55s ease';
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        obs.unobserve(entry.target);
      });

    },
    {
      threshold: 0.08
    }
  );

  revealTargets.forEach((el) => {
    observer.observe(el);
  });
}
