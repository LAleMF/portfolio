/* ======================================================
   PORTFOLIO — main.js
   Deps (CDN): GSAP + ScrollTrigger, particles.js, Typed.js, AOS
====================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ================================================
    // AOS — Scroll animations
    // ================================================
    AOS.init({
        duration:  700,
        easing:    'ease-out-cubic',
        once:      true,
        offset:    80,
        delay:     0,
    });

    // ================================================
    // GSAP + ScrollTrigger
    // ================================================
    gsap.registerPlugin(ScrollTrigger);

    // Hero staggered entrance
    const heroItems = gsap.utils.toArray('.hero-gsap');
    gsap.fromTo(heroItems, {
        opacity: 0,
        y: 40,
    }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.3,
    });

    // Section titles — subtle slide from left
    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.fromTo(el, { x: -30, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
    });

    // Project cards — 3D hover tilt (vanilla JS, no extra lib)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) / (rect.width  / 2);
            const dy     = (e.clientY - cy) / (rect.height / 2);
            const rotY   =  dx * 3;
            const rotX   = -dy * 2;
            card.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ================================================
    // Typed.js — Hero role typewriter
    // ================================================
    new Typed('#typed-el', {
        strings: [
            'Desarrollador Full-Stack',
            'Desarrollador Android',
            'Dev DAM / DAW',
            'IA aplicada al desarrollo',
        ],
        typeSpeed:      48,
        backSpeed:      28,
        backDelay:      2200,
        startDelay:     900,
        loop:           true,
        showCursor:     true,
        cursorChar:     '|',
        smartBackspace: true,
    });

    // ================================================
    // particles.js — Hero background
    // ================================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number:  { value: 72, density: { enable: true, value_area: 900 } },
                color:   { value: ['#8b5cf6', '#06b6d4', '#a855f7', '#22d3ee'] },
                shape:   { type: 'circle' },
                opacity: {
                    value: 0.45,
                    random: true,
                    anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false },
                },
                size: {
                    value: 2.5,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.5, sync: false },
                },
                line_linked: {
                    enable:   true,
                    distance: 145,
                    color:    '#8b5cf6',
                    opacity:  0.18,
                    width:    1,
                },
                move: {
                    enable: true,
                    speed:  1.4,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce:   false,
                    attract:  { enable: false },
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true,  mode: 'grab'  },
                    onclick: { enable: true,  mode: 'push'  },
                    resize:  true,
                },
                modes: {
                    grab: { distance: 160, line_linked: { opacity: 0.45 } },
                    push: { particles_nb: 4 },
                },
            },
            retina_detect: true,
        });
    }

    // ================================================
    // Navbar — scroll behavior & active link
    // ================================================
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        backToTop.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // Active nav link on scroll (Intersection Observer)
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link[data-section]');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === entry.target.id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // ================================================
    // Mobile nav toggle
    // ================================================
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu   = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // ================================================
    // Custom cursor
    // ================================================
    const cursor         = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top  = mouseY + 'px';
        });

        // Smooth follower with rAF
        (function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top  = followerY + 'px';
            requestAnimationFrame(animateFollower);
        })();

        // Hover state on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, .skill-tag, .project-card');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ================================================
    // Back to top
    // ================================================
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================================================
    // Footer year
    // ================================================
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ================================================
    // Skill tags — stagger reveal with GSAP
    // ================================================
    const skillSection = document.querySelector('.skill-cloud');
    if (skillSection) {
        ScrollTrigger.create({
            trigger: skillSection,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.skill-tag', {
                    opacity: 0,
                    scale: 0.85,
                    y: 10,
                }, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.45,
                    ease: 'back.out(1.5)',
                });
            },
        });
    }

    // ================================================
    // Terminal lines — stagger appear
    // ================================================
    const terminalLines = document.querySelectorAll('.t-line');
    if (terminalLines.length) {
        const terminalBox = document.querySelector('.terminal-box');
        ScrollTrigger.create({
            trigger: terminalBox,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.fromTo(terminalLines, {
                    opacity: 0,
                    x: -8,
                }, {
                    opacity: 1,
                    x: 0,
                    stagger: 0.08,
                    duration: 0.35,
                    ease: 'power2.out',
                });
            },
        });
    }

});
