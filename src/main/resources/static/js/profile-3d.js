document.addEventListener('DOMContentLoaded', () => {
    const textPath = document.getElementById('marqueeTextPath');
    const marqueeUnit = document.getElementById('marqueeUnit');

    if (textPath && marqueeUnit) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.matchMedia('(max-width: 900px)').matches;
        const frameInterval = isMobile ? 32 : 0; // ~30fps on mobile to slash SVG textPath main-thread work

        let unitLen = 2200;
        let offset = -unitLen + 1660;
        let lastTime = performance.now();
        let lastDraw = 0;
        const speed = 115;

        let isMarqueeVisible = true;
        let marqueeRafId = null;

        const animateMarquee = (now) => {
            if (!isMarqueeVisible || reducedMotion) {
                marqueeRafId = null;
                return;
            }
            if (frameInterval > 0 && now - lastDraw < frameInterval) {
                marqueeRafId = requestAnimationFrame(animateMarquee);
                return;
            }
            lastDraw = now;
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            offset -= speed * dt;
            if (offset <= -unitLen) offset += unitLen;
            textPath.setAttribute('startOffset', `${offset.toFixed(2)}px`);
            marqueeRafId = requestAnimationFrame(animateMarquee);
        };

        const startMarquee = () => {
            requestAnimationFrame(() => {
                const measured = marqueeUnit.getComputedTextLength();
                if (measured > 0) {
                    unitLen = measured;
                    offset = -unitLen + 1660;
                }
                textPath.setAttribute('startOffset', `${offset.toFixed(2)}px`);

                document.fonts?.ready.then(() => {
                    const readyLen = marqueeUnit.getComputedTextLength();
                    if (readyLen > 0) {
                        unitLen = readyLen;
                        offset = -unitLen + 1660;
                    }
                });

                if (!reducedMotion && isMarqueeVisible && !marqueeRafId) {
                    lastTime = performance.now();
                    marqueeRafId = requestAnimationFrame(animateMarquee);
                }
            });
        };

        if (isMobile) {
            setTimeout(startMarquee, 650);
        } else {
            startMarquee();
        }

        const dividerEl = textPath.closest('.paper-marquee-divider-wrapper');
        if (dividerEl && 'IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                isMarqueeVisible = entries[0].isIntersecting;
                if (isMarqueeVisible && !reducedMotion && !marqueeRafId) {
                    lastTime = performance.now();
                    marqueeRafId = requestAnimationFrame(animateMarquee);
                }
            }, { rootMargin: '100px 0px' }).observe(dividerEl);
        }
    }
});
