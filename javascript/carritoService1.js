const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarALCarrito(producto) {
    // Revisar si el producto está en el carrito.
    let memoria = JSON.parse(localStorage.getItem("helados"));
    let cantidadProductoFinal;

    // Si no hay localStorage se lo crea
    if (!memoria || memoria.length === 0) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("helados", JSON.stringify([nuevoProducto]));
        actualizarNumeroCarrito();
        cantidadProductoFinal = 1;
    } else {
        // Si hay localStorage me fijo si el artículo ya está ahí
        const indiceProducto = memoria.findIndex(helado => helado.id === producto.id);
        const nuevaMemoria = memoria;

        // Si el producto no está en el carrito lo agrego
        if (indiceProducto === -1) {
            const nuevoProducto = getNuevoProductoParaMemoria(producto);
            nuevaMemoria.push(nuevoProducto);
            cantidadProductoFinal = 1;
        } else {
            // Si el producto está en el carrito se le agrega 1 a la cantidad.
            nuevaMemoria[indiceProducto].cantidad++;
            cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
        }

        localStorage.setItem("helados", JSON.stringify(nuevaMemoria));
        actualizarNumeroCarrito();
    }

    return cantidadProductoFinal;
}

// ---------------------------------------------------------------------

/** Resta una unidad de un producto del carrito */
function restarALCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("helados"));
    let cantidadProductoFinal;

    const indiceProducto = memoria.findIndex(helado => helado.id === producto.id);
    const nuevaMemoria = memoria;

    // Disminuye la cantidad
    nuevaMemoria[indiceProducto].cantidad--;
    cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;

    // Si la cantidad llega a 0, elimina el producto del array
    if (cantidadProductoFinal === 0) {
        nuevaMemoria.splice(indiceProducto, 1);
    }

    localStorage.setItem("helados", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();

    return cantidadProductoFinal;
}

// ---------------------------------------------------------------------

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

// ---------------------------------------------------------------------

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito() {
    let cuenta = 0;
    const memoria = JSON.parse(localStorage.getItem("helados"));
    
    // Si hay datos en memoria y el array no está vacío, calcula el total
    if (memoria && memoria.length > 0) {
        cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
        return;
    }
    
    // Si no hay datos, establece el contador en 0
    cuentaCarritoElement.innerText = 0;
}

// ---------------------------------------------------------------------

/** Reinicia el carrito */
function reiniciarCarrito() {
    localStorage.removeItem("helados");
    actualizarNumeroCarrito();
}

// ---------------------------------------------------------------------

// Llama a la función al cargar el script para asegurar que el contador esté actualizado
actualizarNumeroCarrito();