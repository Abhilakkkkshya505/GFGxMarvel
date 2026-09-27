/* ============================================
   GFG Bennett Multiverse — Script
   Modular, performant, no frameworks
   ============================================ */

(function () {
  'use strict';

  /* -------------------------------------------
     Configuration
     ------------------------------------------- */
  // Set event date (update when real date is available)
  const EVENT_DATE = new Date('2026-11-15T09:00:00+05:30');

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* -------------------------------------------
     1. Hero — Scroll-Driven Image Sequence
     ------------------------------------------- */
  function initHeroSequence() {
    const sequenceSection = document.querySelector('.hero-scroll-sequence');
    const images = document.querySelectorAll('.hero-image-layer img');
    const progressDots = document.querySelectorAll('.hero-progress-dot');
    const totalImages = images.length;

    if (!sequenceSection || totalImages === 0) return;

    // Preload all hero images for smooth transitions
    images.forEach((img) => {
      if (img.loading === 'lazy') {
        img.loading = 'eager';
      }
    });

    let currentIndex = 0;
    let ticking = false;

    function updateHeroImage() {
      const rect = sequenceSection.getBoundingClientRect();
      const scrollHeight = sequenceSection.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / scrollHeight));

      // Map progress (0–1) to image index (0–8)
      const newIndex = Math.min(
        totalImages - 1,
        Math.floor(progress * totalImages)
      );

      if (newIndex !== currentIndex) {
        images[currentIndex].classList.remove('active');
        images[newIndex].classList.add('active');

        // Update progress dots
        if (progressDots.length > 0) {
          progressDots[currentIndex].classList.remove('active');
          progressDots[newIndex].classList.add('active');
        }

        currentIndex = newIndex;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateHeroImage);
        ticking = true;
      }
    }

    // For reduced motion, just show first image statically
    if (prefersReducedMotion) {
      images[0].classList.add('active');
      return;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeroImage();
  }


  /* -------------------------------------------
     2. Countdown Timer
     ------------------------------------------- */
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl) return;

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function update() {
      const now = new Date();
      const diff = EVENT_DATE - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    update();
    setInterval(update, 1000);
  }


  /* -------------------------------------------
     3. Scroll Reveal (IntersectionObserver)
     ------------------------------------------- */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      // Make everything visible immediately
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }


  /* -------------------------------------------
     4. Navigation — Scroll & Mobile Menu
     ------------------------------------------- */
  function initNavigation() {
    const nav = document.getElementById('site-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (!nav) return;

    // Scroll state
    let lastScroll = 0;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll > 80) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile toggle
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click (mobile)
      links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          links.classList.remove('mobile-open');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = nav.offsetHeight;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      });
    });
  }


  /* -------------------------------------------
     5. FAQ Accordion
     ------------------------------------------- */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const otherAnswer = other.querySelector('.faq-answer');
            const otherBtn = other.querySelector('.faq-question');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
          question.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }


  /* -------------------------------------------
     6. Gallery Drag Scroll
     ------------------------------------------- */
  function initGalleryScroll() {
    const gallery = document.getElementById('gallery-scroll');
    if (!gallery) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
      isDown = false;
    });

    gallery.addEventListener('mouseup', () => {
      isDown = false;
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });

    // Touch support is native via CSS overflow-x: auto
  }


  /* -------------------------------------------
     7. Lazy Loading Images
     ------------------------------------------- */
  function initLazyImages() {
    // Use native lazy loading (already set in HTML)
    // This is a fallback for older browsers
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
              }
              imageObserver.unobserve(img);
            }
          });
        },
        { rootMargin: '200px' }
      );

      lazyImages.forEach((img) => imageObserver.observe(img));
    }
  }


  /* -------------------------------------------
     8. Video Hero — Scroll-Locked Scrub
     Vanilla JS port of MetroHero React component.
     Locks the page, captures wheel/touch to scrub
     the video. Unlocks when video reaches end and
     user keeps scrolling forward.
     ------------------------------------------- */
  function initVideoHero() {
    var section = document.getElementById('video-hero');
    var video = document.getElementById('video-hero-vid');
    var titleEl = document.getElementById('video-hero-title');
    var taglineEl = document.getElementById('video-hero-tagline');
    var hintEl = document.getElementById('video-hero-hint');
    var progressBar = document.getElementById('video-hero-progress');

    if (!section || !video) return;

    var SCRUB_DISTANCE = 3200;
    var duration = 0;
    var targetProgress = 0;
    var currentProgress = 0;
    var hasStartedScrolling = false;
    var locked = false;
    var lockedScrollY = 0;
    var touchStartY = 0;
    var isSeeking = false;
    var pendingTime = null;
    var released = false;
    var rafId = 0;

    function clamp(v, min, max) {
      return Math.min(max, Math.max(min, v));
    }

    // --- Video loading ---
    function onLoadedData() {
      duration = video.duration || 0;
      video.classList.add('ready');
      if (prefersReducedMotion) {
        video.currentTime = duration * 0.92;
        // Skip the lock entirely for reduced motion
        released = true;
        section.classList.add('released');
        return;
      }
      engageLock();
    }
    video.addEventListener('loadeddata', onLoadedData);

    // Kickstart load on iOS (play-then-pause trick)
    try {
      var p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(function () { video.pause(); }).catch(function () {});
      } else {
        video.pause();
      }
    } catch (e) { /* silent */ }

    // Seek with queue to avoid browser race
    function onSeeked() {
      isSeeking = false;
      if (pendingTime !== null) {
        var t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    }
    video.addEventListener('seeked', onSeeked);

    function seekTo(t) {
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video.currentTime = t;
    }

    // --- Lock / Unlock body ---
    function engageLock() {
      if (locked) return;
      locked = true;
      lockedScrollY = window.scrollY;
      var b = document.body.style;
      b.position = 'fixed';
      b.top = '-' + lockedScrollY + 'px';
      b.left = '0';
      b.right = '0';
      b.width = '100%';
      b.height = '100%';
      b.overscrollBehavior = 'none';
    }

    function releaseLock() {
      if (!locked) return;
      locked = false;
      var y = lockedScrollY;
      var b = document.body.style;
      b.position = '';
      b.top = '';
      b.left = '';
      b.right = '';
      b.width = '';
      b.height = '';
      b.overscrollBehavior = '';
      window.scrollTo(0, y);
    }

    // --- Input handling ---
    function addDelta(deltaY) {
      if (released && deltaY > 0) return; // already released, scrolling down = normal page
      // If released but scrolling back up into video territory, re-lock
      if (released && deltaY < 0) {
        var rect = section.getBoundingClientRect();
        if (rect.bottom > 0 && targetProgress > 0.01) {
          released = false;
          section.classList.remove('released');
          engageLock();
        } else {
          return;
        }
      }

      targetProgress = clamp(targetProgress + deltaY / SCRUB_DISTANCE, 0, 1);
      if (targetProgress > 0.001) hasStartedScrolling = true;

      // Release at end
      if (targetProgress >= 0.995 && !released) {
        released = true;
        section.classList.add('released');
        releaseLock();
      }
    }

    function onWheel(e) {
      if (released) {
        // Check if scrolled back to top — re-engage
        if (window.scrollY <= 5 && e.deltaY < 0 && targetProgress > 0.01) {
          released = false;
          section.classList.remove('released');
          engageLock();
          addDelta(e.deltaY);
          e.preventDefault();
          return;
        }
        return; // normal scroll
      }
      addDelta(e.deltaY);
      e.preventDefault();
    }

    function onTouchStart(e) {
      touchStartY = e.touches[0] ? e.touches[0].clientY : 0;
    }

    function onTouchMove(e) {
      var y = e.touches[0] ? e.touches[0].clientY : touchStartY;
      var deltaY = touchStartY - y;
      touchStartY = y;
      if (released) {
        if (window.scrollY <= 5 && deltaY < 0 && targetProgress > 0.01) {
          released = false;
          section.classList.remove('released');
          engageLock();
          addDelta(deltaY);
          e.preventDefault();
          return;
        }
        return;
      }
      addDelta(deltaY);
      e.preventDefault();
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    section.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });

    // --- Render loop ---
    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18;

      if (duration > 0) {
        seekTo(currentProgress * duration);
      }

      // Subtle zoom
      video.style.transform = 'scale(' + (1 + currentProgress * 0.06) + ')';

      // Title: fade/blur away as user scrolls
      if (titleEl) {
        var t = 1 - clamp(currentProgress / 0.35, 0, 1);
        titleEl.style.opacity = t;
        titleEl.style.transform = 'translateY(' + ((1 - t) * -24) + 'px) scale(' + (0.96 + t * 0.04) + ')';
        titleEl.style.filter = 'blur(' + ((1 - t) * 10) + 'px)';
      }

      // Hint: hide once scrolling starts
      if (hintEl) {
        hintEl.style.opacity = hasStartedScrolling ? '0' : '1';
      }

      // Tagline: fade IN near end (82% → 100%)
      if (taglineEl) {
        var tg = clamp((currentProgress - 0.82) / 0.18, 0, 1);
        taglineEl.style.opacity = tg;
        taglineEl.style.transform = 'translateY(' + ((1 - tg) * 20) + 'px) scale(' + (0.97 + tg * 0.03) + ')';
        taglineEl.style.filter = 'blur(' + ((1 - tg) * 8) + 'px)';
      }

      // Progress bar
      if (progressBar) {
        progressBar.style.transform = 'scaleX(' + currentProgress + ')';
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(frame);
    }
  }


  /* -------------------------------------------
     9. Initialize All Modules
     ------------------------------------------- */
  function init() {
    initVideoHero();
    initHeroSequence();
    initCountdown();
    initScrollReveal();
    initNavigation();
    initFAQ();
    initGalleryScroll();
    initLazyImages();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
