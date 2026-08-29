document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioContent();
    setupHeader();
    setupThemeToggle();
    setupMobileMenu();
    setupRevealAnimations();
    setupActiveNavigation();
    setupProjectFilters();
    setupProjectExpansion();
    setupCertificateTabs();
    setupContactForm();
});

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
}

function renderPortfolioContent() {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    const projectGrid = document.getElementById('project-grid');
    if (projectGrid && Array.isArray(data.projects)) {
        projectGrid.innerHTML = data.projects.map((project, index) => `
            <article class="project-card reveal delay-${Math.min((index + 1) * 100, 400)} rounded-xl overflow-hidden shadow-lg flex flex-col transform transition-all duration-500 ease-in-out hover:scale-[1.02]" data-tags="${escapeHtml(project.category)}">
                <div class="project-card-container h-full flex flex-col">
                    <div class="project-visuals relative h-48 md:h-72">
                        <div class="project-image-wrapper absolute inset-0 border-x-2 border-t-2 border-gray-300 dark:border-gray-600 rounded-t-xl overflow-hidden"><img src="${escapeHtml(project.image)}" alt="Interface abstrata representando ${escapeHtml(project.title.toLowerCase())}" class="project-image" loading="lazy" width="1536" height="1024"></div>
                        <div class="project-header skill-card absolute top-0 left-0 right-0 z-20 p-4 rounded-b-none border-b-0"><h3 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate">${escapeHtml(project.title)}</h3></div>
                        <div class="project-footer-tags skill-card absolute -bottom-2 left-0 right-0 z-20 p-3 md:p-4 rounded-t-none border-t-0"><div class="flex flex-wrap gap-1.5 md:gap-2">${project.tags.map((tag) => `<span class="text-[10px] md:text-xs bg-gray-500/90 text-white px-2 py-1 rounded">${escapeHtml(tag)}</span>`).join('')}</div></div>
                    </div>
                    <div class="p-4 md:p-5 pb-6 md:pb-10 flex-grow flex flex-col bg-inherit border-x-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-b-xl">
                        <p class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow leading-relaxed">${escapeHtml(project.description)}</p>
                        <span class="project-button w-full text-sm" aria-disabled="true"><span>Em desenvolvimento</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    const achievementsGrid = document.getElementById('achievements-grid');
    if (achievementsGrid && Array.isArray(data.achievements)) {
        achievementsGrid.innerHTML = data.achievements.map((achievement, index) => `
            <article class="achievement-card skill-card accent-${escapeHtml(achievement.accent)} reveal delay-${Math.min((index + 1) * 100, 400)} p-5 md:p-6 flex flex-col h-full rounded-xl shadow-lg">
                <div class="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-300 dark:border-gray-700"><p class="text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">Conquista</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-1">${escapeHtml(achievement.provider)}</h3></div>
                <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">${achievement.items.map((item) => `<li class="flex items-start gap-2"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-600" aria-hidden="true"></span><span>${escapeHtml(item)}</span></li>`).join('')}</ul>
            </article>
        `).join('') || '<p class="col-span-full text-center text-gray-600 dark:text-gray-400">Certificados em atualização.</p>';
    }
}

function setupHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 50);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const updateButton = () => themeToggle.setAttribute('aria-pressed', String(document.documentElement.classList.contains('dark')));
    updateButton();
    themeToggle.addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        updateButton();
    });
}

function setupMobileMenu() {
    const button = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    if (!button || !menu) return;
    const setMenuState = (isOpen) => {
        menu.classList.toggle('hidden', !isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    };
    button.addEventListener('click', () => setMenuState(menu.classList.contains('hidden')));
    links.forEach((link) => link.addEventListener('click', () => setMenuState(false)));
}

function setupRevealAnimations() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('active'));
        return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });
    items.forEach((item) => observer.observe(item));
}

function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('header a[href^="#"]');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = `#${entry.target.id}`;
            links.forEach((link) => {
                const isCurrent = link.getAttribute('href') === target;
                link.classList.toggle('text-orange-500', isCurrent);
                link.classList.toggle('dark:text-orange-400', isCurrent);
                if (isCurrent) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach((section) => observer.observe(section));
}

function setupProjectFilters() {
    const filters = document.getElementById('project-filters');
    const grid = document.getElementById('project-grid');
    if (!filters || !grid) return;
    const cards = [...grid.querySelectorAll('.project-card')];
    const buttons = filters.querySelectorAll('.filter-btn');
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
    filters.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-btn');
        if (!button) return;
        const filter = button.dataset.filter;
        buttons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });
        cards.forEach((card) => {
            card.hidden = !(filter === 'all' || card.dataset.tags?.includes(filter));
        });
    });
}

