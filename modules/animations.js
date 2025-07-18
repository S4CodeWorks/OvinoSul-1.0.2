// Animation and interaction controller
export class AnimationController {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
    }

    init() {
        this.setupButtonAnimations();
    }

    setupButtonAnimations() {
        // Simple button hover effects
        this.buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }
}