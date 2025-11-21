// Referencias a elementos del DOM
const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");


/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localStorage */
function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("helados"));

    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            const nuevoHelado = document.createElement("div");
            nuevoHelado.classList = "tarjeta-producto";

            // Estructura HTML de la tarjeta del producto en el carrito
            nuevoHelado.innerHTML = `
                <img src="img/${producto.id}.png" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <span>$${producto.precio}</span>
                <div>
                    <button>-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button>+</button>
                </div>
            `;

            contenedorTarjetas.appendChild(nuevoHelado);
            
            // Lógica para restar cantidad
            nuevoHelado.getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = restarALCarrito(producto);
                    crearTarjetasProductosCarrito(); // Vuelve a renderizar la lista después de restar
                });

            // Lógica para sumar cantidad
            nuevoHelado.getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = agregarALCarrito(producto);
                    actualizarTotales();
                });
        });
    }

    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

// ---------------------------------------------------------------------

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("helados"));
    let cantidad = 0;
    let precio = 0;

    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            cantidad += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    
    // Actualiza los elementos en la interfaz
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;

    // Si el precio es 0, reinicia el carrito y revisa el mensaje de vacío
    if (precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

// ---------------------------------------------------------------------

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("helados"));
    
    // Togglea la clase 'escondido' si el array de productos está vacío o no
    carritoVacioElement.classList.toggle("escondido", productos);
    totalesContainer.classList.toggle("escondido", productos);
}

// ---------------------------------------------------------------------

// Event Listener para el botón de Reiniciar Carrito
document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});

// ---------------------------------------------------------------------

// Ejecuta la función principal al cargar el script
crearTarjetasProductosCarrito();