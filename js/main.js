/* ============================================
   Main.js — Behavior & Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Phone reveal ----
  const phoneBtn = document.getElementById('phone-reveal');
  const phoneLabel = document.getElementById('phone-label');
  let phoneRevealed = false;

  if (phoneBtn) {
    phoneBtn.addEventListener('click', () => {
      if (!phoneRevealed) {
        phoneLabel.textContent = '+91 9122 992255';
        phoneRevealed = true;
      } else {
        navigator.clipboard.writeText('+91 9122 992255').then(() => {
          phoneLabel.textContent = 'Copied!';
          setTimeout(() => {
            phoneLabel.textContent = '+91 9122 992255';
          }, 1500);
        }).catch(() => {
          // Clipboard API not available, just show the number
          phoneLabel.textContent = '+91 9122 992255';
        });
      }
    });
  }

  // ---- Nav visibility ----
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  if (nav && hero) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    navObserver.observe(hero);
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = nav ? nav.offsetHeight + 16 : 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Load projects from JSON ----
  loadProjects();
});

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const res = await fetch('/data/projects.json');
    if (!res.ok) throw new Error('Failed to fetch');
    const { projects } = await res.json();

    if (!projects || projects.length === 0) {
      grid.innerHTML = '<p class="projects__fallback">Projects coming soon.</p>';
      return;
    }

    projects
      .sort((a, b) => a.order - b.order)
      .forEach(project => {
        grid.innerHTML += renderProjectCard(project);
      });

    // Refresh ScrollTrigger after dynamic content
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  } catch (err) {
    grid.innerHTML = '<p class="projects__fallback">Projects coming soon.</p>';
  }
}

function renderProjectCard(p) {
  const links = [];
  if (p.links?.live) {
    links.push(`<a href="${p.links.live}" class="project-card__link" target="_blank" rel="noopener" title="Live site">&#x2197;</a>`);
  }
  if (p.links?.source) {
    links.push(`<a href="${p.links.source}" class="project-card__link" target="_blank" rel="noopener" title="Source code">&lt;/&gt;</a>`);
  }

  const tagsHTML = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

  return `
    <article class="project-card" data-animate>
      <div class="project-card__header">
        <span class="project-card__icon">${p.icon || '&#x1f4bb;'}</span>
        ${links.length ? `<div class="project-card__links">${links.join('')}</div>` : ''}
      </div>
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__desc">${p.description}</p>
      ${tagsHTML ? `<div class="project-card__tags">${tagsHTML}</div>` : ''}
    </article>
  `;
}
