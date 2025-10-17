// WebP Support Detection
(function() {
  const webpTest = new Image();
  webpTest.onload = webpTest.onerror = function() {
    const hasWebP = webpTest.height === 2;
    if (hasWebP) {
      document.documentElement.classList.add('webp');
    }
  };
  webpTest.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
})();

// Header scroll effect
const header = document.querySelector('.site-header');
if(header){
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
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

// GDPR Cookie Consent
class GDPRConsent {
  constructor() {
    this.modal = document.getElementById('gdpr-modal');
    this.settingsModal = document.getElementById('gdpr-settings-modal');
    this.acceptBtn = document.getElementById('gdpr-accept');
    this.settingsBtn = document.getElementById('gdpr-settings');
    this.closeBtn = document.getElementById('gdpr-close');
    this.saveBtn = document.getElementById('gdpr-save');
    this.acceptAllBtn = document.getElementById('gdpr-accept-all');
    this.analyticsCheckbox = document.getElementById('gdpr-analytics');

    this.init();
  }

  init() {
    // Check if consent has already been given
    const consent = localStorage.getItem('gdpr-consent');

    if (!consent) {
      // Show modal after a short delay
      setTimeout(() => {
        this.showModal();
      }, 1000);
    } else {
      // Load saved preferences
      const preferences = JSON.parse(consent);
      if (preferences.analytics) {
        this.enableAnalytics();
      }
    }

    // Event listeners
    if (this.acceptBtn) {
      this.acceptBtn.addEventListener('click', () => this.acceptEssential());
    }

    if (this.settingsBtn) {
      this.settingsBtn.addEventListener('click', () => this.openSettings());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeSettings());
    }

    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', () => this.savePreferences());
    }

    if (this.acceptAllBtn) {
      this.acceptAllBtn.addEventListener('click', () => this.acceptAll());
    }
  }

  showModal() {
    if (this.modal) {
      this.modal.classList.add('active');
    }
  }

  hideModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
  }

  openSettings() {
    this.hideModal();
    if (this.settingsModal) {
      this.settingsModal.classList.add('active');

      // Load current preferences
      const consent = localStorage.getItem('gdpr-consent');
      if (consent) {
        const preferences = JSON.parse(consent);
        if (this.analyticsCheckbox) {
          this.analyticsCheckbox.checked = preferences.analytics || false;
        }
      }
    }
  }

  closeSettings() {
    if (this.settingsModal) {
      this.settingsModal.classList.remove('active');
    }
    // Show main modal again if no consent has been saved
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      this.showModal();
    }
  }

  acceptEssential() {
    const preferences = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('gdpr-consent', JSON.stringify(preferences));
    this.hideModal();
  }

  acceptAll() {
    const preferences = {
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('gdpr-consent', JSON.stringify(preferences));
    this.enableAnalytics();

    if (this.settingsModal) {
      this.settingsModal.classList.remove('active');
    }
    this.hideModal();
  }

  savePreferences() {
    const preferences = {
      essential: true,
      analytics: this.analyticsCheckbox ? this.analyticsCheckbox.checked : false,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('gdpr-consent', JSON.stringify(preferences));

    if (preferences.analytics) {
      this.enableAnalytics();
    }

    if (this.settingsModal) {
      this.settingsModal.classList.remove('active');
    }
    this.hideModal();
  }

  enableAnalytics() {
    // Placeholder for analytics initialization
    // Add your analytics code here (Google Analytics, etc.)
    console.log('Analytics enabled');
  }
}

// Initialize GDPR consent
new GDPRConsent();
