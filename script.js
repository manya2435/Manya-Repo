// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    '.project-card, .achievement-card, .skill-category, .timeline-item, .about-content'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Display success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 1001;
        animation: slideIn 0.5s ease;
    `;
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <strong>Message Sent Successfully!</strong>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideIn 0.5s ease reverse';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 5000);
    
    // Reset form
    contactForm.reset();
    
    // Log form data (in a real application, this would be sent to a server)
    console.log('Form Data:', formData);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.style.color = '');
            if (navLink) {
                navLink.style.color = '#6366f1';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Extract text content while preserving structure
    const prefix = "Hi, I'm ";
    const name = "K M Manya";
    const fullText = prefix + name;
    
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < fullText.length) {
            if (i < prefix.length) {
                // Typing the prefix
                heroTitle.innerHTML = fullText.substring(0, i + 1);
            } else {
                // Typing the name with highlight
                const typedName = fullText.substring(prefix.length, i + 1);
                heroTitle.innerHTML = prefix + '<span class="highlight">' + typedName + '</span>';
            }
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Skill tags hover effect
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project cards 3D tilt effect
const projectCards = document.querySelectorAll('.project-card, .achievement-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Initialize particles effect for hero section (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Uncomment the line below to enable particles effect
// createParticles();

console.log('Portfolio website loaded successfully! 🚀');

