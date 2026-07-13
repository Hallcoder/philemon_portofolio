// Nav: solid background after scrolling past the hero
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery__item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});
const closeLightbox = () => lightbox.classList.remove('open');
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// Scroll-spy: highlight the side nav item for whichever section is centered in view
const sidenavItems = document.querySelectorAll('.sidenav__item');
const spySections = document.querySelectorAll('section[id]');
if ('IntersectionObserver' in window) {
  const spyIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidenavItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  spySections.forEach(sec => spyIo.observe(sec));
}

// Journey stepper: light up each step as it scrolls into view
const stepItems = document.querySelectorAll('.stepper__item');
if ('IntersectionObserver' in window) {
  const stepIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });
  stepItems.forEach(el => stepIo.observe(el));
} else {
  stepItems.forEach(el => el.classList.add('active'));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('inview'));
}
