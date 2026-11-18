(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const initKineticGrid = (options) => {
        const canvas = document.getElementById(options?.canvasId || 'kinetic-grid-canvas');
        const ctx = canvas?.getContext('2d', { alpha: false });
        if (!canvas || !ctx) return;

        const theme = (canvas.dataset.theme || options?.theme || 'default').toLowerCase();
        const colors = theme === 'monochrome'
            ? { bg: '#0b0b0e', line: 'rgba(255, 255, 255, 0.16)', dot: 'rgba(255, 255, 255, 0.35)' }
            : { bg: '#0b0b0e', line: 'rgba(45, 212, 191, 0.24)', dot: 'rgba(94, 234, 212, 0.50)' };

        const config = {
            cellSize: 46,
            mouseRadius: 180,
            mouseStrength: 34,
            lerpSpeed: 0.1,
            dotRadius: 1.4
        };

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetMouse = { x: -1000, y: -1000, active: false };
        const currentMouse = { x: -1000, y: -1000 };
        const ripples = [];
        let animationId;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        const getWarpedPoint = (x, y) => {
            let wx = x;
            let wy = y;

            if (currentMouse.x > -500) {
                const dx = x - currentMouse.x;
                const dy = y - currentMouse.y;
                const distSq = dx * dx + dy * dy;
                const radiusSq = config.mouseRadius * config.mouseRadius;
                if (distSq < radiusSq && distSq > 0.001) {
                    const dist = Math.sqrt(distSq);
                    const push = Math.pow(1 - dist / config.mouseRadius, 2) * config.mouseStrength;
                    wx += (dx / dist) * push;
                    wy += (dy / dist) * push;
                }
            }

            for (let i = 0; i < ripples.length; i++) {
                const r = ripples[i];
                const rdx = x - r.x;
                const rdy = y - r.y;
                const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
                const diff = rdist - r.radius;
                if (Math.abs(diff) < r.wavelength && rdist > 0.001) {
                    const waveAmp = Math.sin((diff / r.wavelength) * Math.PI) * r.amplitude;
                    wx += (rdx / rdist) * waveAmp;
                    wy += (rdy / rdist) * waveAmp;
                }
            }

            return { x: wx, y: wy };
        };

        const triggerRipple = (x, y) => {
            ripples.push({
                x,
                y,
                radius: 0,
                maxRadius: Math.max(width, height) * 1.3,
                speed: 8,
                amplitude: 24,
                wavelength: 50,
                decay: 0.982
            });
        };

        const handlePointerMove = (e) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
            targetMouse.active = true;
        };

        const handlePointerLeave = () => {
            targetMouse.active = false;
            targetMouse.x = -1000;
            targetMouse.y = -1000;
        };

        const handleClick = (e) => triggerRipple(e.clientX, e.clientY);

        const update = () => {
            const tx = targetMouse.active ? targetMouse.x : -1000;
            const ty = targetMouse.active ? targetMouse.y : -1000;
            const speed = targetMouse.active ? config.lerpSpeed : 0.05;
            currentMouse.x = lerp(currentMouse.x, tx, speed);
            currentMouse.y = lerp(currentMouse.y, ty, speed);

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.amplitude *= r.decay;
                if (r.radius > r.maxRadius || r.amplitude < 0.2) {
                    ripples.splice(i, 1);
                }
            }
        };

        const render = () => {
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, width, height);

            const { cellSize, dotRadius } = config;
            const cols = Math.ceil(width / cellSize) + 2;
            const rows = Math.ceil(height / cellSize) + 2;
            const offsetX = ((width % cellSize) - cellSize) / 2;
            const offsetY = ((height % cellSize) - cellSize) / 2;

            const grid = Array.from({ length: rows + 1 }, (_, r) => {
                const y = offsetY + r * cellSize;
                return Array.from({ length: cols + 1 }, (__, c) => getWarpedPoint(offsetX + c * cellSize, y));
            });

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors.line;

            for (let r = 0; r <= rows; r++) {
                for (let c = 0; c <= cols; c++) {
                    const pt = grid[r][c];
                    if (c === 0) ctx.moveTo(pt.x, pt.y);
                    else ctx.lineTo(pt.x, pt.y);
                }
            }
            for (let c = 0; c <= cols; c++) {
                for (let r = 0; r <= rows; r++) {
                    const pt = grid[r][c];
                    if (r === 0) ctx.moveTo(pt.x, pt.y);
                    else ctx.lineTo(pt.x, pt.y);
                }
            }
            ctx.stroke();

            if (dotRadius > 0) {
                ctx.beginPath();
                ctx.fillStyle = colors.dot;
                for (let r = 0; r <= rows; r++) {
                    for (let c = 0; c <= cols; c++) {
                        const pt = grid[r][c];
                        ctx.moveTo(pt.x + dotRadius, pt.y);
                        ctx.arc(pt.x, pt.y, dotRadius, 0, Math.PI * 2);
                    }
                }
                ctx.fill();
            }
        };

        const loop = () => {
            update();
            render();
            animationId = requestAnimationFrame(loop);
        };

        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
        window.addEventListener('click', handleClick, { passive: true });
        resize();
        loop();

        return {
            destroy: () => {
                cancelAnimationFrame(animationId);
                window.removeEventListener('resize', resize);
                window.removeEventListener('mousemove', handlePointerMove);
                window.removeEventListener('mouseleave', handlePointerLeave);
                window.removeEventListener('click', handleClick);
            },
            triggerRipple
        };
    };

    const boot = () => {
        window.kineticGridInstance = initKineticGrid();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
    window.initKineticGrid = initKineticGrid;
})();
