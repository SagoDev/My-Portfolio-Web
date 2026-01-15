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

/* =========================
   PROJECTS SECTION
========================= */

// Cargar proyectos dinámicamente
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error('No se pudieron cargar los proyectos');
        }

        const projects = await response.json();

        // Limpiar el contenedor
        projectsGrid.innerHTML = '';

        // Crear y añadir cada proyecto
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        // Inicializar los filtros después de cargar los proyectos
        initializeProjectFilters();

    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="color: var(--color-grey-700);">No se pudieron cargar los proyectos. Por favor, intenta más tarde.</p>
            </div>
        `;
    }
}

// Crear una tarjeta de proyecto individual
function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.dataset.category = project.category;

    // Crear la imagen (con o sin wrapper)
    let imageHTML = '';
    if (project.hasImageWrapper) {
        imageHTML = `
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.alt}">
            </div>
        `;
    } else {
        imageHTML = `<img src="${project.image}" alt="${project.alt}">`;
    }

    // Crear los tags
    const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

    // Crear las acciones
    const actionsHTML = project.actions.map(action =>
        `<a href="${action.url}" target="${action.target}">${action.text}</a>`
    ).join('');

    // Ensamblar el HTML completo
    article.innerHTML = `
        ${imageHTML}
        <div class="project-content">
            <h3>${project.title}</h3>
            <p class="project-impact">${project.description}</p>
            <div class="project-tags">
                ${tagsHTML}
            </div>
            <div class="project-actions">
                ${actionsHTML}
            </div>
        </div>
    `;

    return article;
}

// Inicializar los filtros de proyectos
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            projects.forEach(project => {
                const category = project.dataset.category;
                project.style.display =
                    filter === "all" || category === filter
                        ? "flex"
                        : "none";
            });
        });
    });
}

// Cargar los proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProjects);