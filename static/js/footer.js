class AppFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const year = new Date().getFullYear();

        this.innerHTML = `
            <footer class="bg-white border-t mt-auto">
                <div class="container mx-auto px-4 py-6">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <p class="text-gray-600 text-sm">
                            &copy; ${year} DataVaultPro. All rights reserved.
                        </p>
                        <div class="flex gap-4 mt-2 md:mt-0">
                            <a href="#" class="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
                            <a href="#" class="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
