//boton buscar
let buscarr = []

const formulario = document.querySelector('#formulario');
const buscar = document.querySelector('#buscar');

const resultado = document.getElementById("resultado")

// const filtrar = () => {
//   //console.log(formulario.value);
//   contenedor.classList.remove("container");

//   const texto = formulario.value.toLowerCase();
//   for(let buscar of tiposDepartamentos){
//   let nombre = buscar.nombre.toLowerCase()
//   if(nombre.indexOf(texto) !== -1){
//     let resultadoo = document.getElementById("resultado")
//     let cards = document.createElement("div")
//     cards.classList.add("card", "col-sm-12", "col-lg-3");
//     cards.innterHTML +=`
//     <img class="img" src="${departamento.imagen}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${departamento.nombre}</h5>
//       <p class="card-text">${departamento.precio}</p>
//       <a href="#departamentos" class="btn btn-secondary" onClick="agregarAlCarrito(${boton})">Comprar</a>
//     </div>`
//     resultadoo.appendChild(cards);

//   }
 
//   }
  
  
// }

// boton.addEventListener('click',filtrar)
const filtrar = () => {
  //console.log(formulario.value);
  var elem = document.getElementById('container');
  elem.parentNode.removeChild(elem);

  const texto = formulario.value.toLowerCase();
  for(let buscar of tiposDepartamentos){
  let nombre = buscar.nombre.toLowerCase()
  if(nombre.indexOf(texto) !== -1){
    let cards = document.createElement("div")
    cards.classList.add("card", "col-sm-12", "col-lg-3");
    cards.innerHTML +=`
    <img class="img" src="${buscar.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${buscar.nombre}</h5>
      <p class="card-text">${buscar.precio}</p>
      <a href="#departamentos" class="btn btn-secondary" onClick="agregarAlCarrito(${boton})">Comprar</a>
    </div>`
    //resultadoo.appendChild(cards);        
  }
  }
  if(resultado.innerHTML ===''){ resultado.innterHTML +=`
  
    <h5 class="card-title">${buscar.nombre}</h5>
    <img class="img" src="${buscar.imagen}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${buscar.precio}</p>
    <a href="#departamentos" class="btn btn-secondary" onClick="agregarAlCarrito(${boton})">Comprar</a>
  </div>`
  //resultadoo.appendChild(cards);        

  }
  
}

boton.addEventListener('click',filtrar)