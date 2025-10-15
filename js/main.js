
// Fix viewport height for mobile browsers
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initially and on resize/orientation change
setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Header scroll effect
const header = document.querySelector('.site-header');
if(header){
  // Ensure header is always visible
  function adjustHeader() {
    const rect = header.getBoundingClientRect();
    if (rect.top < 0) {
      header.style.transform = 'translateY(0)';
      header.style.position = 'fixed';
    }
  }

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    adjustHeader();
  });

  window.addEventListener('resize', adjustHeader);
  adjustHeader();
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-header nav');
let menuOverlay = document.querySelector('.menu-overlay');

// Create overlay if it doesn't exist
if(toggle && !menuOverlay){
  menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);
}

if(toggle && nav){
  toggle.addEventListener('click',()=> {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
    if(menuOverlay) menuOverlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking overlay
  if(menuOverlay){
    menuOverlay.addEventListener('click', ()=> {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu when clicking a nav link
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', ()=> {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      if(menuOverlay) menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Year
const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

// Lightbox Gallery
class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    // Create lightbox HTML
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Închide">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Anterior">&lsaquo;</button>
        <img class="lightbox-img" src="" alt="">
        <button class="lightbox-nav lightbox-next" aria-label="Următor">&rsaquo;</button>
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Get all gallery items
    this.galleryItems = document.querySelectorAll('.gallery-item');
    if (this.galleryItems.length === 0) return;

    // Collect image data
    this.galleryItems.forEach((item, index) => {
      const bgImage = item.style.backgroundImage;
      const imageUrl = bgImage.slice(5, -2); // Remove url(" and ")
      this.images.push({
        url: imageUrl,
        caption: item.getAttribute('aria-label') || ''
      });

      // Add click event
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(index);
      });
    });

    // Lightbox controls
    this.lightboxEl = lightbox;
    this.imgEl = lightbox.querySelector('.lightbox-img');
    this.captionEl = lightbox.querySelector('.lightbox-caption');

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) this.close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxEl.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  open(index) {
    this.currentIndex = index;
    this.show();
    this.lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  show() {
    const image = this.images[this.currentIndex];
    this.imgEl.src = image.url;
    this.captionEl.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.show();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.show();
  }
}

// Initialize lightbox when page loads
if (document.querySelector('.gallery-item')) {
  new Lightbox();
}
