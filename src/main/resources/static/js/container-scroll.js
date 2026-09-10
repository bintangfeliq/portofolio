(function () {
    function initContainerScroll() {
        var wraps = document.querySelectorAll('.container-scroll-wrap');
        if (!wraps.length) return;

        function onScroll() {
            var windowHeight = window.innerHeight;
            var isMobile = window.innerWidth <= 768;

            wraps.forEach(function (wrap) {
                var rect = wrap.getBoundingClientRect();
                var startPoint = windowHeight * 0.95;
                var endPoint = windowHeight * 0.2;

                var progress = (startPoint - rect.top) / (startPoint - endPoint);
                progress = Math.max(0, Math.min(1, progress));

                var maxRotate = isMobile ? 15 : 20;
                var rotateVal = maxRotate * (1 - progress);

                var startScale = isMobile ? 0.86 : 0.93;
                var endScale = 1.0;
                var scaleVal = startScale + (endScale - startScale) * progress;

                var card = wrap.querySelector('.container-scroll-card');
                if (card) {
                    card.style.transform = 'rotateX(' + rotateVal.toFixed(2) + 'deg) scale(' + scaleVal.toFixed(3) + ')';
                }
            });
        }

        var ticking = false;
        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', requestTick);
        onScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContainerScroll);
    } else {
        initContainerScroll();
    }
})();
