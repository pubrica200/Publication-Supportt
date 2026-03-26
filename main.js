/* ═══════════════════════════════════════════
   My Publication Support Services — main.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL FADE-UP ANIMATION ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


  /* ── 2. NAV SCROLL SHADOW ── */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 24px rgba(13,13,13,0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });


  /* ── 3. SMOOTH SCROLL FOR NAV LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── 4. ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => sectionObserver.observe(section));


  /* ── 5. JOURNAL TAGS CLICK TOGGLE ── */
  document.querySelectorAll('.journal-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('highlight');
    });
  });


  /* ── 6. STAGGERED FADE FOR SERVICE CARDS ── */
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });


  /* ── 7. STAGGERED FADE FOR PRICING CARDS ── */
  const priceCards = document.querySelectorAll('.price-card');
  priceCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });


  /* ── 8. COUNTER ANIMATION FOR HERO STATS ── */
  function animateCounter(el, target, suffix = '', duration = 1800) {
    let start = 0;
    const isFloat = target % 1 !== 0;
    const step = () => {
      start += target / (duration / 16);
      if (start >= target) {
        el.textContent = (isFloat ? target.toFixed(1) : Math.floor(target)) + suffix;
        return;
      }
      el.textContent = (isFloat ? start.toFixed(1) : Math.floor(start)) + suffix;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNums = entry.target.querySelectorAll('.stat-num');
          statNums.forEach(el => {
            const raw = el.textContent;
            const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
            const suffix = raw.replace(/[0-9.]/g, '');
            animateCounter(el, num, suffix);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

});
