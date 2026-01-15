/* =====================================================
   MOBILE NAVIGATION COMPONENT
   ===================================================== */

/**
 * Toggle mobile menu open/closed state
 */
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");
}

/**
 * Close mobile menu when clicking outside
 */
function setupMobileMenuCloseListener() {
    document.addEventListener("click", (event) => {
        const menu = document.getElementById("mobile-menu");
        const fab = document.querySelector(".mobile-fab");

        if (
            menu &&
            fab &&
            menu.classList.contains("open") &&
            !menu.contains(event.target) &&
            !fab.contains(event.target)
        ) {
            menu.classList.remove("open");
        }
    });
}

/**
 * Initialize mobile navigation component
 */
function initializeMobileNav() {
    setupMobileMenuCloseListener();
}

// Export functions for use in other modules
export { toggleMenu, initializeMobileNav };