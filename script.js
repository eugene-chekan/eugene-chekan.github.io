// Content population
function populateContent() {
    // Populate simple text content
    document.querySelectorAll('[data-content]').forEach(element => {
        const path = element.getAttribute('data-content').split('.');
        let value = content;
        for (const key of path) {
            value = value[key];
        }
        
        if (element.getAttribute('data-type') === 'href') {
            element.href = value;
        } else if (element.getAttribute('data-type') === 'mailto') {
            element.href = `mailto:${value}`;
        } else {
            element.textContent = value;
        }
    });

    // Populate experience timeline
    const timeline = document.getElementById('experience-timeline');
    content.experience.forEach(exp => {
        const expElement = document.createElement('div');
        expElement.className = 'timeline-item';
        expElement.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="timeline-period">${exp.period}</p>
                <p>${exp.description}</p>
                <div class="technologies">
                    ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        timeline.appendChild(expElement);
    });

    // Populate skills grid
    const skillsGrid = document.getElementById('skills-grid');
    content.skills.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';
        categoryElement.innerHTML = `
            <h3>${category.category}</h3>
            <div class="skill-items">
                ${category.items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        skillsGrid.appendChild(categoryElement);
    });

    // Populate projects grid
    const projectsGrid = document.getElementById('projects-grid');
    content.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
        `;
        projectsGrid.appendChild(projectElement);
    });
}

// Call populateContent when the DOM is loaded
document.addEventListener('DOMContentLoaded', populateContent);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1 && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
}); 