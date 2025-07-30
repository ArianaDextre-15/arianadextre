// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(nl => nl.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        link.classList.add('active');
        
        const targetSection = document.getElementById(link.dataset.section);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Project cards functionality - now redirects to individual pages
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.dataset.project;
        
        // Redirect to individual project page
        window.location.href = `projects/${projectId}.html`;
    });
});

// Form submission functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const statusMessage = document.getElementById('statusMessage');
        const form = e.target;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        statusMessage.style.display = 'none';
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        try {
            // Send email using FormSubmit (alternative to EmailJS)
            const response = await fetch('https://formsubmit.co/ariana.dextre@pucp.edu.pe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: `
                    Nombre: ${data.name}
                    Email: ${data.email}
                    Asunto: ${data.subject}
                    
                    Mensaje:
                    ${data.message}
                    `
                })
            });
            
            if (response.ok) {
                statusMessage.textContent = '¡Mensaje enviado exitosamente! Te contactaré pronto. 💜';
                statusMessage.className = 'status-message success';
                statusMessage.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
            
        } catch (error) {
            // Fallback: open email client
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(`
Hola Ariana,

Mi nombre es ${data.name}.

${data.message}

Saludos,
${data.name}
${data.email}
            `);
            
            window.location.href = `mailto:ariana.dextre@pucp.edu.pe?subject=${subject}&body=${body}`;
            
            statusMessage.textContent = 'Se abrirá tu cliente de correo para enviar el mensaje.';
            statusMessage.className = 'status-message success';
            statusMessage.style.display = 'block';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensaje';
        }
    });
}

// Smooth animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to elements
document.querySelectorAll('.project-card, .timeline-item, .skill-tag, .feature-card, .tech-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Skills animation
setTimeout(() => {
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}, 500);

// Contact links hover effects
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Tech stack animation for project pages and technical showcase
document.querySelectorAll('.tech-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100 + 300);
});

// Feature cards hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 15px 35px rgba(160, 132, 202, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
    });
});
// Technical Showcase mini-project navigation
document.addEventListener('DOMContentLoaded', function() {
    const miniProjectCards = document.querySelectorAll('.mini-project-card');
    
    miniProjectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.dataset.category;
            const projectId = card.dataset.project;
            
            // Redirect to individual mini-project page
            window.location.href = `technical-showcase/${category}/${projectId}.html`;
        });
    });
    
    // Enhanced navigation for Technical Showcase pages
    initializeTechnicalShowcaseNavigation();
    initialize3DViewer();
});

// Enhanced navigation for Technical Showcase pages
function initializeTechnicalShowcaseNavigation() {
    // Check if we're on a technical showcase page
    const currentPath = window.location.pathname;
    const isTechnicalShowcase = currentPath.includes('technical-showcase');
    
    if (isTechnicalShowcase) {
        // Update navigation links to go back to main site
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const section = link.dataset.section;
            if (section && section !== 'technical-showcase') {
                // Update href to go back to main site with hash
                link.href = `../../index.html#${section}`;
            } else if (link.textContent.includes('Technical Showcase')) {
                link.href = `../../index.html#technical-showcase`;
            }
        });
        
        // Add click handler for back to showcase button
        const backToShowcase = document.querySelector('.back-to-showcase');
        if (backToShowcase) {
            backToShowcase.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '../../index.html#technical-showcase';
            });
        }
    }
}

// 3D Model viewer placeholder interaction
function initialize3DViewer() {
    const modelPlaceholder = document.querySelector('.model-placeholder');
    
    if (modelPlaceholder) {
        modelPlaceholder.addEventListener('click', () => {
            // Add rotation animation
            modelPlaceholder.style.transform = 'rotateY(360deg)';
            modelPlaceholder.style.transition = 'transform 1s ease';
            
            setTimeout(() => {
                modelPlaceholder.style.transform = 'rotateY(0deg)';
            }, 1000);
        });
    }
}
