document.addEventListener('DOMContentLoaded', () => {
    setupHeader();
    setupThemeToggle();
    setupMobileMenu();
    setupRevealAnimations();
    setupActiveNavigation();
    setupProjectFilters();
    setupProjectExpansion();
    setupContactForm();
});

function setupHeader() {
    const header = document.querySelector('header');

    if (!header) return;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.classList.toggle('dark');

        localStorage.theme = isDark ? 'dark' : 'light';
    });
}

function setupMobileMenu() {
    const button = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!button || !menu) return;

    button.addEventListener('click', () => menu.classList.toggle('hidden'));
    links.forEach((link) => link.addEventListener('click', () => menu.classList.add('hidden')));
}

function setupRevealAnimations() {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('active');
                currentObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
}

function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('header nav a[href^="#"]');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const target = `#${entry.target.id}`;
                links.forEach((link) => {
                    link.classList.toggle('text-orange-500', link.getAttribute('href') === target);
                    link.classList.toggle('dark:text-orange-400', link.getAttribute('href') === target);
                });
            });
        },
        { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupProjectFilters() {
    const filters = document.getElementById('project-filters');
    const grid = document.getElementById('project-grid');

    if (!filters || !grid) return;

    const cards = [...grid.querySelectorAll('.project-card')];
    const buttons = filters.querySelectorAll('.filter-btn');

    filters.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-btn');
        if (!button) return;

        const filter = button.dataset.filter;
        buttons.forEach((item) => item.classList.toggle('active', item === button));

        cards.forEach((card) => {
            const matches = filter === 'all' || card.dataset.tags?.includes(filter);
            card.classList.toggle('opacity-0', !matches);
            card.classList.toggle('scale-90', !matches);
            card.classList.toggle('pointer-events-none', !matches);
            card.classList.toggle('h-0', !matches);
            card.classList.toggle('p-0', !matches);
            card.classList.toggle('m-0', !matches);
            card.classList.toggle('border-0', !matches);
            card.classList.toggle('opacity-100', matches);
            card.classList.toggle('scale-100', matches);
        });

        const featuredCard = grid.querySelector('.col-span-full');
        const matchingCards = cards.filter((card) => filter === 'all' || card.dataset.tags?.includes(filter));
        const otherCards = cards.filter((card) => !matchingCards.includes(card));

        [...matchingCards, ...otherCards].forEach((card) => grid.insertBefore(card, featuredCard));
    });
}

function setupProjectExpansion() {
    const button = document.getElementById('btn-load-more');
    const container = document.getElementById('project-grid-container');
    const fade = document.getElementById('fade-overlay');

    if (!button || !container) return;

    button.addEventListener('click', () => {
        const isExpanded = container.classList.contains('max-h-[5000px]');

        container.classList.toggle('max-h-[5000px]', !isExpanded);
        container.classList.toggle('max-h-[1400px]', isExpanded);
        container.classList.toggle('md:max-h-[1200px]', isExpanded);
        container.classList.toggle('lg:max-h-[1050px]', isExpanded);
        fade?.classList.toggle('opacity-0', !isExpanded);

        button.innerHTML = isExpanded
            ? '<span>Ver Mais Projetos</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300"><path d="m6 9 6 6 6-6"/></svg>'
            : '<span>Mostrar Menos</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform rotate-180 transition-transform duration-300"><path d="m6 9 6 6 6-6"/></svg>';

        if (isExpanded) {
            document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (!form || !toast) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        showToast(toast, 'Mensagem enviada com sucesso! Entrarei em contato em breve.');
        form.reset();
    });
}

function showToast(toast, message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 4000);
}
