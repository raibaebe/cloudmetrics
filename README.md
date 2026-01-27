# DataVaultPro

Django веб-приложение с JWT аутентификацией, загрузкой Excel файлов (только для админов) и просмотром данных.

## Структура проекта

```
datavaultpro/
├── manage.py                 # Точка входа Django
├── requirements.txt          # Зависимости Python
├── db.sqlite3               # База данных (создаётся после миграций)
├── datavaultpro/            # Настройки проекта
│   ├── __init__.py
│   ├── settings.py          # Конфигурация Django
│   ├── urls.py              # Главные URL маршруты
│   ├── wsgi.py
│   └── asgi.py
├── core/                    # Основное приложение
│   ├── __init__.py
│   ├── models.py            # Модели Report, ReportData
│   ├── views.py             # API представления
│   ├── serializers.py       # DRF сериализаторы
│   ├── urls.py              # API маршруты
│   ├── permissions.py       # Права доступа (IsAdminUser)
│   ├── admin.py             # Конфигурация Django Admin
│   └── migrations/          # Миграции базы данных
├── templates/               # HTML шаблоны
│   ├── base.html            # Базовый шаблон с TailwindCSS
│   ├── login.html           # Страница входа
│   ├── data.html            # Просмотр данных (все пользователи)
│   ├── admin_panel.html     # Панель админа (загрузка файлов)
│   └── report_detail.html   # Детали отчёта
├── static/                  # Статические файлы
│   ├── css/
│   │   └── style.css        # Кастомные стили
│   └── js/
│       ├── script.js        # Основная логика (Auth, API)
│       ├── navbar.js        # Веб-компонент навбара
│       └── footer.js        # Веб-компонент футера
└── media/                   # Загруженные файлы
    └── reports/             # Excel файлы отчётов
```

## Установка

### 1. Клонировать/скопировать проект

### 2. Создать виртуальное окружение
```bash
cd datavaultpro
python3 -m venv venv
```

### 3. Активировать окружение
```bash
# Linux/Mac:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

### 4. Установить зависимости
```bash
pip install -r requirements.txt
```

### 5. Применить миграции
```bash
python manage.py migrate
```

### 6. Создать суперпользователя
```bash
python manage.py createsuperuser
```

### 7. Запустить сервер
```bash
python manage.py runserver
```

Открыть в браузере: http://127.0.0.1:8000

## API Endpoints

| Endpoint | Метод | Доступ | Описание |
|----------|-------|--------|----------|
| `/api/token/` | POST | Все | Получить JWT токен |
| `/api/token/refresh/` | POST | Все | Обновить JWT токен |
| `/api/reports/` | GET | Авторизованные | Список отчётов |
| `/api/reports/` | POST | Только админ | Загрузить Excel файл |
| `/api/reports/<id>/` | GET | Авторизованные | Детали отчёта |
| `/api/reports/<id>/data/` | GET | Авторизованные | Данные отчёта |

## Роли пользователей

- **Админ** (is_staff=True): может загружать Excel файлы и просматривать данные
- **Пользователь**: может только просматривать данные

## Технологии

- Django 6.0.1
- Django REST Framework 3.16.1
- Simple JWT 5.5.1
- Pandas 3.0.0
- OpenPyXL 3.1.5
- TailwindCSS (CDN)
