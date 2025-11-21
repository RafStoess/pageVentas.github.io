const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto";

        nuevoProducto.innerHTML = `
            <img src="img/${producto.id}.png">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;

        contenedorTarjetas.appendChild(nuevoProducto);
        console.log(contenedorTarjetas);

        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarALCarrito(producto));
    });
}

crearTarjetasProductosInicio(helados);