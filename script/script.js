function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

const allTextareas = document.querySelectorAll('textarea');
allTextareas.forEach(ta => {
    autoResizeTextarea(ta);
    ta.addEventListener('input', function() {
        autoResizeTextarea(this);
    });
});

// === БУРГЕР-МЕНЮ ===
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// === ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (burger && mobileMenu) {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// === КНОПКА «НАВЕРХ» ===
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// === ПРОЗРАЧНОСТЬ ХЕДЕРА ===
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// === ПРОГРЕСС-БАР ===
const progressBar = document.getElementById('progressBar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// === АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ СКРОЛЛЕ ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            }
        });
    });
}

// === АНИМАЦИЯ ПОЯВЛЕНИЯ (REVEAL) И STAGGER ===
const reveals = document.querySelectorAll('.reveal');
const staggerContainers = document.querySelectorAll('.reveal-stagger');

function revealCheck() {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
    staggerContainers.forEach(container => {
        const windowHeight = window.innerHeight;
        const revealTop = container.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            container.classList.add('active');
        }
    });
}

staggerContainers.forEach(container => {
    Array.from(container.children).forEach((child, index) => {
        child.style.setProperty('--i', index);
    });
});

window.addEventListener('scroll', revealCheck);
revealCheck();

// === СЧЁТЧИКИ (СТАТИСТИКА) С ПОДПРЫГИВАНИЕМ ===
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        statNumbers.forEach(num => {
            const target = +num.dataset.target;
            if (isNaN(target)) return;
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = target;
                    clearInterval(timer);
                    num.classList.add('bounce');
                    setTimeout(() => num.classList.remove('bounce'), 500);
                } else {
                    num.textContent = Math.floor(current);
                }
            }, 20);
        });
        animated = true;
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// === ПАРАЛЛАКС ДЛЯ SHAPE-ЭЛЕМЕНТОВ С ВРАЩЕНИЕМ ===
const shapes = document.querySelectorAll('.shape');
if (shapes.length) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, index) => {
            const speed = 0.1 + index * 0.05;
            const rotate = scrollY * speed;
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${rotate}deg)`;
        });
    });
}

// === ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ===
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
});

// === ИНДУСТРИАЛЬНЫЕ ФОНОВЫЕ ЭЛЕМЕНТЫ ===
(function() {
    const industryBg = document.getElementById('industryBg');
    if (!industryBg) return;

    const icons = [
        'fa-gear', 'fa-cogs', 'fa-industry', 'fa-hammer', 'fa-wrench',
        'fa-tools', 'fa-truck', 'fa-drill', 'fa-digging', 'fa-conveyor-belt',
        'fa-cog', 'fa-gears', 'fa-oil-well', 'fa-pickaxe', 'fa-shovel'
    ].map(name => `<i class="fas ${name}"></i>`);

    const isMobile = window.innerWidth < 768;
    const numberOfItems = 0;
    const items = [];

    for (let i = 0; i < numberOfItems; i++) {
        const item = document.createElement('div');
        item.className = 'industry-item';
        item.innerHTML = icons[Math.floor(Math.random() * icons.length)];

        let leftPercent, topPercent;
        if (Math.random() < 0.5) {
            leftPercent = Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
            topPercent = Math.random() * 100;
        } else {
            topPercent = Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
            leftPercent = Math.random() * 100;
        }
        leftPercent = Math.min(100, Math.max(0, leftPercent));
        topPercent = Math.min(100, Math.max(0, topPercent));
        item.style.left = leftPercent + '%';
        item.style.top = topPercent + '%';

        const size = 20 + Math.random() * 40;
        item.style.fontSize = size + 'px';
        const rotate = Math.random() * 360;
        item.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;

        industryBg.appendChild(item);
        items.push({
            element: item,
            leftPercent: leftPercent,
            topPercent: topPercent,
            baseSize: size,
            index: i
        });
    }

    const attractionRadius = 200;
    const maxShift = 50;
    const maxOpacity = 0.6;
    const maxBlur = 2;

    let mouseX = -1000, mouseY = -1000;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    function updateItems() {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const time = Date.now() / 1000;

        items.forEach((item, idx) => {
            const el = item.element;
            const baseX = (item.leftPercent / 100) * winW;
            const baseY = (item.topPercent / 100) * winH;

            const dx = baseX - mouseX;
            const dy = baseY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let shiftX = 0, shiftY = 0;
            let opacity = 0.15;
            let blur = maxBlur;

            if (dist < attractionRadius) {
                const force = (1 - dist / attractionRadius);
                const directionX = dx === 0 ? 0 : dx / dist;
                const directionY = dy === 0 ? 0 : dy / dist;
                const shift = force * maxShift;
                shiftX = directionX * shift;
                shiftY = directionY * shift;
                opacity = 0.15 + force * (maxOpacity - 0.15);
                blur = maxBlur * (1 - force);
            }

            const floatX = Math.sin(time * 1.5 + idx) * 3;
            const floatY = Math.cos(time * 1.5 + idx) * 3;
            const rot = Math.sin(time + idx) * 1;

            let currentRotate = 0;
            const match = el.style.transform.match(/rotate\(([^)]+)\)/);
            if (match && match[1]) {
                currentRotate = parseFloat(match[1]) || 0;
            }

            el.style.opacity = opacity;
            el.style.filter = `blur(${blur}px)`;
            el.style.transform = `translate(-50%, -50%) rotate(${currentRotate + rot}deg) translate(${shiftX + floatX}px, ${shiftY + floatY}px)`;
        });
        requestAnimationFrame(updateItems);
    }

    updateItems();
})();

// === АДАПТИВНЫЙ СЛАЙДЕР ===
function initSlider() {
    const slider = document.getElementById('slider');
    if (!slider) return;

    document.querySelectorAll('.clone').forEach(clone => clone.remove());

    function getVisibleCount() {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 960) return 2;
        return 3;
    }

    let visibleCount = getVisibleCount();
    let cards = Array.from(slider.children);
    const originalTotal = cards.length;
    if (originalTotal === 0) return;

    for (let i = 0; i < visibleCount; i++) {
        const lastClone = cards[originalTotal - 1 - i].cloneNode(true);
        lastClone.classList.add('clone');
        slider.insertBefore(lastClone, cards[0]);

        const firstClone = cards[i].cloneNode(true);
        firstClone.classList.add('clone');
        slider.appendChild(firstClone);
    }

    cards = Array.from(slider.children);
    const totalCards = originalTotal;
    const gap = 30;

    let currentIndex = 0;
    let cardWidth = 0;
    let isAnimating = false;
    let autoSlideInterval;

    function updateCardWidth() {
        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth + gap;
        }
    }

    function moveToSlide(index, animated = true) {
        if (cards.length === 0) return;
        isAnimating = animated;
        const offset = (visibleCount + index) * cardWidth;
        slider.style.transition = animated ? 'transform 0.5s ease' : 'none';
        slider.style.transform = `translateX(-${offset}px)`;
    }

    function handleTransitionEnd() {
        isAnimating = false;
        if (currentIndex === totalCards) {
            slider.style.transition = 'none';
            currentIndex = 0;
            moveToSlide(currentIndex, false);
        } else if (currentIndex === -1) {
            slider.style.transition = 'none';
            currentIndex = totalCards - 1;
            moveToSlide(currentIndex, false);
        }
    }

    slider.addEventListener('transitionend', handleTransitionEnd);

    function nextSlide() {
        if (isAnimating) return;
        currentIndex++;
        moveToSlide(currentIndex);
    }

    function prevSlide() {
        if (isAnimating) return;
        currentIndex--;
        moveToSlide(currentIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function rebuildSlider() {
        document.querySelectorAll('.clone').forEach(clone => clone.remove());

        const originalCards = Array.from(slider.children);
        originalCards.forEach(card => card.classList.remove('clone'));

        visibleCount = getVisibleCount();

        for (let i = 0; i < visibleCount; i++) {
            const lastClone = originalCards[originalTotal - 1 - i].cloneNode(true);
            lastClone.classList.add('clone');
            slider.insertBefore(lastClone, originalCards[0]);

            const firstClone = originalCards[i].cloneNode(true);
            firstClone.classList.add('clone');
            slider.appendChild(firstClone);
        }

        cards = Array.from(slider.children);
        currentIndex = 0;
        updateCardWidth();
        moveToSlide(currentIndex, false);
    }

    window.addEventListener('resize', () => {
        const newVisibleCount = getVisibleCount();
        if (newVisibleCount !== visibleCount) {
            rebuildSlider();
        } else {
            updateCardWidth();
            moveToSlide(currentIndex, false);
        }
    });

    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('mouseenter', stopAutoSlide);
        nextBtn.addEventListener('mouseenter', stopAutoSlide);
        prevBtn.addEventListener('mouseleave', startAutoSlide);
        nextBtn.addEventListener('mouseleave', startAutoSlide);
    }

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    updateCardWidth();
    moveToSlide(currentIndex, false);
    startAutoSlide();
}

window.addEventListener('load', initSlider);
if (document.readyState === 'complete') {
    initSlider();
} else {
    window.addEventListener('load', initSlider);
}

// === КАРУСЕЛЬ ДЛЯ СТРАНИЦЫ "ОБОРУДОВАНИЕ" (FADE-ЭФФЕКТ) ===
(function() {
    const slider = document.querySelector('.image-slider');
    if (!slider) return;

    const container = slider.querySelector('.slider-container');
    const slides = slider.querySelectorAll('.slider-image');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === currentIndex ? '1' : '0';
            slide.style.transition = 'opacity 0.5s';
        });
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    updateSlider();
})();


document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none'; // или заменить src на заглушку
        console.warn('Изображение не загружено:', this.src);
    });
});

// === LIGHTBOX ===
(function() {
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__overlay"></div>
            <div class="lightbox__content">
                <img src="" alt="" class="lightbox__image">
                <button class="lightbox__close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');

    function openLightbox(src) {
        if (!src) return;
        lightboxImage.classList.remove('loaded');
        lightboxImage.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    lightboxImage.addEventListener('load', function() {
        this.classList.add('loaded');
    });

    lightboxImage.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        this.classList.remove('loaded');
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.tagName === 'IMG') {
            if (target.closest('.logo') || target.closest('.industry-item') || target.classList.contains('no-lightbox')) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            openLightbox(target.src);
            return;
        }

        const bgSelectors = ['.service-card__image', '.product-card__image', '.two-columns__image', '.footer__image'];
        for (let selector of bgSelectors) {
            if (target.matches(selector) || target.closest(selector)) {
                const bgElement = target.matches(selector) ? target : target.closest(selector);
                const bgUrl = getBackgroundImageUrl(bgElement);
                if (bgUrl) {
                    e.preventDefault();
                    e.stopPropagation();
                    openLightbox(bgUrl);
                }
                return;
            }
        }
    });

    function getBackgroundImageUrl(element) {
        const bg = window.getComputedStyle(element).backgroundImage;
        const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
        return match ? match[1] : null;
    }
})();

// === МОДАЛЬНОЕ ОКНО (ТЕСТОВЫЕ ВОПРОСЫ) ===
(function() {
    const openBtn = document.getElementById('openQuestionModal');
    const modal = document.getElementById('questionModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('modalCancel');
    const saveBtn = document.getElementById('saveAnswers');

    if (!modal || !openBtn) return;

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function saveAnswers() {
        const fields = [
            'modal_q1', 'modal_q2', 'modal_q3', 'modal_q4', 'modal_q5',
            'modal_q6', 'modal_q7', 'modal_q8', 'modal_q9', 'modal_q10'
        ];
        for (let id of fields) {
            const el = document.getElementById(id);
            if (!el || !el.value.trim()) {
                alert('Пожалуйста, заполните все вопросы перед сохранением.');
                return;
            }
        }

        document.getElementById('q1').value = document.getElementById('modal_q1')?.value || '';
        document.getElementById('q2').value = document.getElementById('modal_q2')?.value || '';
        document.getElementById('q3').value = document.getElementById('modal_q3')?.value || '';
        document.getElementById('q4').value = document.getElementById('modal_q4')?.value || '';
        document.getElementById('q5').value = document.getElementById('modal_q5')?.value || '';
        document.getElementById('q6').value = document.getElementById('modal_q6')?.value || '';
        document.getElementById('q7').value = document.getElementById('modal_q7')?.value || '';
        document.getElementById('q8').value = document.getElementById('modal_q8')?.value || '';
        document.getElementById('q9').value = document.getElementById('modal_q9')?.value || '';
        document.getElementById('q10').value = document.getElementById('modal_q10')?.value || '';

        closeModal();
    }

    openBtn.addEventListener('click', openModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (saveBtn) saveBtn.addEventListener('click', saveAnswers);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
})();

// === ВАЛИДАЦИЯ ФОРМЫ ПЕРЕД ОТПРАВКОЙ ===
const vacancyForm = document.getElementById('vacancyForm');
if (vacancyForm) {
    vacancyForm.addEventListener('submit', function(e) {
        let allFilled = true;
        for (let i = 1; i <= 10; i++) {
            const field = document.getElementById('q' + i);
            if (!field || !field.value.trim()) {
                allFilled = false;
                break;
            }
        }
        if (!allFilled) {
            e.preventDefault();
            alert('Пожалуйста, заполните все тестовые вопросы (раздел "Пройти тестирование") перед отправкой заявки.');
        }
    });
}

// === ДИНАМИЧЕСКИЙ ГРАДИЕНТ (БЛИК) ДЛЯ ФОТОГРАФИЙ (только вертикальное перемещение) ===
const images = document.querySelectorAll('img:not(.logo img):not(.industry-item img):not(.no-lightbox)');
images.forEach(img => {
    let parent = img.parentElement;
    while (parent) {
        if (parent.matches('.gallery, .slider-container, .image-slider, .products-slider, .logo')) {
            return;
        }
        parent = parent.parentElement;
    }
    img.classList.add('dynamic-gradient-img');
});

(function() {
    const elements = document.querySelectorAll('.dynamic-gradient-left, .dynamic-gradient-right');

    function updateGradients() {
        const windowHeight = window.innerHeight;

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Вычисляем, насколько элемент виден (0 – не виден, 1 – полностью)
            const visible = Math.max(0, Math.min(1,
                (windowHeight - rect.top) / (rect.height + windowHeight)
            ));

            // Преобразуем видимость в позицию градиента:
            // чем больше элемент виден, тем выше поднимается градиент
            let gradientY = 100 - visible * 100; // от 100% до 0%
            gradientY = Math.max(0, Math.min(100, gradientY));

            // Устанавливаем CSS-переменную прямо на элемент
            el.style.setProperty('--gradient-y', gradientY + '%');
        });
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateGradients();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    updateGradients(); // инициализация
})();

// === НОВЫЕ ФУНКЦИИ ===

// 1. Ripple-эффект на кнопках
document.querySelectorAll('.btn, .btn--primary, .btn-small').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/*// 2. Частицы (particles.js) – инициализация
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#223387" },
            shape: { type: "circle" },
            opacity: { value: 0.2, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 1, direction: "none", random: true }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" } }
        }
    });
}
*/
// 3. Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    }
});

// 4. Плавный переход между страницами (для внутренних ссылок)
document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="http"])').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// 5. Искры при наведении на карточки оборудования (canvas)
const equipmentCards = document.querySelectorAll('.service-card, .product-card');
equipmentCards.forEach(card => {
    let canvas, ctx, particles = [], animationFrame;
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth < 768) return;
        canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2';
        card.style.position = 'relative';
        card.appendChild(canvas);
        ctx = canvas.getContext('2d');
        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;
        
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1
            });
        }
        
        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.01;
                if (p.life <= 0) {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                    p.life = 1;
                }
                ctx.fillStyle = `rgba(255, 200, 100, ${p.life * 0.5})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrame = requestAnimationFrame(animate);
        }
        animate();
    });
    card.addEventListener('mouseleave', () => {
        if (canvas) {
            cancelAnimationFrame(animationFrame);
            canvas.remove();
            canvas = null;
            particles = [];
        }
    });
});

