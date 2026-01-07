// Portfolio Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initTypingEffect();
    initParticleSystem();
    initFormHandling();
    initMobileMenu();
    initCertificateModal();
    initCelebrationModal(); // New call
    initInteractiveGreeting();
    initThemeToggle();
    initProgressChart();
    initContentLoader();
    initDownloadCV();
    initParticleCanvas();
    initInteractiveCursor();
    initEnhancedScrollAnimations();
    initCardTiltEffect();
    initFellowshipImage();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar background on scroll (theme-aware)
    const applyNavbarStyle = () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const scrolled = window.scrollY > 100;
        if (isLight) {
            navbar.style.background = scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.96)';
            navbar.style.boxShadow = scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : '0 1px 8px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = scrolled ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = scrolled ? '0 2px 20px rgba(0, 212, 255, 0.3)' : 'none';
        }
    };
    window.addEventListener('scroll', applyNavbarStyle);
    // Apply on load
    applyNavbarStyle();
    // React to theme attribute changes
    const observer = new MutationObserver(applyNavbarStyle);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .education-card, .project-card, .timeline-item, .achievement-item, .contact-item, .certificate-item, .celebration-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const title = document.querySelector('.hero-title .glitch');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Enhanced particle system
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(particlesContainer);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        z-index: 1;
    `;
    
    container.appendChild(particle);
}

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
        text-shadow: 0 0 10px var(--glow-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(10px);
            border-top: 1px solid var(--border-color);
            padding: 2rem;
            gap: 1.5rem;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileStyles);

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.tech-background > *');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'Loading...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--primary-color);
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            z-index: 10001;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(loadedStyles);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Cursor trail effect disabled

// Certificate Modal functionality
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    let currentCertificateIndex = 0;
    
    // Open modal when clicking on certificate
    certificateItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentCertificateIndex = index;
            openModal(index);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentCertificateIndex = (currentCertificateIndex - 1 + certificateItems.length) % certificateItems.length;
        updateModalImage(currentCertificateIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentCertificateIndex = (currentCertificateIndex + 1) % certificateItems.length;
        updateModalImage(currentCertificateIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    function openModal(index) {
        updateModalImage(index);
        modal.style.display = 'block';
        
        // Update navigation button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === certificateItems.length - 1;
    }
    
    function updateModalImage(index) {
        const certificateItem = certificateItems[index];
        const img = certificateItem.querySelector('.certificate-img');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        
        // Update navigation button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === certificateItems.length - 1;
    }
}

// Theme toggle (light/dark) with persistence
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const root = document.documentElement;
    if (!toggleBtn) return;

    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const saved = localStorage.getItem('theme');
    const initial = saved || (prefersLight ? 'light' : 'dark');
    applyTheme(initial);

    toggleBtn.textContent = initial === 'light' ? 'Dark' : 'Light';

    toggleBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem('theme', next);
        toggleBtn.textContent = next === 'light' ? 'Dark' : 'Light';
        // Reapply navbar style after theme change
        window.dispatchEvent(new Event('scroll'));
    });

    function applyTheme(mode) {
        if (mode === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
    }
}

// Academic Progress: modal + canvas line chart
function initProgressChart() {
    const openBtn = document.getElementById('progressBtn');
    const modal = document.getElementById('progressModal');
    const closeBtn = document.getElementById('closeProgressModal');
    const canvas = document.getElementById('progressChart');
    if (!openBtn || !modal || !closeBtn || !canvas) return;

    const labels = ['1st', '2nd', '3rd', '4th', '5th (Running)'];
    const values = [3.9, 3.5, 3.78, 4.0, null];

    let resizeObserver;

    const open = () => {
        modal.style.display = 'block';
        render();
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', render);
    };

    const close = () => {
        modal.style.display = 'none';
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', render);
    };

    const onKey = (e) => {
        if (e.key === 'Escape') close();
    };

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    window.addEventListener('click', (e) => { if (e.target === modal) close(); });

    function render() {
        // Fit canvas to container width while keeping a good height
        const parent = canvas.parentElement;
        const width = Math.min(parent.clientWidth, 1000);
        const height = Math.max(Math.round(width * 0.55), 320);
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        const padding = { top: 30, right: 30, bottom: 60, left: 60 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const minY = 3.0; // GPA scale
        const maxY = 4.0;

        // Helpers
        const xFor = (i) => padding.left + (i / (labels.length - 1)) * chartW;
        const yFor = (v) => padding.top + (1 - (v - minY) / (maxY - minY)) * chartH;

        // Grid lines
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color') || 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        for (let g = minY; g <= maxY; g += 0.25) {
            const y = yFor(g);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Axes
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') || '#999';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.stroke();

        // Y labels
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') || '#999';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let g = minY; g <= maxY; g += 0.25) {
            const y = yFor(g);
            ctx.fillText(g.toFixed(2), padding.left - 8, y);
        }

        // X labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        labels.forEach((label, i) => {
            const x = xFor(i);
            ctx.fillText(label, x, height - padding.bottom + 10);
        });

        // Line path for non-null values
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#00d4ff';
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-orange') || '#ffa500';
        ctx.lineWidth = 3;
        ctx.strokeStyle = primary.trim();
        ctx.beginPath();
        let started = false;
        values.forEach((v, i) => {
            if (v == null) return;
            const x = xFor(i);
            const y = yFor(v);
            if (!started) {
                ctx.moveTo(x, y);
                started = true;
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Points
        values.forEach((v, i) => {
            const x = xFor(i);
            if (v == null) {
                // Running semester: hollow marker
                ctx.lineWidth = 2.5;
                ctx.strokeStyle = accent.trim();
                ctx.beginPath();
                ctx.arc(x, yFor(3.9), 6, 0, Math.PI * 2); // place near top band visually
                ctx.stroke();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = accent.trim();
                ctx.fillText('Running', x, padding.top + 18);
            } else {
                const y = yFor(v);
                ctx.fillStyle = primary.trim();
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
                // Value label
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') || '#999';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(v.toFixed(2), x, y - 8);
            }
        });

        // Title
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#fff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('CGPA per Semester (Scale 3.00 - 4.00)', padding.left, 6);
    }
}

function applyContentToDom(data) {
    if (!data) return;
    // Hero name
    if (data.heroName) {
        const glitch = document.querySelector('.hero-title .glitch');
        if (glitch) {
            glitch.textContent = data.heroName;
            glitch.setAttribute('data-text', data.heroName);
        }
    }
    // Overall CGPA
    if (data.overallCgpa) {
        const cg = document.querySelector('.academics .metric-value');
        if (cg) {
            cg.innerHTML = `${data.overallCgpa} <span class="metric-sub">/ 4.00</span>`;
        }
    }
    // Education Year
    if (data.educationYear) {
        const yearEl = document.querySelector('.education .year');
        if (yearEl) yearEl.textContent = data.educationYear;
    }
    // Certificates
    if (Array.isArray(data.certificates) && data.certificates.length) {
        const imgs = document.querySelectorAll('.certificates-gallery .certificate-img');
        imgs.forEach((img, i) => {
            if (data.certificates[i]) img.src = data.certificates[i];
        });
    }
}

function initContentLoader() {
    fetch('content/site.json', { cache: 'no-cache' })
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) applyContentToDom(data); })
        .catch(() => {});
}

// Celebration Modal functionality
function initCelebrationModal() {
    const modal = document.getElementById('celebrationModal');
    const modalImage = document.getElementById('celebrationModalImage');
    const closeModal = document.querySelector('#celebrationModal .close-modal');
    const prevBtn = document.getElementById('celebrationPrevBtn');
    const nextBtn = document.getElementById('celebrationNextBtn');
    const celebrationItems = document.querySelectorAll('.celebration-item');
    
    let currentCelebrationIndex = 0;
    
    // Open modal when clicking on celebration item
    celebrationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentCelebrationIndex = index;
            openCelebrationModal(index);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentCelebrationIndex = (currentCelebrationIndex - 1 + celebrationItems.length) % celebrationItems.length;
        updateCelebrationModalImage(currentCelebrationIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentCelebrationIndex = (currentCelebrationIndex + 1) % celebrationItems.length;
        updateCelebrationModalImage(currentCelebrationIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    function openCelebrationModal(index) {
        updateCelebrationModalImage(index);
        modal.style.display = 'block';
        
        // Update navigation button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === celebrationItems.length - 1;
    }
    
    function updateCelebrationModalImage(index) {
        const celebrationItem = celebrationItems[index];
        const img = celebrationItem.querySelector('.celebration-img');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        
        // Update navigation button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === celebrationItems.length - 1;
    }
}

// Interactive Greeting functionality
function initInteractiveGreeting() {
    const greeting = document.getElementById('interactive-greeting');
    if (!greeting) return;
    
    let isTyping = false;
    let currentText = '';
    const fullText = 'Hello, I am Waliur Rahaman';
    
    // Add typing effect on page load
    setTimeout(() => {
        typeGreeting();
    }, 1000);
    
    // Add click interaction
    greeting.addEventListener('click', () => {
        if (!isTyping) {
            typeGreeting();
        }
    });
    
    // Add hover effects
    greeting.addEventListener('mouseenter', () => {
        if (!isTyping) {
            greeting.style.transform = 'scale(1.05)';
            greeting.style.textShadow = '0 0 20px var(--accent-blue)';
        }
    });
    
    greeting.addEventListener('mouseleave', () => {
        if (!isTyping) {
            greeting.style.transform = 'scale(1)';
            greeting.style.textShadow = 'none';
        }
    });
    
    function typeGreeting() {
        isTyping = true;
        currentText = '';
        greeting.textContent = '';
        greeting.classList.add('typing');
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < fullText.length) {
                currentText += fullText.charAt(i);
                greeting.textContent = currentText;
                i++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
                greeting.classList.remove('typing');
                greeting.classList.add('typing-complete');
                
                // Add a subtle glow effect
                setTimeout(() => {
                    greeting.style.textShadow = '0 0 15px var(--accent-orange)';
                    setTimeout(() => {
                        greeting.style.textShadow = 'none';
                    }, 1000);
                }, 200);
            }
        }, 100);
    }
}

// Download CV Button Enhancement
function initDownloadCV() {
    const downloadButtons = document.querySelectorAll('.btn-download-cv, .btn-download-cv-hero');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a subtle animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification
            showNotification('Downloading CV...', 'success');
            
            // Track download (optional - for analytics)
            console.log('CV download initiated');
        });
        
        // Add hover sound effect class (for future audio integration)
        button.addEventListener('mouseenter', function() {
            this.classList.add('download-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('download-hover');
        });
    });
}

// Advanced Particle Canvas System
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255, ' : 'rgba(255, 165, 0, ';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Interactive Cursor Effect
function initInteractiveCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        transition: transform 0.05s ease;
        display: none;
    `;
    document.body.appendChild(cursorDot);
    
    // Show cursor on desktop only
    if (window.matchMedia('(pointer: fine)').matches) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursorDot.style.left = e.clientX - 2 + 'px';
            cursorDot.style.top = e.clientY - 2 + 'px';
        });
        
        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .certificate-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--accent-orange)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
            });
        });
    }
}

