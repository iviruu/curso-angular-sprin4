"use strict";
'expor: {}';
const contenidor = document.getElementById('contenidor');
const boton = document.getElementById('btn');
const radios = document.querySelectorAll('input[name="options-outlined"]');
const tiempo = document.getElementById('tiempo');
let tiempoHoy = [];
let reportAcudits = [];
let ultimoAcudito = '';
if (boton) {
    boton.addEventListener('click', function (event) {
        imprimirAcudit(event);
        comprobarScore();
        event.preventDefault();
        radios.forEach(radio => {
            radio.checked = false;
            radio.setAttribute("data-was-checked", "false");
        });
    });
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
function imprimirTiempo() {
    const url = 'https://cities-temperature.p.rapidapi.com/weather/v1?city=barcelona';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '412bebbc46msh91487958561faddp19cb25jsn0499ee2432ba',
            'X-RapidAPI-Host': 'cities-temperature.p.rapidapi.com'
        }
    };
    if (tiempo)
        tiempo.innerText = '';
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
        const t = `<p>City: ${result.city}</p>
        <p>Temperatura: ${result.temperatureC}ºC</p>`;
        if (tiempo)
            tiempo.innerHTML = t;
    })
        .catch(error => {
        console.error('Error:', error);
    });
}
imprimirTiempo();
