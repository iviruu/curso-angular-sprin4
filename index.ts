
const contenidor: any= document.getElementById('contenidor');
const boton: any = document.getElementById('btn');
boton.addEventListener('click',imprimirAcudit);

function imprimirAcudit(a?:any) {
  if (a) a.preventDefault();
  contenidor.innerText= ''
  fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    })
  .then(res => res.json())
  .then(response => {
    const acudit = response.joke
    contenidor.innerText= acudit
  })
  
}


imprimirAcudit();



