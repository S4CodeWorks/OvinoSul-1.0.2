// Features section functionality
export class FeaturesController {
    constructor() {
        this.carousel = document.querySelector('.features-carousel');
        this.track = document.querySelector('.features-track');
    }

    init() {
        this.preventInteraction();
    }

    preventInteraction() {
        // Prevent any interaction that could pause the carousel
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', (e) => {
                e.preventDefault();
            });
            
            this.carousel.addEventListener('mouseleave', (e) => {
                e.preventDefault();
            });
            
            this.carousel.addEventListener('touchstart', (e) => {
                e.preventDefault();
            });
            
            this.carousel.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
        }
    }
}