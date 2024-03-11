'expor: {}'
const contenidor: HTMLElement | null = document.getElementById('contenidor');
const boton: HTMLElement | null = document.getElementById('btn');
const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="options-outlined"]');
const tiempo: HTMLElement | null = document.getElementById('tiempo');


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

if (boton) {
  boton.addEventListener('click', function(event) {
      imprimirAcudit(event); 
      comprobarScore(); 
      event.preventDefault(); 
            radios.forEach(radio => {
                radio.checked = false;
                radio.setAttribute("data-was-checked", "false");
            });
  });
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


const url = 'https://cities-temperature.p.rapidapi.com/weather/v1?city=barcelona';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '412bebbc46msh91487958561faddp19cb25jsn0499ee2432ba',
		'X-RapidAPI-Host': 'cities-temperature.p.rapidapi.com'
	}
};
function imprimirTiempo(){
  fetch(url, options)
    .then(response => response.json()) 
    .then(result => {
      let t: Tiempo= {
        city: result.city,
        temperatura: `${result.temperatureC}ºC`
      }
      
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
imprimirTiempo()






