let currentModalSlide = 0;
let totalModalSlides = 0;
let touchStartX = 0;
let isDraggingSlide = false;

const DB_TECHS = ['mysql', 'postgresql', 'postgres', 'sqlite', 'mongodb', 'mariadb', 'oracle', 'redis', 'firebase', 'supabase'];
const FRAMEWORK_TECHS = ['laravel', 'spring boot', 'springboot', 'spring', 'react', 'vue', 'angular', 'nextjs', 'next.js', 'bootstrap', 'tailwind', 'express', 'django', 'flutter', 'codeigniter'];
const LANG_TECHS = ['php', 'java', 'javascript', 'js', 'typescript', 'ts', 'python', 'html', 'css', 'c#', 'c++', 'kotlin', 'dart', 'go', 'ruby', 'sql'];

function getTechCategoryLabel(techName) {
    const lower = (techName || '').toLowerCase().trim();
    if (DB_TECHS.includes(lower)) return 'Database';
    if (FRAMEWORK_TECHS.includes(lower)) return 'Framework';
    if (LANG_TECHS.includes(lower)) return 'Language';
    return 'Teknologi';
}

function updateModalSlider() {
    const track = document.getElementById('modalSliderTrack');
    const dotsWrap = document.getElementById('modalSlideDots');
    if (track) track.style.transform = `translateX(-${currentModalSlide * 100}%)`;
    dotsWrap?.querySelectorAll('.modal-slide-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentModalSlide);
    });
}

function goToModalSlide(index, e) {
    e?.stopPropagation();
    if (totalModalSlides <= 1) return;
    currentModalSlide = (index + totalModalSlides) % totalModalSlides;
    updateModalSlider();
}

function nextModalSlide(e) {
    e?.stopPropagation();
    goToModalSlide(currentModalSlide + 1);
}

function prevModalSlide(e) {
    e?.stopPropagation();
    goToModalSlide(currentModalSlide - 1);
}

function openProjectModal(data) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const images = Array.isArray(data.images) && data.images.length > 0
        ? data.images
        : [data.image || '/images/brow.png'];
    totalModalSlides = images.length;
    currentModalSlide = 0;

    const track = document.getElementById('modalSliderTrack');
    const dotsWrap = document.getElementById('modalSlideDots');
    const prevBtn = document.getElementById('modalPrevBtn');
    const nextBtn = document.getElementById('modalNextBtn');
    const statsGrid = document.getElementById('modalStatsGrid');

    if (track) {
        track.innerHTML = '';
        images.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${data.title || 'Project'} ${idx + 1}`;
            if (idx === 0) img.id = 'modalImg';
            track.appendChild(img);
        });
        track.style.transform = 'translateX(0%)';
    }

    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        if (images.length > 1) {
            images.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = `modal-slide-dot${idx === 0 ? ' active' : ''}`;
                dot.setAttribute('aria-label', `Slide ${idx + 1}`);
                dot.onclick = (ev) => goToModalSlide(idx, ev);
                dotsWrap.appendChild(dot);
            });
            dotsWrap.style.display = 'flex';
        } else {
            dotsWrap.style.display = 'none';
        }
    }

    const navDisplay = images.length > 1 ? 'flex' : 'none';
    if (prevBtn) prevBtn.style.display = navDisplay;
    if (nextBtn) nextBtn.style.display = navDisplay;

    const subTitleEl = document.getElementById('modalSubTitle');
    const descEl = document.getElementById('modalDesc');
    if (subTitleEl && data.subTitle) subTitleEl.innerText = data.subTitle;
    if (descEl && data.desc) descEl.innerText = data.desc;

    if (statsGrid) {
        statsGrid.innerHTML = '';
        const techList = Array.isArray(data.technologies) && data.technologies.length > 0
            ? data.technologies
            : (data.tech ? [data.tech] : []);

        techList.forEach((techName) => {
            const item = document.createElement('div');
            item.className = 'stat-item';
            const val = document.createElement('span');
            val.className = 'stat-value';
            val.innerText = techName;
            const lbl = document.createElement('span');
            lbl.className = 'stat-label';
            lbl.innerText = getTechCategoryLabel(techName);
            item.append(val, lbl);
            statsGrid.appendChild(item);
        });
    }

    modal.classList.add('active');
}

function openProjectModalFromCard(cardEl) {
    if (!cardEl) return;
    const title = cardEl.getAttribute('data-title') || '';
    const desc = cardEl.getAttribute('data-desc') || '';
    const techRaw = cardEl.getAttribute('data-tech') || '';
    const image = cardEl.getAttribute('data-image') || '/images/brow.png';
    const imagesRaw = cardEl.getAttribute('data-images') || '';
    const images = imagesRaw
        ? imagesRaw.split('|').map((name) => `/uploads/${name.trim()}`).filter(Boolean)
        : [image];
    const parts = techRaw.split(',').map((item) => item.trim()).filter(Boolean);

    openProjectModal({
        image,
        images,
        title,
        subTitle: title,
        desc,
        technologies: parts
    });
}

function closeProjectModal() {
    document.getElementById('projectModal')?.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('modalHeaderSlider');
    if (!slider) return;

    const handleSwipe = (endX) => {
        const diff = endX - touchStartX;
        if (Math.abs(diff) > 35) {
            if (diff < 0) nextModalSlide();
            else prevModalSlide();
        }
    };

    slider.addEventListener('touchstart', (e) => {
        if (totalModalSlides <= 1) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        if (totalModalSlides <= 1) return;
        handleSwipe(e.changedTouches[0].screenX);
    }, { passive: true });

    slider.addEventListener('mousedown', (e) => {
        if (totalModalSlides <= 1 || e.target.closest('button')) return;
        isDraggingSlide = true;
        touchStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDraggingSlide) return;
        isDraggingSlide = false;
        handleSwipe(e.clientX);
    });
});

document.addEventListener('click', (e) => {
    if (e.target === document.getElementById('projectModal')) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('projectModal');
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeProjectModal();
    else if (e.key === 'ArrowRight') nextModalSlide();
    else if (e.key === 'ArrowLeft') prevModalSlide();
});
