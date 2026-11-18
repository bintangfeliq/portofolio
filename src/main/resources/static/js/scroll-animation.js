(() => {
    'use strict';

    const revealTarget = (selector) => {
        const target = selector && selector !== '#' ? document.querySelector(selector) : null;
        if (!target) return;
        target.classList.add('aos-animate');
        target.querySelectorAll('[data-aos]').forEach((child) => child.classList.add('aos-animate'));
    };

    const initAOS = () => {
        const elements = document.querySelectorAll('[data-aos]');
        if (!elements.length) return;

        if ('IntersectionObserver' in window) {
            const isMobile = window.innerWidth <= 768;
            const observer = new IntersectionObserver((entries) => {
                const vh = window.innerHeight || document.documentElement.clientHeight;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    } else {
                        const rect = entry.target.getBoundingClientRect();
                        if (rect.top > vh || rect.bottom < 0) {
                            entry.target.classList.remove('aos-animate');
                        }
                    }
                });
            }, {
                threshold: isMobile ? 0.08 : 0.15,
                rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -30px 0px'
            });
            elements.forEach((el) => observer.observe(el));
        } else {
            elements.forEach((el) => el.classList.add('aos-animate'));
        }

        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', () => revealTarget(link.getAttribute('href')));
        });

        if (window.location.hash) {
            revealTarget(window.location.hash);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAOS);
    } else {
        initAOS();
    }
})();
