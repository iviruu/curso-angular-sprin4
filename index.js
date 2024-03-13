"use strict";
'expor: {}';
const contenidor = document.getElementById('contenidor');
const boton = document.getElementById('btn');
const radios = document.querySelectorAll('input[name="options-outlined"]');
let tiempoHoy = [];
let reportAcudits = [];
let ultimoAcudito = '';
let contadorClicks = 0;
if (boton) {
    boton.addEventListener('click', function (event) {
        contraladorDeClick();
        comprobarScore();
        event.preventDefault();
        radios.forEach(radio => {
            radio.checked = false;
            radio.setAttribute("data-was-checked", "false");
        });
    });
}
function contraladorDeClick() {
    if (contadorClicks % 2 === 0) {
        imprimirAcudit();
    }
    else {
        imprimirChuck();
    }
    contadorClicks++;
}
function comprobarScore() {
    let seleccionado = null;
    radios.forEach((radio) => {
        if (radio.checked) {
            seleccionado = radio;
        }
    });
    if (seleccionado !== null) {
        guardarScore(seleccionado.value, ultimoAcudito);
    }
    else {
        console.log('No se ha seleccionado ninguna opción.');
    }
}
function guardarScore(score, acudito) {
    const fecha = new Date().toISOString();
    const scoreNumerico = parseInt(score, 10);
    reportAcudits.push({
        joke: acudito,
        score: scoreNumerico,
        date: fecha
    });
    console.log('Reporte de acuditos:', reportAcudits);
}
function imprimirAcudit(a) {
    if (a)
        a.preventDefault();
    if (contenidor)
        contenidor.innerText = '';
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(response => {
        const acudit = response.joke;
        ultimoAcudito = acudit;
        if (contenidor)
            contenidor.innerText = acudit;
    });
}
function imprimirChuck(a) {
    if (a)
        a.preventDefault();
    if (contenidor)
        contenidor.innerText = '';
    fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(response => {
        const acudit = response.value;
        ultimoAcudito = acudit;
        if (contenidor)
            contenidor.innerText = acudit;
    });
}
radios.forEach(radio => {
    radio.addEventListener('click', (e) => {
        if (radio.getAttribute("data-was-checked") === "true") {
            radio.checked = false;
            radio.setAttribute("data-was-checked", "false");
        }
        else {
            radios.forEach(r => r.setAttribute("data-was-checked", "false"));
            radio.setAttribute("data-was-checked", "true");
        }
    });
    radio.addEventListener('change', () => {
        if (radio.checked) {
            radio.setAttribute("data-was-checked", "true");
        }
    });
});
imprimirAcudit();
const grados = document.getElementById('temperatura');
const iconoClima = document.getElementById('iconoClima');
if (grados && iconoClima) {
    grados.textContent = '25°C';
    iconoClima.src = '/img/01d@2x.png';
}
function imprimirTiempo() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c6b3b4cc42eba28a0cedcd441d7ee87a';
    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        const temperatura = Math.round(data.main.temp);
        const condicionClima = data.weather[0].icon;
        console.log(condicionClima);
        grados.textContent = `${temperatura / 10}°C`;
    })
        .catch(error => {
        console.error('Error:', error);
    });
    function seleccionarIcono(condicionClima) {
        iconoClima.src = '';
        switch (condicionClima) {
            case '01d':
                iconoClima.src = '/img/01d@2x.png';
                break;
            case '02d':
                iconoClima.src = '/img/02d@2x.png';
                break;
            case '03d':
                iconoClima.src = '/img/03d@2x.png';
                break;
            case '04d':
                iconoClima.src = '/img/04d@2x.png';
                break;
            case '09d':
                iconoClima.src = '/img/09d@2x.png';
                break;
            case '10d':
                iconoClima.src = '/img/10d@2x.png';
                break;
            case '11d':
                iconoClima.src = '/img/11d@2x.png';
                break;
            case '13d':
                iconoClima.src = '/img/13d@2x.png';
                break;
            case '50d':
                iconoClima.src = '/img/50d@2x.png';
                break;
            case '01n':
                iconoClima.src = '/img/01n@2x.png';
                break;
            case '02n':
                iconoClima.src = '/img/02n@2x.png';
                break;
            case '03n':
                iconoClima.src = '/img/03n@2x.png';
                break;
            case '04n':
                iconoClima.src = '/img/04n@2x.png';
                break;
            case '09n':
                iconoClima.src = '/img/01d@2x.png';
                break;
            case '10n':
                iconoClima.src = '/img/09n@2x.png';
                break;
            case '11n':
                iconoClima.src = '/img/11n@2x.png';
                break;
            case '13n':
                iconoClima.src = '/img/13n@2x.png';
                break;
            case '50n':
                iconoClima.src = '/img/50n@2x.png';
                break;
            default:
                iconoClima.src = '/img/01d@2x.png';
        }
    }
}
imprimirTiempo();
