
  // Scroll-top visibility
  /*window.addEventListener('scroll', () => {
    const btn = document.getElementById('scrollTop');
    btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  });*/

  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 40) { // change 20 to whatever you like
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  document.getElementById('scrollTop').style.opacity = '0';
  document.getElementById('scrollTop').style.pointerEvents = 'none';


const fadeEls = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .15 });
fadeEls.forEach(el => io.observe(el));

/* Counter animation */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
    else el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: .3 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));


const aboutImg = document.querySelector('.about-img');
if (aboutImg) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zoom-in');
        imgObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  imgObserver.observe(aboutImg);
}



const whyItems = document.querySelectorAll('.anim-item');
const whyFirstPair  = [whyItems[0], whyItems[2]];
const whySecondPair = [whyItems[1], whyItems[3]];

function animateWhyItems(els) {
  els.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
  });
}

let whyTriggered = false;

const whyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || whyTriggered) return;
    whyTriggered = true;
    animateWhyItems(whyFirstPair);
    setTimeout(() => animateWhyItems(whySecondPair), 400);
  });
}, { threshold: 0.2 });

const whySection = document.querySelector('#why');
if (whySection) whyObserver.observe(whySection);

const counterCards = document.querySelectorAll('.counter-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.counter-card');
      cards.forEach((card, i) => {
        const zoomDelay = i * 280;           // stagger between cards
        const animDuration = 700;            // matches your 0.7s CSS transition

        setTimeout(() => {
          card.classList.add('animate-in');
        }, zoomDelay);

        // Start counting only after zoom-in fully completes
        setTimeout(() => {
          const counter = card.querySelector('.counter');
          if (counter) animateCounter(counter);
        }, zoomDelay + animDuration);
      });
      cardObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

if (counterCards.length) cardObserver.observe(counterCards[0]);

const phoneBox = document.querySelector('.phone-box');
if (phoneBox) {
  const phoneObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        phoneObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  phoneObs.observe(phoneBox);
}

const serviceCards = document.querySelectorAll('.service-card');
console.log('service cards found:', serviceCards.length);
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      serviceCards.forEach((card) => {
        card.classList.add('animate-in');
      });
      serviceObserver.disconnect();
    }
  });
}, { threshold: 0.05 });

if (serviceCards.length) serviceObserver.observe(serviceCards[0]);


const wpSteps = document.querySelectorAll('.wp-step');
const wpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      wpSteps.forEach((step, i) => {
        setTimeout(() => {
          step.classList.add('animate-in');
        }, i * 250);
      });
      wpObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

if (wpSteps.length) wpObserver.observe(wpSteps[0]);

const zoomEls = document.querySelectorAll('.zoomIn');
const zoomObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      zoomObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
zoomEls.forEach(el => zoomObs.observe(el));

const diagonalEls = document.querySelectorAll('.slide-diagonal');
const diagonalObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      diagonalObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
diagonalEls.forEach(el => diagonalObs.observe(el));


const track = document.getElementById('tsTr');
const viewport = document.getElementById('tsVp');
const dotsEl = document.getElementById('tsDots');
const cards = Array.from(track.querySelectorAll('.ts-card'));
const total = cards.length;
const gap = 24;
let current = 0;
let autoTimer = null;
const AUTO_DELAY = 3000;

const dots = [];
for (let i = 0; i < total; i++) {
  const d = document.createElement('button');
  d.className = 'ts-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => { goTo(i); resetAuto(); });
  dotsEl.appendChild(d);
  dots.push(d);
}

function getCardWidth() { return cards[0].offsetWidth; }

function getOffset(idx) {
  const cardW = getCardWidth();
  const vpW = viewport.offsetWidth;
  const centerOffset = (vpW - cardW) / 2;
  const maxOffset = total * (cardW + gap) - vpW;
  return Math.min(Math.max(idx * (cardW + gap) - centerOffset, 0), maxOffset);
}


