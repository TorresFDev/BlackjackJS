const valores = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
];
const palos = ["♠", "♥", "♣", "♦"];

let totalMazos = [];
let manoCroupier = [];
let manoJugador = [];

//creacion del mazo
const crearMazo = () => {
    const mazo = [];
    palos.forEach((palo) => {
        valores.forEach((valor) => {
            const carta = valor + palo;
            mazo.push(carta);
        });
    });
    return mazo;
};

//funcion para mezclar el mazo
const mezclarMazo = (num) => {
    for (let i = 0; i < num; i++) {
        const nuevoMazo = crearMazo();
        totalMazos = [
            ...totalMazos,
            ...nuevoMazo.sort(() => Math.random() - 0.5)
        ];
    }
};
mezclarMazo(5);

//seleccionar carta
const seleccionarCarta = () => {
    const cartasTotales = totalMazos.length;
    let cualquierNumero = Math.floor(Math.random() * cartasTotales);
    const cualquierCarta = totalMazos[cualquierNumero];
    totalMazos.splice(cualquierNumero, 1);
    return cualquierCarta;
};


//llamada para mostrar las cartas del croupier y el  jugador
const cartaModelo = document.createElement("div");
cartaModelo.classList.add("card");
const croupier = document.getElementById("croupier");
const jugador = document.getElementById("jugador");

//cartas del jugador y del croupier con color rojo
const manoBot = () => {
    manoCroupier = [seleccionarCarta(), seleccionarCarta()];
    manoCroupier.forEach((carta, index) => {
        const nuevaCarta = cartaModelo.cloneNode(true);
        index === 0
            ? nuevaCarta.classList.add("back")
            : (nuevaCarta.innerHTML = carta);
        (carta[carta.length - 1] === "♥" || carta[carta.length - 1] === "♦") &&
            nuevaCarta.setAttribute("data-red", true);
        croupier.append(nuevaCarta);
    });

    manoJugador = [seleccionarCarta(), seleccionarCarta()];
    manoJugador.forEach((carta) => {
        const nuevaCarta = cartaModelo.cloneNode(true);
        nuevaCarta.innerHTML = carta;
        (carta[carta.length - 1] === "♥" || carta[carta.length - 1] === "♦") &&
            nuevaCarta.setAttribute("data-red", true);
        jugador.append(nuevaCarta);
    });
    
};


//llamada a los botones para pedir cartas y pasar
const botonDame = document.getElementById("otra");
const botonPasar = document.getElementById("pasar");
const botonReiniciar = document.getElementById("reiniciar");

//El Jugador pide cartas.
const pedirCartasJugador = () => {
    const nuevaCarta = seleccionarCarta();
    manoJugador.push(nuevaCarta);
    const pedirOtraCarta = cartaModelo.cloneNode(true);
    pedirOtraCarta.innerHTML = nuevaCarta;
    jugador.append(pedirOtraCarta);
    const valorMano = calcularValor(manoJugador);
    if (valorMano > 21) {
        Toastify({
            text: `Has Perdido`,
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #b4423a, #fcb045)"
            }
        }).showToast();
        validarFichas(false);
        setTimeout(reiniciar, 3500);
    }
};

//Decidir al Ganador
const decidirGanador = async () => {
    let croupierValor = await calcularValor(manoCroupier);
    let jugadorValor = await calcularValor(manoJugador);
    Toastify({
        text: `La casa tiene ${croupierValor}, Jugador tiene ${jugadorValor}`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #ff0000, #4571fc)"
        }
    }).showToast();
    if (croupierValor > jugadorValor) {
        Toastify({
            text: "La casa gana",
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #b4423a, #fcb045)"
            }
        }).showToast();
        validarFichas(false);
        setTimeout(reiniciar, 3500);
    } else {
        Toastify({
            text: "El Jugador gana",
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
        validarFichas(true);
        setTimeout(reiniciar, 3500);
    }
};

function validarFichas(ganaJugador) {
    if (ganaJugador) {
        fichas += apuesta * 2;
        apuesta = 0;
        actualizarValores();
        return;
    }else{
    fichas -= apuesta;
    apuesta = 0;}
    actualizarValores();
}

//dar vuelta la carta oculta
//calcular valor mano croupier con la de jugador
const cartasCroupier = async () => {
    const cartaOculta = croupier.children[0];
    cartaOculta.classList.remove("back");
    cartaOculta.innerHTML = manoCroupier[0];
    let valorMano = await calcularValor(manoCroupier);

    if (valorMano < 16) {
        let nuevaCarta = seleccionarCarta();
        manoCroupier.push(nuevaCarta);
        const nuevaCartaNodo = cartaModelo.cloneNode(true);
        nuevaCartaNodo.innerHTML = nuevaCarta;
        croupier.append(nuevaCartaNodo);
        valorMano = await calcularValor(manoCroupier);
    }
    if (valorMano < 16) {
        cartasCroupier();
    } else if (valorMano === 21) {
        Toastify({
            text: "La casa gana con 21!!",
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #b4423a, #fcb045)"
            }
        }).showToast();
        validarFichas(false);
        setTimeout(reiniciar, 3500);
    } else if (valorMano > 21) {
        Toastify({
            text: `La casa pierde con ${valorMano}`,
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #b4423a, #fcb045)"
            }
        }).showToast();
        validarFichas(true);
        setTimeout(reiniciar, 3500);
    } else {
        decidirGanador();
    }
};

