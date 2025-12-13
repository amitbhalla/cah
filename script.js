// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-menu-open');
    body.classList.toggle('menu-open');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-menu-open');
        body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('mobile-menu-open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-menu-open');
        body.classList.remove('menu-open');
    }
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Smooth scrolling for anchor links
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

// =====================
// Contact Form & Captcha
// =====================

// Captcha generation
let currentCaptcha = '';

function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    const captchaElement = document.getElementById('captchaCode');
    if (captchaElement) {
        captchaElement.textContent = captcha;
    }
    return captcha;
}

// Initialize captcha on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('captchaCode')) {
        generateCaptcha();
    }
    
    // Refresh captcha button
    const refreshBtn = document.getElementById('refreshCaptcha');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            generateCaptcha();
            document.getElementById('captcha').value = '';
        });
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = contactForm.querySelector('.submit-btn');
        const captchaInput = document.getElementById('captcha').value;
        
        // Validate captcha (case-insensitive)
        if (captchaInput.toLowerCase() !== currentCaptcha.toLowerCase()) {
            formMessage.textContent = 'Incorrect security code. Please try again.';
            formMessage.className = 'form-message error';
            generateCaptcha();
            document.getElementById('captcha').value = '';
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.querySelector('i').className = 'fas fa-spinner';
        
        // Gather form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            query: document.getElementById('query').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            // Replace this URL with your deployed Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2KN4gLET1CIcbJtdHeZ-zKdfRH27aMhQrTtabY80lUMSL5SWPrmLjpX9fwc3kQKATeA/exec';
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Since we're using no-cors, we can't read the response
            // but the request will still go through
            formMessage.textContent = 'Thank you for your message! Chris will be in touch within 48 hours.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            generateCaptcha();
            
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = 'Something went wrong. Please try again or email directly.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }
    });
}