$(document).ready(function () {
  $("#btn-login").click(function () {
    var form = {
      email: $("#email-input").val(),
      password: $("#password-input").val(),
    };

    $.ajax({
      url: "/assets/js/ajax_tmp/login.txt",
      type: "get",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(form),

      success: function (result) {
        var loginFile = JSON.parse(JSON.stringify(result));

        if (
          loginFile.email === form.email &&
          loginFile.password === form.password
        ) {
          html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    Acesso permitido, redirecionando...
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;

          $(".result-message-container").html(html);

          setTimeout(() => (window.location = "home.html"), 2000);
        } else {
          html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Acesso negado, usuário e/ou senha inválidos.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;

          $(".result-message-container").html(html);

        }

        $("#result-message-container").html(html);

        $("#email-input").val("");
        $("#password-input").val("");
        $("#email-input").focus();
      },
    });
  });
});
