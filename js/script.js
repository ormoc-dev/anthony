// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        
        this.init();
    }

    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    updateIcon() {
        if (this.theme === 'dark') {
            this.themeIcon.className = 'fas fa-sun';
        } else {
            this.themeIcon.className = 'fas fa-moon';
        }
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroller {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.mobileBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        this.mobileBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.mobileBtn.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.mobileBtn.classList.remove('active');
    }
}

// Navbar Background on Scroll
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Animate Elements on Scroll
class ScrollAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .stat-item');
        animateElements.forEach(el => observer.observe(el));
    }
}

// Form Handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Thank you! Your message has been sent.', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Insert before form
        this.form.parentNode.insertBefore(messageEl, this.form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Typing Animation for Hero Title
class TypingAnimation {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        this.init();
    }

    init() {
        if (this.heroTitle) {
            this.animateText();
        }
    }

    animateText() {
        // Get only the text content, not HTML
        const text = this.heroTitle.textContent;
        
        // Clear the content
        this.heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                // Rebuild the HTML structure with the current text
                const currentText = text.substring(0, i + 1);
                this.heroTitle.innerHTML = `Hi, I'm <span class="highlight">${currentText}</span>`;
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start animation after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Skill Progress Animation
class SkillProgress {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.init();
    }

    init() {
        this.observeSkills();
    }

    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-animate');
                }
            });
        }, { threshold: 0.5 });

        this.skillItems.forEach(skill => observer.observe(skill));
    }
}

// Project Card Hover Effects
class ProjectHover {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.statItems = document.querySelectorAll('.stat-item h3');
        this.init();
    }

    init() {
        this.observeStats();
    }

    observeStats() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.statItems.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }
}

// Project Slider functionality
class ProjectSlider {
    constructor() {
        this.projectsGrid = document.querySelector('.projects-grid');
        this.projects = document.querySelectorAll('.project-card');
        this.currentIndex = 0;
        this.isAutoScrolling = false;
        this.autoScrollInterval = null;
        this.isPointerDown = false;
        this.startX = 0;
        this.scrollLeftStart = 0;
        this.visibilityObserver = null;
        
        this.init();
    }
    
