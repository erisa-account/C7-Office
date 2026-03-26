
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

const cards = document.querySelectorAll(".service-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150); // delay for cascade effect
  });

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

document.querySelectorAll('.counter-card').forEach(card => cardObserver.observe(card));
  