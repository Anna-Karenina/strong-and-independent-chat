# [Strong and independent chat](https://angry-lumiere-c6bdd3.netlify.app/)

Добро пожаловать в мой учебный проект. В нем я разрабатываю чат без использования сторонних библиотек и фреймворков.

## Установка

Для запуска проекта достаточно выполнить следующие инструкции
- `npm install`
- `npm start`

Для сборки проета необходимо запустить команду:
- `npm run build`

## Демонстрация

Страницы проекта:

- [/pages/auth](https://angry-lumiere-c6bdd3.netlify.app/static/pages/auth/)
- [/pages/signin](https://angry-lumiere-c6bdd3.netlify.app/static/pages/signin/)
- [/pages/chats](https://angry-lumiere-c6bdd3.netlify.app/static/pages/chats/)
- [/pages/settings](https://angry-lumiere-c6bdd3.netlify.app/static/pages/settings/)
- [/pages/404](https://angry-lumiere-c6bdd3.netlify.app/static/pages/404/)
- [/pages/500](https://angry-lumiere-c6bdd3.netlify.app/static/pages/500/)

## Шаблонизатор

В проекте используется собственный шаблонизатор (немного схожий по синтаксису с шаблонизатором vue). Основной функционал:

1. Парсить строку html, выделяя теги, текстовые узлы и компоненты
2. Подставлять значения из контекста в конструкцию вида: {{ some.data.from.ctx }}
3. Добавлять слушатели из контекста в конструцию вида: @input="someHandlerFromCtx"
4. Отрисовывать компоненты и прокидывать в них props
5. Вносить изменения в DOM при изменении данных

Необходимо реализовать:
1. Сравнение старого и нового виртуального дома, для более точного контроля изменений. Это позволит удалять/заменять элементы и рендерить списки
2. Рендеринг списоков элементов/компонентов