// Enhanced Scroll Animations
function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const animatedSections = document.querySelectorAll('.skill-category, .project-card, .education-card, .achievement-item, .timeline-item');
    animatedSections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });
}

// Card Tilt Effect
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .education-card');
    
    cards.forEach(card => {
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
}

// Fellowship Certificate Image Loader
function initFellowshipImage() {
    const certImg = document.querySelector('.fellowship-cert-img');
    const certWrapper = document.querySelector('.certificate-wrapper');
    
    if (!certImg || !certWrapper) return;
    
    // Show loading state
    certWrapper.classList.add('loading');
    
    // Try different path variations
    const imagePaths = [
        'Pictures_fellowship/hellolimon.png',
        './Pictures_fellowship/hellolimon.png',
        encodeURI('Pictures_fellowship/hellolimon.png'),
        encodeURIComponent('Pictures_fellowship/hellolimon.png')
    ];
    
    let currentPathIndex = 0;
    
    function tryLoadImage(index) {
        if (index >= imagePaths.length) {
            console.error('Certificate image could not be loaded. Tried paths:', imagePaths);
            certWrapper.classList.remove('loading');
            // Show error message
            certImg.style.display = 'none';
            const errorDiv = document.createElement('div');
            errorDiv.className = 'image-error';
            errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i><p>Image could not be loaded</p>';
            errorDiv.style.cssText = 'text-align: center; padding: 2rem; color: var(--text-secondary);';
            certWrapper.appendChild(errorDiv);
            return;
        }
        
        const img = new Image();
        img.onload = function() {
            certImg.src = imagePaths[index];
            certImg.style.display = 'block';
            certWrapper.classList.remove('loading');
            console.log('Certificate image loaded successfully from:', imagePaths[index]);
        };
        img.onerror = function() {
            console.log('Failed to load from:', imagePaths[index]);
            tryLoadImage(index + 1);
        };
        img.src = imagePaths[index];
    }
    
    // Handle direct image load
    certImg.onload = function() {
        certWrapper.classList.remove('loading');
        certImg.style.display = 'block';
        console.log('Certificate image loaded directly');
    };
    
    certImg.onerror = function() {
        console.log('Direct image load failed, trying alternatives...');
        tryLoadImage(1);
    };
    
    // Force reload after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (!certImg.complete || certImg.naturalHeight === 0) {
            tryLoadImage(0);
        }
    }, 100);
}
