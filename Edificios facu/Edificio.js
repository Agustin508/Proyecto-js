//variables
let tiposDepartamentos = [];
let departamentos = [];

//llamada a json por ajax
$.ajax({
  url: "./datajson/Edificio.json",
  dataType: "json",
  success: (respuesta) => {
    cargarProductos(respuesta);
  },
});

//cards con modal
const cargarProductos = (respuesta) => {
  tiposDepartamentos = respuesta;

  let contenedor = document.getElementById("container");

  tiposDepartamentos.forEach((departamento, boton) => {
    let card = document.createElement("div");
    card.classList.add("card", "col-sm-12", "col-lg-3");
    card.innerHTML = `
    <img class="img" src="${departamento.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${departamento.nombre}</h5>
      <p class="card-text">${departamento.precio}</p>
      <a href="#departamentos" class="btn btn-secondary" onClick="agregarAlCarrito(${boton})">Comprar</a>
    </div>`;
      contenedor.appendChild(card);
    });
    $(".img").click((e) => {
      const url = $(e.target).attr("src");
      mostrarMensaje(url);
    });
    
    //let resultadoo = document.getElementById("resultado")

    // const filtrar = () => {
    //   //console.log(formulario.value);
    
    //   const texto = formulario.value.toLowerCase();
    //   for(let buscar of tiposDepartamentos){
    //   let nombre = buscar.nombre.toLowerCase()
    //   if(nombre.indexOf(texto) !== -1){
    //     var elem = document.getElementById('container');
    //     elem.parentNode.removeChild(elem);

    //     let cards = document.createElement("div")
    //     cards.classList.add("card", "col-sm-12", "col-lg-3");
    //     cards.innterHTML +=`
    //     <img class="img" src="${buscar.imagen}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //       <h5 class="card-title">${buscar.nombre}</h5>
    //       <p class="card-text">${buscar.precio}</p>
    //       <a href="#departamentos" class="btn btn-secondary" onClick="agregarAlCarrito(${boton})">Comprar</a>
    //     </div>`
    //     //resultadoo.appendChild(cards);        
    //   }
    //   }
      
      
    // }
    
    // boton.addEventListener('click',filtrar)
}

//modal carrito
let modalCarrito = document.getElementById("departamentos");

const dibujarCarrito = () => {
  let total = 0;
  modalCarrito.className = "departamentos";
  modalCarrito.innerHTML = "";
  if (departamentos.length > 0) {
    departamentos.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <br>
        <img class="car-img" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details"> Precio: $ ${producto.precio}</div>
        <div class="product-details"> Subtotal: $ ${producto.precio * producto.cantidad}</div>
        <button class="btn btn-secondary"  id="eliminarProducto" onClick="eliminarProducto(${indice})">Eliminar producto</button>
        <button class="btn btn-secondary"  id="vaciarProductos" onClick="vaciarProductos()">vaciarProductos</button>

        `;
      modalCarrito.appendChild(carritoContainer);
    });
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
    <button class= "btn  btn-secondary" id="finalizar" onClick="finalizarCompra();dibujarFormu();"> FINALIZAR COMPRA </button>`;
    modalCarrito.appendChild(totalContainer);
    
  } else{
    modalCarrito.classList.remove("departamentos")
  }
};

//local storage

if (localStorage.getItem("departamentos")) {
    departamentos = JSON.parse(localStorage.getItem("departamentos"));
  dibujarCarrito();
}
const actualizarStorage =(departamentos) => {
  localStorage.setItem("departamentos", JSON.stringify(departamentos))
};

//agregar al carrito
const agregarAlCarrito = (indiceDelArrayProducto) => {
    const indiceEncontradoCarrito = departamentos.findIndex((elemento) => {
      return elemento.id === tiposDepartamentos[indiceDelArrayProducto].id;
    });
    if (indiceEncontradoCarrito === -1) {
      const productoAgregar = tiposDepartamentos[indiceDelArrayProducto];
      productoAgregar.cantidad = 1;
      departamentos.push(productoAgregar);
      actualizarStorage(departamentos);
      dibujarCarrito();
    } else {
      departamentos[indiceEncontradoCarrito].cantidad += 1;
      actualizarStorage(departamentos);
      dibujarCarrito();
    }
  };

//eliminarProducto
  const eliminarProducto = (indice) => {
    departamentos.splice(indice, 1);
    actualizarStorage(departamentos)
    dibujarCarrito();
  }

//vaciarCarrito
  const vaciarProductos = () => {
    modalCarrito.innerHTML= ""
    modalCarrito.classList.remove("departamentos")
    localStorage.clear();
    departamentos = [];
  }
  
//finalizarCompra
  const finalizarCompra = () => {
    const total = document.getElementsByClassName("total")[0].innerHTML;
    modalCarrito.innerHTML= ""
    const totalCompra = `<div class="totalCompra"><p>Tu compra es de ${total}</div>
    <h2> DATOS PARA EL ENVÍO </h2>
    <div class="contact__secction-container">
     <div class="row">
       <div class="contact__secction__item">
         <label>Nombre</label>
         <input type="text" id="nombre" placeholder="Nombre"  />
       </div>
       <div class="contact__secction__item">
         <label>E-mail</label>
         <input type="text" id="mail" placeholder="E-mail" />
       </div>
       <div class="contact__secction__item">
         <label>Telefono</label>
         <input type="text" id="telefono" placeholder="Telefono"  />
       </div>
       <div class="contact__secction__item">
         <label>Domicilio</label>
         <input type="text" id="domicilio" placeholder="Domicilio" />
       </div>
       <div class="contact-button">
         <button type="button" class="btn btn-danger envio" onClick="envio()" >Confirmar</button>
       </div>
     </div>
   </div>`;
    modalCarrito.innerHTML = totalCompra;
  }

  const envio = () => {
    const nombreCliente = document.getElementById("nombre").value;
    const domicilioCliente = document.getElementById("domicilio").value;
    modalCarrito.innerHTML = "";
    let mensaje = `<div class="envio">Gracias ${nombreCliente} por su compra! en 48 horas recibira su paquete en ${domicilioCliente} </div>`;
    modalCarrito.innerHTML = mensaje;
  };



 