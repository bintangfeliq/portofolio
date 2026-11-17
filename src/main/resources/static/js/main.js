document.addEventListener('DOMContentLoaded', () => {
    // 0. Inline Wave Loader (2.8s) + Simulator Fisika Pegas & Bandul Kontinu untuk Lanyard Card
    const inlineLoader = document.getElementById('inlineWaveLoader');
    const wave1 = document.getElementById('waveLayer1');
    const wave2 = document.getElementById('waveLayer2');
    const wave3 = document.getElementById('waveLayer3');
    const droplets = [
        document.getElementById('drop1'),
        document.getElementById('drop2'),
        document.getElementById('drop3'),
        document.getElementById('drop4')
    ];
    const statusText = document.getElementById('loaderStatus');
    const percentText = document.getElementById('loaderPercent');
    const lanyardCard = document.querySelector('.hero-lanyard-right-zone, .lanyard-card-wrapper, .hero-id-card, #lanyardCard');

    // --- SIMULATOR FISIKA BANDUL & PEGAS UNTUK LANYARD CARD ---
    const physics = {
        active: false,
        y: -window.innerHeight * 1.1,
        vy: 0,
        targetY: 0,
        angle: -7,
        vAngle: 0,
        targetAngle: 0,
        lastTime: 0
    };

    function stepLanyardPhysics(now) {
        if (!physics.active || !lanyardCard) return;

        const dt = Math.max(0.001, Math.min((now - physics.lastTime) / 1000, 0.033));
        physics.lastTime = now;

        // 1. Fisika Pegas Vertikal (Tali Lanyard jatuh & membal empuk)
        const springK = 140;
        const dampingY = 13.5;
        const forceY = (physics.targetY - physics.y) * springK;
        physics.vy = (physics.vy + forceY * dt) * Math.exp(-dampingY * dt);
        physics.y += physics.vy * dt;

        // 2. Fisika Bandul Rotasi (Ayunan kanan-kiri natural seperti di dunia nyata)
        const pendulumK = 36;
        const dampingRot = 1.95;
        const forceAngle = (physics.targetAngle - physics.angle) * pendulumK;
        physics.vAngle = (physics.vAngle + forceAngle * dt) * Math.exp(-dampingRot * dt);
        physics.angle += physics.vAngle * dt;

        lanyardCard.style.opacity = '1';
        lanyardCard.style.transform = `translate3d(0, ${physics.y.toFixed(2)}px, 0) rotate(${physics.angle.toFixed(3)}deg)`;

        const isSettled =
            Math.abs(physics.y) < 0.05 &&
            Math.abs(physics.vy) < 0.05 &&
            Math.abs(physics.angle) < 0.02 &&
            Math.abs(physics.vAngle) < 0.02;

        if (isSettled) {
            physics.y = 0;
            physics.angle = 0;
            physics.active = false;
            lanyardCard.style.transform = 'translate3d(0, 0px, 0) rotate(0deg)';
        } else {
            requestAnimationFrame(stepLanyardPhysics);
        }
    }

    function launchLanyardDrop() {
        if (!lanyardCard) return;
        physics.y = -window.innerHeight * 1.05;
        physics.vy = 220;
        physics.angle = -6.5;
        physics.vAngle = 38;
        physics.lastTime = performance.now();

        lanyardCard.style.opacity = '1';
        lanyardCard.style.transform = `translate3d(0, ${physics.y.toFixed(2)}px, 0) rotate(${physics.angle.toFixed(3)}deg)`;

        if (!physics.active) {
            physics.active = true;
            requestAnimationFrame(stepLanyardPhysics);
        }

        lanyardCard.addEventListener('mouseenter', (e) => {
            const rect = lanyardCard.getBoundingClientRect();
            const hitFromLeft = (e.clientX - rect.left) < rect.width / 2;
            physics.vAngle += hitFromLeft ? 22 : -22;
            physics.lastTime = performance.now();

            if (!physics.active) {
                physics.active = true;
                requestAnimationFrame(stepLanyardPhysics);
            }
        });
    }

    // --- INLINE WAVE LIQUID LOADER (DURASI 2.8 DETIK) ---
    if (inlineLoader && wave1 && wave2 && wave3) {
        document.body.classList.add('is-loading');

        const W = 360;
        const baseBottomY = 70;
        const duration = 2800;
        const startTime = performance.now();

        function createDynamicWave(phase, maxHeight, crestCount, speedOffset) {
            let d = `M 8 ${baseBottomY} `;
            const step = 4;

            for (let x = 8; x <= W - 8; x += step) {
                const normX = (x - 8) / (W - 16);
                const edgeTaper = Math.pow(Math.sin(normX * Math.PI), 0.75);

                const primaryWave = Math.sin(normX * Math.PI * crestCount - phase);
                const secondaryWave = Math.sin(normX * Math.PI * (crestCount * 1.7) + phase * 1.35 + speedOffset) * 0.42;
                const microRipple = Math.cos(normX * Math.PI * (crestCount * 2.8) - phase * 2.1) * 0.18;

                const combined = (primaryWave + secondaryWave + microRipple + 1.4) / 2.8;
                const waveHeight = Math.max(2, combined * maxHeight * edgeTaper);
                const y = baseBottomY - waveHeight;

                d += `L ${x} ${y.toFixed(2)} `;
            }

            d += `L ${W - 8} ${baseBottomY} Z`;
            return d;
        }

        function renderWaveLoader(now) {
            const elapsed = now - startTime;
            const rawRatio = Math.min(1, elapsed / duration);
            const easedRatio = rawRatio < 0.5
                ? 2 * rawRatio * rawRatio
                : 1 - Math.pow(-2 * rawRatio + 2, 2) / 2;

            const pct = Math.floor(easedRatio * 100);
            const phase = elapsed * 0.0105;

            const activeHeight = 14 + (easedRatio * 34) + (Math.sin(rawRatio * Math.PI) * 10);

            wave3.setAttribute('d', createDynamicWave(phase * 0.72, activeHeight * 1.12, 3.2, 1.2));
            wave2.setAttribute('d', createDynamicWave(phase * 0.92 + 0.8, activeHeight * 1.04, 3.8, 2.5));
            wave1.setAttribute('d', createDynamicWave(phase * 1.15, activeHeight, 4.2, 0));

            droplets.forEach((drop, idx) => {
                if (!drop) return;
                const jumpCycle = Math.sin(phase * 1.3 + idx * 1.7);
                const baseX = 115 + idx * 45 + Math.cos(phase * 0.8 + idx) * 12;
                const baseY = baseBottomY - activeHeight * 0.75 - Math.max(0, jumpCycle) * 16;
                const dropOpacity = rawRatio > 0.1 && rawRatio < 0.94 && jumpCycle > 0.15 ? 0.9 : 0;

                drop.setAttribute('cx', baseX.toFixed(1));
                drop.setAttribute('cy', baseY.toFixed(1));
                drop.style.opacity = dropOpacity.toFixed(2);
            });

            if (percentText) percentText.textContent = `${pct}%`;
            if (statusText) {
                statusText.textContent = pct < 35 ? 'INITIALIZING' : pct < 85 ? 'LOADING PORTFOLIO' : 'READY';
            }

            if (rawRatio < 1) {
                requestAnimationFrame(renderWaveLoader);
            } else {
                inlineLoader.classList.add('is-draining');

                setTimeout(() => {
                    inlineLoader.classList.add('is-hidden');
                    document.body.classList.remove('is-loading');

                    launchLanyardDrop();

                    setTimeout(() => inlineLoader.remove(), 450);
                }, 280);
            }
        }

        requestAnimationFrame(renderWaveLoader);
    }

    const track = document.getElementById('horizontalTrack');
    const viewport = document.querySelector('.horizontal-sticky-viewport');
    const redCurtain = document.getElementById('redCurtain');
    const projectContent = document.getElementById('project');
    const eduHeader = document.getElementById('curtainEduHeader');
    const eduUnderlay = document.querySelector('.edu-white-underlay');
    const contactStage = document.getElementById('contact');
    const progressBar = document.getElementById('hScrollBar');

    if (track && viewport && redCurtain) {
        // Pastikan wrapper kompensasi di dalam tirai merah tersedia
        let curtainInner = document.querySelector('.curtain-inner-compensate');
        if (!curtainInner) {
            curtainInner = document.createElement('div');
            curtainInner.className = 'curtain-inner-compensate';
            while (redCurtain.firstChild) {
                curtainInner.appendChild(redCurtain.firstChild);
            }
            redCurtain.appendChild(curtainInner);
        }

        let trackTop = 0;
        let scrollable = 1;
        let isTicking = false;
        let isMobile = window.innerWidth <= 991;
        let lastProgress = -1;

        function resetMobileStyles() {
            viewport.classList.remove('is-fixed', 'is-bottom');
            redCurtain.style.transform = '';
            redCurtain.style.clipPath = '';
            redCurtain.style.pointerEvents = 'auto';
            curtainInner.style.transform = '';
            if (projectContent) {
                projectContent.style.transform = '';
                projectContent.style.opacity = '';
                projectContent.style.pointerEvents = 'auto';
            }
            if (eduHeader) {
                eduHeader.style.transform = '';
                eduHeader.style.opacity = '';
            }
            if (eduUnderlay) {
                eduUnderlay.style.transform = '';
                eduUnderlay.style.opacity = '';
                eduUnderlay.style.pointerEvents = 'auto';
                eduUnderlay.classList.add('is-in-view');
            }
            if (contactStage) {
                contactStage.style.transform = '';
                contactStage.style.opacity = '1';
                contactStage.style.pointerEvents = 'auto';
                contactStage.classList.add('is-stage-active');
            }
        }

        function recalcBounds() {
            isMobile = window.innerWidth <= 991;
            if (isMobile) {
                lastProgress = -1;
                resetMobileStyles();
                return;
            }
            trackTop = track.getBoundingClientRect().top + window.scrollY;
            scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
            lastProgress = -1;
            updateScene();
        }

        function updateScene() {
            isTicking = false;
            if (isMobile) return;

            const scrollY = window.scrollY;
            const trackEnd = trackTop + scrollable;

            // 1. Atur posisi viewport secara instan (absolute -> fixed -> absolute)
            if (scrollY < trackTop) {
                viewport.classList.remove('is-fixed', 'is-bottom');
            } else if (scrollY >= trackTop && scrollY <= trackEnd) {
                viewport.classList.add('is-fixed');
                viewport.classList.remove('is-bottom');
            } else {
                viewport.classList.remove('is-fixed');
                viewport.classList.add('is-bottom');
            }

            // 2. Hitung progres 0.0 -> 1.0 secara real-time
            const raw = (scrollY - trackTop) / scrollable;
            const progress = raw < 0 ? 0 : raw > 1 ? 1 : raw;

            if (progress === lastProgress) return;
            lastProgress = progress;

            const p1 = Math.min(1, progress / 0.5);
            const p2 = Math.max(0, (progress - 0.5) / 0.5);

            // A. Tirai Merah (0% -> -50% -> -100%)
            const curtainShift = (p1 * 50) + (p2 * 50);
            redCurtain.style.transform = `translate3d(-${curtainShift.toFixed(3)}%, 0, 0)`;
            redCurtain.style.pointerEvents = progress > 0.92 ? 'none' : 'auto';

            if (curtainInner) {
                curtainInner.style.transform = `translate3d(${curtainShift.toFixed(3)}%, 0, 0)`;
            }

            // B. Konten Project (diam di tempat dan memudar perlahan agar tidak bertabrakan dengan Pendidikan)
            if (projectContent) {
                const projOpacity = Math.max(0, 1 - (p1 * 2.6));
                projectContent.style.transform = 'none';
                projectContent.style.opacity = projOpacity.toFixed(3);
                projectContent.style.pointerEvents = projOpacity > 0.3 ? 'auto' : 'none';
            }

            // C. Header Pendidikan Saya (diam di tempat, muncul setelah Project menghilang dan memudar saat ke Kontak)
            if (eduHeader) {
                const headerFadeIn = Math.min(1, Math.max(0, (p1 - 0.36) / 0.54));
                const headerFadeOut = Math.max(0, 1 - (p2 * 2.5));
                const headerOpacity = headerFadeIn * headerFadeOut;
                eduHeader.style.transform = 'none';
                eduHeader.style.opacity = headerOpacity.toFixed(3);
                eduHeader.classList.toggle('is-active', headerOpacity > 0.4);
            }

            // D. Kanvas Putih Pendidikan (diam di tempat dan menghilang perlahan tanpa bergeser)
            if (eduUnderlay) {
                const eduOpacity = Math.max(0, 1 - (p2 * 2.8));
                eduUnderlay.style.transform = 'none';
                eduUnderlay.style.opacity = eduOpacity.toFixed(3);
                eduUnderlay.classList.toggle('is-in-view', p1 > 0.45);
                eduUnderlay.style.pointerEvents = (p1 > 0.45 && eduOpacity > 0.3) ? 'auto' : 'none';
            }

            // E. Section Kontak (muncul perlahan setelah daftar pendidikan menghilang agar tidak tumpang tindih)
            if (contactStage) {
                const contactOpacity = Math.min(1, Math.max(0, (p2 - 0.22) / 0.78));
                const isContactVisible = contactOpacity > 0.005;
                contactStage.classList.toggle('is-stage-active', isContactVisible);
                contactStage.style.transform = 'none';
                if (isContactVisible) {
                    contactStage.style.opacity = contactOpacity.toFixed(3);
                    contactStage.style.pointerEvents = contactOpacity > 0.5 ? 'auto' : 'none';
                } else {
                    contactStage.style.opacity = '0';
                    contactStage.style.pointerEvents = 'none';
                }
            }

            // F. Progress Bar
            if (progressBar) {
                progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
                progressBar.style.transformOrigin = 'left center';
            }
        }

        function onScroll() {
            if (!isTicking) {
                requestAnimationFrame(updateScene);
                isTicking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', recalcBounds, { passive: true });
        window.addEventListener('load', recalcBounds, { passive: true });

        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(() => recalcBounds());
            ro.observe(document.body);
        }

        recalcBounds();

        // 3. Navigasi Klik Menu Navbar (#tentang, #project, #pendidikan, #kontak)
        document.querySelectorAll('a[href*="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const hash = link.hash;
                if (!hash || hash.length <= 1) return;

                recalcBounds();
                let targetY = null;

                if (!isMobile && (hash === '#project' || hash === '#pendidikan' || hash === '#kontak' || hash === '#contact')) {
                    if (hash === '#project') {
                        targetY = trackTop;
                    } else if (hash === '#pendidikan') {
                        targetY = trackTop + (scrollable * 0.5);
                    } else {
                        targetY = trackTop + scrollable;
                    }
                } else {
                    const el = document.querySelector(hash);
                    if (el) targetY = el.getBoundingClientRect().top + window.scrollY;
                }

                if (targetY !== null) {
                    e.preventDefault();
                    history.pushState(null, '', hash);
                    window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
            });
        });
    }

    // 4. IntersectionObserver Ringan untuk Section Atas (Hero & Tentang)
    const revealEls = document.querySelectorAll('#tentang h1, #tentang h2, #tentang p, #tentang .card, #tentang .about-card, .container-scroll-stage > div > *, #about h1, #about h2, #about p, #about .card, #about .about-card, .about-section > div > *');
    if (revealEls.length > 0) {
        revealEls.forEach((el, idx) => {
            el.classList.add('about-reveal-item');
            el.style.transitionDelay = `${Math.min((idx % 5) * 55, 275)}ms`;
        });

        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

        revealEls.forEach(el => io.observe(el));
    }

    // 5. Accordion Riwayat Pendidikan
    const eduRows = document.querySelectorAll('.edu-row-item');
    eduRows.forEach(row => {
        const btn = row.querySelector('.edu-row-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = row.classList.contains('open');
                eduRows.forEach(r => r.classList.remove('open'));
                if (!isOpen) {
                    row.classList.add('open');
                }
            });
        }
    });
});
