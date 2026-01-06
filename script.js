// --- TRANSLATIONS ---
const translations = {
    cs: {
        subtitle: 'Frontend vývojář zaměřený na<br>moderní UI, animace a interaktivní weby.',
        bio: 'Vytvářím webové aplikace, které nejsou jen funkční, ale i vizuálně působivé.',
        label_tech: 'Technologie',
        value_tech: 'JavaScript, HTML, CSS',
        label_focus: 'Zaměření',
        value_focus: 'Moderní UI, Animace, Interaktivita',
        label_type: 'Typ Projektu',
        value_type: 'Webové aplikace, Prototypy',
        label_workflow: 'Workflow',
        value_workflow: 'Git, Komponentový přístup',
        label_hobby: 'Hobby',
        value_hobby: 'Výroba pyrotechniky, Jízda na motorce',
        label_project: 'Projekt',
        mockup_title: 'Dashboard'
    },
    en: {
        subtitle: 'Frontend developer focused on<br>modern UI, animations, and interactive web.',
        bio: 'I create web applications that are not just functional, but visually impressive.',
        label_tech: 'Technologies',
        value_tech: 'JavaScript, HTML, CSS',
        label_focus: 'Focus',
        value_focus: 'Modern UI, Animations, Interactivity',
        label_type: 'Project Type',
        value_type: 'Web Applications, Prototypes',
        label_workflow: 'Workflow',
        value_workflow: 'Git, Component approach',
        label_hobby: 'Hobbies',
        value_hobby: 'Pyrotechnics manufacturing, Motorbike riding',
        label_project: 'Project',
        mockup_title: 'Dashboard'
    },
    de: {
        subtitle: 'Frontend-Entwickler mit Fokus auf<br>moderne UI, Animationen und interaktive Webs.',
        bio: 'Ich erstelle Webanwendungen, die nicht nur funktional, sondern auch visuell beeindruckend sind.',
        label_tech: 'Technologien',
        value_tech: 'JavaScript, HTML, CSS',
        label_focus: 'Fokus',
        value_focus: 'Moderne UI, Animationen, Interaktivität',
        label_type: 'Projekttyp',
        value_type: 'Webanwendungen, Prototypen',
        label_workflow: 'Arbeitsablauf',
        value_workflow: 'Git, Komponentenansatz',
        label_hobby: 'Hobbys',
        value_hobby: 'Pyrotechnikherstellung, Motorradfahren',
        label_project: 'Projekt',
        mockup_title: 'Instrumententafel'
    },
    fr: {
        subtitle: 'Développeur frontend axé sur<br>l\'interface utilisateur moderne, les animations et le web interactif.',
        bio: 'Je crée des applications web qui ne sont pas seulement fonctionnelles, mais visuellement impressionnantes.',
        label_tech: 'Technologies',
        value_tech: 'JavaScript, HTML, CSS',
        label_focus: 'Focus',
        value_focus: 'Interface utilisateur moderne, Animations, Interactivité',
        label_type: 'Type de projet',
        value_type: 'Applications web, Prototypes',
        label_workflow: 'Flux de travail',
        value_workflow: 'Git, Approche par composants',
        label_hobby: 'Loisirs',
        value_hobby: 'Fabrication de pyrotechnie, Moto',
        label_project: 'Projet',
        mockup_title: 'Tableau de bord'
    },
    ru: {
        subtitle: 'Фронтенд-разработчик, специализирующийся на<br>современном UI, анимации и интерактивных веб-сайтах.',
        bio: 'Я создаю веб-приложения, которые не только функциональны, но и визуально впечатляют.',
        label_tech: 'Технологии',
        value_tech: 'JavaScript, HTML, CSS',
        label_focus: 'Специализация',
        value_focus: 'Современный UI, Анимация, Интерактивность',
        label_type: 'Тип проекта',
        value_type: 'Веб-приложения, Прототипы',
        label_workflow: 'Рабочий процесс',
        value_workflow: 'Git, Компонентный подход',
        label_hobby: 'Хобби',
        value_hobby: 'Изготовление пиротехники, Езда на мотоцикле',
        label_project: 'Проект',
        mockup_title: 'Дашборд'
    }
};

