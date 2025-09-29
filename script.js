let currentSlide = 1;
const totalSlides = 15;

document.addEventListener('DOMContentLoaded', function() {
    updateSlideCounter();
    initializeInteractiveElements();
    setupKeyboardNavigation();
});

// navegación de slides
function nextSlide() {
    if (currentSlide < totalSlides) {
        hideSlide(currentSlide);
        currentSlide++;
        showSlide(currentSlide);
        updateSlideCounter();
        updateNavigationButtons();
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        hideSlide(currentSlide);
        currentSlide--;
        showSlide(currentSlide);
        updateSlideCounter();
        updateNavigationButtons();
    }
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        hideSlide(currentSlide);
        currentSlide = slideNumber;
        showSlide(currentSlide);
        updateSlideCounter();
        updateNavigationButtons();
    }
}

function hideSlide(slideNumber) {
    const slide = document.getElementById(`slide-${slideNumber}`);
    if (slide) {
        slide.classList.remove('active');
    }
}

function showSlide(slideNumber) {
    const slide = document.getElementById(`slide-${slideNumber}`);
    if (slide) {
        slide.classList.add('active');
        // aca reiniciamos animaciones específicas del slide
        restartSlideAnimations(slideNumber);
    }
}

function updateSlideCounter() {
    const counter = document.querySelector('.slide-counter');
    if (counter) {
        counter.textContent = `${currentSlide} / ${totalSlides}`;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.nav-btn:first-of-type');
    const nextBtn = document.querySelector('.nav-btn:last-of-type');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
    }
}

// nav por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
        }
    });
}

// funciones para nth-child demo
function applyNthRule(rule) {
    const items = document.querySelectorAll('.nth-item');
    
    // remover clases anteriores
    items.forEach(item => item.classList.remove('highlight'));
    
    // aplicar nueva regla
    let selector;
    switch(rule) {
        case 'odd':
            selector = '.nth-item:nth-child(odd)';
            break;
        case 'even':
            selector = '.nth-item:nth-child(even)';
            break;
        case '3n':
            selector = '.nth-item:nth-child(3n)';
            break;
        case '2n+1':
            selector = '.nth-item:nth-child(2n+1)';
            break;
    }
    
    if (selector) {
        const selectedItems = document.querySelectorAll(selector);
        selectedItems.forEach(item => {
            item.classList.add('highlight');

            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'highlight-pulse 0.6s ease-in-out';
            }, 10);
        });
    }
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

function toggleMenu(element) {
    element.classList.toggle('active');
}

function initializeInteractiveElements() {
    // Ripple effect para botones
    setupRippleEffect();
    
    // Tooltips dinámicos
    setupDynamicTooltips();
    
    // Animaciones de entrada
    setupScrollAnimations();
    
    // Efectos de hover mejorados
    setupEnhancedHovers();
}

function setupRippleEffect() {
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function setupDynamicTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                // Crear tooltip dinámico si no existe
                if (!this.querySelector('.dynamic-tooltip')) {
                    const tooltipEl = document.createElement('div');
                    tooltipEl.className = 'dynamic-tooltip';
                    tooltipEl.textContent = tooltip;
                    this.appendChild(tooltipEl);
                }
            }
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.dynamic-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

function setupScrollAnimations() {
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
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.comparison-card, .animation-card, .takeaway-item');
    animatedElements.forEach(el => observer.observe(el));
}

function setupEnhancedHovers() {
    // Efecto de seguimiento del mouse para cards
    const cards = document.querySelectorAll('.comparison-card, .animation-card, .exercise-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

function restartSlideAnimations(slideNumber) {
    const slide = document.getElementById(`slide-${slideNumber}`);
    if (!slide) return;
    
    // Reiniciar animaciones específicas según el slide
    switch(slideNumber) {
        case 1:
            // Reiniciar animaciones de elementos flotantes
            const floatingElements = slide.querySelectorAll('.element');
            floatingElements.forEach((el, index) => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = `float 3s ease-in-out infinite`;
                    el.style.animationDelay = `${-index}s`;
                }, 10);
            });
            break;
            
        case 8:
            // Reiniciar animaciones de showcase
            const loader = slide.querySelector('.loader');
            if (loader) {
                loader.style.animation = 'none';
                setTimeout(() => {
                    loader.style.animation = 'spin 1s linear infinite';
                }, 10);
            }
            
            const progressFill = slide.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.animation = 'none';
                setTimeout(() => {
                    progressFill.style.animation = 'progress 3s ease-in-out infinite';
                }, 10);
            }
            break;
    }
}

// Funciones de utilidad para demos interactivos
function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 1rem;
        animation: sparkle-float 1s ease-out forwards;
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Agregar estilos dinámicos para animaciones
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes highlight-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(78, 205, 196, 0.5); }
        100% { transform: scale(1); }
    }
    
    @keyframes sparkle-float {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .dynamic-tooltip {
        position: absolute;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        animation: tooltipFadeIn 0.3s ease-out;
    }
    
    @keyframes tooltipFadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;

document.head.appendChild(dynamicStyles);

// Inicializar navegación
updateNavigationButtons();

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activar modo "CSS Master"
        document.body.style.filter = 'hue-rotate(180deg)';
        document.body.style.animation = 'rainbow 2s ease-in-out infinite';
        
        // Crear confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 100);
        }
        
        // Mostrar mensaje
        const message = document.createElement('div');
        message.innerHTML = '🎉 ¡CSS MASTER ACTIVADO! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10000;
            animation: bounce 1s ease-in-out infinite;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.style.filter = '';
            document.body.style.animation = '';
        }, 5000);
        
        konamiCode = [];
    }
});

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#ff8c42'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 9999;
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Agregar estilos para efectos especiales
const specialStyles = document.createElement('style');
specialStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;

document.head.appendChild(specialStyles);

console.log('🎨 Presentación de CSS Pseudo-selectores cargada');
console.log('💡 Tip: Usa las flechas del teclado para navegar');
console.log('🎮 Easter egg: ¿Conoces el código Konami?');