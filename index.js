const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const palos = ['♠', '♥', '♣', '♦']


let totalMazos = [];
let manoCroupier = [];
let manoJugador = [];

const cartaModelo = document.createElement('div');
cartaModelo.classList.add('card');


// const croupier = document.getElementById("croupier");
// const jugador = document.getElementById("jugador");
// const hit = document.getElementById("hit");
// const pass = document.getElementById("pass");
// const buttonContainer = document.getElementById("button-container");
// const notice = document.getElementById("notice");
// const siguienteMano = document.getElementById("siguiente-mano");


const crearMazo = () => {
    const mazo = [];
    palos.forEach((palo) => {
        valores.forEach((valor) => {
            const carta = valor + palo;
            mazo.push(carta)
        })
    })
    return mazo;
}

const mezclarMazo = (num) => {
    for (let i = 0; i < num; i++) {
        const nuevoMazo = crearMazo();
        totalMazos = [...totalMazos, ...nuevoMazo.sort(() => Math.random() - 0.5)];
        //console.log(nuevoMazo)
    }
}



const seleccionarCarta = () => {
    const cartasTotales = totalMazos.length;
    let cualquierNumero = Math.floor(Math.random() * cartasTotales);
    const cualquierCarta = totalMazos[cualquierNumero];
    totalMazos.splice(cualquierNumero, 1)
    return cualquierCarta;
}

mezclarMazo(5); 
const cualquierCarta= seleccionarCarta();
console.log(totalMazos)
console.log(cualquierCarta);