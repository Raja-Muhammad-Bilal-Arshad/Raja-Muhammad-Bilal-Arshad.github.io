// Reveal sections as they enter the viewport.
// Falls back gracefully if IntersectionObserver isn't supported.

const revealTargets = document.querySelectorAll('.case, .tl-row, .build-card, .cred-col');

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// Respect reduced-motion preference: skip the reveal animation entirely.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
}
