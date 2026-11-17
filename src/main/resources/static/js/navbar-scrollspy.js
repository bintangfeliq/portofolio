(function () {
    function initNavbarScrollSpy() {
        var navLinks = document.querySelectorAll('.folio-nav-links a[href^="#"]');
        if (!navLinks.length) return;
        var sectionIds = [];
        var linkMap = {};
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                var id = href.substring(1);
                var section = document.getElementById(id);
                if (section) {
                    sectionIds.push(id);
                    linkMap[id] = link;
                }
            }
        });
        if (!sectionIds.length) return;
        var isClickScrolling = false;
        var clickTimer = null;
        function setActiveLink(activeId) {
            navLinks.forEach(function (link) {
                link.classList.remove('active');
            });
            if (activeId && linkMap[activeId]) {
                var targetLink = linkMap[activeId];
                targetLink.classList.add('active');
                var parentNav = targetLink.closest('.folio-nav-links');
                if (parentNav && parentNav.scrollWidth > parentNav.clientWidth) {
                    var leftPos = targetLink.offsetLeft - (parentNav.clientWidth / 2) + (targetLink.offsetWidth / 2);
                    parentNav.scrollTo({ left: Math.max(0, leftPos), behavior: 'smooth' });
                }
            }
        }
        function onScroll() {
            if (isClickScrolling) return;
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            var windowHeight = window.innerHeight;
            var docHeight = document.documentElement.scrollHeight;
            if (scrollY + windowHeight >= docHeight - 40) {
                setActiveLink(sectionIds[sectionIds.length - 1]);
                return;
            }
            if (scrollY < 120) {
                setActiveLink(sectionIds[0]);
                return;
            }
            var nav = document.querySelector('.folio-nav');
            var navHeight = nav ? nav.offsetHeight : 70;
            var threshold = navHeight + 120;
            var currentActive = sectionIds[0];
            for (var i = 0; i < sectionIds.length; i++) {
                var sId = sectionIds[i];
                var section = document.getElementById(sId);
                if (section) {
                    if (sId === 'project' || sId === 'pendidikan' || sId === 'kontak') {
                        var track = document.getElementById('horizontalTrack');
                        if (track && window.innerWidth > 991) {
                            var tRect = track.getBoundingClientRect();
                            var sDist = track.offsetHeight - window.innerHeight;
                            if (sDist > 0 && tRect.top <= threshold && tRect.bottom > threshold) {
                                var prog = -tRect.top / sDist;
                                if (prog >= 0.72) {
                                    currentActive = 'kontak';
                                } else if (prog >= 0.35) {
                                    currentActive = 'pendidikan';
                                } else {
                                    currentActive = 'project';
                                }
                                continue;
                            }
                        }
                    }
                    var rect = section.getBoundingClientRect();
                    if (rect.top <= threshold) {
                        currentActive = sId;
                    }
                }
            }
            setActiveLink(currentActive);
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
        function scrollToSection(targetId) {
            var target = document.getElementById(targetId);
            if (!target) return;
            isClickScrolling = true;
            if (clickTimer) clearTimeout(clickTimer);
            setActiveLink(targetId);
            var nav = document.querySelector('.folio-nav');
            var navHeight = nav ? nav.offsetHeight : 70;
            var targetTop;
            var track = document.getElementById('horizontalTrack');
            if (track && window.innerWidth > 991 && (targetId === 'pendidikan' || targetId === 'project' || targetId === 'kontak' || targetId === 'contact')) {
                var trackRect = track.getBoundingClientRect();
                var pageScroll = window.pageYOffset || document.documentElement.scrollTop;
                var trackTop = trackRect.top + pageScroll;
                var scrollableDistance = track.offsetHeight - window.innerHeight;
                if (targetId === 'kontak' || targetId === 'contact') {
                    targetTop = trackTop + scrollableDistance;
                } else if (targetId === 'pendidikan') {
                    targetTop = trackTop + (scrollableDistance * 0.5);
                } else {
                    targetTop = trackTop;
                }
            } else {
                targetTop = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - navHeight + 5;
            }
            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior: 'smooth'
            });
            if (history.pushState) {
                history.pushState(null, null, '#' + targetId);
            }
            clickTimer = setTimeout(function () {
                isClickScrolling = false;
                onScroll();
            }, 850);
        }
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            if (link.getAttribute('data-bs-toggle') || link.getAttribute('data-bs-slide') || link.getAttribute('role') === 'button') {
                return;
            }
            var href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            var targetId = href.substring(1);
            if (linkMap[targetId]) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    scrollToSection(targetId);
                });
            }
        });
        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', requestTick);
        window.addEventListener('load', onScroll);
        function handleInitialHash() {
            if (window.location.hash) {
                var hashId = window.location.hash.substring(1);
                if (linkMap[hashId]) {
                    setActiveLink(hashId);
                    setTimeout(function () {
                        scrollToSection(hashId);
                    }, 250);
                    return;
                }
            }
            onScroll();
        }
        handleInitialHash();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarScrollSpy);
    } else {
        initNavbarScrollSpy();
    }
})();
