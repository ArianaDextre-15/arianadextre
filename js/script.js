// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all elements
            navLinks.forEach(nl => nl.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show target section
            const targetSection = document.getElementById(link.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// ===== PROJECT DATA =====
const projectData = {
    sorting: {
        title: "Automatic Package Sorting System",
        subtitle: "Modular mechatronic system for automated package classification",
        description: "Final project for the Mechatronic Design course at PUCP. We identified that current package sorting methods are error-prone and require extensive space. Our team designed a modular mechatronic system using barcode detection and independent sorting modules. Each module employs only two actuators (translation and rotation) and adds two sorting destinations, allowing easy expansion in reduced space. The system includes a camera for package identification, presence sensors for classification, and an electronic control box for power management.",
        images: [
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23f0f0f0'/><text x='200' y='130' text-anchor='middle' fill='%236666' font-size='16'>Project Team Photo</text></svg>",
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23e8e8e8'/><text x='200' y='130' text-anchor='middle' fill='%236666' font-size='16'>System Assembly</text></svg>",
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23f5f5f5'/><text x='200' y='130' text-anchor='middle' fill='%236666' font-size='16'>Technical Diagrams</text></svg>"
        ],
        features: [
            "Modular design allowing easy addition of new sorting destinations",
            "Barcode detection system for accurate package identification",
            "Independent control modules with translation and rotation actuators",
            "Compact design - each module adds two sorting destinations",
            "Configurable interface for system control and monitoring"
        ],
        team: "Itala Latorre; Isabel Miranda Salazar; Johan Edward Palomino Delgado; Mitshell Bikrham Ramos Quispe; Alonso de Jesús Velis Jara; Brik Meza (Team Lead)",
        quote: "Beyond technical achievements, this project strengthened our team resilience. We faced numerous challenges and constant changes, learning to adapt and recover from adverse situations - experiencing firsthand the definition of resilience in engineering projects."
    },
    game: {
        title: "Therapeutic Video Game for Rehabilitation",
        subtitle: "Unity-based motor rehabilitation game with EMG integration",
        description: "I'm developing an innovative therapeutic video game in Unity focused on motor rehabilitation for patients with mobility impairments. The project combines game design principles with biomedical engineering to create an engaging rehabilitation experience. I'm responsible for the programming aspects and am currently advancing through specialized modules including game design fundamentals, programming logic, and EMG sensor integration for biofeedback.",
        images: [
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23e8d5e8'/><text x='200' y='130' text-anchor='middle' fill='%23a084ca' font-size='16'>Game Interface</text></svg>",
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23f5f0f5'/><text x='200' y='130' text-anchor='middle' fill='%23a084ca' font-size='16'>EMG Integration</text></svg>"
        ],
        features: [
            "Unity-based game engine for smooth, responsive gameplay",
            "EMG sensor integration for muscle activity monitoring",
            "Adaptive difficulty levels based on patient progress",
            "Real-time biofeedback for motor control training",
            "Progress tracking and rehabilitation analytics",
            "Engaging game mechanics to motivate continued therapy"
        ],
        team: "Individual project with supervision from rehabilitation specialists and biomedical engineering faculty",
        quote: "This project represents the intersection of my passion for technology and healthcare, creating solutions that can genuinely improve patients' quality of life through engaging, data-driven rehabilitation."
    },
    bioprinter: {
        title: "Low-Cost Bioprinter Evaluation Project",
        subtitle: "Comparative analysis of affordable bioprinting solutions for academic labs",
        description: "I'm conducting a comprehensive evaluation of low-cost bioprinters compared to commercial alternatives for academic biofabrication laboratories. This research involves hands-on disassembly, redesign, and adaptation of bioprinter components to optimize them for biological material printing. The project focuses on assessing usability, technical parameters, cost-effectiveness, and overall feasibility for educational and research applications in biomedical engineering programs.",
        images: [
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23e8f4fd'/><text x='200' y='130' text-anchor='middle' fill='%234a90e2' font-size='16'>Bioprinter Hardware</text></svg>",
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23f0f8ff'/><text x='200' y='130' text-anchor='middle' fill='%234a90e2' font-size='16'>Component Analysis</text></svg>"
        ],
        features: [
            "Hardware disassembly and component analysis",
            "Custom component redesign for bioprinting applications",
            "Comparative performance testing vs. commercial systems",
            "Cost-benefit analysis for academic institutions",
            "Usability assessment for educational environments",
            "Technical parameter optimization for biological materials"
        ],
        team: "Research collaboration with bioengineering faculty and lab technicians",
        quote: "Making bioprinting technology accessible to academic institutions is crucial for advancing education and research in tissue engineering and regenerative medicine."
    },
    signals: {
        title: "Biomedical Signal Analysis",
        subtitle: "Advanced algorithms for EMG, ECG, and EEG signal processing",
        description: "Development of sophisticated algorithms and computational tools for analyzing various biomedical signals including electromyography (EMG), electrocardiography (ECG), and electroencephalography (EEG) data. The project focuses on feature extraction techniques, pattern recognition algorithms, and real-time processing capabilities for healthcare applications. This work supports both clinical diagnostics and research applications in biomedical engineering.",
        images: [
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23e8f5e8'/><text x='200' y='130' text-anchor='middle' fill='%2334a853' font-size='16'>Signal Analysis Dashboard</text></svg>",
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23f0f8f0'/><text x='200' y='130' text-anchor='middle' fill='%2334a853' font-size='16'>Algorithm Visualization</text></svg>"
        ],
        features: [
            "Multi-signal processing (EMG, ECG, EEG)",
            "Advanced feature extraction algorithms",
            "Machine learning pattern recognition",
            "Real-time signal processing capabilities",
            "Clinical diagnostic support tools",
            "Research-grade analysis precision",
            "Customizable filtering and preprocessing"
        ],
        team: "Collaboration with signal processing researchers and clinical partners",
        quote: "Biomedical signal analysis is at the heart of modern healthcare technology, enabling us to understand and interpret the body's electrical language for better diagnostics and treatment."
    }
};

// ===== PROJECT MODAL FUNCTIONALITY =====
function initializeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');
    const projectCards = document.querySelectorAll('.project-card');

    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = card.dataset.project;
            const project = projectData[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });

    // Close modal events
    closeModal.addEventListener('click', hideProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideProjectModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideProjectModal();
        }
    });
}

