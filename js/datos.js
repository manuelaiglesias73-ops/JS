class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.id = Date.now();
    }
}

let clientes = [];

async function obtenerClientesDelServidor() {
    try {
        const respuesta = await fetch('./data/clientes.json');
        const datos = await respuesta.json();
        setTimeout(() => {
            clientes = datos;
            window.dibujarClientes();
        }, 100);
    } catch (e) {
        console.log("Servidor no disponible, cargando local... - datos.js:22");
        clientes = [];
        window.dibujarClientes();
    }
}


async function obtenerClientesDelServidor() {
    if (localStorage.getItem("mis_clientes")) return;

    try {
        const respuesta = await fetch('./data/clientes.json');
        const datos = await respuesta.json();
        
        setTimeout(() => {
            clientes = datos;
            localStorage.setItem("mis_clientes", JSON.stringify(clientes));
            window.dibujarClientes();
        }, 100);
    } catch (e) {
        console.log("Iniciando con lista vacía - datos.js:42");
        clientes = [];
        window.dibujarClientes();
    }
}