    init() {
        if (!this.projectsGrid) return;
        
        // Setup navigation arrows
        this.setupNavigationArrows();
        
        // Auto-scroll only on desktop and only when visible
        if (window.innerWidth >= 1024) {
            this.setupVisibilityObserver();
        }
        
        // Pause auto-scroll on hover (desktop)
        this.projectsGrid.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 1024) {
                this.pauseAutoScroll();
            }
        });
        
        this.projectsGrid.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1024) {
                this.startAutoScroll();
            }
        });
        
        // Touch/swipe support for mobile
        this.setupTouchSupport();
        
        // Grab-to-drag support (mouse / pointer)
        this.setupPointerDrag();
        
        // Keyboard navigation (desktop)
        this.setupKeyboardNavigation();
        
        // Snap to nearest card after resize
        window.addEventListener('resize', () => {
            this.snapToNearest();
        });
    }
    
    setupVisibilityObserver() {
        const section = document.getElementById('projects');
        if (!section) return;
        
        this.visibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAutoScroll();
                } else {
                    this.pauseAutoScroll();
                }
            });
        }, { threshold: 0.4 });
        
        this.visibilityObserver.observe(section);
    }
    
    setupNavigationArrows() {
        const leftArrow = document.querySelector('.nav-arrow-left');
        const rightArrow = document.querySelector('.nav-arrow-right');
        
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                this.scrollToPrevious();
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                this.scrollToNext();
            });
        }
    }
    
    startAutoScroll() {
        if (this.autoScrollInterval || window.innerWidth < 1024) return;
        
        // Slow auto-scroll: every 6 seconds
        this.autoScrollInterval = setInterval(() => {
            this.scrollToNext();
        }, 6000);
    }
    
    pauseAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    scrollToNext() {
        if (!this.projectsGrid || !this.projects.length) return;
        
        this.currentIndex = Math.min(this.currentIndex + 1, this.projects.length - 1);
        const targetProject = this.projects[this.currentIndex];
        
        if (targetProject) {
            const cardWidth = targetProject.offsetWidth;
            const gap = this.getComputedGap();
            const scrollPosition = this.currentIndex * (cardWidth + gap);
            
            this.projectsGrid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }
    
    scrollToPrevious() {
        if (!this.projectsGrid || !this.projects.length) return;
        
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        const targetProject = this.projects[this.currentIndex];
        
        if (targetProject) {
            const cardWidth = targetProject.offsetWidth;
            const gap = this.getComputedGap();
            const scrollPosition = this.currentIndex * (cardWidth + gap);
            
            this.projectsGrid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }
    
    getComputedGap() {
        const styles = window.getComputedStyle(this.projectsGrid);
        const gap = parseInt(styles.columnGap || styles.gap || '32', 10);
        return Number.isNaN(gap) ? 32 : gap;
    }
    
    setupTouchSupport() {
        let startX = 0;
        let currentX = 0;
        
        this.projectsGrid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.projectsGrid.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        }, { passive: true });
        
        this.projectsGrid.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            const threshold = 40; // Easier swipe
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) this.scrollToNext(); else this.scrollToPrevious();
            } else {
                this.snapToNearest();
            }
        });
    }
    
    setupPointerDrag() {
        const grid = this.projectsGrid;
        
        const onPointerDown = (e) => {
            this.isPointerDown = true;
            grid.classList.add('dragging');
            this.startX = e.pageX || e.clientX;
            this.scrollLeftStart = grid.scrollLeft;
        };
        
        const onPointerMove = (e) => {
            if (!this.isPointerDown) return;
            const x = e.pageX || e.clientX;
            const walk = (this.startX - x); // drag amount
            grid.scrollLeft = this.scrollLeftStart + walk;
        };
        
        const onPointerUp = () => {
            if (!this.isPointerDown) return;
            this.isPointerDown = false;
            grid.classList.remove('dragging');
            this.snapToNearest();
        };
        
        grid.addEventListener('mousedown', onPointerDown);
        grid.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        
        // Prevent image dragging
        grid.querySelectorAll('img').forEach(img => {
            img.setAttribute('draggable', 'false');
        });
    }
    
    snapToNearest() {
        if (!this.projectsGrid || !this.projects.length) return;
        const cardWidth = this.projects[0].offsetWidth;
        const gap = this.getComputedGap();
        const total = cardWidth + gap;
        const index = Math.round(this.projectsGrid.scrollLeft / total);
        this.currentIndex = Math.max(0, Math.min(index, this.projects.length - 1));
        const left = this.currentIndex * total;
        this.projectsGrid.scrollTo({ left, behavior: 'smooth' });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.scrollToPrevious();
            else if (e.key === 'ArrowRight') this.scrollToNext();
        });
    }
}

