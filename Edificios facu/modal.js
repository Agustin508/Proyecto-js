$("body").append(`<div id="modal">
    <img class="imgModal" id="modalImg" src=""></img>
    <button id="cerrarModal">X</button>
    <p class="parrafoModal">Excelente oportunidad</p>
    </div>`);

$(document).ready(() => {
    $("#cerrarModal").click(() => {
        $("#modal").slideToggle("slow", () => {
            $("#modalImg").attr("src", "");
        });
    });
});
    
function mostrarMensaje(imagen){
    $("#modalImg").attr("src", imagen);
    $("#modal").slideToggle("slow");
}
//estilos
$(".imgModal").css({
    "margin-top": "100px",
    "display": "block",
    "position": "absolute",
})
$("#modal").css({
    "height": "650px",
    "width": "500px",
    "background-color": "rgb(0, 0, 0, 0.2)",
    "text-align": "center",
    "padding": "30px",
    "margin": "auto",
    "display": "none",
})
$(".parrafoModal").css({
    "padding-top": "20px",
    "font-size": "23px",
    "color": "grey",
    "font-family": "'Gideon Roman', cursive",
})
