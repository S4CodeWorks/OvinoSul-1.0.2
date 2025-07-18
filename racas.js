// Breeds page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for breed management sections
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const parentCard = this.closest('.breed-card');
            
            // Remove active class from all tabs in this card
            parentCard.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
            parentCard.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            parentCard.querySelector(`#${tabId}`).classList.add('active');
        });
    });
    
    // Smooth scrolling for breed cards
    const breedCards = document.querySelectorAll('.breed-card');
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    breedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});