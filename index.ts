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
const iconoClima = document.getElementById('iconoClima') as HTMLImageElement;

if(grados && iconoClima){
  grados.textContent= '25°C'
  iconoClima.src= '/img/01d@2x.png';
}
function imprimirTiempo(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c6b3b4cc42eba28a0cedcd441d7ee87a&units=metric';
  fetch(url)
    .then(response => response.json()) 
      .then(data => {
        console.log(data)
        const temperatura = Math.round(data.main.temp);
        const condicionClima = data.weather[0].icon;
        console.log(condicionClima)
        grados.textContent = `${temperatura}°C`;
        seleccionarIcono(condicionClima);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    function seleccionarIcono(condicionClima: string) {
      const mapaIconos: {[key: string]: string} = {
        '01d': '/img/01d@2x.png',
        '02d': '/img/02d@2x.png',
        '03d': '/img/03d@2x.png',
        '04d': '/img/04d@2x.png',
        '09d': '/img/09d@2x.png',
        '10d': '/img/10d@2x.png',
        '11d': '/img/11d@2x.png',
        '13d': '/img/13d@2x.png',
        '50d': '/img/50d@2x.png',
        '01n': '/img/01n@2x.png',
        '02n': '/img/02n@2x.png',
        '03n': '/img/03d@2x.png', 
        '04n': '/img/04d@2x.png', 
        '09n': '/img/09d@2x.png',
        '10n': '/img/10d@2x.png',
        '11n': '/img/11d@2x.png',
        '13n': '/img/13d@2x.png',
        '50n': '/img/50d@2x.png'
      };
    
      if (iconoClima) {
        iconoClima.src = mapaIconos[condicionClima] || '/img/01d@2x.png';
      }
    }
}

imprimirTiempo();






