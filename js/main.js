
function Cliente(nombre, apellido, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.id = Date.now(); 
}


let clientes = JSON.parse(localStorage.getItem("clientes")) || [];


const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const btnOrdenar = document.getElementById("btnOrdenar");
const inputBusqueda = document.getElementById("busqueda");


function mostrarClientes(listado = clientes) {
    listaClientes.innerHTML = ""; 

    listado.forEach(cliente => {
        const card = document.createElement("div");
        card.className = "card-cliente";
        card.innerHTML = `
            <h3>${cliente.apellido}, ${cliente.nombre}</h3>
            <p>${cliente.email}</p>
            <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
        `;
        listaClientes.appendChild(card);
    });
}


btnOrdenar.addEventListener("click", () => {
    clientes.sort((a, b) => a.apellido.localeCompare(b.apellido));
    guardarYActualizar();
});


inputBusqueda.addEventListener("input", (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = clientes.filter(c => c.apellido.toLowerCase().includes(termino));
    mostrarClientes(filtrados);
});


formCliente.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;

    const nuevoCliente = new Cliente(nombre, apellido, email);
    clientes.push(nuevoCliente);
    
    formCliente.reset(); 
    guardarYActualizar();
});


function eliminarCliente(id) {
    clientes = clientes.filter(c => c.id !== id);
    guardarYActualizar();
}

function guardarYActualizar() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
    mostrarClientes();
}

mostrarClientes();