// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const downloadBtn = document.getElementById('download-cv');
const contactBtn = document.getElementById('contact-btn');
const contactForm = document.getElementById('contact-form');

// Loading Screen
const loadingScreen = document.getElementById('loading-screen');

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Skill Progress Animation
function animateSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percent = progressBar.getAttribute('data-percent');
                progressBar.style.width = percent + '%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize skill progress animation
animateSkillProgress();

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe individual cards
document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    }
});

// Typing Effect for Hero Role
const heroRole = document.querySelector('.hero-role');
const roleText = heroRole.textContent;
heroRole.textContent = '';

let roleIndex = 0;
function typeRole() {
    if (roleIndex < roleText.length) {
        heroRole.textContent += roleText.charAt(roleIndex);
        roleIndex++;
        setTimeout(typeRole, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeRole, 1000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Download Resume Function
downloadBtn.addEventListener('click', () => {
    // Check if jsPDF is loaded
    if (typeof window.jsPDF === 'undefined') {
        // Load jsPDF dynamically if not already loaded
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            generatePDF();
        };
        document.head.appendChild(script);
    } else {
        generatePDF();
    }
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font and size
    doc.setFont('helvetica');
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    
    // Title
    doc.text('NITHISH', 105, 20, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor(52, 73, 94);
    doc.text('Software Developer Portfolio', 105, 30, { align: 'center' });
    
    // Line separator
    doc.setDrawColor(52, 73, 94);
    doc.line(20, 35, 190, 35);
    
    let yPosition = 50;
    
    // About Me Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('ABOUT ME', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    const aboutText = "I'm Nithish, a passionate Software Developer with expertise in full-stack development. I enjoy building scalable applications, solving complex problems, and continuously learning new technologies.";
    const aboutLines = doc.splitTextToSize(aboutText, 170);
    doc.text(aboutLines, 20, yPosition);
    yPosition += aboutLines.length * 5 + 10;
    
    // Education Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('EDUCATION', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    
    // Bachelor's Degree
    doc.setFont('helvetica', 'bold');
    doc.text('Bachelor\'s Degree in Computer Science', 20, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('SRM Institute of Science and Technology (2021-2025)', 20, yPosition);
    yPosition += 5;
    doc.text('Computer Science Major', 20, yPosition);
    yPosition += 10;
    
    // High School
    doc.setFont('helvetica', 'bold');
    doc.text('High School Diploma', 20, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Your High School Name (2019-2021)', 20, yPosition);
    yPosition += 5;
    doc.text('Science Stream', 20, yPosition);
    yPosition += 10;
    
    // Certifications
    doc.setFont('helvetica', 'bold');
    doc.text('Certifications & Training', 20, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Various Online Platforms (2021-Present)', 20, yPosition);
    yPosition += 5;
    doc.text('Web Development & Programming', 20, yPosition);
    yPosition += 15;
    
    // Skills Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('SKILLS', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    
    const skills = [
        'React.js: 85% (Advanced)',
        'JavaScript/TypeScript: 80% (Advanced)',
        'Python: 75% (Intermediate)',
        'Node.js & Express: 70% (Intermediate)',
        'Git & GitHub: 80% (Advanced)'
    ];
    
    skills.forEach(skill => {
        doc.text(skill, 20, yPosition);
        yPosition += 5;
    });
    yPosition += 10;
    
    // Projects Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('PROJECTS', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    
    // Project 1
    doc.setFont('helvetica', 'bold');
    doc.text('1. Portfolio Website', 20, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    const project1Desc = "Personal portfolio website built with modern web technologies, featuring responsive design and interactive animations.";
    const project1Lines = doc.splitTextToSize(project1Desc, 170);
    doc.text(project1Lines, 20, yPosition);
    yPosition += project1Lines.length * 5 + 5;
    doc.text('Technologies: HTML, CSS, JavaScript', 20, yPosition);
    yPosition += 10;
    
    // Project 2
    doc.setFont('helvetica', 'bold');
    doc.text('2. Task Management App', 20, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    const project2Desc = "Real-time collaborative task management application with drag-and-drop interface, team features, and progress tracking.";
    const project2Lines = doc.splitTextToSize(project2Desc, 170);
    doc.text(project2Lines, 20, yPosition);
    yPosition += project2Lines.length * 5 + 5;
    doc.text('Technologies: React, Firebase, TypeScript', 20, yPosition);
    yPosition += 10;
    
    // Project 3
    doc.setFont('helvetica', 'bold');
    doc.text('3. AI Chat Application', 20, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    const project3Desc = "Intelligent chatbot application with natural language processing, sentiment analysis, and customizable responses.";
    const project3Lines = doc.splitTextToSize(project3Desc, 170);
    doc.text(project3Lines, 20, yPosition);
    yPosition += project3Lines.length * 5 + 5;
    doc.text('Technologies: Python, Flask, OpenAI API', 20, yPosition);
    yPosition += 15;
    
    // Contact Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('CONTACT', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    doc.text('Email: nithishk@srmasc.ac.in', 20, yPosition);
    yPosition += 5;
    doc.text('Phone: +91 (XXX) XXX-XXXX', 20, yPosition);
    yPosition += 5;
    doc.text('Location: Chennai, Tamil Nadu', 20, yPosition);
    yPosition += 15;
    
    // Experience Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('EXPERIENCE', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    doc.text('• 2+ Years of experience in software development', 20, yPosition);
    yPosition += 5;
    doc.text('• 15+ Projects completed', 20, yPosition);
    yPosition += 5;
    doc.text('• 6+ Technologies mastered', 20, yPosition);
    
    // Save the PDF
    doc.save('Nithish_Resume.pdf');
    showNotification('Resume downloaded as PDF successfully!', 'success');
}

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    if (type === 'success') {
        notification.style.background = 'var(--primary)';
    } else {
        notification.style.background = '#ff6b6b';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced Card Interactions
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to Contact Button
contactBtn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Performance Optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations are already optimized
}, 16));