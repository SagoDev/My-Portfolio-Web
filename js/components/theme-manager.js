/* =====================================================
   THEME MANAGER COMPONENT
   ===================================================== */

// DOM elements
let toggleBtn, themeIcon, rootElement, mobileThemeBtn, mobileIcon;

/**
 * Initialize DOM elements for theme management
 */
function initializeThemeElements() {
    toggleBtn = document.getElementById("theme-toggle");
    themeIcon = document.getElementById("theme-icon");
    rootElement = document.documentElement;
    mobileThemeBtn = document.querySelector(".theme-btn-mobile");
    mobileIcon = mobileThemeBtn ? mobileThemeBtn.querySelector("i") : null;
}

/**
 * Update theme icon based on current theme
 * @param {string} theme - Current theme ('dark' or 'light')
 */
function updateThemeIcon(theme) {
    const isDark = theme === "dark";

    themeIcon.classList.toggle("bi-moon-fill", !isDark);
    themeIcon.classList.toggle("bi-brightness-high-fill", isDark);

    if (mobileIcon) {
        mobileIcon.classList.toggle("bi-moon-fill", !isDark);
        mobileIcon.classList.toggle("bi-brightness-high-fill", isDark);
    }
}

/**
 * Load saved theme from localStorage
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
        rootElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    }
}

/**
 * Setup desktop theme toggle button
 */
function setupDesktopThemeToggle() {
    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.add("rotate");

        const isDark = rootElement.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";

        rootElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        updateThemeIcon(newTheme);

        setTimeout(() => {
            toggleBtn.classList.remove("rotate");
        }, 400);
    });
}

/**
 * Setup mobile theme toggle button
 */
function setupMobileThemeToggle() {
    if (mobileThemeBtn) {
        mobileThemeBtn.addEventListener("click", () => {
            toggleBtn.click();
        });
    }
}

/**
 * Initialize theme manager component
 */
function initializeThemeManager() {
    initializeThemeElements();
    loadSavedTheme();
    setupDesktopThemeToggle();
    setupMobileThemeToggle();
}

// Export functions for use in other modules
export { initializeThemeManager, updateThemeIcon };