/**
 * Oyekunmi Oyediji (O.Oye) - Portfolio Core JavaScript
 * Plain Vanilla JS (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMemojiBlink();
  initMobileNav();
  initSmoothScroll();
  initHeroCallButton();
  initExperienceTimeline();
  initServicesCarousel();
  initCertModal();
  initFooterMemojiEasterEgg();
  initSectionReveals();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle System (Interactive O.O Switch)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const toggleKnob = document.getElementById('toggleKnob');
  const hint = document.getElementById('themeToggleHint');
  const heroIntro = document.querySelector('.hero-intro');
  let hintTimeout;

  if (!toggleBtn) return;

  function showHint() {
    if (!hint) return;

    hint.textContent = root.getAttribute('data-theme') === 'light' ? 'lights off?' : 'lights on?';
    hint.classList.remove('is-hidden');
    hint.classList.add('is-visible');
    window.clearTimeout(hintTimeout);
    hintTimeout = window.setTimeout(() => {
      hint.classList.remove('is-visible');
      hint.classList.add('is-hidden');
    }, 5000);
  }

  // Check saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('ooye-theme') || 'dark';
  applyTheme(savedTheme, false);
  showHint();

  if (heroIntro) {
    heroIntro.addEventListener('pointerenter', showHint);
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Trigger physical knob flip animation
    if (toggleKnob) {
      toggleKnob.classList.remove('is-animating');
      // Trigger reflow to restart animation
      void toggleKnob.offsetWidth;
      toggleKnob.classList.add('is-animating');
    }

    applyTheme(nextTheme, true);
    showHint();
  });

  function applyTheme(theme, save = true) {
    root.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    toggleBtn.setAttribute('aria-checked', isLight ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');

    if (save) {
      try {
        localStorage.setItem('ooye-theme', theme);
      } catch (e) {
        console.warn('localStorage is not available:', e);
      }
    }
  }
}

/* --------------------------------------------------------------------------
   2. Hero Memoji Blinking Simulation (~10 seconds)
   -------------------------------------------------------------------------- */
