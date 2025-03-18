# Store-backend

## Стек

<span style="font-size:15px">NestJS, Express, Axios, JWT, Prisma-ORM</span>

## Информация

### Демонстрационный проект интернет-магазина

### Основные возможности:

- **Каталог товаров**: Просмотр различных категорий одежды.
- **Поиск товаров**: Поиск товаров по ключевым словам.
- **Корзина**: Добавление товаров в корзину и удаление ненужных позиций.
- **Оформление заказа**: Оформление заказа с тестовой оплатой через ЮКасса.
- **Пользовательский аккаунт**: Регистрация, авторизация и управление личными данными, а также историей заказов.
- **Админ-панель**: Создание и управление категориями товаров, добавление и удаление карточек товаров. Возможность изменения роли пользователя.

<h2>Документация</h2>

Документация о работе с API [Документация Swagger](https://store-backend-s265.onrender.com/store-api#/)

## Установка проекта
### 1. Склонировать репозиторий
```
https://github.com/RasimTahirov/store-backend.git
```
### 2. Установите зависимости
```
npm install
```
### 3. Настройка окружения
#### В корне проекта создайте файл .env и добавить переменные окружения 👇

> Базовые переменные
```
NODE_ENV='production'

PORT=1200 # Порт приложения

JWT_SECRET='your-jwt-secret' # Секретный ключ для JWT

DATABASE_URL="your-database-url" # Строка подключения базы данных для prisma
```

> Переменные базы данных
```
POSTGRES_USER='your-db-username' # Имя пользователя БД
POSTGRES_HOST='your-db-host' # Хост БД
POSTGRES_PORT=5432 # Порт БД
POSTGRES_PASSWORD='your-db-password' # Пароль для подключения БД
POSTGRES_DB_NAME='your-db-name' # Имя БД
```
Переменные S3. Сервис используется от [selectel.ru](https://selectel.ru/)
```
S3_ACCESS_KEY='your-s3-access-key' # Ключ доступа S3 хранилищу
S3_SECRET_KEY='your-s3-secret-key' # Секретный ключ S3 хранилище
S3_REGION='ru-1' # Регион S3
S3_BUCKET_NAME='your-s3-bucket-name' # Имя контейнера S3
S3_ENDPOINT='https://s3.storage.selcloud.ru' # Адрес для подключения к S3
S3_URL='your-s3-url' # URL для получения доступа к изображению
```
Переменные [yokassa](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing)
```
USERNAME_YOOKASSA='your-yookassa-username'  # Логин в yokassa
SEKRET_KEY_YOOKASSA='your-yookassa-secret-key'  # Секретный ключ для yokassa
REDIRECT_URL_YOOKASSA='http://localhost:3000/account'  # URL для редиректа после успешной оплаты

```
#### 4. Запуск проекта
```
npm run start:dev
# или
npm run start
```