botonDame.addEventListener("click", pedirCartasJugador);
botonPasar.addEventListener("click", cartasCroupier);

//calcular y asignar  el valor de las cartas
const calcularValor = (mano) => {
    let valor = 0;
    let Ace = 0;
    mano.forEach((carta) => {
        if (carta.length === 2) {
            if (carta[0] === "A") {
                Ace += 1;
            } else {
                carta[0] === "J" || carta[0] === "Q" || carta[0] === "K"
                    ? (valor += 10)
                    : (valor += Number(carta[0]));
            }
        } else {
            valor += 10;
        }
    });

    if (Ace > 0) {
        valor + 11 > 21 ? (valor += 1) : (valor += 11);
        valor += (Ace - 1) * 1;
    }
    return valor;
};

manoBot();

//funcion para volver a repartir
const reiniciar = () => {
    totalMazos = [];
    manoCroupier = [];
    manoJugador = [];
    mezclarMazo(5);
    document.getElementById("croupier").innerHTML = "";
    document.getElementById("jugador").innerHTML = "";
    manoBot();
};


let fichas = 5000;
let apuesta = 0;

const botonApuesta10 = document.getElementById("botonApuesta10");
const botonApuesta50 = document.getElementById("botonApuesta50");
const botonApuesta100 = document.getElementById("botonApuesta100");
const botonApuesta500 = document.getElementById("botonApuesta500");
const botonApuesta1000 = document.getElementById("botonApuesta1000");
const botonApuestaTodo = document.getElementById("todo");


//funcion para apostar
function apostar(cuanto) {
    if (apuesta >= fichas) {
        Toastify({
            text: "no tienes suficientes fichas",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #b4423a, #fcb045)"
            }
        }).showToast();
        return;
    } else {
        apuesta += cuanto;
    }
}

botonApuesta50.onclick = () => {
    apostar(50);
    actualizarValores();
};
botonApuesta100.onclick = () => {
    apostar(100);
    actualizarValores();
};
botonApuesta500.onclick = () => {
    apostar(500);
    actualizarValores();
};
botonApuesta1000.onclick = () => {
    apostar(1000);
    actualizarValores();
};
botonApuestaTodo.onclick = () => {
    apostar(fichas);
    actualizarValores();
};

//actualiza valores del contador de la derecha
function actualizarValores() {
    document.getElementById("playermoney").innerHTML = "$" + fichas;
    document.getElementById("message").innerHTML =`
    <div class="mensajeApuesta">
        <p>El Jugador Apuesta $  ${apuesta}</p>
    </div>`
}

actualizarValores();


const otrosJuegos = document.getElementById("otrosJuegos");

//fetch de juegos relacionados
const mostrarJuegos = async() =>{
const response= await fetch('./json/juegos.json');
const juegos = await response.json();
return juegos;
}

mostrarJuegos().then(juegos =>{
    juegos.forEach(juegos =>{
        otrosJuegos.innerHTML +=`
        
        <div>
        <a href="${juegos.link}" target="_blank" class= "linkJS">${juegos.nombreJuego}</a>
        <p class="parrafoLink">Jugadores:${juegos.cantidadJugadores}</p>
        </div>
        `
    })
})