// 6. Анимация линии-разделителя при скролле
const dividers = document.querySelectorAll('.divider-path');
if (dividers.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'draw-line 2s forwards';
            }
        });
    }, { threshold: 0.5 });
    dividers.forEach(path => observer.observe(path));
}

(function() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch) return;

    // Проверяем сохранённую тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeSwitch.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
})();

// Для бегущей строки с проектами (дублирование контента для бесконечной анимации)
(function() {
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        const children = Array.from(marquee.children);
        children.forEach(child => {
            const clone = child.cloneNode(true);
            marquee.appendChild(clone);
        });
    }
})();

// === КАСТОМНЫЙ ТУЛТИП ДЛЯ КАРТЫ (плавная смена) ===
(function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    document.body.appendChild(tooltip);

    let activePoint = null;
    let hideTimeout = null;
    const hideDelay = 25;
    const distanceThreshold = 25;

    function hideTooltip() {
        if (hideTimeout) clearTimeout(hideTimeout);
        tooltip.classList.remove('show');
        activePoint = null;
    }

    function scheduleHide() {
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideTooltip, hideDelay);
    }

    function cancelHide() {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    }

    function positionTooltip(point) {
        const rect = point.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;
        let top;

        if (spaceBelow > tooltipRect.height + 20 || spaceBelow > spaceAbove) {
            top = rect.bottom + 10;
            tooltip.classList.remove('bottom');
        } else {
            top = rect.top - tooltipRect.height - 10;
            tooltip.classList.add('bottom');
        }

        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
    }

    function showTooltip(point, title, imageUrl) {
        if (activePoint === point && tooltip.classList.contains('show')) {
            positionTooltip(point);
            return;
        }

        hideTooltip(); // убираем предыдущий

        let content = '';
        if (imageUrl) {
            content += `<div class="tooltip-image-container">`;
            content += `<img src="${imageUrl}" alt="${title}" 
                onload="this.style.display='block'" 
                onerror="this.style.display='none'; this.parentNode.classList.add('no-image')">`;
            content += `</div>`;
        }
        content += `<div class="tooltip-text">${title}</div>`;
        tooltip.innerHTML = content;

        activePoint = point;
        tooltip.classList.add('show');
        positionTooltip(point);
    }

    function onMouseMove(e) {
        if (!activePoint) return;

        const rect = activePoint.getBoundingClientRect();
        const pointX = rect.left + rect.width / 2;
        const pointY = rect.top + rect.height / 2;

        const dx = e.clientX - pointX;
        const dy = e.clientY - pointY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > distanceThreshold) {
            scheduleHide();
        } else {
            cancelHide();
        }
    }

    // Инициализация точек
    document.querySelectorAll('.map-point').forEach(point => {
        const title = point.dataset.title || point.getAttribute('title') || '';
        const imageUrl = point.dataset.image || null;

        point.addEventListener('mouseenter', () => {
            cancelHide();
            showTooltip(point, title, imageUrl);
        });

        point.addEventListener('mouseleave', scheduleHide);
    });

    // Глобальные обработчики
    window.addEventListener('scroll', hideTooltip);
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.map-point')) hideTooltip();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideTooltip();
    });
    document.addEventListener('mousemove', onMouseMove);
})();

