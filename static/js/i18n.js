// Internationalization and Formatting Utilities

const I18n = {
    currentLang: localStorage.getItem('language') || 'ru',

    translations: {
        ru: {
            // Navigation
            reports: 'Отчеты',
            adminPanel: 'Панель администратора',
            logout: 'Выйти',
            login: 'Войти',

            // Report details
            reportDetails: 'Детали отчета',
            backToReports: '← Назад к отчетам',
            uploadedBy: 'Загрузил',
            uploadDate: 'Дата загрузки',
            totalRows: 'Всего строк',
            data: 'Данные',
            deleteReport: 'Удалить отчет',

            // Report metadata
            reportingDate: 'Дата отчетности',
            reportingPeriod: 'Период отчетности',

            // Pagination
            showing: 'Показаны',
            of: 'из',
            rows: 'строк',
            prev: 'Назад',
            next: 'Далее',

            // Table headers
            month: 'Месяц',
            requests: 'Запросы',
            price: 'Цена',
            cost: 'Стоимость',
            total: 'Всего',

            // Months
            months: {
                january: 'Январь',
                february: 'Февраль',
                march: 'Март',
                april: 'Апрель',
                may: 'Май',
                june: 'Июнь',
                july: 'Июль',
                august: 'Август',
                september: 'Сентябрь',
                october: 'Октябрь',
                november: 'Ноябрь',
                december: 'Декабрь'
            },

            // Messages
            loading: 'Загрузка...',
            loadingReport: 'Загрузка отчета...',
            failedToLoad: 'Не удалось загрузить данные.',
            failedToLoadReport: 'Не удалось загрузить отчет.',
            deleteConfirm: 'Удалить отчет',
            deleteError: 'Ошибка удаления',
            tryAgain: 'Попробуйте снова',

            // Currency
            currency: 'тенге',
            currencyShort: '₸',
            pricePerRequest: 'тенге/запрос',

            // Footer
            aboutBank: 'О Банке',
            aboutCompany: 'О компании',
            news: 'Новости',
            career: 'Карьера',
            contacts: 'Контакты',
            services: 'Услуги',
            deposits: 'Депозиты',
            credits: 'Кредиты',
            affordableHousing: 'Доступное жилье',
            calculator: 'Калькулятор',
            legalInfo: 'Правовая информация',
            procurement: 'Закупки',
            disclosure: 'Раскрытие информации',
            security: 'Безопасность',
            privacyPolicy: 'Политика конфиденциальности',
            allRightsReserved: 'Все права защищены'
        },
        kk: {
            // Navigation
            reports: 'Есептер',
            adminPanel: 'Әкімші панелі',
            logout: 'Шығу',
            login: 'Кіру',

            // Report details
            reportDetails: 'Есеп мәліметтері',
            backToReports: '← Есептерге оралу',
            uploadedBy: 'Жүктеген',
            uploadDate: 'Жүктелген күні',
            totalRows: 'Барлық жолдар',
            data: 'Деректер',
            deleteReport: 'Есепті жою',

            // Report metadata
            reportingDate: 'Есеп күні',
            reportingPeriod: 'Есеп кезеңі',

            // Pagination
            showing: 'Көрсетілген',
            of: '/',
            rows: 'жол',
            prev: 'Артқа',
            next: 'Алға',

            // Table headers
            month: 'Ай',
            requests: 'Сұраныстар',
            price: 'Баға',
            cost: 'Құны',
            total: 'Барлығы',

            // Months
            months: {
                january: 'Қаңтар',
                february: 'Ақпан',
                march: 'Наурыз',
                april: 'Сәуір',
                may: 'Мамыр',
                june: 'Маусым',
                july: 'Шілде',
                august: 'Тамыз',
                september: 'Қыркүйек',
                october: 'Қазан',
                november: 'Қараша',
                december: 'Желтоқсан'
            },

            // Messages
            loading: 'Жүктелуде...',
            loadingReport: 'Есеп жүктелуде...',
            failedToLoad: 'Деректерді жүктеу мүмкін болмады.',
            failedToLoadReport: 'Есепті жүктеу мүмкін болмады.',
            deleteConfirm: 'Есепті жою',
            deleteError: 'Жою қатесі',
            tryAgain: 'Қайталап көріңіз',

            // Currency
            currency: 'теңге',
            currencyShort: '₸',
            pricePerRequest: 'теңге/сұраныс',

            // Footer
            aboutBank: 'Банк туралы',
            aboutCompany: 'Компания туралы',
            news: 'Жаңалықтар',
            career: 'Мансап',
            contacts: 'Байланыс',
            services: 'Қызметтер',
            deposits: 'Депозиттер',
            credits: 'Несиелер',
            affordableHousing: 'Қол жетімді тұрғын үй',
            calculator: 'Калькулятор',
            legalInfo: 'Құқықтық ақпарат',
            procurement: 'Сатып алу',
            disclosure: 'Ақпаратты ашу',
            security: 'Қауіпсіздік',
            privacyPolicy: 'Құпиялылық саясаты',
            allRightsReserved: 'Барлық құқықтар қорғалған'
        }
    },

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            document.documentElement.setAttribute('lang', lang);
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
    },

    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    },

    getLanguage() {
        return this.currentLang;
    },

    // Translation mappings for data values (Russian -> Kazakh)
    dataTranslations: {
        // Months (capitalized)
        'Январь': 'Қаңтар',
        'Февраль': 'Ақпан',
        'Март': 'Наурыз',
        'Апрель': 'Сәуір',
        'Май': 'Мамыр',
        'Июнь': 'Маусым',
        'Июль': 'Шілде',
        'Август': 'Тамыз',
        'Сентябрь': 'Қыркүйек',
        'Октябрь': 'Қазан',
        'Ноябрь': 'Қараша',
        'Декабрь': 'Желтоқсан',
        // Months (lowercase)
        'январь': 'қаңтар',
        'февраль': 'ақпан',
        'март': 'наурыз',
        'апрель': 'сәуір',
        'май': 'мамыр',
        'июнь': 'маусым',
        'июль': 'шілде',
        'август': 'тамыз',
        'сентябрь': 'қыркүйек',
        'октябрь': 'қазан',
        'ноябрь': 'қараша',
        'декабрь': 'желтоқсан',
        // Totals
        'Итого': 'Барлығы',
        'Всего': 'Барлығы',
        'всего': 'барлығы',
        'итого': 'барлығы',
        'ИТОГО': 'БАРЛЫҒЫ',
        'ВСЕГО': 'БАРЛЫҒЫ',
        // Column headers
        'Месяцы': 'Айлар',
        'Месяц': 'Ай',
        'месяц': 'ай',
        'Цена': 'Баға',
        'Стоимость': 'Құны',
        'цена': 'баға',
        'стоимость': 'құны'
    },

    // Translate data value if Kazakh is selected
    translateValue(value) {
        if (this.currentLang !== 'kk' || !value) return value;
        const strValue = String(value).trim();

        // Direct match
        if (this.dataTranslations[strValue]) {
            return this.dataTranslations[strValue];
        }

        // Case-insensitive match
        const lowerValue = strValue.toLowerCase();
        for (const [ru, kk] of Object.entries(this.dataTranslations)) {
            if (ru.toLowerCase() === lowerValue) {
                return kk;
            }
        }

        return strValue;
    },

    // Translate column header if Kazakh is selected
    translateHeader(header) {
        if (this.currentLang !== 'kk' || !header) return header;
        return this.dataTranslations[header] || header;
    }
};

