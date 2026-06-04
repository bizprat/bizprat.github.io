/* ============================================
   Animations.js — GSAP ScrollTrigger
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Graceful fallback if GSAP CDN fails
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return; // All elements stay visible by default (CSS)
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add('gsap-ready');

  // Mark all GSAP-animated elements
  document.querySelectorAll(
    '.hero__name, .hero__tagline, .hero__cta .btn, .hero__scroll-hint, ' +
    '.section-label, .section-title, .about__text p, .about__stat, ' +
    '.project-card, .blog__inner, .contact__item, .footer'
  ).forEach(el => el.classList.add('gsap-target'));

  // ---- Hero entrance timeline ----
  const heroTL = gsap.timeline({ delay: 0.3 });
  heroTL
    .set('.hero__name', { autoAlpha: 1 })
    .from('.hero__name', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
    })
    .set('.hero__tagline', { autoAlpha: 1 }, '-=0.3')
    .from('.hero__tagline', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power3.out'
    }, '-=0.3')
    .set('.hero__cta .btn', { autoAlpha: 1 }, '-=0.2')
    .from('.hero__cta .btn', {
      opacity: 0, y: 20, stagger: 0.15, duration: 0.5, ease: 'power3.out'
    }, '-=0.2')
    .set('.hero__scroll-hint', { autoAlpha: 1 }, '-=0.2')
    .from('.hero__scroll-hint', {
      opacity: 0, duration: 0.8
    }, '-=0.2');

  // ---- Section labels & titles ----
  const sections = ['.about', '.projects', '.blog', '.contact'];
  sections.forEach(sel => {
    const section = document.querySelector(sel);
    if (!section) return;

    gsap.from(`${sel} .section-label`, {
      scrollTrigger: { trigger: sel, start: 'top 80%' },
      x: -20, opacity: 0, duration: 0.6, ease: 'power2.out'
    });

    gsap.from(`${sel} .section-title`, {
      scrollTrigger: { trigger: sel, start: 'top 75%' },
      y: 30, opacity: 0, duration: 0.7, ease: 'power2.out'
    });
  });

  // ---- About section ----
  gsap.from('.about__text p', {
    scrollTrigger: { trigger: '.about__text', start: 'top 75%' },
    y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out'
  });

  gsap.from('.about__stat', {
    scrollTrigger: { trigger: '.about__meta', start: 'top 80%' },
    y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out'
  });

  // ---- Project cards (batch, works with dynamic content) ----
  ScrollTrigger.batch('.project-card', {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: 'power2.out'
      });
    },
    start: 'top 85%'
  });

  // ---- Blog section ----
  gsap.from('.blog__inner', {
    scrollTrigger: { trigger: '.blog', start: 'top 75%' },
    scale: 0.95, opacity: 0, duration: 0.7, ease: 'power2.out'
  });

  // ---- Contact links ----
  ScrollTrigger.batch('.contact__item', {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: 'power2.out'
      });
    },
    start: 'top 85%'
  });

  // ---- Footer ----
  gsap.from('.footer', {
    scrollTrigger: { trigger: '.footer', start: 'top 95%' },
    opacity: 0, duration: 0.6
  });
});
