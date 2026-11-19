document.addEventListener('DOMContentLoaded', () => {
    const assembly = document.getElementById('lanyardAssembly');
    const ropePath = document.getElementById('ropePath');
    const ropeShadow = document.getElementById('ropeShadow');
    const clasp = document.querySelector('.lanyard-metal-clasp');
    if (!assembly || !ropePath || !clasp) return;
    let isDragging = false;
    let hasDragged = false;
    let dragStartPos = { x: 0, y: 0 };
    let mouseX = 0, mouseY = 0;
    let startX = 0, startY = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let vx = 0, vy = 0;
    let targetRotateX = 0, targetRotateY = 0;
    let currentRotateX = 0, currentRotateY = 0;
    let fixedTopAnchorX = 0;
    let cachedHeroOrigin = { left: 0, top: 0 };
    const heroEl = document.querySelector('.hero-section-new');
    const zoneEl = document.querySelector('.hero-lanyard-right-zone');

    function updateHeroOrigin() {
        if (!heroEl) {
            cachedHeroOrigin = { left: 0, top: 0 };
            return;
        }
        const r = heroEl.getBoundingClientRect();
        cachedHeroOrigin = { left: r.left, top: r.top };
    }

    function initFixedAnchor() {
        updateHeroOrigin();
        if (zoneEl) {
            fixedTopAnchorX = zoneEl.offsetLeft + (zoneEl.offsetWidth / 2);
            return;
        }
        const claspRect = clasp.getBoundingClientRect();
        fixedTopAnchorX = (claspRect.left - cachedHeroOrigin.left + claspRect.width / 2) - currentX;
    }
    initFixedAnchor();
    window.addEventListener('load', initFixedAnchor);
    window.addEventListener('resize', initFixedAnchor);
    const getPoint = (e) => (e.touches && e.touches.length ? e.touches[0] : e);
    const onStart = (e) => {
        const p = getPoint(e);
        isDragging = true;
        hasDragged = false;
        dragStartPos = { x: p.clientX, y: p.clientY };
        startX = p.clientX - targetX;
        startY = p.clientY - targetY;
        assembly.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
        const p = getPoint(e);
        mouseX = p.clientX;
        mouseY = p.clientY;
        if (isDragging) {
            const moveDist = Math.hypot(p.clientX - dragStartPos.x, p.clientY - dragStartPos.y);
            if (moveDist > 6) {
                hasDragged = true;
            }
            const rawX = mouseX - startX;
            const rawY = mouseY - startY;
            targetX = Math.max(-240, Math.min(240, rawX));
            targetY = Math.max(-40, Math.min(200, rawY));
            targetRotateY = targetX * 0.05;
            targetRotateX = -targetY * 0.05;
            if (e.touches && e.cancelable) e.preventDefault();
        } else if (!e.touches) {
            const rect = assembly.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = mouseX - centerX;
            const distY = mouseY - centerY;
            if (Math.abs(distX) < 250 && Math.abs(distY) < 250) {
                targetRotateY = distX * 0.03;
                targetRotateX = -distY * 0.03;
            } else {
                targetRotateX = 0;
                targetRotateY = 0;
            }
        }
    };
    const onEnd = () => {
        if (isDragging) {
            isDragging = false;
            targetX = 0;
            targetY = 0;
            targetRotateX = 0;
            targetRotateY = 0;
            assembly.style.cursor = 'grab';
            setTimeout(() => {
                hasDragged = false;
            }, 60);
        }
    };
    assembly.addEventListener('mousedown', onStart);
    assembly.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
    window.addEventListener('blur', onEnd);
    const profileBtn = assembly.querySelector('.card-profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }
    function drawElasticRibbon() {
        const claspRect = clasp.getBoundingClientRect();
        const clipX = (claspRect.left - cachedHeroOrigin.left) + claspRect.width / 2;
        const clipY = (claspRect.top - cachedHeroOrigin.top) + 4;
        const anchorX = fixedTopAnchorX;
        const anchorY = -100;
        const deltaX = clipX - anchorX;
        const deltaY = clipY - anchorY;
        const controlX = anchorX + (deltaX * 0.45);
        const controlY = anchorY + (deltaY * 0.55) + (Math.abs(deltaX) * 0.1);
        const pathData = `M ${anchorX} ${anchorY} Q ${controlX} ${controlY} ${clipX} ${clipY}`;
        ropePath.setAttribute('d', pathData);
        if (ropeShadow) {
            const shadowData = `M ${anchorX + 4} ${anchorY} Q ${controlX + 5} ${controlY + 2} ${clipX + 4} ${clipY + 2}`;
            ropeShadow.setAttribute('d', shadowData);
        }
    }
    function renderLoop() {
        if (document.body.classList.contains('is-loading')) {
            requestAnimationFrame(renderLoop);
            return;
        }
        if (!isDragging) {
            const stiffness = 0.09;
            const damping = 0.75;
            const fx = (targetX - currentX) * stiffness;
            const fy = (targetY - currentY) * stiffness;
            vx = (vx + fx) * damping;
            vy = (vy + fy) * damping;
            currentX += vx;
            currentY += vy;
            currentRotateX += (targetRotateX - currentRotateX) * 0.15;
            currentRotateY += (targetRotateY - currentRotateY) * 0.15;
        } else {
            currentX += (targetX - currentX) * 0.35;
            currentY += (targetY - currentY) * 0.35;
            currentRotateX += (targetRotateX - currentRotateX) * 0.25;
            currentRotateY += (targetRotateY - currentRotateY) * 0.25;
        }
        drawElasticRibbon();
        assembly.style.transform = 
            `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) ` +
            `rotateX(${currentRotateX.toFixed(2)}deg) ` +
            `rotateY(${currentRotateY.toFixed(2)}deg) ` +
            `rotateZ(${(currentRotateY * 0.15).toFixed(2)}deg)`;
        requestAnimationFrame(renderLoop);
    }
    renderLoop();
});
