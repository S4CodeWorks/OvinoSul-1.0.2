// Main application module
import { HeaderController } from './modules/header.js';
import { HeroController } from './modules/hero.js';
import { FeaturesController } from './modules/features.js';
import { AnimationController } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize controllers
    const headerController = new HeaderController();
    const heroController = new HeroController();
    const featuresController = new FeaturesController();
    const animationController = new AnimationController();
    
    // Initialize all components
    headerController.init();
    heroController.init();
    featuresController.init();
    animationController.init();
    
    // Handle escape key globally
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            headerController.closeMobileMenu();
        }
    });
});