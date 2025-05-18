# Интернет-магазин

**Описание проекта**

«Интернет-магазин» — веб-приложение на Node.js:

**Технологии**

- Node.js, Express.js
- EJS + express-ejs-layouts
- Passport.js, express-session, connect-session-sequelize
- Sequelize, MySQL
- Multer, bcryptjs, connect-flash
- Bootstrap 5, Bootstrap Icons, SCSS
- @faker-js/faker

**Установка и запуск**

1. Клонировать проект и перейти в каталог:
   cd online-shop

2. Установить зависимости:
   npm install

3. Создать `.env`:
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=online_shop
   DB_USER=root
   DB_PASS=пароль
   SESSION_SECRET=секрет
   PORT=3000

4. Создать БД:
   CREATE DATABASE online_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

5. Заполнить данными:
   npm run seed

6. Запустить сервер:
   npm run dev

7. Открыть в браузере: `http://localhost:3000`

# Обновление роли

UPDATE users SET role = 'admin' WHERE email = 'admin@gmail.com';