// Number and Currency Formatting
const Format = {
    // Format number with thousand separators (space delimiter for readability)
    // Examples: 1000000 -> "1 000 000"
    number(value, delimiter = ' ') {
        if (value === null || value === undefined || value === '') return '';
        const num = parseFloat(value);
        if (isNaN(num)) return value;

        // Split into integer and decimal parts
        const parts = num.toString().split('.');
        const intPart = parts[0];
        const decPart = parts[1];

        // Add thousand separators
        const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

        return decPart ? `${formatted},${decPart}` : formatted;
    },

    // Format with dot as thousand separator (European style)
    // Examples: 1000000 -> "1.000.000"
    numberDot(value) {
        return this.number(value, '.');
    },

    // Format currency in Tenge
    // Examples: 1487150 -> "1 487 150 ₸"
    tenge(value, showSymbol = true) {
        const formatted = this.number(value);
        if (formatted === '' || formatted === value) return formatted;
        return showSymbol ? `${formatted} ₸` : formatted;
    },

    // Format currency with dot separator
    // Examples: 1487150 -> "1.487.150 ₸"
    tengeDot(value, showSymbol = true) {
        const formatted = this.numberDot(value);
        if (formatted === '' || formatted === value) return formatted;
        return showSymbol ? `${formatted} ₸` : formatted;
    },

    // Format price per request
    // Examples: 2.56 -> "2,56 ₸/запрос"
    pricePerRequest(value) {
        if (value === null || value === undefined || value === '') return '';
        const num = parseFloat(value);
        if (isNaN(num)) return value;

        // Format with comma as decimal separator
        const formatted = num.toFixed(2).replace('.', ',');
        const label = I18n.t('pricePerRequest');
        return `${formatted} ${label}`;
    },

    // Format date in localized format
    date(dateString, options = {}) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const locale = I18n.currentLang === 'kk' ? 'kk-KZ' : 'ru-RU';

        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };

        return date.toLocaleDateString(locale, defaultOptions);
    },

    // Format date with time
    dateTime(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const locale = I18n.currentLang === 'kk' ? 'kk-KZ' : 'ru-RU';

        return date.toLocaleString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Format period (e.g., "Апрель - Декабрь 2024")
    period(startMonth, endMonth, year) {
        const locale = I18n.currentLang === 'kk' ? 'kk-KZ' : 'ru-RU';
        const startDate = new Date(year, startMonth - 1);
        const endDate = new Date(year, endMonth - 1);

        const startStr = startDate.toLocaleDateString(locale, { month: 'long' });
        const endStr = endDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });

        return `${startStr} - ${endStr}`;
    },

    // Auto-detect if value is a number and format accordingly
    auto(value, isCurrency = false) {
        if (value === null || value === undefined || value === '') return '';

        const strValue = String(value).trim();

        // Check if it's a number (possibly with spaces/dots already)
        const cleanValue = strValue.replace(/[\s.,]/g, '');
        if (/^\d+$/.test(cleanValue)) {
            const num = parseInt(cleanValue, 10);
            return isCurrency ? this.tenge(num) : this.number(num);
        }

        // Check if it's a decimal number
        const decimalMatch = strValue.match(/^[\d\s.]+[,.](\d+)$/);
        if (decimalMatch) {
            const num = parseFloat(strValue.replace(/[\s.]/g, '').replace(',', '.'));
            if (!isNaN(num)) {
                return isCurrency ? this.tenge(num) : this.number(num);
            }
        }

        return strValue;
    }
};