// Certificate Modal functionality
class CertificateModal {
    constructor() {
        this.modal = document.getElementById('certificate-modal');
        this.certificateItems = document.querySelectorAll('.certificate-item');
        this.closeBtn = document.getElementById('modal-close');
        this.closeModalBtn = document.getElementById('close-modal');
        this.viewCertificatesBtn = document.getElementById('view-certificates-btn');
        
        // Certificate data
        this.certificates = {
            'topcit-10th': {
                title: '10th TOPCIT Philippines Certificate',
                date: '2024',
                institution: 'WESTERN LEYTE COLLEGE OF ORMOC CITY',
                type: 'Global Certification',
                description: 'Successfully completed the 10th TOPCIT Philippines examination, demonstrating proficiency in information technology concepts and practical applications.',
                image: './images/topcit (1).png',
                downloadUrl: './docs/certificates/topcit-10th.pdf'
            },
            'topcit-11th': {
                title: '11th TOPCIT Philippines Certificate',
                date: '2024',
                institution: 'WESTERN LEYTE COLLEGE OF ORMOC CITY',
                type: 'Global Certification',
                description: 'Achieved certification in the 11th TOPCIT Philippines examination, showcasing advanced IT knowledge and skills.',
                image: './images/topcit (2).png',
                downloadUrl: './docs/certificates/topcit-11th.pdf'
            },
            'topcit-12th': {
                title: '12th TOPCIT Philippines Certificate',
                date: '2024',
                institution: 'WESTERN LEYTE COLLEGE OF ORMOC CITY',
                type: 'Global Certification',
                description: 'Earned the 12th TOPCIT Philippines certificate, validating expertise in information technology and computer science.',
                image: './images/topcit (3).png',
                downloadUrl: './docs/certificates/topcit-12th.pdf'
            },
            'excellence-programming': {
                title: 'Excellence in Programming Award',
                date: '2025',
                institution: 'WESTERN LEYTE COLLEGE OF ORMOC CITY',
                type: 'Academic Award',
                description: 'Recognized for outstanding performance and excellence in programming courses, demonstrating exceptional coding skills and problem-solving abilities.',
                image: './images/certificates/excellence-programming.jpg',
                downloadUrl: './docs/certificates/excellence-programming.pdf'
            },
            'best-capstone': {
                title: 'Best in Capstone Project Award',
                date: '2025',
                institution: 'WESTERN LEYTE COLLEGE OF ORMOC CITY',
                type: 'Academic Award',
                description: 'Awarded for developing the best capstone project, showcasing innovative thinking and technical implementation skills.',
                image: './images/certificates/best-capstone.jpg',
                downloadUrl: './docs/certificates/best-capstone.pdf'
            },
            'leadership-doice': {
                title: 'Leadership Certificate - DOICE',
                date: '2024',
                institution: 'DOICE (CICTE Organization)',
                type: 'Leadership',
                description: 'Served as an officer member in the DOICE organization, demonstrating leadership skills and community involvement.',
                image: './images/certificates/leadership-doice.jpg',
                downloadUrl: './docs/certificates/leadership-doice.pdf'
            },
            'programming-club': {
                title: 'Programming Club Membership',
                date: '2024',
                institution: 'Western Leyte Programming Club',
                type: 'Community',
                description: 'Active member of the Western Leyte Programming Club, contributing to the programming community and participating in various coding activities.',
                image: './images/certificates/programming-club.jpg',
                downloadUrl: './docs/certificates/programming-club.pdf'
            }
        };
        
        this.init();
    }
    
    init() {
        // Add click event to certificate items
        this.certificateItems.forEach(item => {
            item.addEventListener('click', () => {
                const certificateId = item.getAttribute('data-certificate');
                this.openModal(certificateId);
            });
        });
        
        // Add click event to view certificates button
        if (this.viewCertificatesBtn) {
            this.viewCertificatesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Scroll to certificates section
                const certificatesSection = document.getElementById('certificates');
                if (certificatesSection) {
                    certificatesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // Close modal events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(certificateId) {
        const certificate = this.certificates[certificateId];
        if (!certificate || !this.modal) return;
        
        // Update modal content
        document.getElementById('modal-title').textContent = certificate.title;
        document.getElementById('certificate-date').textContent = certificate.date;
        document.getElementById('certificate-institution').textContent = certificate.institution;
        document.getElementById('certificate-type-detail').textContent = certificate.type;
        document.getElementById('certificate-description').textContent = certificate.description;
        
        // Update certificate image
        const certificateImage = document.getElementById('certificate-image');
        certificateImage.src = certificate.image;
        certificateImage.alt = certificate.title;
        
        // Update download link
        const downloadLink = document.getElementById('download-certificate');
        downloadLink.href = certificate.downloadUrl;
        downloadLink.download = `${certificate.title}.pdf`;
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SmoothScroller();
    new MobileMenu();
    new NavbarScroll();
    new ScrollAnimator();
    new ContactForm();
    new TypingAnimation();
    new SkillProgress();
    new ProjectHover();
    new StatsCounter();
    new ProjectSlider();
    new CertificateModal();
});

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .skill-item, .project-card, .timeline-item, .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-item.animate-in, .project-card.animate-in, .timeline-item.animate-in, .stat-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item.skill-animate {
        animation: skillPulse 0.6s ease;
    }
    
    @keyframes skillPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background-color: rgba(17, 24, 39, 0.95);
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .form-message.success {
        background-color: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
    }
    
    .form-message.error {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }
    
    [data-theme="dark"] .form-message.success {
        background-color: #064e3b;
        color: #a7f3d0;
        border: 1px solid #065f46;
    }
    
    [data-theme="dark"] .form-message.error {
        background-color: #7f1d1d;
        color: #fecaca;
        border: 1px solid #991b1b;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--bg-primary);
        border-top: 1px solid var(--border-color);
        padding: 1rem;
        box-shadow: var(--shadow);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style);
