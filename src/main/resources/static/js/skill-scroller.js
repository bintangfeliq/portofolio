(function () {
    var deviconMap = {
        'python': 'devicon-python-plain colored',
        'java': 'devicon-java-plain colored',
        'spring': 'devicon-spring-original colored',
        'javascript': 'devicon-javascript-plain colored',
        'php': 'devicon-php-plain colored',
        'laravel': 'devicon-laravel-original colored',
        'flutter': 'devicon-flutter-plain colored',
        'react': 'devicon-react-original colored',
        'vue': 'devicon-vuejs-plain colored',
        'angular': 'devicon-angularjs-plain colored',
        'svelte': 'devicon-svelte-plain colored',
        'node': 'devicon-nodejs-plain colored',
        'nodejs': 'devicon-nodejs-plain colored',
        'next': 'devicon-nextjs-plain',
        'nextjs': 'devicon-nextjs-plain',
        'nuxt': 'devicon-nuxtjs-plain colored',
        'html': 'devicon-html5-plain colored',
        'html5': 'devicon-html5-plain colored',
        'css': 'devicon-css3-plain colored',
        'css3': 'devicon-css3-plain colored',
        'sass': 'devicon-sass-original colored',
        'tailwind': 'devicon-tailwindcss-original colored',
        'tailwindcss': 'devicon-tailwindcss-original colored',
        'bootstrap': 'devicon-bootstrap-plain colored',
        'postgresql': 'devicon-postgresql-plain colored',
        'postgres': 'devicon-postgresql-plain colored',
        'mysql': 'devicon-mysql-original colored',
        'mongodb': 'devicon-mongodb-plain colored',
        'django': 'devicon-django-plain colored',
        'git': 'devicon-git-plain colored',
        'github': 'devicon-github-original',
        'figma': 'devicon-figma-plain colored',
        'canva': 'devicon-canva-original colored',
        'photoshop': 'devicon-photoshop-plain colored',
        'illustrator': 'devicon-illustrator-plain colored',
        'premiere': 'devicon-premierepro-plain colored',
        'postman': 'devicon-postman-plain colored',
        'vscode': 'devicon-vscode-plain colored'
    };

    var customSvgs = {
        'office': '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>'
    };

    function resolveSkillIcon(name) {
        var raw = (name || '').trim().toLowerCase();
        if (!raw) return '<i class="bi bi-code-slash"></i>';

        if (raw.indexOf('office') !== -1 || raw.indexOf('microsoft') !== -1 || raw.indexOf('word') !== -1 || raw.indexOf('excel') !== -1 || raw.indexOf('powerpoint') !== -1) {
            return customSvgs['office'];
        }

        if (deviconMap[raw]) {
            return '<i class="' + deviconMap[raw] + '"></i>';
        }

        var cleaned = raw.replace(/[^a-z0-9]/g, '');
        if (deviconMap[cleaned]) {
            return '<i class="' + deviconMap[cleaned] + '"></i>';
        }

        var keys = Object.keys(deviconMap);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (raw.indexOf(key) !== -1) {
                return '<i class="' + deviconMap[key] + '"></i>';
            }
        }

        return '<i class="bi bi-code-slash"></i>';
    }

    function initBrandScroller() {
        var container = document.querySelector('.brand-scroller-container');
        if (!container) return;

        var items = container.querySelectorAll('.brand-item');
        items.forEach(function (item) {
            var iconBox = item.querySelector('.brand-icon');
            var nameEl = item.querySelector('.brand-name');
            if (iconBox && nameEl) {
                var name = nameEl.textContent.trim();
                iconBox.innerHTML = resolveSkillIcon(name);
            }
        });

        var rows = container.querySelectorAll('.brand-scroller-row');
        rows.forEach(function (row) {
            var track = row.querySelector('.brand-scroller-track');
            if (!track) return;

            var groups = track.querySelectorAll('.brand-scroller-group');
            if (groups.length === 1) {
                var clone = groups[0].cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBrandScroller);
    } else {
        initBrandScroller();
    }
})();
