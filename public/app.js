$(function() {
  var form = $("#form"); //возвращает объект
  //вызвать ф-цию при отправке формы на сервер
  form.submit(function(event) {
    event.preventDefault();
    var email = $("#email");
    var name = $("#name");
    var text = $("#text");
    var valid = true;

    if (!email.val()) {
      valid = false;
      email.addClass("is-invalid");
    } else {
      email.removeClass("is-invalid");
    }

    if (!name.val()) {
      valid = false;
      name.addClass("is-invalid");
    } else {
      name.removeClass("is-invalid");
    }

    if (!text.val()) {
      valid = false;
      text.addClass("is-invalid");
    } else {
      text.removeClass("is-invalid");
    }

    if (valid) {
      // отправляет post-запрос на сервер без перезагрузки страницы
      $.post("/feedback", {email: email.val(), name: name.val(), text: text.val()}, function (data) { //data-то,что ответил сервер
        $("#result").text(data);
        form.hide(); //скрыть эл-т form
      });
    }
  });
});