function showProjectModal(project) {
    const modalBody = document.getElementById('modalBody');
    const modal = document.getElementById('projectModal');
    
    modalBody.innerHTML = generateModalContent(project);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function generateModalContent(project) {
    return `
        <h1 class="modal-title">${project.title}</h1>
        <p class="modal-subtitle">${project.subtitle}</p>
        
        <div class="project-details">
            <h3>Project Details</h3>
            <p>${project.description}</p>
        </div>

        <div class="project-images">
            ${project.images.map(img => `
                <div class="project-image">
                    <img src="${img}" alt="Project image" />
                </div>
            `).join('')}
        </div>

        <div class="project-details">
            <h3>Key Features</h3>
            <ul class="features-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="team-info">
            <h3>Team</h3>
            <p>${project.team}</p>
        </div>

        <div class="quote">
            ${project.quote}
        </div>
    `;
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', handleFormSubmission);
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const form = e.target;
    
    // Show loading state
    setFormLoadingState(submitBtn, statusMessage);
    
    // Get form data
    const formData = getFormData(form);
    
    try {
        await sendEmail(formData);
        showSuccessMessage(statusMessage, form);
    } catch (error) {
        handleEmailError(formData, statusMessage);
    } finally {
        resetFormLoadingState(submitBtn);
    }
}

function setFormLoadingState(submitBtn, statusMessage) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    statusMessage.style.display = 'none';
}

function resetFormLoadingState(submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Mensaje';
}

function getFormData(form) {
    const formData = new FormData(form);
    return {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
}

async function sendEmail(data) {
    const response = await fetch('https://formsubmit.co/ariana.dextre@pucp.edu.pe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: formatEmailMessage(data)
        })
    });
    
    if (!response.ok) {
        throw new Error('Error en el envío');
    }
}

function formatEmailMessage(data) {
    return `
    Nombre: ${data.name}
    Email: ${data.email}
    Asunto: ${data.subject}
    
    Mensaje:
    ${data.message}
    `;
}

function showSuccessMessage(statusMessage, form) {
    statusMessage.textContent = '¡Mensaje enviado exitosamente! Te contactaré pronto. 💜';
    statusMessage.className = 'status-message success';
    statusMessage.style.display = 'block';
    form.reset();
}

function handleEmailError(data, statusMessage) {
    // Fallback: open email client
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(formatEmailFallback(data));
    
    window.location.href = `mailto:ariana.dextre@pucp.edu.pe?subject=${subject}&body=${body}`;
    
    statusMessage.textContent = 'Se abrirá tu cliente de correo para enviar el mensaje.';
    statusMessage.className = 'status-message success';
    statusMessage.style.display = 'block';
}

function formatEmailFallback(data) {
    return `
Hola Ariana,

Mi nombre es ${data.name}.

${data.message}

Saludos,
${data.name}
${data.email}
    `;
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .timeline-item, .skill-tag').forEach(el => {
        prepareElementForAnimation(el);
        observer.observe(el);
    });

    // Skills animation
    animateSkills();
    
    // Contact links hover effects
    initializeContactLinksHover();
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

function prepareElementForAnimation(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
}

function animateSkills() {
    setTimeout(() => {
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }, 500);
}

function initializeContactLinksHover() {
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runInitialization);
    } else {
        runInitialization();
    }
}

function runInitialization() {
    console.log('Initializing Ariana Dextre Portfolio...');
    
    try {
        initializeNavigation();
        initializeProjectModal();
        initializeContactForm();
        initializeAnimations();
        
        console.log('Portfolio initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Start the application
initializeApp();
