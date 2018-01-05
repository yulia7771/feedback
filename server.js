var express = require('express');
var bodyParser = require('body-parser');

var app = express(); //Ф-ция express создает новый web-серв, который лежит в переменной app

var fs = require('fs');

//подключает обработчик, кот.разбивает body на параметры (для post-запросов)
app.use(bodyParser.urlencoded({extended: true}));

//express.static coздает объект,
//кот. раздает файлы из указанной папки
//app.use подключавет обработчик к серверу
app.use(express.static('public'));
//app.set устанавливает настройки движка шаблонов, здесь в качествве библиотеи исп-ся пуг
app.set('view engine', 'pug');

var feedbacks = [];
//ф-ция app.get регистрирует обработчик(function) по указанному пути(('/feedback')
app.post('/feedback', function(req, res) {
  if (req.body.name && req.body.email && req.body.text) {
    //добавляет в конец массива feedbacks объект с полями..
    feedbacks.push({
      name: req.body.name,
      email: req.body.email,
      text: req.body.text
    });
    var str = JSON.stringify(feedbacks);
    fs.writeFileSync('data.json', str);
  //отправка строки пользователю
    res.send('Спасибо за отзыв! Ваше мнение очень важно для нас.');
  } else {
    res.send('Ошибка');
  }
});

app.get('/', function(req, res) {
  //отрисовывает шаблон
  res.render('index', {});
});

var basicAuth = require('express-basic-auth');

app.use(basicAuth({
  users: { 'julia': '123'},
  challenge: true
}));

app.get('/feedbacks', function(req, res) {
  var str = fs.readFileSync('data.json', {encoding: 'utf8'});
  feedbacks = JSON.parse(str);
  //отрисовывает шаблон
  res.render('feedbacks', {feedbacks: feedbacks});
});

//запускает сервер на порту 9000
app.listen(9000, function() {
  console.log("Сервер запущен");
});