const clientes=["perez juan", "lopez maria", "gomez carlos", "diaz ana"];
let nombre;
let apellido;
let nombreCompleto; 
let terminar= "no";
let opcion=" ";

function concat(nombre, apellido) {
    let nombreConcat = apellido + " " + nombre;
    return nombreConcat; 
}

function agregar(clientes,nombreCompleto) {
    clientes.push(nombreCompleto);
    return clientes;
}

function ordenar (clientes) {
    clientes.sort();
    return clientes;
}

function mostrar(clientes) {
    for (let cliente of clientes)  {
        console.log(cliente);
    }   
}


while (terminar !== "si") {
    nombre = prompt("ingrese su nombre: ");
    apellido = prompt("ingrese su apellido: ");
    nombreCompleto = concat(nombre, apellido);
    agregar(clientes,nombreCompleto);
    ordenar(clientes);
    terminar = prompt("¿Desea terminar? (si/no)");
    while (terminar !== "si" && terminar !== "no") {
        terminar = prompt("Opción no válida. Por favor, ingrese 'si' o 'no': ");
    }   
}

opcion = prompt("¿Desea mostrar la lista de clientes? (si/no)");
while (opcion !== "si" && opcion !== "no") {
    opcion = prompt("Opción no válida. Por favor, ingrese 'si' o 'no': ");
}
if (opcion === "si") {
    mostrar(clientes);
} else {
    console.log("Gracias por usar el programa. - main.js:49");
}