// function initScrollLine() {
//     const canvasId = 'svg-line-canvas';
//     let svg = document.getElementById(canvasId);

//     if (!svg) {
//         svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         svg.id = canvasId;
//         Object.assign(svg.style, {
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             width: '100%',
//             height: document.documentElement.scrollHeight + 'px',
//             pointerEvents: 'none',
//             zIndex: '1' // Поверх фона, но под текстом (если у текста z-index выше)
//         });
//         document.body.appendChild(svg);
//     }

//     const elements = document.querySelectorAll('.js-connect-item');
//     if (elements.length < 2) return;

//     let pathData = "";
//     const scrollY = window.pageYOffset;

//     elements.forEach((el, i) => {
//         const rect = el.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2 + window.scrollY;

//         // Определяем точку выхода линии (край рамки)
//         const isLeft = rect.left < window.innerWidth / 2;
//         const x = isLeft ? rect.right : rect.left;
//         const y = centerY;

//         if (i === 0) {
//             pathData += `M ${x} ${y} `;
//         } else {
//             const prevRect = elements[i-1].getBoundingClientRect();
//             const prevX = (prevRect.left < window.innerWidth / 2) ? prevRect.right : prevRect.left;
//             const prevY = (prevRect.top + prevRect.height / 2) + window.scrollY;