// Language Switcher Component (Dropdown)
class LanguageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        window.addEventListener('languageChanged', () => this.render());
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target) && this.isOpen) {
                this.isOpen = false;
                this.render();
            }
        });
    }

    render() {
        const currentLang = I18n.getLanguage();
        const currentLabel = currentLang === 'ru' ? 'RU' : 'ҚАЗ';

        this.innerHTML = `
            <div class="lang-dropdown" style="position: relative;">
                <button class="lang-toggle px-3 py-1 text-sm font-medium rounded flex items-center gap-1"
                    style="background-color: white; color: var(--primary-teal); cursor: pointer;">
                    ${currentLabel}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style="transform: ${this.isOpen ? 'rotate(180deg)' : 'rotate(0)'}; transition: transform 0.2s;">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                </button>
                <div class="lang-menu" style="display: ${this.isOpen ? 'block' : 'none'}; position: absolute; top: 100%; right: 0; margin-top: 4px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 80px; z-index: 1000;">
                    <button class="lang-option px-3 py-2 text-sm w-full text-left flex items-center justify-between" data-lang="ru"
                        style="color: var(--text-dark); border-radius: 6px 6px 0 0; ${currentLang === 'ru' ? 'background: #f0f9f8;' : ''} cursor: pointer; border: none;">
                        RU ${currentLang === 'ru' ? '✓' : ''}
                    </button>
                    <button class="lang-option px-3 py-2 text-sm w-full text-left flex items-center justify-between" data-lang="kk"
                        style="color: var(--text-dark); border-radius: 0 0 6px 6px; ${currentLang === 'kk' ? 'background: #f0f9f8;' : ''} cursor: pointer; border: none;">
                        ҚАЗ ${currentLang === 'kk' ? '✓' : ''}
                    </button>
                </div>
            </div>
        `;

        this.querySelector('.lang-toggle').addEventListener('click', (e) => {
            e.stopPropagation();
            this.isOpen = !this.isOpen;
            this.render();
        });

        this.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                if (lang !== currentLang) {
                    I18n.setLanguage(lang);
                    window.location.reload();
                } else {
                    this.isOpen = false;
                    this.render();
                }
            });

            btn.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.background = '#f0f9f8';
            });
            btn.addEventListener('mouseleave', (e) => {
                const lang = e.currentTarget.dataset.lang;
                if (lang !== currentLang) {
                    e.currentTarget.style.background = 'white';
                }
            });
        });
    }
}

customElements.define('language-switcher', LanguageSwitcher);

// Export for use in other modules
window.I18n = I18n;
window.Format = Format;
