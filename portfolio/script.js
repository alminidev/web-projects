/* ================================================================
   ALMINI PORTFOLIO — script.js
   Vanilla JS only. No frameworks, no build tools.
   ================================================================ */


/* ----------------------------------------------------------------
   HEADER: transparent on top, opaque on scroll
   ---------------------------------------------------------------- */
(function initHeader() {
  const header = document.getElementById('header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run once in case page loads mid-scroll
}());


/* ----------------------------------------------------------------
   SCROLL REVEAL: fade + slide up elements when they enter viewport
   Elements must already have the hidden state set in CSS:
     opacity: 0; transform: translateY(Xpx);
   This script adds .revealed to trigger the transition.
   ---------------------------------------------------------------- */
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.work-card, .about-text, .stack-wrap, .contact-heading'
  );

  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal everything immediately for older browsers
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // animate once, then stop watching
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}());


/* ----------------------------------------------------------------
   ACTIVE NAV: highlight current section link as user scrolls
   ---------------------------------------------------------------- */
(function initActiveNav() {
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window) || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    // Section is "active" when it occupies more than 40% of the viewport
    threshold: 0.4
  });

  sections.forEach(section => observer.observe(section));
}());


/* ----------------------------------------------------------------
   MOBILE MENU: toggle open/close with { } button
   ---------------------------------------------------------------- */
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('header-nav');

  if (!toggle || !nav) return;

  function setMenu(open) {
    const isOpen = open !== undefined ? open : !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));

    const brackets = toggle.querySelector('.menu-brackets');
    if (brackets) {
      brackets.innerHTML = isOpen ? '{&times;}' : '{&nbsp;}';
    }
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu();
  });

  // Close when clicking any nav link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Close when clicking outside header
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
    }
  });
}());


/* ----------------------------------------------------------------
   EMAIL COPY & MAILTO DISPATCH:
   Automatically copies email to clipboard, displays subtle toast,
   and fires mailto in the background.
   ---------------------------------------------------------------- */
(function initEmailHandlers() {
  const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function fallbackCopy(text) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (e) {
      console.warn('Fallback copy error:', e);
      return false;
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        return fallbackCopy(text);
      }
    }
    return fallbackCopy(text);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  mailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Previne a navegação de protocolo que tira o foco e cancela o clipboard
      const href = link.getAttribute('href') || '';
      const email = href.replace(/^mailto:/i, '').split('?')[0];

      if (email) {
        copyText(email);
        showToast(`${email} copiado para a área de transferência!`);
      }
    });
  });
}());


/* ----------------------------------------------------------------
   HERO GLITCH + CHARACTER SWAP CONTROLLER
   ---------------------------------------------------------------- */
(function initHeroGlitchSwap() {
  const wrapper = document.getElementById('heroGlitchWrapper');
  const imgElement = document.getElementById('heroGlitchImg');

  if (!wrapper || !imgElement) return;

  const BASE_PATH = '00-brief/assets/';

  // Array de PNGs com fundo transparente
  const characters = [
    'foto-hero-transparente.png',
    '70.png',
    'punk.png',
    'rapper.png',
    'surfista.png',
    'exercito.png',
    'juventus.png',
    'aranha.png',
    'vader.png',
    'romano.png'
  ];

  // Preload silencioso dos PNGs transparentes
  characters.forEach((filename) => {
    const preloader = new Image();
    preloader.src = `${BASE_PATH}${filename}`;
  });

  let currentIndex = 0;
  let isSwapping = false;

  // Se um PNG específico ainda não foi colocado na pasta, previne quebra visual
  imgElement.addEventListener('error', () => {
    console.warn(`Imagem ${imgElement.src} não encontrada em ${BASE_PATH}. Verifique se o arquivo PNG transparente foi adicionado.`);
  });

  wrapper.addEventListener('click', () => {
    if (isSwapping) return; // Evita cliques concorrentes durante o flash
    isSwapping = true;

    // 1. Inicia o Flash Esfumaçado rápido (duração total: 200ms)
    wrapper.classList.add('is-flashing');

    // 2. No pico da opacidade do flash (~90ms), troca a imagem oculta
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % characters.length;
      const nextSrc = `${BASE_PATH}${characters[currentIndex]}`;

      // Atualiza o src da imagem
      imgElement.src = nextSrc;

      // Sincroniza a custom property CSS para atualizar as camadas ciano e vermelho
      wrapper.style.setProperty('--img-url', `url('${nextSrc}')`);
    }, 90);

    // 3. Finaliza a animação e reativa a interação
    setTimeout(() => {
      wrapper.classList.remove('is-flashing');
      isSwapping = false;
    }, 205);
  });
}());


