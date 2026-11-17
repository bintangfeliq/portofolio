(function () {
    'use strict';
    function initAOS() {
        var elements = document.querySelectorAll('[data-aos]');
        if (!elements.length) return;
        if ('IntersectionObserver' in window) {
            var isMobile = window.innerWidth <= 768;
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    } else {
                        var rect = entry.target.getBoundingClientRect();
                        var vh = window.innerHeight || document.documentElement.clientHeight;
                        if (rect.top > vh || rect.bottom < 0) {
                            entry.target.classList.remove('aos-animate');
                        }
                    }
                });
            }, {
                threshold: isMobile ? 0.08 : 0.15,
                rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -30px 0px'
            });
            elements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            elements.forEach(function (el) {
                el.classList.add('aos-animate');
            });
        }
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function () {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    target.classList.add('aos-animate');
                    target.querySelectorAll('[data-aos]').forEach(function (child) {
                        child.classList.add('aos-animate');
                    });
                }
            });
        });
        if (window.location.hash) {
            var hashTarget = document.querySelector(window.location.hash);
            if (hashTarget) {
                hashTarget.classList.add('aos-animate');
                hashTarget.querySelectorAll('[data-aos]').forEach(function (child) {
                    child.classList.add('aos-animate');
                });
            }
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAOS);
    } else {
        initAOS();
    }
})();
