(() => {
    const deviconMap = {
        python: 'devicon-python-plain colored',
        java: 'devicon-java-plain colored',
        spring: 'devicon-spring-original colored',
        javascript: 'devicon-javascript-plain colored',
        php: 'devicon-php-plain colored',
        laravel: 'devicon-laravel-original colored',
        flutter: 'devicon-flutter-plain colored',
        react: 'devicon-react-original colored',
        vue: 'devicon-vuejs-plain colored',
        angular: 'devicon-angularjs-plain colored',
        svelte: 'devicon-svelte-plain colored',
        node: 'devicon-nodejs-plain colored',
        nodejs: 'devicon-nodejs-plain colored',
        next: 'devicon-nextjs-plain',
        nextjs: 'devicon-nextjs-plain',
        nuxt: 'devicon-nuxtjs-plain colored',
        html: 'devicon-html5-plain colored',
        html5: 'devicon-html5-plain colored',
        css: 'devicon-css3-plain colored',
        css3: 'devicon-css3-plain colored',
        sass: 'devicon-sass-original colored',
        tailwind: 'devicon-tailwindcss-original colored',
        tailwindcss: 'devicon-tailwindcss-original colored',
        bootstrap: 'devicon-bootstrap-plain colored',
        postgresql: 'devicon-postgresql-plain colored',
        postgres: 'devicon-postgresql-plain colored',
        mysql: 'devicon-mysql-original colored',
        mongodb: 'devicon-mongodb-plain colored',
        django: 'devicon-django-plain colored',
        git: 'devicon-git-plain colored',
        github: 'devicon-github-original',
        figma: 'devicon-figma-plain colored',
        canva: 'devicon-canva-original colored',
        photoshop: 'devicon-photoshop-plain colored',
        illustrator: 'devicon-illustrator-plain colored',
        premiere: 'devicon-premierepro-plain colored',
        postman: 'devicon-postman-plain colored',
        vscode: 'devicon-vscode-plain colored'
    };

    const officeSvg = '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>';
    const officeKeywords = ['office', 'microsoft', 'word', 'excel', 'powerpoint'];

    const resolveSkillIcon = (name) => {
        const raw = (name || '').trim().toLowerCase();
        if (!raw) return '<i class="bi bi-code-slash"></i>';
        if (officeKeywords.some((kw) => raw.includes(kw))) return officeSvg;

        const cleaned = raw.replace(/[^a-z0-9]/g, '');
        const matchedClass = deviconMap[raw]
            || deviconMap[cleaned]
            || Object.entries(deviconMap).find(([key]) => raw.includes(key))?.[1];

        return matchedClass ? `<i class="${matchedClass}"></i>` : '<i class="bi bi-code-slash"></i>';
    };

    const initBrandScroller = () => {
        const container = document.querySelector('.brand-scroller-container');
        if (!container) return;

        container.querySelectorAll('.brand-item').forEach((item) => {
            const iconBox = item.querySelector('.brand-icon');
            const nameEl = item.querySelector('.brand-name');
            if (iconBox && nameEl) {
                iconBox.innerHTML = resolveSkillIcon(nameEl.textContent.trim());
            }
        });

        container.querySelectorAll('.brand-scroller-row').forEach((row) => {
            const track = row.querySelector('.brand-scroller-track');
            const groups = track?.querySelectorAll('.brand-scroller-group');
            if (groups?.length === 1) {
                const clone = groups[0].cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(initBrandScroller));
    } else {
        requestAnimationFrame(initBrandScroller);
    }
})();
