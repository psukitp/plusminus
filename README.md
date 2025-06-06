# Plusminus

Сервис для учета личных доходов и расходов с возможностью создания пользовательских категорий. 
Позволяет анализировать финансовые данные в разных временных интервалах: день, неделя, месяц и т.д.

## Структура проекта

```
/frontend     # Клиентская часть (React 18)
/backend      # Серверная часть (.NET 8)
/docker       # compose файл
```

---

## Фронтенд

### Технологии

- React 
- TypeScript 
- Vite 
- Zustand
- Styled-components
- Echarts

### Структура
Проект придерживается FSD

```
├── .env                    # Окружение
├── .prettierrc             # Конфигурация prettier
├── index.html              # Основной html файл
├── package.json            # Основные зависимости
├── manifest.json           # Манифест для работы PWA
├── tsconfig.json           # Конфиг для typescript
├── vite.config.ts          # Конфигурация сборщика vite
└── public/                 # Статика
    ├── logo/               # Логотип и логотипы для PWA
    ├── screenshots/        # Скриншоты для установщика PWA
├── src/                    # Основная папка с проектом
    ├── app/                # Входная точка в проект
    ├── entities/           # Сущности проекта
    ├── features/           # Фичи, пользовательское взаимодействие
    ├── pages/              # Страницы
    ├── shared/             # Все общие для проекта вещи, в том числе взаимодействие со сторонними библиотеками по типу i18n
    └── widgets/            # Самостоятельные блоки проекта
```

### Установка

```bash
cd frontend
npm install
```

### Запуск в dev-режиме

```bash
npm run dev
```

### Порт по умолчанию

Фронтенд будет доступен на: [http://localhost:5173](http://localhost:5173)

---

## Бэкенд

### Технологии

- .NET 8
- PostgreSQL 
- Entity Framework

### Установка

```bash
cd backend
dotnet restore
```

### Запуск в dev-режиме

```bash
dotnet run
```

### Порт по умолчанию

Бэкенд (API) будет доступен на: [http://localhost:5213](http://localhost:5213)

---

## Docker

### Что контейнеризовано:

- `backend` — серверное API
- `db` — база данных

### Сборка и запуск

```bash
docker compose up 
```

### Порты по умолчанию

- API: [http://localhost:5213](http://localhost:5213)
- PostgreSQL: `localhost:5432`

