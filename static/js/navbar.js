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

        this.innerHTML = `
            <nav class="bg-white shadow-md">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center py-4">
                        <a href="${isLoggedIn ? (isAdmin ? '/admin-panel/' : '/data/') : '/'}" class="text-xl font-bold text-blue-600">
                            DataVaultPro
                        </a>

                        ${isLoggedIn ? `
                            <div class="flex items-center gap-6">
                                <div class="flex gap-4">
                                    <a href="/data/" class="text-gray-600 hover:text-blue-600">Data</a>
                                    ${isAdmin ? `<a href="/admin-panel/" class="text-gray-600 hover:text-blue-600">Admin Panel</a>` : ''}
                                </div>

                                <div class="flex items-center gap-4">
                                    <span class="text-sm text-gray-600">
                                        ${user ? user.username : ''}
                                        ${isAdmin ? '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Admin</span>' : ''}
                                    </span>
                                    <button id="logout-btn" class="text-sm text-red-600 hover:text-red-800">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ` : ''}
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