function updateCenter(idx) {
  cards.forEach((c, i) => c.classList.toggle('center', i === idx));
}

function goTo(idx, animated = true) {
  current = ((idx % total) + total) % total;
  const offset = getOffset(current);
  if (animated) {
    track.style.transition = 'transform 0.8s cubic-bezier(0.25,1,0.5,1)';
  } else {
    track.style.transition = 'none';
  }
  track.style.transform = `translateX(${-offset}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
  updateCenter(current);
}

function startAuto() {
  autoTimer = setInterval(() => {
    const next = (current + 1) % total;
    goTo(next);
  }, AUTO_DELAY);
}

function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

goTo(0, false);
startAuto();

viewport.addEventListener('mouseenter', () => clearInterval(autoTimer));
viewport.addEventListener('mouseleave', () => { clearInterval(autoTimer); startAuto(); });

let startX = 0, isDragging = false, moved = false, startOffset = 0;
function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }

viewport.addEventListener('mousedown', e => {
  clearInterval(autoTimer);
  isDragging = true; moved = false;
  startX = getX(e);
  startOffset = getOffset(current);
  track.style.transition = 'none';
  viewport.classList.add('dragging');
});
viewport.addEventListener('touchstart', e => {
  clearInterval(autoTimer);
  isDragging = true; moved = false;
  startX = getX(e);
  startOffset = getOffset(current);
  track.style.transition = 'none';
}, { passive: true });

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  moved = true;
  const dx = getX(e) - startX;
  track.style.transform = `translateX(${-(startOffset - dx)}px)`;
});
window.addEventListener('touchmove', e => {
  if (!isDragging) return;
  moved = true;
  const dx = getX(e) - startX;
  track.style.transform = `translateX(${-(startOffset - dx)}px)`;
}, { passive: true });

function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;
  viewport.classList.remove('dragging');
  if (!moved) { resetAuto(); return; }
  const dx = getX(e) - startX;
  if (dx < -50) goTo(current + 1);
  else if (dx > 50) goTo(current - 1);
  else goTo(current);
  resetAuto();
}
window.addEventListener('mouseup', endDrag);
window.addEventListener('touchend', endDrag);



document.getElementById('qs-service').addEventListener('change', function () {
    this.style.color = this.value ? 'var(--navy, #0d1f3c)' : '';
  });

  function qsHandleSubmit() {
    const fields = [
      { id: 'qs-name',    val: document.getElementById('qs-name').value.trim() },
      { id: 'qs-email',   val: document.getElementById('qs-email').value.trim() },
      { id: 'qs-service', val: document.getElementById('qs-service').value },
      { id: 'qs-message', val: document.getElementById('qs-message').value.trim() },
    ];

    let valid = true;
    fields.forEach(({ id, val }) => {
      const el = document.getElementById(id);
      if (!val) {
        valid = false;
        el.style.boxShadow = '0 0 0 3px rgba(255,80,80,0.55)';
        setTimeout(() => el.style.boxShadow = '', 1600);
      }
    });
    if (!valid) return;

    // Success
    const btn = document.querySelector('.qs-submit-btn');
    document.getElementById('qs-success').style.display = 'block';
    btn.textContent = 'Sent ✓';
    btn.style.background = '#0a5a7a';

    setTimeout(() => {
      fields.forEach(({ id }) => document.getElementById(id).value = '');
      document.getElementById('qs-service').style.color = '';
      document.getElementById('qs-success').style.display = 'none';
      btn.textContent = 'Send message';
      btn.style.background = '';
    }, 3000);
  }




//translation 

 function clearGoogTransCookies() {
    var hostname = window.location.hostname;
    var expire = '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    var domains = ['', hostname, '.' + hostname];
    var parts = hostname.split('.');
    while (parts.length > 2) {
        parts.shift();
        domains.push('.' + parts.join('.'));
    }
    var paths = ['/', window.location.pathname];
    domains.forEach(function(domain) {
        paths.forEach(function(path) {
            var d = domain ? '; domain=' + domain : '';
            document.cookie = 'googtrans=' + d + '; path=' + path + expire;
        });
    });
}

function getCurrentLanguage() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim();
        if (c.indexOf('googtrans=') === 0) {
            var parts = c.substring('googtrans='.length).split('/');
            if (parts.length >= 3 && parts[2]) return parts[2];
        }
    }
    return sessionStorage.getItem('selectedLanguage') || 'en'; // default = English
}

function setActiveLangUI(lang) {
    document.querySelectorAll('.lang-option').forEach(function(el) {
        el.classList.remove('active');
        if (el.dataset.lang === lang) el.classList.add('active');
    });
}

function updateSelectedFlag(lang) {
    var matchedBtn = document.querySelector('.lang-option[data-lang="' + lang + '"]');
    if (matchedBtn) {
        var flagEl = document.getElementById('langSelectedFlag');
        var labelEl = document.getElementById('langSelectedLabel');
        if (flagEl) { flagEl.src = matchedBtn.dataset.flag; flagEl.alt = matchedBtn.dataset.label; }
        if (labelEl) labelEl.textContent = matchedBtn.dataset.label;
    }
}

function changeLang(lang) {
    clearGoogTransCookies();

    if (lang === 'en') {
        // English is the original page — just reload clean
        sessionStorage.removeItem('selectedLanguage');
        window.location.href = window.location.pathname + window.location.search;
        return;
    }

    var val = '/en/' + lang; // translate FROM English TO chosen language
    var hostname = window.location.hostname;
    document.cookie = 'googtrans=' + val + '; path=/;';
    document.cookie = 'googtrans=' + val + '; domain=' + hostname + '; path=/;';
    document.cookie = 'googtrans=' + val + '; domain=.' + hostname + '; path=/;';
    sessionStorage.setItem('selectedLanguage', lang);

    var selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
        selectEl.value = lang;
        selectEl.dispatchEvent(new Event('change'));
        setActiveLangUI(lang);
        updateSelectedFlag(lang);
    } else {
        window.location.href = window.location.pathname + window.location.search;
    }
}

function toggleLangMenu(e) {
    e.stopPropagation();
    document.getElementById('langMenu').classList.toggle('open');
}

// This is called by Google's script automatically
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',          // ← your page is in English
        includedLanguages: 'sq,it',  // ← translate TO Albanian and Italian
        autoDisplay: false,          // ← stops toolbar appearing automatically
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Hide Google's injected elements
function removeGoogleJunk() {
    var selectors = [
        '.VIpgJd-ZVi9od-ORHb-OEVmcd',
        '.VIpgJd-ZVi9od-aZ2me-OEVmcd',
        '.goog-te-spinner-pos',
        '.goog-te-spinner',
        '#goog-gt-tt',
        '.goog-tooltip',
        '.goog-te-balloon-frame',
        '.goog-te-banner-frame',
    ];
    selectors.forEach(function(sel) {
        document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
    });
    document.querySelectorAll('iframe.skiptranslate').forEach(function(el) {
        el.style.cssText = 'display:none!important;height:0!important;width:0!important;';
    });
    // Fix body top shifting
    document.body.style.top = '0px';
}

// Keep removing Google junk every 500ms
setInterval(removeGoogleJunk, 500);
window.addEventListener('load', removeGoogleJunk);

// Single DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    var currentLang = getCurrentLanguage();
    updateSelectedFlag(currentLang);
    setActiveLangUI(currentLang);

    // Button click handlers
    document.querySelectorAll('.lang-option').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            changeLang(this.dataset.lang);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        var menu = document.getElementById('langMenu');
        if (menu) menu.classList.remove('open');
    });

    removeGoogleJunk();
});

// Expose to HTML onclick attributes
window.changeLang = changeLang;
window.toggleLangMenu = toggleLangMenu;