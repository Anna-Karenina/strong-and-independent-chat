# [Strong and independent chat](https://strong-chat.herokuapp.com/)

Добро пожаловать в мой учебный проект. В нем я разрабатываю чат без использования сторонних библиотек и фреймворков.

## Установка

Для запуска проекта достаточно выполнить следующие инструкции
- `npm install`
- `npm start`

Для сборки проета необходимо запустить команду:
- `npm run build`

## Демонстрация

Страницы проекта:

- [/auth](https://strong-chat.herokuapp.com/auth)
- [/registration](https://strong-chat.herokuapp.com/registration)
- [/chats](https://strong-chat.herokuapp.com/chats)
- [/settings](https://strong-chat.herokuapp.com/settings)
- [/500](https://strong-chat.herokuapp.com/500)

Все остальные пути ведут на страницу 404.

## Шаблонизатор
### Атрибуты, события, вывод текст

Имена динамических атрибутов начинается с `:`, а событий с `@`.

Для вывода текста необходимо использовать конструкцию `{{ text }}`.

    <div class="parent" @click="goBack">
      <button :class="buttonClass">
        {{ buttonText }}
      </button>
    </div>
### Компоненты

Чтобы использовать компоненты в шаблоне, необходимо зарегистрировать их, передав в `Templator.compile`.

    const template = `
      <div class="buttons">
        <my-button className="button" text="Авторизоваться" :onClick="auth" />
        <my-button className="button" text="Создать аккаунт" :onClick="goToRegistration" />
      </div>
     `;
     
    const templator = Templator.compile(template, {
      components: {
        'my-button': MyButton,
      },
    });
### Children

Для отрисовки вложенных в компонент элементов, используется конструкция `$children$`. У компонента может быть только один вложенный элемент.

    <my-button>Click me!</my-button>
    
    //MyButton
    <button>$children$</button>
    
### Отрисовка списка

Для отрисовки списков используется атрибут `$each`.

    <ul>
      <li $each="chat in chats" class="chat-item" @click="chat.onClick">
        <avatar :img="chat.avatar" />
        <div class="chat-item__name">{{ chat.title }}</div>
      </li>
    </ul

