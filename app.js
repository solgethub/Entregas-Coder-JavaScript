const products = [
    {
        id: 1,
        title: "El Gran Gatsby",
        subtitle: "F. Scott Fitzgerald",
        price: 25.00,
        image: "https://via.placeholder.com/300x250/FFC0CB/000000"
    },
    {
        id: 2,
        title: "1984",
        subtitle: "George Orwell",
        price: 20.00,
        image: "https://via.placeholder.com/300x250/FFC0CB/000000"
    },
    {
        id: 3,
        title: "Orgullo y prejuicio",
        subtitle: "Jane Austen",
        price: 18.00,
        image: "https://via.placeholder.com/300x250/FFC0CB/000000"
    },
    {
        id: 4,
        title: "Cumbres Borrascosas",
        subtitle: "Emily Brontë",
        price: 22.00,
        image: "https://via.placeholder.com/300x250/FFC0CB/000000"
    }
    // Puedes añadir más productos aquí
];

// Variables para el carrito
let cart = [];

// Referencia al contenedor de productos
const containerList = document.getElementById("containerList");

// Referencia al contador de carrito
const cartCount = document.getElementById("cartCount");

// Referencia a la sección del carrito
const cartSection = document.getElementById("cart");

// Función para renderizar los productos en la tienda
function renderProducts() {
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" alt="${product.title}" class="card-img">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <h6 class="card-subtitle">${product.subtitle}</h6>
                    <h6 class="card-price">€${product.price.toFixed(2)}</h6>
                    <a href="#" class="btn-add-cart" data-id="${product.id}"><i class="bi bi-cart"></i> Agregar al carrito</a>
                </div>
            </div>
        `;
        
        containerList.appendChild(productCard);
    });
}

// Función para actualizar el número de productos en el carrito
function updateCartCount() {
    cartCount.textContent = `Items en el carrito: ${cart.length}`;
}

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        updateCartCount();
        renderCart();
    }
}

// Función para renderizar el carrito
function renderCart() {
    cartSection.innerHTML = ''; // Limpiar el carrito

    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.setAttribute("data-id", product.id);

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h5>${product.title}</h5>
                <p>€${product.price.toFixed(2)}</p>
                <button class="cart-item-remove">Eliminar</button>
            </div>
        `;

        // Evento para eliminar el producto del carrito
        cartItem.querySelector(".cart-item-remove").addEventListener("click", () => {
            removeFromCart(product.id);
        });

        cartSection.appendChild(cartItem);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    updateCartCount();
    renderCart();
}

// Función para manejar los clics en los botones de "Agregar al carrito"
function handleAddToCartClick(event) {
    if (event.target.classList.contains("btn-add-cart")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        addToCart(productId);
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(); // Renderizar los productos cuando la página se carga
    updateCartCount(); // Actualizar el contador de carrito al inicio

    // Agregar evento de clic a los botones de "Agregar al carrito"
    containerList.addEventListener("click", handleAddToCartClick);
});