ТЗ Backend:
C использованием Nest.js 
 1 Сделать апи авторизации, с проверкой и сохранением в MongoDB
 2 После авторизации отдаётся 10 рандомных записей из БД Redis
 3 Все записи сгенерировать при первой инициализации


Решение:

Ссылка на проект в git:
https://github.com/mrZedov/test-Gamicorp/tree/master

В проекте подключен swagger, описание доступно по адресу:
http://localhost:3000/api/#/

Все данные для подключения приложения в файле .env

Реализованы методы пользователей для регистрации и получения списка пользователей с возможностью пагинации. В качестве базы данных используется MongoDB. Redis используется для хранение ключей/значений, которые добавляются в redis при старте приложения.
Базы MongoDB и Redis расположены в облаке на бесплатной подписке.

GET /api/users
Реализован общий класс для поиска, который можно переиспользовать. В параметрах можно указать количество элементов на странице и дополнительные условия фильтра.

POST /api/users
Метод для добавления нового пользователя. Происходит контроль допустимых значений при выполнении. Так же контроль уникальности имени пользователя и email.

POST /api/auth/login
Авторизация пользователя по имени пользователя и паролю. Получаем токены.

GET /api/some-task
Некоторый метод для получения 10 случайных ключей/значений из базы Redis.
