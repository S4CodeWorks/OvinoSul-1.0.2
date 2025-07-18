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

    // Enhanced Header functionality
    function initializeHeader() {
        const header = document.querySelector('.header');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!header || !mobileMenuToggle || !nav) return;

        // Scroll handler for header with enhanced glassmorphism
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
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

        // Enhanced mobile menu toggle with modern animations
        let isMenuOpen = false;

        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        function openMobileMenu() {
            isMenuOpen = true;
            nav.classList.add('mobile-nav-open');
            mobileMenuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileMenuToggle.setAttribute('aria-label', 'Fechar menu');
            
            // Add backdrop blur effect to body
            document.body.style.backdropFilter = 'blur(4px)';
            
            // Focus management
            setTimeout(() => {
                const firstNavLink = nav.querySelector('.nav-link');
                if (firstNavLink) firstNavLink.focus();
            }, 100);
        }

        function closeMobileMenu() {
            isMenuOpen = false;
            nav.classList.remove('mobile-nav-open');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.backdropFilter = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Abrir menu');
        }

        // Close mobile menu when clicking outside or pressing Escape
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
                mobileMenuToggle.focus();
            }
        });

        // Enhanced nav link interactions with ripple effect
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (isMenuOpen) {
                    closeMobileMenu();
                }
                
                // Add modern ripple effect
                createRipple(e, this);
            });

            // Add hover sound effect (optional)
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Modern ripple effect function
        function createRipple(e, element) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && isMenuOpen) {
                closeMobileMenu();
            }
        });

        // Initialize active nav link based on current page
        function setActiveNavLink() {
            const currentPath = window.location.pathname;
            const currentHash = window.location.hash;
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                const href = link.getAttribute('href');
                if (href === currentPath || 
                    (currentPath.includes('index.html') && href.startsWith('#')) ||
                    (currentPath === '/' && href.startsWith('#')) ||
                    href === currentPath + '.html') {
                    link.classList.add('active');
                }
            });
        }

        setActiveNavLink();

        // Smooth scroll for anchor links
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
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