// Main application script - Professional and Modern
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    function initializeApp() {
        // Initialize all components
        initializeHeader();
        initializeHero();
        initializeFeatures();
        initializeAnimations();
        
        console.log('OvinoSul - Site initialized successfully');
    }

    // Header functionality
    function initializeHeader() {
        const header = document.querySelector('.header');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!header || !mobileMenuToggle || !nav) return;

        // Scroll handler for header
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });

        // Mobile menu toggle
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = nav.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        function openMobileMenu() {
            nav.classList.add('active');
            mobileMenuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            
            // Animate menu items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 + (index * 100));
            });
        }

        function closeMobileMenu() {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            
            // Reset menu items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Smooth scroll for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Ripple effects
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                createRipple(e, link);
            });
        });

        function createRipple(e, element) {
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
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        }

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Initial scroll check
        updateHeader();
    }

    // Hero section functionality
    function initializeHero() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const heroImage = document.querySelector('.hero-image');
        
        if (!searchInput || !searchBtn) return;

        // Simple search functionality
        const searchData = [
            { name: 'Texel', type: 'raca', description: 'Raça holandesa de aptidão para carne', url: 'racas.html#texel' },
            { name: 'Corriedale', type: 'raca', description: 'Raça de dupla aptidão tradicional no RS', url: 'racas.html#corriedale' },
            { name: 'Dorper', type: 'raca', description: 'Raça deslanada africana muito rústica', url: 'racas.html#dorper' },
            { name: 'Brucelose', type: 'vacina', description: 'Vacina obrigatória contra brucelose', url: 'vacinas.html#brucelose' },
            { name: 'Clostridioses', type: 'vacina', description: 'Previne doenças clostridiais fatais', url: 'vacinas.html#clostridioses' },
            { name: 'Raiva', type: 'vacina', description: 'Vacina obrigatória contra raiva', url: 'vacinas.html#raiva' }
        ];

        let searchResultsContainer = null;

        function createSearchResults() {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.className = 'search-results';
            searchInput.parentElement.appendChild(searchResultsContainer);
        }

        function performSearch(query) {
            if (!query.trim()) {
                hideSearchResults();
                return;
            }

            const results = searchData.filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );

            displaySearchResults(results);
        }

        function displaySearchResults(results) {
            if (!searchResultsContainer) createSearchResults();

            if (results.length === 0) {
                searchResultsContainer.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
            } else {
                searchResultsContainer.innerHTML = results.map(result => `
                    <a href="${result.url}" class="search-result-item">
                        <div class="search-result-title">${result.name}</div>
                        <div class="search-result-description">${result.description}</div>
                    </a>
                `).join('');
            }

            searchResultsContainer.classList.add('show');
        }

        function hideSearchResults() {
            if (searchResultsContainer) {
                searchResultsContainer.classList.remove('show');
            }
        }

        // Search event listeners
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });

        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchBtn.contains(e.target)) {
                hideSearchResults();
            }
        });

        // Parallax effect for hero image
        if (heroImage && window.innerWidth > 768) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroImage.style.transform = `translateY(${parallax}px) scale(1.02)`;
            }, { passive: true });
        }
    }

    // Features section functionality
    function initializeFeatures() {
        const carousel = document.querySelector('.features-carousel');
        
        if (!carousel) return;

        // Prevent interaction that could pause the carousel
        carousel.addEventListener('mouseenter', function(e) {
            e.preventDefault();
        });
        
        carousel.addEventListener('mouseleave', function(e) {
            e.preventDefault();
        });
        
        carousel.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        carousel.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    }

    // Animation controller
    function initializeAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        // Button hover animations
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-2px)';
                }
            });
            
            btn.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });

        // Intersection Observer for fade-in animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            const animatedElements = document.querySelectorAll('.features-header, .features-cta, .feature-card');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }

    // Performance optimizations
    function optimizePerformance() {
        // Lazy load images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }

        // Prefetch important pages
        const importantLinks = ['racas.html', 'vacinas.html'];
        importantLinks.forEach(link => {
            const linkEl = document.createElement('link');
            linkEl.rel = 'prefetch';
            linkEl.href = link;
            document.head.appendChild(linkEl);
        });
    }

    // Call performance optimizations
    requestIdleCallback ? requestIdleCallback(optimizePerformance) : setTimeout(optimizePerformance, 100);

})();