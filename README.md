![Alt text](/src/images/demo/demo2.png "Optional title")

ОПИСАНИЕ
------------
<h4>Реализованная функциональность</h4>
<ul>
    <li>Отображение аналоговых часов;</li>
    <li>Отображение цифровых часов;</li>
    <li>Смена часового пояса;</li>
    <li>Добавление новых компонентов (до 24-х на странице);</li>
</ul> 
<h4>Стек технологий:</h4>
<ul>
	<li>HTML, CSS, SASS</li>
	<li>React, Redux, Webpack, Babel.</li>
 </ul>

СРЕДА ЗАПУСКА
------------
1) развертывание сервиса производится на ubuntu-like linux (ubuntu 16+);
2) требуется установленный пакет nodejs и npm для установки зависимостей проекта и его запуска.


УСТАНОВКА
------------
### Установка node.js

Для проверки того, что node.js установлен, выполните
~~~
node -v
~~~

Если пакета нет, выполните
~~~
sudo apt-get update
sudo apt-get upgrade
sudo apt install nodejs
sudo apt install npm
git clone https://github.com/coprocoder/torgbox_clock.git
~~~

### Установка зависимостей проекта

~~~
cd <путь до папки проекта>
npm install
~~~

ЗАПУСК
------------

Для запуска приложения выполните команду:
~~~
npm run start
~~~

После запуска приложение доступно по адресу: http://localhost:3000


В случае изменения исходного кода приложение необходимо пересобрать:
~~~
npm run build
~~~
