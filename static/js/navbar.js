class AppNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const user = Auth.getUser();
        const isLoggedIn = Auth.isLoggedIn();
        const isAdmin = Auth.isAdmin();

        // Get translations
        const t = (key) => I18n ? I18n.t(key) : key;

        this.innerHTML = `
            <nav class="shadow-md" style="background-color: var(--primary-teal);">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center py-3">
                        <a href="${isLoggedIn ? (isAdmin ? '/admin-panel/' : '/data/') : '/'}">
                            <img src="/static/images/logo-otbasy-bank.svg" alt="Отбасы банк" style="width: 200px; max-height: 100px; object-fit: contain; margin: 10px 0 10px 50px;">
                        </a>
                        ${isLoggedIn ? `
                            <div class="flex items-center gap-8">
                                <div class="hidden md:flex gap-6">
                                    <a href="/data/" class="text-white hover:text-accent-yellow font-medium transition-colors">${t('data')}</a>
                                    ${isAdmin ? `
                                        <a href="/admin-panel/" class="text-white hover:text-accent-yellow font-medium transition-colors">${t('adminPanel')}</a>
                                        <a href="/register/" class="text-white hover:text-accent-yellow font-medium transition-colors">${I18n.currentLang === 'kk' ? 'Пайдаланушы жасау' : 'Создать пользователя'}</a>
                                    ` : ''}
                                </div>
                                <div class="flex items-center gap-4">
                                    <language-switcher></language-switcher>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm text-white font-medium">${I18n.currentLang === 'kk' ? 'Пайдаланушы' : 'Пользователь'}: ${user ? user.username : ''}</span>
                                        ${isAdmin ? `<span class="bg-white text-xs px-2 py-1 rounded font-semibold" style="color: var(--primary-teal);">${I18n.currentLang === 'kk' ? 'Әкімші' : 'Админ'}</span>` : ''}
                                    </div>
                                    <button id="logout-btn" class="text-sm font-medium px-4 py-2 rounded bg-white" style="color: var(--primary-teal);">${t('logout')}</button>
                                </div>
                            </div>
                        ` : `
                            <div class="flex items-center gap-4">
                                <language-switcher></language-switcher>
                                <a href="/" class="btn-primary text-sm">${t('login')}</a>
                            </div>
                        `}
                    </div>
                </div>
            </nav>
        `;

        if (isLoggedIn) {
            this.querySelector('#logout-btn')?.addEventListener('click', () => {
                Auth.logout();
            });
        }
    }
}

customElements.define('app-navbar', AppNavbar);
