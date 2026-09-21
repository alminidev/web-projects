document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     NAVBAR SCROLL
  =========================== */
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // init state

  /* ===========================
     ACCORDION
  =========================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  const openAccordion = (item) => {
    item.classList.add('active');
    item.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
  };

  const closeAccordion = (item) => {
    item.classList.remove('active');
    item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
  };

  const closeAllAccordions = () => {
    document.querySelectorAll('.accordion-item').forEach(closeAccordion);
  };

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');
      closeAllAccordions();
      if (!isActive) openAccordion(item);
    });

    // Keyboard support
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  /* ===========================
     SCROLL REVEAL (IntersectionObserver)
  =========================== */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach(el => el.classList.add('active'));
  }

  /* ===========================
     FORM SUBMIT (demo)
  =========================== */
  const form = document.getElementById('form-orcamento');
  const submitBtn = document.getElementById('btn-submit');
  if (form && submitBtn) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = '✓ Solicitação Enviada!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        form.reset();
      }, 1200);
    });
  }

});
