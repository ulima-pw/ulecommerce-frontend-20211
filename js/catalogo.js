var modalCrearVideojuego;
var data = {
    videojuegos : [{
        id : 1,
        nombre : "Mortal Kombat 11",
        categoria : "Peleas",
        precio : 40
    },{
        id : 2,
        nombre : "Resident Evil 4",
        categoria : "Survival Horror",
        precio : 45
    }],
    categorias : [
        "Peleas", "Survival Horror", "FPS", "RTS"
    ]
}

const butAgregarOnClick = () => {
    modalCrearVideojuego.toggle();
}

const butModalGrabarOnClick = () => {
    // Grabar un nuevo videojuego y insertarlo en la tabla
    // 1. Obtener los valores del formulario
    const nombre = document.querySelector("#input_nombre").value;
    const precio = document.querySelector("#input_precio").value;
    const categoria = document.querySelector("#select_categoria").value;

    // 2. Validacion de campos
    if (nombre == "" || precio == "" || categoria == "-1") {
        // No debo permitir grabar y mostrar mensaje
        crearMensajeError();
    } else {
        // 3. Creamos el objeto js y lo agregamos a la lista de videojuegos
        const vjJS = {
            id : data.videojuegos.length + 1,
            nombre : nombre,
            categoria : categoria,
            precio : precio
        }
        data.videojuegos.push(vjJS);
        // 4. Recargar la tabla
        cargarTabla();
        limpiarFormulario();
        modalCrearVideojuego.hide();
    }
    
}

const butModalCancelarOnClick = () => {
    limpiarFormulario();
    modalCrearVideojuego.hide();
}

const crearFila = (videojuego) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    const tdNombre = document.createElement("td");
    const tdCategoria = document.createElement("td");
    const tdPrecio = document.createElement("td");

    tdId.innerText = videojuego.id;
    tdNombre.innerText = videojuego.nombre;
    tdCategoria.innerText = videojuego.categoria;
    tdPrecio.innerText = videojuego.precio;

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdPrecio);

    return tr;
}

const cargarTabla = () => {
    const listaVideojuegos = data.videojuegos;
    const tbody = document.querySelector("#data_videojuegos");
    tbody.innerHTML = "";

    for (let vj of listaVideojuegos) {
        const tr = crearFila(vj);
        tbody.appendChild(tr);
    }
}

const cargarSelectCategorias = () => {
    const select = document.querySelector("#select_categoria");
    const listaCategorias = data.categorias;

    for (let categoria of listaCategorias) {
        const option = document.createElement("option");
        option.setAttribute("value", categoria);
        option.innerText = categoria;

        select.appendChild(option);
    }
}

const limpiarFormulario = () => {
    document.querySelector("#input_nombre").value = "";
    document.querySelector("#input_precio").value = "";
    document.querySelector("#select_categoria").value = "-1";

    document.querySelector("#mensajes").innerHTML = "";
}

const crearMensajeError = () => {
    const divMensajes = document.querySelector("#mensajes");

    const divAlert = document.createElement("div");
    divAlert.setAttribute("class", "alert alert-danger");
    divAlert.innerText = "Debe ingresar todos los campos";

    divMensajes.appendChild(divAlert);
}

const main = () => {
    // Inicializar el modal
    const divModal = document.querySelector("#modal_crear_videojuego");
    modalCrearVideojuego = new bootstrap.Modal(divModal)

    // Inicializar el evento click en el boton +
    const butAgregar = document.querySelector("#but_agregar");
    butAgregar.addEventListener("click", butAgregarOnClick);

    // Inicializar eventos de botones del modal
    const butModalGrabar = document.querySelector("#modal_but_grabar");
    const butModalCancelar = document.querySelector("#modal_but_cancelar");
    butModalGrabar.addEventListener("click", butModalGrabarOnClick);
    butModalCancelar.addEventListener("click", butModalCancelarOnClick);

    // Cargar Tabla
    cargarTabla();

    // Cargar combo de categorias
    cargarSelectCategorias();
}

window.addEventListener("load", main);