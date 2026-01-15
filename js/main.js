/* =====================================================
   MAIN APPLICATION ENTRY POINT
   ===================================================== */

// Import component modules
import { initializeMobileNav } from './components/mobile-nav.js';
import { initializeThemeManager } from './components/theme-manager.js';
import { initializeProjectsManager } from './components/projects-manager.js';

/**
 * Initialize all application components
 */
function initializeApp() {
    // Initialize mobile navigation
    initializeMobileNav();
    
    // Initialize theme manager
    initializeThemeManager();
    
    // Initialize projects manager
    initializeProjectsManager();
    
    console.log('Portfolio Web - All components initialized');
}

/**
 * DOM ready event handler
 */
function onDOMReady() {
    initializeApp();
}

// Initialize application when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDOMReady);
} else {
    onDOMReady();
}

// Make toggleMenu globally available for inline onclick handlers
window.toggleMenu = () => {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");
};