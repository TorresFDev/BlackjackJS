const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const palos = ['♠', '♥', '♣', '♦']


let totalMazos = [];
let manoCroupier = [];
let manoJugador = [];



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

const cartaModelo = document.createElement('div');
cartaModelo.classList.add('card');
const croupier = document.getElementById("croupier");
const jugador = document.getElementById("jugador");

const manoBot =() => {
    manoCroupier = [seleccionarCarta(),seleccionarCarta()];
    manoCroupier.forEach((carta,index)=>{
        const nuevaCarta = cartaModelo.cloneNode(true);
        index === 0? nuevaCarta.classList.add('back'):nuevaCarta.innerHTML=carta;
        (carta[carta.length - 1] === '♥' || carta[carta.length - 1] === '♦') && nuevaCarta.setAttribute('data-red', true)
        croupier.append(nuevaCarta);
    })
    
    manoJugador = [seleccionarCarta(),seleccionarCarta()];
    manoJugador.forEach((carta)=>{
        const nuevaCarta = cartaModelo.cloneNode(true);
        nuevaCarta.innerHTML=carta;
        (carta[carta.length - 1] === '♥' || carta[carta.length - 1] === '♦') && nuevaCarta.setAttribute('data-red', true)
        jugador.append(nuevaCarta);
    })
}

const botonDame = document.getElementById("otra");
const pass = document.getElementById("pass");

const pedirCartas = () => {
    const nuevaCarta = seleccionarCarta();
    manoJugador.push(nuevaCarta);
    const pedirOtraCarta=cartaModelo.cloneNode(true);
    pedirOtraCarta.innerHTML = nuevaCarta;
    jugador.append(pedirOtraCarta)
    const valorMano = calcularValor(manoJugador);
    if(valorMano > 21){
        console.log("perdiste")
        alert("Perdiste")
    }
}

botonDame.addEventListener('click', pedirCartas)

const calcularValor = (mano) =>{
    let valor = 0;
    mano.forEach((carta)=>{
        if (carta.length === 2){
            (carta[0] === 'J'|| carta[0] === 'Q'|| carta[0] === 'K')? valor +=10: valor+= Number(carta[0])
        }else{
            valor +=10
        }
    })
    return valor;
}



mezclarMazo(5); 
manoBot()