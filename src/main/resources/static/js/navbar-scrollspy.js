(() => {
    const initNavbarScrollSpy = () => {
        const navLinks = document.querySelectorAll('.folio-nav-links a[href^="#"]');
        if (!navLinks.length) return;

        const sectionIds = [];
        const linkMap = {};
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href?.startsWith('#')) return;
            const id = href.substring(1);
            if (document.getElementById(id)) {
                sectionIds.push(id);
                linkMap[id] = link;
            }
        });
        if (!sectionIds.length) return;

        const navEl = document.querySelector('.folio-nav');
        const trackEl = document.getElementById('horizontalTrack');
        let navHeight = navEl?.offsetHeight || 70;
        let trackDist = trackEl ? trackEl.offsetHeight - window.innerHeight : 0;
        let isClickScrolling = false;
        let clickTimer = null;
        let lastActiveId = null;

        const updateMeasurements = () => {
            navHeight = navEl?.offsetHeight || 70;
            trackDist = trackEl ? trackEl.offsetHeight - window.innerHeight : 0;
        };

        const setActiveLink = (activeId) => {
            if (activeId === lastActiveId) return;
            lastActiveId = activeId;
            navLinks.forEach((link) => link.classList.remove('active'));
            const targetLink = activeId && linkMap[activeId];
            if (!targetLink) return;

            targetLink.classList.add('active');
            requestAnimationFrame(() => {
                const parentNav = targetLink.closest('.folio-nav-links');
                if (parentNav && parentNav.scrollWidth > parentNav.clientWidth) {
                    const leftPos = targetLink.offsetLeft - (parentNav.clientWidth / 2) + (targetLink.offsetWidth / 2);
                    parentNav.scrollTo({ left: Math.max(0, leftPos), behavior: 'smooth' });
                }
            });
        };

        const onScroll = () => {
            if (isClickScrolling) return;

            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollY + windowHeight >= docHeight - 40) {
                setActiveLink(sectionIds[sectionIds.length - 1]);
                return;
            }
            if (scrollY < 120) {
                setActiveLink(sectionIds[0]);
                return;
            }

            const threshold = navHeight + 120;
            let currentActive = sectionIds[0];

            for (const sId of sectionIds) {
                const section = document.getElementById(sId);
                if (!section) continue;

                if (sId === 'project' || sId === 'pendidikan' || sId === 'kontak') {
                    if (trackEl && window.innerWidth > 991 && trackDist > 0) {
                        const tRect = trackEl.getBoundingClientRect();
                        if (tRect.top <= threshold && tRect.bottom > threshold) {
                            const prog = -tRect.top / trackDist;
                            currentActive = prog >= 0.72 ? 'kontak' : prog >= 0.35 ? 'pendidikan' : 'project';
                            continue;
                        }
                    }
                }

                if (section.getBoundingClientRect().top <= threshold) {
                    currentActive = sId;
                }
            }

            setActiveLink(currentActive);
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

        const scrollToSection = (targetId) => {
            const target = document.getElementById(targetId);
            if (!target) return;

            isClickScrolling = true;
            if (clickTimer) clearTimeout(clickTimer);
            setActiveLink(targetId);

            const pageScroll = window.pageYOffset || document.documentElement.scrollTop;
            let targetTop;

            if (trackEl && window.innerWidth > 991 && (targetId === 'pendidikan' || targetId === 'project' || targetId === 'kontak' || targetId === 'contact')) {
                const trackTop = trackEl.getBoundingClientRect().top + pageScroll;
                targetTop = (targetId === 'kontak' || targetId === 'contact')
                    ? trackTop + trackDist
                    : targetId === 'pendidikan'
                        ? trackTop + (trackDist * 0.5)
                        : trackTop;
            } else {
                targetTop = target.getBoundingClientRect().top + pageScroll - navHeight + 5;
            }

            window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            history.pushState?.(null, null, `#${targetId}`);

            clickTimer = setTimeout(() => {
                isClickScrolling = false;
                onScroll();
            }, 850);
        };

        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            if (link.getAttribute('role') === 'button') return;
            const href = link.getAttribute('href');
            if (!href?.startsWith('#')) return;
            const targetId = href.substring(1);
            if (linkMap[targetId]) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection(targetId);
                });
            }
        });

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', () => {
            updateMeasurements();
            requestTick();
        });
        window.addEventListener('load', () => {
            updateMeasurements();
            onScroll();
        });

        if (window.location.hash) {
            const hashId = window.location.hash.substring(1);
            if (linkMap[hashId]) {
                setActiveLink(hashId);
                setTimeout(() => scrollToSection(hashId), 250);
                return;
            }
        }
        onScroll();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarScrollSpy);
    } else {
        initNavbarScrollSpy();
    }
})();