//             // Контрольные точки для обхода центра (избегаем наезда на текст)
//             // Линия выгибается к ближайшему краю экрана
//             const cpOffset = 200; 
//             const cp1x = prevX + (prevX < window.innerWidth / 2 ? -cpOffset : cpOffset);
//             const cp2x = x + (x < window.innerWidth / 2 ? -cpOffset : cpOffset);

//             pathData += `C ${cp1x} ${prevY}, ${cp2x} ${y}, ${x} ${y} `;
//         }
//     });

//     // Создаем или обновляем путь
//     let path = svg.querySelector('path');
//     if (!path) {
//         path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         path.setAttribute("fill", "none");
//         path.setAttribute("stroke", "#223387"); // Цвет линии
//         path.setAttribute("stroke-width", "2");
//         path.setAttribute("stroke-dasharray", "8, 12"); // Пунктир
//         svg.appendChild(path);
//     }
    
//     path.setAttribute("d", pathData);

//     // Анимация скролла
//     const pathLength = path.getTotalLength();
//     path.style.strokeDasharray = pathLength;
    
//     function updateLineDrawing() {
//         const scrollPercentage = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
//         // Рисуем линию чуть с опережением скролла для эффекта появления
//         const drawLength = pathLength * (scrollPercentage * 1.5); 
//         path.style.strokeDashoffset = pathLength - Math.min(drawLength, pathLength);
//     }

