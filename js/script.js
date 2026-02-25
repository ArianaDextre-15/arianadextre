// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjectCards();
    initializeContactForm();
    initializeAnimations();
    initializeTechnicalShowcaseNavigation();
    initialize3DViewer();
    initializeShrinkingHeader(); // NUEVA FUNCIÓN
    
    // Handle navigation from hash on page load
    handleHashNavigation();
});

// NUEVA FUNCIÓN: Initialize shrinking header
function initializeShrinkingHeader() {
    const header = document.querySelector('.professional-header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    
    if (!header || !nav || !main) return;
    
    // Check current section and apply header state
    const checkHeaderState = () => {
        const homeSection = document.getElementById('home');
        const isHomeActive = homeSection && homeSection.classList.contains('active');
        
        if (isHomeActive) {
            header.classList.remove('small');
            nav.classList.remove('moved-up');
            main.classList.remove('header-small');
        } else {
            header.classList.add('small');
            nav.classList.add('moved-up');
            main.classList.add('header-small');
        }
    };
    
    // Check on load
    checkHeaderState();
    
    // Check whenever a section changes
    const observer = new MutationObserver(checkHeaderState);
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    });
}

// Initialize main navigation (ACTUALIZADO)
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.professional-header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = link.dataset.section;
            
            // If we're on a project page, navigate back to main site
            if (window.location.pathname.includes('/projects/')) {
                window.location.href = `../index.html#${targetSection}`;
                return;
            }
            
            // If we're on a technical showcase page, navigate back to main site
            if (window.location.pathname.includes('/technical-showcase/')) {
                window.location.href = `../../index.html#${targetSection}`;
                return;
            }
            
            // Normal navigation within the same page
            navLinks.forEach(nl => nl.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            link.classList.add('active');
            
            const targetSectionElement = document.getElementById(targetSection);
            if (targetSectionElement) {
                targetSectionElement.classList.add('active');
                
                // HEADER SHRINKING LOGIC
                if (targetSection === 'home') {
                    header.classList.remove('small');
                    nav.classList.remove('moved-up');
                    main.classList.remove('header-small');
                } else {
                    header.classList.add('small');
                    nav.classList.add('moved-up');
                    main.classList.add('header-small');
                }
                
                // Update URL hash
                history.pushState(null, null, `#${targetSection}`);
                
                // Smooth scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Handle hash navigation on page load and back/forward buttons (ACTUALIZADO)
function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    const header = document.querySelector('.professional-header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    
    if (hash) {
        const targetSection = document.getElementById(hash);
        const targetNavLink = document.querySelector(`[data-section="${hash}"]`);
        
        if (targetSection && targetNavLink) {
            // Remove active classes
            document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
            document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
            
            // Add active classes
            targetNavLink.classList.add('active');
            targetSection.classList.add('active');
            
            // HEADER SHRINKING LOGIC
            if (hash === 'home') {
                header.classList.remove('small');
                nav.classList.remove('moved-up');
                main.classList.remove('header-small');
            } else {
                header.classList.add('small');
                nav.classList.add('moved-up');
                main.classList.add('header-small');
            }
        }
    } else {
        // If no hash, show home by default
        if (header && nav && main) {
            header.classList.remove('small');
            nav.classList.remove('moved-up');
            main.classList.remove('header-small');
        }
    }
}

// Listen for hash changes (back/forward buttons)
window.addEventListener('hashchange', handleHashNavigation);

// Initialize project cards functionality
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = card.dataset.project;
            
            // Redirect to individual project page
            window.location.href = `projects/${projectId}.html`;
        });
    });
}

// Initialize contact form
function initializeContactForm() {
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
}

// Initialize animations
function initializeAnimations() {
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
    document.querySelectorAll('.project-card, .timeline-item, .skill-tag, .feature-card, .feature-card-clean, .tech-item, .tech-item-clean').forEach(el => {
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
    document.querySelectorAll('.tech-item, .tech-item-clean').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });

    // Feature cards hover effects
    document.querySelectorAll('.feature-card, .feature-card-clean').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('feature-card-clean')) {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 8px 20px rgba(160, 132, 202, 0.1)';
            } else {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 15px 35px rgba(160, 132, 202, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('feature-card-clean')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            } else {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
            }
        });
    });
}

// Technical Showcase mini-project navigation
function initializeTechnicalShowcaseNavigation() {
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

// Project-specific navigation for individual project pages
function initializeProjectPageNavigation() {
    // Check if we're on a project page
    const currentPath = window.location.pathname;
    const isProjectPage = currentPath.includes('/projects/');
    
    if (isProjectPage) {
        // Update all navigation links to go back to main site
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const section = link.dataset.section;
            if (section) {
                // Update href to go back to main site with the correct hash
                link.href = `../index.html#${section}`;
            }
        });
        
        // Handle back button
        const backButton = document.querySelector('.back-button-clean a');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '../index.html#research-projects';
            });
        }
    }
}

// Initialize project page navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectPageNavigation();
});