function setupProjectExpansion() {
    const button = document.getElementById('btn-load-more');
    const container = document.getElementById('project-grid-container');
    const fade = document.getElementById('fade-overlay');
    const projectCount = document.querySelectorAll('#project-grid .project-card').length;
    if (!button || !container) return;
    if (projectCount <= 3) {
        button.hidden = true;
        fade?.classList.add('opacity-0');
        container.classList.remove('max-h-[1400px]', 'md:max-h-[1200px]', 'lg:max-h-[1050px]');
        return;
    }
    button.addEventListener('click', () => {
        const isExpanded = container.classList.contains('max-h-[5000px]');
        container.classList.toggle('max-h-[5000px]', !isExpanded);
        container.classList.toggle('max-h-[1400px]', isExpanded);
        container.classList.toggle('md:max-h-[1200px]', isExpanded);
        container.classList.toggle('lg:max-h-[1050px]', isExpanded);
        fade?.classList.toggle('opacity-0', !isExpanded);
        button.setAttribute('aria-expanded', String(!isExpanded));
        button.innerHTML = isExpanded
            ? '<span>Ver mais projetos</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
            : '<span>Mostrar menos</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
        if (isExpanded) document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    });
}

function setupCertificateTabs() {
    const tabs = document.querySelectorAll('[data-certificate-category]');
    const panel = document.getElementById('certificate-panel');
    const certificates = window.PORTFOLIO_DATA?.certificates;
    if (!tabs.length || !panel || !certificates) return;

    const names = {
        devclub: 'DevClub',
        cursoemvideo: 'Curso em Vídeo',
        outros: 'Outros'
    };

    const renderCategory = (category) => {
        const courses = certificates[category] || [];
        panel.setAttribute('aria-labelledby', `certificate-tab-${category}`);
        panel.innerHTML = courses.length
            ? courses.map((course) => `
                <article class="certificate-card skill-card p-5 md:p-6 flex flex-col gap-4">
                    <div class="flex items-start justify-between gap-4">
                        <div><p class="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">${names[category]}</p><h3 class="mt-1 text-lg md:text-xl font-bold text-gray-900 dark:text-white">${escapeHtml(course.title)}</h3></div>
                        <svg class="h-7 w-7 shrink-0 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 2 2.8 5.7L21 8.6l-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 8.6l6.2-.9L12 2Z"></path></svg>
                    </div>
                    ${course.description ? `<p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">${escapeHtml(course.description)}</p>` : ''}
                    <div class="mt-auto flex flex-wrap gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                        ${course.workload ? `<span class="certificate-tag">${escapeHtml(course.workload)}</span>` : ''}
                        ${course.completedAt ? `<span class="certificate-tag">Concluído em ${escapeHtml(course.completedAt)}</span>` : ''}
                    </div>
                    ${course.credentialUrl ? `<a href="${escapeHtml(course.credentialUrl)}" target="_blank" rel="noopener noreferrer" class="certificate-link">Ver certificado <span aria-hidden="true">↗</span></a>` : ''}
                </article>
            `).join('')
            : `<div class="certificate-empty md:col-span-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M7 8h10M7 12h7M7 16h4"></path></svg><div><h3 class="font-bold text-gray-900 dark:text-white">Cursos de ${names[category]} em atualização</h3><p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Os certificados concluídos serão adicionados aqui em breve.</p></div></div>`;
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.certificateCategory;
            tabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', String(isActive));
                item.tabIndex = isActive ? 0 : -1;
            });
            renderCategory(category);
        });
    });

    renderCategory('devclub');
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    if (!form || !toast) return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const name = data.get('name');
        const email = data.get('email');
        const message = data.get('message');
        const subject = `Contato pelo portfólio — ${name}`;
        const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
        window.location.href = `mailto:freitasdiego140@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        showToast(toast, 'Seu cliente de e-mail será aberto com a mensagem preenchida.');
    });
}

function showToast(toast, message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 5000);
}
