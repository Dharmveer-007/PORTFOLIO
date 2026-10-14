/**
 * Portfolio Website - JavaScript
 * Handles interactive features: Theme Toggle, Mobile Navigation, Modals, Contact Form & Toasts
 */

// Global Modal & UI Functions (accessible directly from HTML onclick)
let toastTimeout = null;

/**
 * Show the Resume Modal
 */
function showResume() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }
}

/**
 * Close the Resume Modal
 */
function closeResume() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    }
}

/**
 * Show the Certificate Modal
 * @param {string} imageSrc - Path to certificate image
 * @param {string} certTitle - Title of the certificate
 */
function showCertificate(imageSrc, certTitle = 'Certificate Preview') {
    const modal = document.getElementById('certificateModal');
    const img = document.getElementById('certificateImage');
    const titleEl = document.getElementById('certModalTitle');
    const fullViewBtn = document.getElementById('certFullView');

    if (modal && img) {
        img.src = imageSrc;
        img.alt = certTitle;
        if (titleEl) titleEl.textContent = certTitle;
        if (fullViewBtn) fullViewBtn.href = imageSrc;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }
}

/**
 * Close the Certificate Modal
 */
function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    }
}

/**
 * Display a Toast Notification
 * @param {string} title - Header text
 * @param {string} message - Body text
 * @param {boolean} isError - Whether toast represents an error
 */
function showToast(title, message, isError = false) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    if (isError) {
        toast.classList.add('error');
        if (toastIcon) toastIcon.className = 'fas fa-exclamation-circle toast-icon';
    } else {
        toast.classList.remove('error');
        if (toastIcon) toastIcon.className = 'fas fa-check-circle toast-icon';
    }

    toast.classList.add('show');

    // Clear any previous auto-dismiss timer
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    // Auto hide after 5 seconds
    toastTimeout = setTimeout(function() {
        closeToast();
    }, 5000);
}

/**
 * Dismiss Toast Notification
 */
function closeToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

    // 1. Navbar Scroll Elevation Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Dark Mode Toggle with Persistent State
    const darkModeToggle = document.getElementById('darkModeToggle');
    const savedTheme = localStorage.getItem('theme') || localStorage.getItem('darkMode');

    if (savedTheme === 'dark' || savedTheme === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Switch to Light Mode');
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            if (isDark) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                this.setAttribute('aria-label', 'Switch to Light Mode');
                localStorage.setItem('theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                this.setAttribute('aria-label', 'Switch to Dark Mode');
                localStorage.setItem('theme', 'light');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // 3. Mobile Navigation Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                if (spans.length >= 3) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                }
            } else {
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });

        // Close mobile menu when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // 4. Safe Smooth Scroll Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navOffset = navbar ? navbar.offsetHeight : 70;
                    const targetPosition = targetElement.offsetTop - navOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Contact Form Validation & Asynchronous Submission
    const contactForm = document.getElementById('contactForm');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');
    const contactNameError = document.getElementById('contactNameError');
    const contactEmailError = document.getElementById('contactEmailError');
    const contactMessageError = document.getElementById('contactMessageError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time input clearing
    [contactName, contactEmail, contactMessage].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                const errorSpan = document.getElementById(this.id + 'Error');
                if (errorSpan) errorSpan.textContent = '';
                this.style.borderColor = '';
            });
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            if (contactNameError) contactNameError.textContent = '';
            if (contactEmailError) contactEmailError.textContent = '';
            if (contactMessageError) contactMessageError.textContent = '';

            const nameVal = contactName ? contactName.value.trim() : '';
            const emailVal = contactEmail ? contactEmail.value.trim() : '';
            const messageVal = contactMessage ? contactMessage.value.trim() : '';

            if (!nameVal) {
                if (contactNameError) contactNameError.textContent = 'Please enter your name.';
                if (contactName) contactName.style.borderColor = '#ef4444';
                isValid = false;
            }

            if (!emailVal) {
                if (contactEmailError) contactEmailError.textContent = 'Please enter your email address.';
                if (contactEmail) contactEmail.style.borderColor = '#ef4444';
                isValid = false;
            } else if (!emailRegex.test(emailVal)) {
                if (contactEmailError) contactEmailError.textContent = 'Please enter a valid email address.';
                if (contactEmail) contactEmail.style.borderColor = '#ef4444';
                isValid = false;
            }

            if (!messageVal) {
                if (contactMessageError) contactMessageError.textContent = 'Please write a message.';
                if (contactMessage) contactMessage.style.borderColor = '#ef4444';
                isValid = false;
            }

            if (!isValid) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showToast('Message Sent!', 'Thank you! Your message has been received. I will get back to you soon.', false);
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    const msg = (data && data.errors && data.errors.map(err => err.message).join(', ')) || 'Failed to send message. Please try again.';
                    showToast('Error', msg, true);
                }
            } catch (err) {
                console.error('Contact Form Submission Error:', err);
                showToast('Network Error', 'Could not reach the server. Please check your internet connection or email directly.', true);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            }
        });
    }

    // 6. Global Backdrop & Escape Key Handlers for Modals
    window.addEventListener('click', function(event) {
        const resumeModal = document.getElementById('resumeModal');
        const certificateModal = document.getElementById('certificateModal');

        if (event.target === resumeModal) {
            closeResume();
        }
        if (event.target === certificateModal) {
            closeCertificate();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeResume();
            closeCertificate();
            closeToast();
        }
    });

    console.log('Portfolio initialized successfully with responsive features!');
});
