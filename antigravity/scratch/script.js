// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        showAppContent();
    } else {
        showLoginScreen();
    }

    initAuthGate();
    initHeader();
    initMobileMenu();
    initPasswordToggle();
    initLoginForm();
    initScrollAnimations();
    initBackToTop();
    initCountUpAnimation();
    initSmoothScroll();
});

// ===== Auth Gate =====
function showLoginScreen() {
    const loginScreen = document.getElementById('login-screen');
    const appContent = document.getElementById('app-content');
    loginScreen.classList.remove('hidden');
    loginScreen.classList.add('visible');
    appContent.classList.add('hidden');
    appContent.classList.remove('visible');
    document.body.style.overflow = 'hidden';
}

function showAppContent() {
    const loginScreen = document.getElementById('login-screen');
    const appContent = document.getElementById('app-content');
    loginScreen.classList.add('fade-out');
    
    setTimeout(() => {
        loginScreen.classList.add('hidden');
        loginScreen.classList.remove('visible', 'fade-out');
        appContent.classList.remove('hidden');
        appContent.classList.add('visible');
        document.body.style.overflow = '';
    }, 600);
}

function initAuthGate() {
    const form = document.getElementById('login-form-screen');
    const toggleBtn = document.getElementById('toggle-password-screen');
    const passwordInput = document.getElementById('login-password');
    const usernameInput = document.getElementById('login-username');

    if (!form) return;

    // Password toggle for login screen
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleBtn.querySelector('i').className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
    }

    // Typing animation effect
    [usernameInput, passwordInput].forEach((input) => {
        if (!input) return;
        let typingTimer;
        const wrapper = input.closest('.input-wrapper');

        input.addEventListener('input', () => {
            if (!wrapper) return;
            wrapper.classList.add('is-typing');
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                wrapper.classList.remove('is-typing');
            }, 320);
        });
    });

    // Clear errors helper
    function clearErrors() {
        const existingError = form.querySelector('.login-error');
        if (existingError) existingError.remove();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const usernameInput = document.getElementById('login-username');
        const pwdInput = document.getElementById('login-password');
        const btn = document.getElementById('btn-login-screen');
        const originalContent = btn.innerHTML;

        const username = usernameInput.value.trim();
        const password = pwdInput.value;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Đang xác thực...</span>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            if (username === 'admin' && password === 'Nha12345') {
                btn.innerHTML = '<i class="fas fa-check"></i> <span>Đăng nhập thành công!</span>';
                btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';

                showToast('Chào mừng Admin! Đang chuyển hướng...', 'success');

                // Store login state
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);

                setTimeout(() => {
                    showAppContent();
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                    form.reset();
                }, 1000);
            } else {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                btn.style.opacity = '1';

                const errorDiv = document.createElement('div');
                errorDiv.className = 'login-error';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Tên đăng nhập hoặc mật khẩu không đúng!';
                btn.parentNode.insertBefore(errorDiv, btn);

                const loginCard = document.getElementById('login-card-screen');
                loginCard.style.animation = 'shake 0.5s ease';
                setTimeout(() => loginCard.style.animation = '', 500);

                showToast('Đăng nhập thất bại! Vui lòng thử lại.', 'error');
            }
        }, 1200);
    });
}

// ===== Header Scroll Effect =====
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Logout button
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            showToast('Đã đăng xuất thành công!', 'success');
            setTimeout(() => {
                showLoginScreen();
            }, 500);
        });
    }

    // Community dropdown toggle
    const congdongWrap = document.getElementById('nav-congdong-wrap');
    const congdongLink = document.getElementById('nav-congdong');
    if (congdongWrap && congdongLink) {
        congdongLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            congdongWrap.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!congdongWrap.contains(e.target)) {
                congdongWrap.classList.remove('open');
            }
        });
    }
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Password Toggle =====
function initPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleBtn.querySelector('i').className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    });
}

// ===== Login Form =====
function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    // Remove any existing error messages
    function clearErrors() {
        const existingError = form.querySelector('.login-error');
        if (existingError) existingError.remove();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const btn = document.getElementById('btn-login');
        const originalContent = btn.innerHTML;
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Đang đăng nhập...</span>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            // Admin credential check
            if (username === 'admin' && password === 'Nha12345') {
                btn.innerHTML = '<i class="fas fa-check"></i> <span>Đăng nhập thành công!</span>';
                btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                
                // Show success toast
                showToast('Chào mừng Admin! Đang chuyển hướng...', 'success');
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                    form.reset();
                    // Could redirect to admin dashboard here
                    // window.location.href = '/admin';
                }, 2500);
            } else {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                btn.style.opacity = '1';
                
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'login-error';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Tên đăng nhập hoặc mật khẩu không đúng!';
                btn.parentNode.insertBefore(errorDiv, btn);
                
                // Shake animation
                const loginCard = document.getElementById('login-card');
                loginCard.style.animation = 'shake 0.5s ease';
                setTimeout(() => loginCard.style.animation = '', 500);
                
                showToast('Đăng nhập thất bại! Vui lòng thử lại.', 'error');
            }
        }, 1200);
    });
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'times-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation class to elements
    const animatableElements = document.querySelectorAll(
        '.product-card, .policy-card, .company-card, .section-header, .cta-content'
    );

    animatableElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
        observer.observe(el);
    });
}

// ===== Back to Top =====
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Count Up Animation =====
function initCountUpAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCount(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(el => observer.observe(el));
}

function animateCount(element, start, end, duration) {
    const startTimestamp = performance.now();
    
    function updateCount(currentTimestamp) {
        const elapsed = currentTimestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(start + (end - start) * eased);
        element.textContent = current.toLocaleString() + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Active Nav Link Highlight =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Parallax Effect on Hero Shapes =====
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 15;
        const translateX = (x - 0.5) * speed;
        const translateY = (y - 0.5) * speed;
        shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
});
