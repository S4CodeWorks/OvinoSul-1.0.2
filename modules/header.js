// Header navigation functionality
export class HeaderController {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
    }

    init() {
        this.setupScrollHandler();
        this.setupMobileMenu();
        this.setupNavigation();
        this.setupRippleEffects();
        this.initialScrollCheck();
    }

    setupScrollHandler() {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 80) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            this.lastScrollY = currentScrollY;
        };

        const requestTick = () => {
            if (!this.ticking) {
                requestAnimationFrame(handleScroll);
                this.ticking = true;
            }
        };

        window.addEventListener('scroll', () => {
            requestTick();
            this.ticking = false;
        });
    }

    setupMobileMenu() {
        this.mobileMenuToggle.addEventListener('click', () => {
            const isActive = this.nav.classList.contains('active');
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }

    openMobileMenu() {
        this.nav.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        
        // Add blur effect to header background
        this.header.style.backdropFilter = 'blur(20px)';
        this.header.style.webkitBackdropFilter = 'blur(20px)';
        
        // Animate menu items with staggered delay
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }

    closeMobileMenu() {
        this.nav.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Reset header blur
        this.header.style.backdropFilter = '';
        this.header.style.webkitBackdropFilter = '';
        
        // Reset menu items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });
    }

    setupNavigation() {
        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = this.header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Hover effects for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    link.style.transform = 'translateY(-2px)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    link.style.transform = 'translateY(0)';
                }
            });
        });
    }

    setupRippleEffects() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.createRipple(e, link);
            });
        });
    }

    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initialScrollCheck() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 80) {
            this.header.classList.add('scrolled');
        }
    }
}