function initMemojiBlink() {
  const openImg = document.getElementById('memojiOpen');
  const closedImg = document.getElementById('memojiClose');

  if (!openImg || !closedImg) return;

  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Pre-decode closed eye image to prevent repaint delay on first blink
  if (closedImg.decode) {
    closedImg.decode().catch(() => {});
  }

  function blink() {
    closedImg.style.transition = 'opacity 280ms ease-in-out';
    closedImg.style.opacity = '1';

    window.setTimeout(() => {
      closedImg.style.transition = 'opacity 320ms ease-out';
      closedImg.style.opacity = '0';
    }, 280 + 400);
  }

  let blinkInterval = null;
  let initialBlinkTimeout = null;

  function startBlinking() {
    if (blinkInterval || document.hidden) return;

    function scheduleBlink() {
      const delay = 5000 + Math.floor(Math.random() * 2001);
      blinkInterval = window.setTimeout(() => {
        if (!document.hidden) blink();
        scheduleBlink();
      }, delay);
    }

    initialBlinkTimeout = window.setTimeout(() => {
      initialBlinkTimeout = null;
      if (!document.hidden) blink();
      scheduleBlink();
    }, 3500);
  }

  function stopBlinking() {
    if (initialBlinkTimeout) {
      window.clearTimeout(initialBlinkTimeout);
      initialBlinkTimeout = null;
    }
    if (blinkInterval) {
      window.clearTimeout(blinkInterval);
      blinkInterval = null;
    }
  }

  startBlinking();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopBlinking();
      closedImg.style.opacity = '0';
    } else {
      startBlinking();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Responsive Mobile Navigation Modal
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const overlay = document.getElementById('mobileNavModal');
  const navLinks = overlay ? overlay.querySelectorAll('.mobile-nav-link') : [];

  if (!menuBtn || !closeBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeMenu() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // Close if clicking outside the modal content (safety fallback)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Smooth Scrolling for Internal Anchors
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Hero CTA & Experience Timeline
   -------------------------------------------------------------------------- */
function initHeroCallButton() {
  const group = document.querySelector('.hero-cta-group');
  const bookButton = group ? group.querySelector('.btn-book-call') : null;

  if (!group || !bookButton) return;

  bookButton.addEventListener('mouseenter', () => {
    group.classList.add('is-booking-hovered');
  });

  bookButton.addEventListener('mouseleave', () => {
    group.classList.remove('is-booking-hovered');
  });

  bookButton.addEventListener('focus', () => {
    group.classList.add('is-booking-hovered');
  });

  bookButton.addEventListener('blur', () => {
    group.classList.remove('is-booking-hovered');
  });
}

function initExperienceTimeline() {
  const history = document.querySelector('.experience-history');
  const timeline = document.querySelector('.experience-timeline');
  const cards = history ? Array.from(history.querySelectorAll('.experience-card')) : [];
  const markers = history ? Array.from(history.querySelectorAll('[data-trail-marker]')) : [];

  if (!history || !timeline || cards.length === 0) return;

  if (markers.length !== cards.length) {
    console.warn('Experience trail markers must match the experience cards.');
    return;
  }

  function positionMarkers() {
    const timelineTop = timeline.getBoundingClientRect().top;

    cards.forEach((card, index) => {
      const company = card.querySelector('.experience-company');
      if (!company) return;

      const companyRect = company.getBoundingClientRect();
      markers[index].style.top = `${companyRect.top - timelineTop + (companyRect.height - markers[index].offsetHeight) / 2}px`;
    });
  }

  function updateActiveMarker() {
    const historyRect = history.getBoundingClientRect();
    const activationLine = historyRect.top + Math.min(history.clientHeight, window.innerHeight) * 0.45;
    let activeIndex = 0;

    cards.forEach((card, index) => {
      if (card.getBoundingClientRect().top <= activationLine) {
        activeIndex = index;
      }
    });

    // Keep the final experience active even if it has not crossed the guide line.
    if (history.scrollTop + history.clientHeight >= history.scrollHeight - 2) {
      activeIndex = cards.length - 1;
    }

    markers.forEach((marker, index) => {
      marker.classList.toggle('is-active', index === activeIndex);
      marker.classList.toggle('is-passed', index < activeIndex);
      marker.classList.toggle('is-future', index > activeIndex);
    });
  }

  positionMarkers();
  updateActiveMarker();

  history.addEventListener('scroll', updateActiveMarker, { passive: true });
  window.addEventListener('scroll', updateActiveMarker, { passive: true });
  window.addEventListener('resize', () => {
    positionMarkers();
    updateActiveMarker();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionMarkers);
  }
}

/* --------------------------------------------------------------------------
   6. Services Carousel & Slide Navigation
   -------------------------------------------------------------------------- */
function initServicesCarousel() {
  const track = document.getElementById('servicesTrack');
  const dots = document.querySelectorAll('.services-dot');
  const slides = document.querySelectorAll('.service-slide');

  if (!track || dots.length === 0 || slides.length === 0) return;

  let currentIndex = 0;
  let isScrolling = false;

  function setActiveSlide(index, smoothScroll = true) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;

    // Update dots
    dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update slide active state
    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === index);
    });

    if (smoothScroll) {
      isScrolling = true;
      const targetLeft = index * track.offsetWidth;
      track.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
      setTimeout(() => {
        isScrolling = false;
      }, 450);
    }
  }

  // Dot click events (Desktop & Mobile)
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide-index'), 10);
      if (!isNaN(slideIndex)) {
        setActiveSlide(slideIndex, true);
      }
    });
  });

  // Track scroll synchronization for touch-swiping on Mobile
  let scrollTimeout = null;
  track.addEventListener('scroll', () => {
    if (isScrolling) return;

    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = requestAnimationFrame(() => {
      const slideWidth = track.offsetWidth;
      if (slideWidth > 0) {
        const newIndex = Math.round(track.scrollLeft / slideWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
          currentIndex = newIndex;
          dots.forEach((dot, idx) => {
            const isActive = idx === newIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
          slides.forEach((slide, idx) => {
            slide.classList.toggle('is-active', idx === newIndex);
          });
        }
      }
    });
  }, { passive: true });

  // Handle window resize to keep current slide properly centered
  window.addEventListener('resize', () => {
    if (track.offsetWidth > 0) {
      track.scrollTo({
        left: currentIndex * track.offsetWidth,
        behavior: 'auto'
      });
    }
  });
}

/* --------------------------------------------------------------------------
   7. TechCrush Academy Certificate Modal
   -------------------------------------------------------------------------- */
function initCertModal() {
  const trigger = document.getElementById('certTrigger');
  const modal = document.getElementById('certModal');
  const closeBtn = document.getElementById('certModalClose');

  if (!trigger || !modal || !closeBtn) return;

  function openModal() {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    trigger.focus();
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking on backdrop outside the modal dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Footer Memoji Easter Egg
   -------------------------------------------------------------------------- */
function initFooterMemojiEasterEgg() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let sequenceRunning = false;
  let bottomVisitActive = false;
  let activeAnimation = null;
  let holdTimeout = null;
  let holdResolve = null;
  let easterMemoji = null;
  let exitStarted = false;

  function cancelSequence() {
    if (activeAnimation) {
      activeAnimation.cancel();
      activeAnimation = null;
    }

    if (holdTimeout) {
      window.clearTimeout(holdTimeout);
      holdTimeout = null;
    }

    if (holdResolve) {
      holdResolve();
      holdResolve = null;
    }

    if (easterMemoji) {
      easterMemoji.remove();
      easterMemoji = null;
    }

    footer.classList.remove('is-memoji-active');
    sequenceRunning = false;
    exitStarted = false;
  }

  async function triggerSequence() {
    if (sequenceRunning) return;
    sequenceRunning = true;
    exitStarted = false;

    easterMemoji = document.createElement('div');
    easterMemoji.className = 'footer-easter-memoji';
    easterMemoji.setAttribute('aria-hidden', 'true');
    easterMemoji.innerHTML = '<img src="assets/images/memoji_open.png" alt="" width="40" height="40">';
    document.body.appendChild(easterMemoji);

    const badge = footer.querySelector('.footer-memoji');
    const badgeRect = badge ? badge.getBoundingClientRect() : footer.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const size = viewportWidth <= 640 ? 36 : 40;
    const startX = (viewportWidth - size) / 2;
    const startY = viewportHeight + 48;
    const settleX = badgeRect.left + (badgeRect.width - size) / 2;
    const settleY = badgeRect.top + (badgeRect.height - size) / 2;
    const exitX = viewportWidth * (0.12 + (Math.random() * 0.76));
    const exitY = -size - 40;

    easterMemoji.style.width = `${size}px`;
    easterMemoji.style.height = `${size}px`;

    footer.classList.add('is-memoji-active');

    activeAnimation = easterMemoji.animate(
      [
        { transform: `translate(${startX}px, ${startY}px) scale(0.72)`, opacity: 0, offset: 0 },
        { transform: `translate(${settleX}px, ${settleY}px) scale(1)`, opacity: 1, offset: 1 }
      ],
      {
        duration: 1400,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    );

    try {
      await activeAnimation.finished;
    } catch (error) {
      if (!sequenceRunning) return;
    }
    activeAnimation = null;

    if (!sequenceRunning) return;

    await new Promise(resolve => {
      holdResolve = resolve;
      holdTimeout = window.setTimeout(() => {
        holdTimeout = null;
        holdResolve = null;
        resolve();
      }, 5000);
    });

    if (!sequenceRunning) return;

    exitStarted = true;
    const exitFrames = [];
    const exitSteps = 20;
    const controlX = settleX + (exitX - settleX) * 0.35;
    const controlY = settleY - Math.min(viewportHeight * 0.45, 300);

    for (let step = 0; step <= exitSteps; step++) {
      const progress = step / exitSteps;
      const inverse = 1 - progress;
      const x = (inverse * inverse * settleX) +
        (2 * inverse * progress * controlX) +
        (progress * progress * exitX);
      const y = (inverse * inverse * settleY) +
        (2 * inverse * progress * controlY) +
        (progress * progress * exitY);
      const scale = 1 - (0.92 * progress);

      exitFrames.push({
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        opacity: progress < 0.82 ? 1 : 1 - ((progress - 0.82) / 0.18),
        offset: progress
      });
    }

    activeAnimation = easterMemoji.animate(exitFrames, {
      duration: 3500,
      easing: 'linear',
      fill: 'forwards'
    });

    try {
      await activeAnimation.finished;
    } catch (error) {
      if (!sequenceRunning) return;
    }
    activeAnimation = null;

    easterMemoji.remove();
    easterMemoji = null;
    footer.classList.remove('is-memoji-active');
    sequenceRunning = false;
    exitStarted = false;
  }

  let scrollFrame = null;
  const checkBottom = () => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        if (!bottomVisitActive) {
          bottomVisitActive = true;
          triggerSequence();
        }
      } else if (bottomVisitActive) {
        bottomVisitActive = false;
        if (sequenceRunning && !exitStarted) cancelSequence();
      }
    });
  };

  window.addEventListener('scroll', checkBottom, { passive: true });
  window.addEventListener('resize', checkBottom);
  checkBottom();
}

/* --------------------------------------------------------------------------
   9. Restrained Section & Card Entrance Reveals
   -------------------------------------------------------------------------- */
function initSectionReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealTargets = Array.from(document.querySelectorAll(
    'main > section:not(.hero-section), .project-card, .service-slide, .experience-card, .about-grid, .contact-container'
  ));

  if (revealTargets.length === 0) return;

  document.documentElement.classList.add('reveal-ready');

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(target => target.classList.add('is-revealed'));
    return;
  }

  revealTargets.forEach((target, index) => {
    if (target.matches('.project-card, .service-slide, .experience-card')) {
      target.classList.add('card-reveal');
      target.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    } else {
      target.classList.add('section-reveal');
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -4% 0px'
  });

  revealTargets.forEach(target => {
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      target.classList.add('is-revealed');
    } else {
      observer.observe(target);
    }
  });
}
