const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const palos = ['♠', '♥', '♣', '♦']


let totalMazos = [];
let manoCroupier = [];
let manoJugador = [];

const cartaModelo = document.createElement('div');
cartaModelo.classList.add('card');


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

const croupier = document.getElementById("croupier");
const jugador = document.getElementById("jugador");

const manoBot =() => {
    const manoCroupier = [seleccionarCarta(),seleccionarCarta()];
    manoCroupier.forEach((carta)=>{
        const nuevaCarta = cartaModelo.cloneNode(true);
        nuevaCarta.innerHTML=carta;
        (carta[carta.length - 1] === '♥' || carta[carta.length - 1] === '♦') && nuevaCarta.setAttribute('data-red', true)
        croupier.append(nuevaCarta);
    })
    
    const manoJugador = [seleccionarCarta(),seleccionarCarta()];
    manoJugador.forEach((carta)=>{
        const nuevaCarta = cartaModelo.cloneNode(true);
        nuevaCarta.innerHTML=carta;
        (carta[carta.length - 1] === '♥' || carta[carta.length - 1] === '♦') && nuevaCarta.setAttribute('data-red', true)
        jugador.append(nuevaCarta);
    })
}


mezclarMazo(5); 
manoBot()