let currentModalSlide = 0;
let totalModalSlides = 0;
let touchStartX = 0;
let isDraggingSlide = false;
function getTechCategoryLabel(techName) {
    const lower = (techName || '').toLowerCase().trim();
    if (['mysql', 'postgresql', 'postgres', 'sqlite', 'mongodb', 'mariadb', 'oracle', 'redis', 'firebase', 'supabase'].includes(lower)) {
        return 'Database';
    }
    if (['laravel', 'spring boot', 'springboot', 'spring', 'react', 'vue', 'angular', 'nextjs', 'next.js', 'bootstrap', 'tailwind', 'express', 'django', 'flutter', 'codeigniter'].includes(lower)) {
        return 'Framework';
    }
    if (['php', 'java', 'javascript', 'js', 'typescript', 'ts', 'python', 'html', 'css', 'c#', 'c++', 'kotlin', 'dart', 'go', 'ruby', 'sql'].includes(lower)) {
        return 'Language';
    }
    return 'Teknologi';
}
function updateModalSlider() {
    const track = document.getElementById('modalSliderTrack');
    const dotsWrap = document.getElementById('modalSlideDots');
    if (track) {
        track.style.transform = 'translateX(-' + (currentModalSlide * 100) + '%)';
    }
    if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('.modal-slide-dot');
        dots.forEach(function(dot, idx) {
            dot.classList.toggle('active', idx === currentModalSlide);
        });
    }
}
function goToModalSlide(index, e) {
    if (e) e.stopPropagation();
    if (totalModalSlides <= 1) return;
    currentModalSlide = (index + totalModalSlides) % totalModalSlides;
    updateModalSlider();
}
function nextModalSlide(e) {
    if (e) e.stopPropagation();
    goToModalSlide(currentModalSlide + 1);
}
function prevModalSlide(e) {
    if (e) e.stopPropagation();
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
        images.forEach(function(src, idx) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = (data.title || 'Project') + ' ' + (idx + 1);
            if (idx === 0) img.id = 'modalImg';
            track.appendChild(img);
        });
        track.style.transform = 'translateX(0%)';
    }
    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        if (images.length > 1) {
            images.forEach(function(_, idx) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'modal-slide-dot' + (idx === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (idx + 1));
                dot.onclick = function(ev) {
                    goToModalSlide(idx, ev);
                };
                dotsWrap.appendChild(dot);
            });
            dotsWrap.style.display = 'flex';
        } else {
            dotsWrap.style.display = 'none';
        }
    }
    if (prevBtn) prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
    if (data.title) document.getElementById('modalTitle').innerText = data.title;
    if (data.category) document.getElementById('modalCategory').innerText = data.category;
    if (data.subTitle) document.getElementById('modalSubTitle').innerText = data.subTitle;
    if (data.desc) document.getElementById('modalDesc').innerText = data.desc;
    if (statsGrid) {
        statsGrid.innerHTML = '';
        const techList = Array.isArray(data.technologies) && data.technologies.length > 0
            ? data.technologies
            : (data.tech ? [data.tech] : []);
        techList.forEach(function(techName) {
            const item = document.createElement('div');
            item.className = 'stat-item';
            const val = document.createElement('span');
            val.className = 'stat-value';
            val.innerText = techName;
            const lbl = document.createElement('span');
            lbl.className = 'stat-label';
            lbl.innerText = getTechCategoryLabel(techName);
            item.appendChild(val);
            item.appendChild(lbl);
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
        ? imagesRaw.split('|').map(function(name) {
            return '/uploads/' + name.trim();
        }).filter(Boolean)
        : [image];
    const parts = techRaw.split(',').map(function(item) {
        return item.trim();
    }).filter(Boolean);
    const category = parts.length > 0 ? parts.join(' • ') : 'Web Application';
    openProjectModal({
        image: image,
        images: images,
        title: title,
        category: category,
        subTitle: title,
        desc: desc,
        technologies: parts
    });
}
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
}
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('modalHeaderSlider');
    if (!slider) return;
    slider.addEventListener('touchstart', function(e) {
        if (totalModalSlides <= 1) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slider.addEventListener('touchend', function(e) {
        if (totalModalSlides <= 1) return;
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 35) {
            if (diff < 0) nextModalSlide();
            else prevModalSlide();
        }
    }, { passive: true });
    slider.addEventListener('mousedown', function(e) {
        if (totalModalSlides <= 1 || e.target.closest('button')) return;
        isDraggingSlide = true;
        touchStartX = e.clientX;
    });
    window.addEventListener('mouseup', function(e) {
        if (!isDraggingSlide) return;
        isDraggingSlide = false;
        const diff = e.clientX - touchStartX;
        if (Math.abs(diff) > 35) {
            if (diff < 0) nextModalSlide();
            else prevModalSlide();
        }
    });
});
document.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('projectModal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') {
        closeProjectModal();
    } else if (e.key === 'ArrowRight') {
        nextModalSlide();
    } else if (e.key === 'ArrowLeft') {
        prevModalSlide();
    }
});
