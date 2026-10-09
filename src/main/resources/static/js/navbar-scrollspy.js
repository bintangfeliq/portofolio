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
                linkMap[activeId].classList.add('active');
                try {
                    linkMap[activeId].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                } catch (e) {}
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
                var section = document.getElementById(sectionIds[i]);
                if (section) {
                    var rect = section.getBoundingClientRect();
                    if (rect.top <= threshold) {
                        currentActive = sectionIds[i];
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
            var targetTop = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - navHeight + 5;

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
