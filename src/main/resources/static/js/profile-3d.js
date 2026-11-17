document.addEventListener("DOMContentLoaded", function () {
    const textPath = document.getElementById("marqueeTextPath");
    const marqueeUnit = document.getElementById("marqueeUnit");
    if (textPath && marqueeUnit) {
        let unitLen = marqueeUnit.getComputedTextLength() || 2200;
        let offset = -unitLen + 1660;
        let lastTime = performance.now();
        const speed = 115;
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () {
                const measured = marqueeUnit.getComputedTextLength();
                if (measured > 0) {
                    unitLen = measured;
                    offset = -unitLen + 1660;
                }
            });
        }
        function animateMarquee(now) {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            offset -= speed * dt;
            if (offset <= -unitLen) {
                offset += unitLen;
            }
            textPath.setAttribute("startOffset", offset.toFixed(2) + "px");
            requestAnimationFrame(animateMarquee);
        }
        textPath.setAttribute("startOffset", offset.toFixed(2) + "px");
        requestAnimationFrame(animateMarquee);
    }
    const card = document.getElementById("profileCard");
    if (!card) return;
    const container = card.parentElement;
    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -18;
        const rotateY = ((x - centerX) / centerX) * 18;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    container.addEventListener("mouseleave", () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});
