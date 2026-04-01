document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("listaClientes");
    const formulario = document.getElementById("formCliente");
    const modal = document.getElementById("modalEdicion");
    const inputBusqueda = document.getElementById("inputBusqueda");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnLimpiar = document.getElementById("btnLimpiar");

    if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
        inputBusqueda.value = "";
        window.dibujarClientes(); 
        console.log("Mostrando lista completa - main.js:13");
    });
}
    window.dibujarClientes = (listaAMostrar = clientes) => {
        if (!contenedor) return;
        contenedor.innerHTML = "";
        
        listaAMostrar.forEach(c => {
            const div = document.createElement("div");
            div.className = "card-cliente";
            div.innerHTML = `
                <h3>${c.nombre} ${c.apellido}</h3>
                <p><strong>Email:</strong> ${c.email}</p>
                <p><strong>Tel:</strong> ${c.telefono}</p>
                <div class="acciones">
                    <button class="btn-editar" onclick="abrirModal(${c.id})">Editar</button>
                    <button class="btn-borrar" onclick="borrarCliente(${c.id})">Borrar</button>
                </div>
            `;
            contenedor.appendChild(div);
        });
    };

    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            const texto = inputBusqueda.value.toLowerCase();
            const filtrados = clientes.filter(c => 
                c.apellido.toLowerCase().includes(texto) || 
                c.nombre.toLowerCase().includes(texto)
            );
            window.dibujarClientes(filtrados);
        });
    }

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const n = document.getElementById("nombre").value;
        const a = document.getElementById("apellido").value;
        const m = document.getElementById("email").value;
        const t = document.getElementById("telefono").value;

        clientes.push(new Cliente(n, a, m, t));
        localStorage.setItem("mis_clientes", JSON.stringify(clientes));
        formulario.reset();
        window.dibujarClientes();
    });

    window.borrarCliente = (id) => {
        clientes = clientes.filter(c => c.id !== id);
        localStorage.setItem("mis_clientes", JSON.stringify(clientes));
        window.dibujarClientes();
    };

    window.abrirModal = (id) => {
        const c = clientes.find(cli => cli.id === id);
        document.getElementById("editId").value = c.id;
        document.getElementById("editNombre").value = c.nombre;
        document.getElementById("editApellido").value = c.apellido;
        document.getElementById("editTelefono").value = c.telefono;
        modal.style.display = "flex";
    };

    window.cerrarModal = () => { modal.style.display = "none"; };

    window.guardarEdicion = () => {
        const id = parseInt(document.getElementById("editId").value);
        const c = clientes.find(cli => cli.id === id);
        c.nombre = document.getElementById("editNombre").value;
        c.apellido = document.getElementById("editApellido").value;
        c.telefono = document.getElementById("editTelefono").value;
        localStorage.setItem("mis_clientes", JSON.stringify(clientes));
        window.cerrarModal();
        window.dibujarClientes();
    };

    const guardados = localStorage.getItem("mis_clientes");
    if (guardados) {
        clientes = JSON.parse(guardados);
        window.dibujarClientes();
    } else {
        obtenerClientesDelServidor();
    }
});



