(() => {
    const initContainerScroll = () => {
        const wraps = document.querySelectorAll('.container-scroll-wrap');
        if (!wraps.length) return;

        const onScroll = () => {
            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth <= 768;
            const startPoint = windowHeight * 0.95;
            const endPoint = windowHeight * 0.2;
            const maxRotate = isMobile ? 15 : 20;
            const startScale = isMobile ? 0.86 : 0.93;

            wraps.forEach((wrap) => {
                const rect = wrap.getBoundingClientRect();
                const progress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)));
                const rotateVal = maxRotate * (1 - progress);
                const scaleVal = startScale + (1 - startScale) * progress;
                const card = wrap.querySelector('.container-scroll-card');
                if (card) {
                    card.style.transform = `rotateX(${rotateVal.toFixed(2)}deg) scale(${scaleVal.toFixed(3)})`;
                }
            });
        };

        let ticking = false;
        const requestTick = () => {
            if (ticking) return;
            window.requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        };

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', requestTick);
        onScroll();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContainerScroll);
    } else {
        initContainerScroll();
    }
})();
