// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollEffects();
    initLazyLoading();
    initAnimations();
    initTypingEffect();
    initProjectFilters();
    initContactForm();
    initScrollToTop();
});

// Navegación móvil
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navegación activa según scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
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
}

// Efectos de scroll
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animación de elementos al hacer scroll
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

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.proyecto, .card, .skill-category, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Lazy loading de imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Animaciones adicionales
function initAnimations() {
    // Contador animado para estadísticas
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                if (value.includes('%')) {
                    animateCounter(target, parseInt(value));
                } else {
                    animateCounter(target, parseInt(value));
                }
                statsObserver.unobserve(target);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Efecto de hover en proyectos
    const proyectos = document.querySelectorAll('.proyecto');
    proyectos.forEach(proyecto => {
        proyecto.addEventListener('mouseenter', () => {
            proyecto.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        proyecto.addEventListener('mouseleave', () => {
            proyecto.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Efecto de escritura
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Iniciar efecto cuando la página cargue
    setTimeout(typeWriter, 500);
}

// Filtros de proyectos (para futuras implementaciones)
function initProjectFilters() {
    // Esta función puede ser expandida para agregar filtros por tecnología
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.proyecto');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                    project.style.animation = 'fadeIn 0.5s ease';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            // Efecto de click
            whatsappBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 150);

            // Efecto de hover mejorado
            whatsappBtn.addEventListener('mouseenter', () => {
                whatsappBtn.style.transform = 'translateY(-2px)';
                whatsappBtn.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
            });

            whatsappBtn.addEventListener('mouseleave', () => {
                whatsappBtn.style.transform = 'translateY(0)';
                whatsappBtn.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            });
        });
    }
}

// Botón de scroll to top
function initScrollToTop() {
    // Crear botón de scroll to top
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-acento);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top al hacer clic
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto hover
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-3px)';
        scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0)';
        scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
    });
}

// Utilidades adicionales
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimización de rendimiento
const optimizedScrollHandler = debounce(() => {
    // Aquí se pueden agregar más optimizaciones de scroll
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Console log para desarrollo
console.log('🚀 Portafolio de Brandon Pardo cargado exitosamente!');
console.log('📧 Contacto: pardob749@gmail.com');
console.log('🐙 GitHub: https://github.com/BPardo1998'); 