/* =====================================================
   PROJECTS MANAGER COMPONENT
   ===================================================== */

/**
 * Load projects dynamically from JSON
 */
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error('No se pudieron cargar los proyectos');
        }
        
        const projects = await response.json();
        
        // Clear container
        projectsGrid.innerHTML = '';
        
        // Create and add each project
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
        // Initialize filters after loading projects
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

/**
 * Create an individual project card
 * @param {Object} project - Project data object
 * @returns {HTMLElement} - Project card element
 */
function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.dataset.category = project.category;
    
    // Create image (with or without wrapper)
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
    
    // Create tags
    const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
    
    // Create actions
    const actionsHTML = project.actions.map(action => 
        `<a href="${action.url}" target="${action.target}">${action.text}</a>`
    ).join('');
    
    // Assemble complete HTML
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

/**
 * Initialize project filters functionality
 */
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

/**
 * Initialize projects manager component
 */
function initializeProjectsManager() {
    loadProjects();
}

// Export functions for use in other modules
export { initializeProjectsManager, loadProjects, createProjectCard };