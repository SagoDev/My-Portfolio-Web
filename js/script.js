/* =====================================================
   MOBILE NAV – Floating Button
===================================================== */

function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");
}

/* Close mobile menu when clicking outside */
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

/* =====================================================
   DARK MODE
===================================================== */

const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const rootElement = document.documentElement;

const mobileThemeBtn = document.querySelector(".theme-btn-mobile");
const mobileIcon = mobileThemeBtn
    ? mobileThemeBtn.querySelector("i")
    : null;

/* =========================
   THEME ICON UPDATE
========================= */

function updateThemeIcon(theme) {
    const isDark = theme === "dark";

    themeIcon.classList.toggle("bi-moon-fill", !isDark);
    themeIcon.classList.toggle("bi-brightness-high-fill", isDark);

    if (mobileIcon) {
        mobileIcon.classList.toggle("bi-moon-fill", !isDark);
        mobileIcon.classList.toggle("bi-brightness-high-fill", isDark);
    }
}

/* =========================
   INITIAL LOAD
========================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    rootElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

/* =========================
   TOGGLE ACTION (Desktop)
========================= */

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

/* =========================
   MOBILE DELEGATION
========================= */

if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener("click", () => {
        toggleBtn.click();
    });
}
