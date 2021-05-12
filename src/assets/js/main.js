/* Adiciona nome do arquivo na barra de seleção de nova foto do produto */
$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
/* Fim */

/* Mostra imagem selecionada em uma div */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#img-preview").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$("#custom-file").change(function () {
  readURL(this);
});
/* Fim */