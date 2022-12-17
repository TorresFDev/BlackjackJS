document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const datosInicio = document.getElementById("datosInicio");
    const nombre = document.getElementById("nombre").value.toLowerCase();
    const apellido = document.getElementById("apellido").value.toLowerCase();
    const alias = document.getElementById("alias").value;
    const botonIniciar = document.getElementById("botonIniciar");

    if (nombre.value || apellido.value || alias.value) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro Completo",
            showConfirmButton: false,
            timer: 1500
        });
        
    }
    const datosJugador = {
        nombre,
        apellido,
        alias
    };

    localStorage.setItem("datosJugador", JSON.stringify(datosJugador));
    datosInicio.remove();
    window.location.href = "./main.html";
});