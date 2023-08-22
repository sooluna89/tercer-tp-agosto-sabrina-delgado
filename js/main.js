

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const notebook = new Producto(1, "Notebook", 40000, "img/notebook.png");
const auriculares = new Producto(2, "Auriculares", 10000, "img/auriculares.jpg");
const heladera = new Producto(3, "Heladera", 700000, "img/heladera.jpg");
const smartTv = new Producto(4, "Smart tv", 130000, "img/smart-tv.jpg");
const celular = new Producto(5, "Celular", 60000, "img/celular.jpg");
const lavarropas = new Producto(6, "Lavarropas", 150000, "img/lavarropas.jpg");
const licuadora = new Producto(7, "licuadora", 30000, "img/licuadora.jpg");
const plancha = new Producto(8, "Plancha", 20000, "img/plancha.jpg");


const productos = [notebook, auriculares, heladera, smartTv, celular, lavarropas, licuadora, plancha];

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modifico el DOM mostrando los productos:

const contenedorProductos = document.getElementById("contenedorProductos");

//función para mostrar los productos: 

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3>${producto.nombre}</h3>
                                    <p>${producto.precio}</p>
                                    <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                                </div>
                            </div>`
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

// función de agregar al carrito. 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

//Mostrar el carrito de compras: 

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})



//Función para mostrar el carrito: 

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3>${producto.nombre}</h3>
                                    <p>${producto.precio}</p>
                                    <p>${producto.cantidad}</p>
                                    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                                </div>
                            </div>`
        contenedorCarrito.appendChild(card);
        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}

//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos todo el carrito de compras: 

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Función que elimina todo el carrito: 

const eliminarTodoElCarrito = () => {
    carrito = [];
    //localStorage: 
    localStorage.clear();
    mostrarCarrito();
}

//mensaje con el total de la compra: 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad.
    })
    total.innerHTML = `Total: $${totalCompra}`;
}