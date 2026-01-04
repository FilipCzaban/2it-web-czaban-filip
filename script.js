window.toggleTheme = () => document.body.classList.toggle('light-mode');

window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') return;

    // --- GSAP INIT ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".col-left > *", { opacity: 0, y: 30, duration: 1, stagger: 0.1, delay: 0.2 });
    gsap.from(".info-card", { opacity: 0, x: 30, duration: 1, delay: 0.5 });

    // --- STATE & ELEMENTS ---
    const state = { mouseX: 0, mouseY: 0, curX: 0, curY: 0 };
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
        state.mouseX = (x / window.innerWidth) - 0.5;
        state.mouseY = (y / window.innerHeight) - 0.5;

        // Direct Parallax
        const move = (el, speed, mod = 1) => {
            const s = (parseFloat(el.dataset.speed) || 0.05) * mod;
            gsap.to(el, {
                x: state.mouseX * window.innerWidth * s,
                y: state.mouseY * window.innerHeight * s,
                rotation: mod > 1 ? state.mouseX * 20 : 0,
                duration: mod > 1 ? 1.5 : 2,
                ease: mod > 1 ? "power1.out" : "power2.out"
            });
        };
        els.blobs.forEach(b => move(b, 1));
        els.geos.forEach(g => move(g, 1.5));
    });

    // --- ANIMATION LOOP (Smooth Float) ---
    const loop = (t) => {
        state.curX += (state.mouseX - state.curX) * 0.08;
        state.curY += (state.mouseY - state.curY) * 0.08;
        const time = t * 0.001;

        if (els.card) {
            const y = Math.sin(time * 0.5) * 5;
            els.card.style.transform = `translate3d(${-state.curX * 15}px, ${-state.curY * 15 + y}px, 0)`;
        }
        if (els.light) {
            const s = 1 + Math.sin(time * 0.5) * 0.15;
            els.light.style.transform = `translate(calc(-50% + ${state.curX * 60}px), calc(-50% + ${state.curY * 60}px)) scale(${s})`;
        }
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    console.log('Antigravity v2 online');
});
