/**
 * Portfolio Website - JavaScript
 * Handles all interactive functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Toggle between moon and sun icons
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Smooth Scroll Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection && navbar) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Resume Download Form Validation
    const resumeForm = document.getElementById('resumeForm');
    const resumeName = document.getElementById('resumeName');
    const resumeEmail = document.getElementById('resumeEmail');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            if (nameError) nameError.textContent = '';
            if (emailError) emailError.textContent = '';
            if (resumeName) resumeName.style.borderColor = '#e5e7eb';
            if (resumeEmail) resumeEmail.style.borderColor = '#e5e7eb';

            const nameValue = resumeName ? resumeName.value.trim() : '';
            if (nameValue === '') {
                if (nameError) nameError.textContent = 'Please enter your full name';
                if (resumeName) resumeName.style.borderColor = '#ef4444';
                isValid = false;
            }

            const emailValue = resumeEmail ? resumeEmail.value.trim() : '';
            if (emailValue === '') {
                if (emailError) emailError.textContent = 'Please enter your email address';
                if (resumeEmail) resumeEmail.style.borderColor = '#ef4444';
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                if (resumeEmail) resumeEmail.style.borderColor = '#ef4444';
                isValid = false;
            }

            if (isValid) {
                downloadResume();
            }
        });
    }

    // Real-time validation feedback
    if (resumeName) {
        resumeName.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                if (nameError) nameError.textContent = '';
                this.style.borderColor = '#10b981';
            }
        });
    }

    if (resumeEmail) {
        resumeEmail.addEventListener('input', function() {
            if (emailRegex.test(this.value.trim())) {
                if (emailError) emailError.textContent = '';
                this.style.borderColor = '#10b981';
            }
        });
    }

    // Contact Form - Formspree Submission
    const contactForm = document.getElementById('contactForm');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');
    const contactNameError = document.getElementById('contactNameError');
    const contactEmailError = document.getElementById('contactEmailError');
    const contactMessageError = document.getElementById('contactMessageError');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            if (contactNameError) contactNameError.textContent = '';
            if (contactEmailError) contactEmailError.textContent = '';
            if (contactMessageError) contactMessageError.textContent = '';
            if (contactName) contactName.style.borderColor = '#e5e7eb';
            if (contactEmail) contactEmail.style.borderColor = '#e5e7eb';
            if (contactMessage) contactMessage.style.borderColor = '#e5e7eb';

            const nameValue = contactName ? contactName.value.trim() : '';
            if (nameValue === '') {
                if (contactNameError) contactNameError.textContent = 'Please enter your name';
                if (contactName) contactName.style.borderColor = '#ef4444';
                isValid = false;
            }

            const emailValue = contactEmail ? contactEmail.value.trim() : '';
            if (emailValue === '') {
                if (contactEmailError) contactEmailError.textContent = 'Please enter your email';
                if (contactEmail) contactEmail.style.borderColor = '#ef4444';
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                if (contactEmailError) contactEmailError.textContent = 'Please enter a valid email';
                if (contactEmail) contactEmail.style.borderColor = '#ef4444';
                isValid = false;
            }

            const messageValue = contactMessage ? contactMessage.value.trim() : '';
            if (messageValue === '') {
                if (contactMessageError) contactMessageError.textContent = 'Please enter your message';
                if (contactMessage) contactMessage.style.borderColor = '#ef4444';
                isValid = false;
            }

            if (isValid) {
                const formData = new FormData(contactForm);
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        showToast('Success!', 'Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else {
                        const errorData = await response.json();
                        if (errorData.error) {
                            showToast('Error', errorData.error, true);
                        } else {
                            showToast('Error', 'Something went wrong. Please try again.', true);
                        }
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    showToast('Error', 'Network error. Please check your connection and try again.', true);
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send Message';
                    }
                }
            }
        });
    }

    // Skill Bar Animation on Scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = { threshold: 0.3 };
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-progress');
                if (skillBar) {
                    const width = skillBar.style.width;
                    skillBar.style.width = '0';
                    setTimeout(function() { skillBar.style.width = width; }, 100);
                }
            }
        });
    }, observerOptions);
    skillCards.forEach(function(card) { skillObserver.observe(card); });

    console.log('Portfolio website initialized successfully!');
});

// Resume Download Function - Opens resume in new tab
function downloadResume() {
    var resumePath = 'assets/resume.pdf?v=2';
    window.open(resumePath, '_blank');
    
    var resumeName = document.getElementById('resumeName');
    var nameValue = resumeName ? resumeName.value.trim() : 'User';
    
    setTimeout(function() {
        alert('Resume opened! Thank you, ' + nameValue);
    }, 500);
}

// Show Resume Modal Function
function showResume() {
    var modal = document.getElementById('resumeModal');
    if (modal) modal.style.display = 'flex';
}

// Close Resume Modal Function
function closeResume() {
    var modal = document.getElementById('resumeModal');
    if (modal) modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    var resumeModal = document.getElementById('resumeModal');
    var certificateModal = document.getElementById('certificateModal');
    if (event.target === resumeModal) resumeModal.style.display = 'none';
    if (event.target === certificateModal) certificateModal.style.display = 'none';
};

// Show Certificate Modal Function
function showCertificate(imageSrc) {
    var modal = document.getElementById('certificateModal');
    var img = document.getElementById('certificateImage');
    if (modal && img) {
        img.src = imageSrc;
        modal.style.display = 'flex';
    }
}

// Close Certificate Modal Function
function closeCertificate() {
    var modal = document.getElementById('certificateModal');
    if (modal) modal.style.display = 'none';
}

// Toast Notification Functions
function showToast(title, message, isError = false) {
    var toast = document.getElementById('toast');
    var toastTitle = document.getElementById('toastTitle');
    var toastMessage = document.getElementById('toastMessage');
    var toastIcon = document.getElementById('toastIcon');
    
    if (toast && toastTitle && toastMessage && toastIcon) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        if (isError) {
            toast.classList.add('error');
            toastIcon.className = 'fas fa-exclamation-circle';
        } else {
            toast.classList.remove('error');
            toastIcon.className = 'fas fa-check-circle';
        }
        
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            closeToast();
        }, 5000);
    }
}

function closeToast() {
    var toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}
