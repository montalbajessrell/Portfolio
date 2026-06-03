// =============================================
//  Theme toggle – light / dark
// =============================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme  = localStorage.getItem('theme');

if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// =============================================
//  Navigation – sticky + active link tracking
// =============================================
const nav       = document.getElementById('nav');
const navLinks  = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');
const allLinks  = document.querySelectorAll('.nav__link');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
}, { passive: true });

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// =============================================
//  Mobile nav toggle
// =============================================
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =============================================
//  Typewriter effect
// =============================================
const roles = [
  'IT Student',
  'Web Developer',
  'Virtual Assistant',
  'AI Enthusiast',
  'Problem Solver'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = roles[roleIndex];
  if (deleting) {
    typeEl.textContent = current.substring(0, charIndex--);
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
  }

  let delay = deleting ? 60 : 110;
  if (!deleting && charIndex === current.length + 1) {
    delay = 1800; deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
setTimeout(type, 800);

// =============================================
//  Scroll reveal
// =============================================
const revealEls = document.querySelectorAll(
  '.section__title, .about__intro, .about__interests, .about__skills-grid, ' +
  '.about__action, .skill-card, .cert-card, .project-card, ' +
  '.contact-info, .contact-info__item'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Staggered reveal for grid children
document.querySelectorAll('.skills__grid, .cert__grid, .projects__grid, .contact-info').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

// =============================================
//  Footer year
// =============================================
document.getElementById('year').textContent = new Date().getFullYear();