//     window.addEventListener('scroll', updateLineDrawing);
//     updateLineDrawing();
// }

// // Запуск после полной загрузки страницы и фото
// window.addEventListener('load', () => {
//     setTimeout(initScrollLine, 500); // Небольшая задержка для корректного расчета высоты
// });

// window.addEventListener('resize', initScrollLine);

// // === ДИНАМИЧЕСКАЯ СМЕНА ЛОГОТИПА ПРИ СКРОЛЛЕ (0.gif ... 100.gif) ===
// const logoImg = document.getElementById('logoImg');
// if (logoImg) {
//     function updateLogoByScroll() {
//         const scrollTop = window.scrollY;
//         const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//         let percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
//         percent = Math.min(100, Math.max(0, percent));
//         const frame = Math.round(percent);
//         const newSrc = `images/logo.png`;
//         if (logoImg.src !== window.location.origin + '/' + newSrc) {
//             logoImg.src = newSrc;
//         }
//     }
//     window.addEventListener('scroll', updateLogoByScroll);
//     window.addEventListener('resize', updateLogoByScroll);
//     updateLogoByScroll();
// }

document.addEventListener('submit', function(e) {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const errorElement = document.getElementById('error');
    const maxSize = 10 * 1024 * 1024; // 10 МБ

    if (file && file.size > maxSize) {
        e.preventDefault(); // Остановить отправку формы
        errorElement.textContent = 'Файл слишком большой. Максимальный размер: 10 МБ.';
    } else {
        errorElement.textContent = ''; // Очистить ошибку
    }
});
// === СИСТЕМА УВЕДОМЛЕНИЙ (TOAST) ===
// Динамически добавляем стили
const toastStyles = document.createElement('style');
toastStyles.innerHTML = `
    .toast-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .toast {
        min-width: 280px;
        padding: 16px 24px;
        border-radius: 12px;
        color: #fff;
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        opacity: 0;
        transform: translateX(100%);
        animation: slideInToast 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        transition: opacity 0.4s, transform 0.4s;
    }
    .toast.hide {
        opacity: 0;
        transform: translateX(100%);
    }
    .toast.success { background-color: #223387; }
    .toast.error { background-color: #e53935; }
    .toast.warning { background-color: #fb8c00; color: #fff; }
    @keyframes slideInToast {
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(toastStyles);

const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    toast.innerHTML = `<i class="fas ${icon}" style="font-size: 1.4em;"></i> <span style="line-height: 1.4;">${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// === ЛОВИМ УСПЕШНОЕ ВОЗВРАЩЕНИЕ ПОСЛЕ СТАНДАРТНОЙ ОТПРАВКИ ===
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form_status') === 'success') {
        // Если в ссылке есть form_status=success, показываем уведомление
        setTimeout(() => {
            showToast('Заявка и резюме успешно отправлены! Мы скоро свяжемся с вами.', 'success');
        }, 500);
        
        // Очищаем ссылку от мусора, чтобы уведомление не висело при обновлении страницы
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, '', cleanUrl);
    }
});

