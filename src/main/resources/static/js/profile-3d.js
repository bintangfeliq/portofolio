document.addEventListener('DOMContentLoaded', () => {
    const textPath = document.getElementById('marqueeTextPath');
    const marqueeUnit = document.getElementById('marqueeUnit');

    if (textPath && marqueeUnit) {
        let unitLen = marqueeUnit.getComputedTextLength() || 2200;
        let offset = -unitLen + 1660;
        let lastTime = performance.now();
        const speed = 115;

        document.fonts?.ready.then(() => {
            const measured = marqueeUnit.getComputedTextLength();
            if (measured > 0) {
                unitLen = measured;
                offset = -unitLen + 1660;
            }
        });

        const animateMarquee = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            offset -= speed * dt;
            if (offset <= -unitLen) offset += unitLen;
            textPath.setAttribute('startOffset', `${offset.toFixed(2)}px`);
            requestAnimationFrame(animateMarquee);
        };

        textPath.setAttribute('startOffset', `${offset.toFixed(2)}px`);
        requestAnimationFrame(animateMarquee);
    }
});
