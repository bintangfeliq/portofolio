(function () {
    function initEducationOrbit() {
        var section = document.querySelector('.education-section');
        if (!section) return;

        var track = section.querySelector('.education-orbit-track');
        var modals = document.querySelectorAll('.education-modal');

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

        if (track && modals.length) {
            modals.forEach(function (modalEl) {
                modalEl.addEventListener('show.bs.modal', function () {
                    track.classList.add('is-paused');
                });
                modalEl.addEventListener('hidden.bs.modal', function () {
                    track.classList.remove('is-paused');
                });
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEducationOrbit);
    } else {
        initEducationOrbit();
    }
})();