// === ОТПРАВКА ФОРМ ===
function setupSmartForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const hasFiles = form.querySelector('input[type="file"]') !== null;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Изначально тормозим любую форму для валидации

        // 1. ПРОВЕРКА РАЗМЕРА ФАЙЛА (ДО 10 МБ)
        if (hasFiles) {
            const fileInputs = form.querySelectorAll('input[type="file"]');
            for (let input of fileInputs) {
                if (input.files && input.files.length > 0) {
                    if (input.files[0].size > 10 * 1024 * 1024) {
                        showToast('Размер файла превышает 10 МБ. Прикрепите файл поменьше.', 'error');
                        input.value = '';
                        return; // Прерываем
                    }
                }
            }
        }

        // 2. ПРОВЕРКА ТЕСТА (вакансии)
        if (formId === 'vacancyForm') {
            let allFilled = true;
            for (let i = 1; i <= 10; i++) {
                const field = document.getElementById('q' + i);
                if (!field || !field.value.trim()) {
                    allFilled = false;
                    break;
                }
            }
            if (!allFilled) {
                showToast('Пожалуйста, пройдите тестирование (нажмите кнопку "Пройти тестирование").', 'warning');
                const modal = document.getElementById('questionModal');
                if(modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                return; // Прерываем
            }
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;

        // 3. МЕХАНИЗМ ОТПРАВКИ
        if (hasFiles) {
            // ФАЙЛЫ: Отправляем стандартным способом (чтобы 100% дошло)
            // Перед отправкой динамически меняем скрытое поле _next, чтобы FormSubmit вернул нас с меткой success
            const nextInput = form.querySelector('input[name="_next"]');
            if (nextInput) {
                nextInput.value = window.location.origin + window.location.pathname + '?form_status=success';
            }
            
            // Запускаем родную отправку в обход preventDefault
            form.submit(); 
        } else {
            // БЕЗ ФАЙЛОВ: Используем быстрый AJAX
            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action').replace('formsubmit.co/', 'formsubmit.co/ajax/');

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('Сообщение успешно отправлено!', 'success');
                    form.reset();
                } else {
                    showToast('Не удалось отправить сообщение.', 'error');
                }
            })
            .catch(error => {
                showToast('Ошибка сети. Проверьте интернет.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        }
    });
}

// Инициализируем
setupSmartForm('contactsForm');
setupSmartForm('vacancyForm');