// --- LANGUAGE LOGIC ---
window.toggleLanguageMenu = () => {
    const menu = document.getElementById('lang-menu');
    menu.classList.toggle('active');
};

window.selectLanguage = (lang) => {
    localStorage.setItem('preferredLanguage', lang);

    // Update Button Text
    const btnText = document.getElementById('current-lang');
    if (btnText) btnText.textContent = lang.toUpperCase();

    // Update Content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Close Menu
    document.getElementById('lang-menu').classList.remove('active');
};

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        document.getElementById('lang-menu').classList.remove('active');
    }
});

/* --- INIT --- */
// Initialize theme and language immediately
const savedLang = localStorage.getItem('preferredLanguage') || 'cs';
document.addEventListener('DOMContentLoaded', () => {
    window.selectLanguage(savedLang);
});

// Original Toggle Theme
window.toggleTheme = () => document.body.classList.toggle('light-mode');


/* --- MAIN ANIMATIONS --- */
window.addEventListener('load', () => {
    // Re-apply language in case DOM wasn't ready earlier (failsafe)
    window.selectLanguage(localStorage.getItem('preferredLanguage') || 'cs');

    // Removed erroneous initialization

    if (typeof gsap === 'undefined') return;

    // --- GSAP INIT ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".col-left > *", { opacity: 0, y: 30, duration: 1, stagger: 0.1, delay: 0.2 });
    gsap.from(".info-card", { opacity: 0, x: 30, duration: 1, delay: 0.5 });

    // --- STATE & ELEMENTS ---
    const currentState = { mouseX: 0, mouseY: 0, curX: 0, curY: 0 };
    const els = {
        card: document.querySelector('.info-card'),
        light: document.querySelector('.ambient-light'),
        blobs: document.querySelectorAll('.shape-blob'),
        geos: document.querySelectorAll('.shape-geo')
    };

    // --- MOUSE HANDLER (Spotlight + Parallax Input) ---
    document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
        document.body.style.setProperty('--mouse-x', `${x}px`);
        document.body.style.setProperty('--mouse-y', `${y}px`);
        currentState.mouseX = (x / window.innerWidth) - 0.5;
        currentState.mouseY = (y / window.innerHeight) - 0.5;

        // Direct Parallax
        const move = (el, speed, mod = 1) => {
            const s = (parseFloat(el.dataset.speed) || 0.05) * mod;
            gsap.to(el, {
                x: currentState.mouseX * window.innerWidth * s,
                y: currentState.mouseY * window.innerHeight * s,
                rotation: mod > 1 ? currentState.mouseX * 20 : 0,
                duration: mod > 1 ? 1.5 : 2,
                ease: mod > 1 ? "power1.out" : "power2.out"
            });
        };
        els.blobs.forEach(b => move(b, 1));
        els.geos.forEach(g => move(g, 1.5));
    });

    // --- ANIMATION LOOP (Smooth Float) ---
    const loop = (t) => {
        currentState.curX += (currentState.mouseX - currentState.curX) * 0.08;
        currentState.curY += (currentState.mouseY - currentState.curY) * 0.08;
        const time = t * 0.001;

        if (els.card) {
            const y = Math.sin(time * 0.5) * 5;
            els.card.style.transform = `translate3d(${-currentState.curX * 15}px, ${-currentState.curY * 15 + y}px, 0)`;
        }
        if (els.light) {
            const s = 1 + Math.sin(time * 0.5) * 0.15;
            els.light.style.transform = `translate(calc(-50% + ${currentState.curX * 60}px), calc(-50% + ${currentState.curY * 60}px)) scale(${s})`;
        }
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    console.log('Antigravity v2 online');

    // --- PARTICLES SYSTEM ---
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
                // Randomize positions initially to fill screen
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2; // Slow speed
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 2 + 0.5; // Small dots
                this.alpha = Math.random() * 0.5 + 0.1;
                this.flashSpeed = 0.02;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                const isLight = document.body.classList.contains('light-mode');
                ctx.fillStyle = isLight
                    ? `rgba(30, 41, 59, ${this.alpha})` // Dark slate for light mode
                    : `rgba(255, 255, 255, ${this.alpha})`; // White for dark mode

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = window.innerWidth < 768 ? 30 : 60; // Fewer on mobile
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }
});
