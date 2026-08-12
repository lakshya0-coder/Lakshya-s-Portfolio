// ---------- mobile nav toggle ----------
const navToggle = document.querySelector('.navtoggle');
const navLinks = document.querySelector('.navlinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ---------- active nav link ----------
(function markActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---------- scroll progress bar ----------
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  if (!progressBar) return;
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = (scrolled || 0) + '%';
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ---------- back to top ----------
const toTop = document.getElementById('to-top');
if (toTop) {
  document.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.sr');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- page transition on internal link click ----------
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const url = link.getAttribute('href');
    if (link.target === '_blank' || url.startsWith('http')) return;
    e.preventDefault();
    document.body.style.transition = 'opacity 0.28s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = url; }, 260);
  });
});
