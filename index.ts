'expor: {}'
const contenidor: HTMLElement | null = document.getElementById('contenidor');
const boton: HTMLElement | null = document.getElementById('btn');
const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="options-outlined"]');



interface Tiempo {
  city: string;
  temperatura: string;
}

interface Reportar {
  joke: string;
  score: number;
  date: string;
}
let tiempoHoy: Tiempo[]=[];
let reportAcudits: Reportar[] = [];
let ultimoAcudito: string = '';
let contadorClicks = 0;

if (boton) {
  boton.addEventListener('click', function(event) {
    contraladorDeClick(); 
      comprobarScore(); 
      event.preventDefault(); 
            radios.forEach(radio => {
                radio.checked = false;
                radio.setAttribute("data-was-checked", "false");
            });
  });
}

function contraladorDeClick(){
  if(contadorClicks % 2 === 0 ){
    imprimirAcudit();
  }
  else{
    imprimirChuck();
  }
  contadorClicks ++;
}

function comprobarScore(): void {
  let seleccionado: HTMLInputElement | null = null;
  radios.forEach((radio: HTMLInputElement) => {
    if (radio.checked) {
        seleccionado = radio;
    }
  });

  if (seleccionado !== null) {
    guardarScore((seleccionado as HTMLInputElement).value, ultimoAcudito);
  } else {
    console.log('No se ha seleccionado ninguna opción.');
  }
}

function guardarScore(score: string, acudito: string): void {
  const fecha: string = new Date().toISOString();
  const scoreNumerico: number = parseInt(score, 10);
  reportAcudits.push({
      joke: acudito,
      score: scoreNumerico,
      date: fecha
  });
  console.log('Reporte de acuditos:', reportAcudits);
}

function imprimirAcudit(a?: Event): void {
  if (a) a.preventDefault();
  if (contenidor) contenidor.innerText= '';
  fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    })
  .then(res => res.json())
  .then(response => {
    const acudit: string = response.joke;
    ultimoAcudito = acudit;
    if (contenidor) contenidor.innerText= acudit;
  });
}

function imprimirChuck(a?: Event): void {
  if (a) a.preventDefault();
  if (contenidor) contenidor.innerText= '';
  fetch('https://api.chucknorris.io/jokes/random')
  .then(res => res.json())
  .then(response => {
    const acudit: string = response.value;
    ultimoAcudito = acudit;
    if (contenidor) contenidor.innerText= acudit;
  });
}



radios.forEach(radio => {
  radio.addEventListener('click', (e) => {
    if (radio.getAttribute("data-was-checked") === "true") {
      radio.checked = false;
      radio.setAttribute("data-was-checked", "false");
    } else {
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

const grados = document.getElementById('temperatura')!;

if(grados){
  grados.textContent= '25°C'
}
function imprimirTiempo(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c6b3b4cc42eba28a0cedcd441d7ee87a';
  fetch(url)
    .then(response => response.json()) 
      .then(data => {
        console.log(data)
        const temperatura = Math.round(data.main.temp);
        const condicionClima = data.weather[0].main;
        grados.textContent = `${temperatura/10}°C`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    function seleccionarIcono(condicionClima:any) {
      switch (condicionClima) {
        case 'Clouds':
          return 'ruta/a/tu/icono/nublado.svg';
        case 'Rain':
          return 'ruta/a/tu/icono/lluvioso.svg';
        case 'Clear':
          return 'ruta/a/tu/icono/soleado.svg';
        
        default:
          return 'ruta/a/tu/icono/default.svg'; 
      }
}
}
imprimirTiempo()






