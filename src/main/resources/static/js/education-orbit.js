(function () {
    function initEducationOrbit() {
        var section = document.querySelector('.education-section');
        if (!section) return;

        var wrappers = section.querySelectorAll('.education-node-wrapper');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        section.classList.add('is-visible');
                        observer.unobserve(section);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });
            observer.observe(section);
        } else {
            section.classList.add('is-visible');
        }

        wrappers.forEach(function (wrap) {
            var btn = wrap.querySelector('.education-orbit-node');
            if (!btn) return;

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var wasActive = wrap.classList.contains('is-active-popover');
                wrappers.forEach(function (w) {
                    w.classList.remove('is-active-popover');
                });
                if (!wasActive) {
                    wrap.classList.add('is-active-popover');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.education-node-wrapper')) {
                wrappers.forEach(function (w) {
                    w.classList.remove('is-active-popover');
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEducationOrbit);
    } else {
        initEducationOrbit();
    }
})();
