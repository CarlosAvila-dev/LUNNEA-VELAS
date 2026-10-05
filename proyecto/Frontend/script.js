const products = [
  {
    id: 1,
    name: "Vainilla & Ámbar",
    description: "Un aroma cálido, dulce y elegante para relajarte.",
    price: 250,
    imagen: "img/vainilla.jpg",
    cate: "Calidos"
  },
  {
    id: 2,
    name: "Lavanda",
    description: "Ideal para descansar y crear un ambiente tranquilo.",
    price: 220,
    imagen: "img/lavanda.jpg",
    cate: "Florales"
  },
  {
    id: 3,
    name: "Canela & Café",
    description: "Una combinación acogedora con notas intensas.",
    price: 280,
    imagen: "img/cafe.jpg",
    cate: "Calidos"
  },
  {
    id: 4,
    name: "Coco & Vainilla",
    description: "Un aroma suave que recuerda a unas vacaciones.",
    price: 260,
    imagen: "img/coco.jpeg",
    cate: "Frutales"
  },
  {
    id: 5,
    name: "Coco",
    description: "Transporta tus sentidos a un paraíso tropical. Perfecta para momentos de relajacion y meditación",
    price: 260,
    imagen: "img/coco.jpeg",
    cate: "Frutales"
  },
  {
    id: 6,
    name: "Pino & cedro",
    description: "Aroma boscoso y amaderado que transporta directo a un bosque silvestre",
    price: 260,
    imagen: "img/pino.jpg",
    cate: "Frescos"
    },
  {
    id: 7,
    name: "Eucalipto & Menta",
    description: "Una combinación revitalizante que despeja las vías respiratorias y refresca cualquier habitación",
    price: 230,
    imagen: "img/eucalipto.jpg",
    cate: "Frescos"
  },
  {
    id: 8,
    name: "Bamboo & Té",
    description: "Notas limpias, ligeras y herbales con un toque botánico sereno",
    price: 230,
    imagen: "img/bamboo.jpg",
    cate: "Frescos"
  },
  {
    id: 9,
    name: "Brisa Marina & Sal",
    description: "Aroma fresco con notas ozónicas y acuáticas que simulan el aire de la costa.",
    price: 210,
    imagen: "img/brisa.jpg",
    cate: "Frescos"
  },
  {
    id: 10,
    name: "Rosas & Peonias",
    description: "Un ramillete floral suave, femenino y clásico con matices dulces",
    price: 240,
    imagen: "img/rosas.jpg",
    cate: "Florales"
  },
  {
    id: 11,
    name: "Jazmin & Flor de Azahar",
    description: "Notas florales blancas, intensas y envolventes que aportan serenidad al ambiente",
    price: 240,
    imagen: "img/jazmin.jpg",
    cate: "Florales"
  },
  {
    id: 12,
    name: "Orquideas & Almizcle",
    description: "Un floral exótico con base aterciopelada y sofisticada, que le dará un toque especial a la ocasión",
    price: 240,
    imagen: "img/orquidea.jpg",
    cate: "Florales"
  },
  {
    id: 13,
    name: "Orquideas & Almizcle",
    description: "Un floral exótico con base aterciopelada y sofisticada, que le dará un toque especial a la ocasión",
    price: 240,
    imagen: "img/orquidea.jpg",
    cate: "Florales"
  }
];

let cart = JSON.parse(localStorage.getItem("luminaCart")) || [];

// Elementos del DOM
const productList = document.getElementById("productList");
const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const userButton = document.getElementById("userButton");
const userModal = document.getElementById("userModal");
const closeUserModal = document.getElementById("closeUserModal");
const userForm = document.getElementById("userForm");
const userMessage = document.getElementById("userMessage");

// Mostrar productos (adaptado para recibir una lista filtrada o todos por defecto)
function renderProducts(listaAImprimir = products) {
  productList.innerHTML = "";

  listaAImprimir.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.imagen}" alt="${product.name}" class="product-img-element">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price.toFixed(2)} MXN</div>

        <button class="primary-button" onclick="addToCart(${product.id})">
          Añadir al carrito
        </button>
      </div>
    `;

    productList.appendChild(card);
  });
}

// Añadir producto al carrito
function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}

// Guardar carrito
function saveCart() {
  localStorage.setItem("luminaCart", JSON.stringify(cart));
}

// Mostrar carrito
function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} MXN</p>

        <div class="cart-controls">
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>

      <button
        class="remove-button"
        onclick="removeFromCart(${item.id})">
        Eliminar
      </button>
    `;

    cartItems.appendChild(cartItem);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

// Cambiar cantidad
function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  saveCart();
  renderCart();
}

// Eliminar producto
function removeFromCart(productId) {
  cart = cart.filter(product => product.id !== productId);

  saveCart();
  renderCart();
}

// Abrir carrito
function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.remove("hidden");
}

// Cerrar carrito
function closeCartPanel() {
  cartPanel.classList.remove("open");
  overlay.classList.add("hidden");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
overlay.addEventListener("click", closeCartPanel);

// Modal de registro
userButton.addEventListener("click", () => {
  userModal.classList.remove("hidden");
});

closeUserModal.addEventListener("click", () => {
  userModal.classList.add("hidden");
});

userForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;

  const user = {
    name,
    email
  };

  localStorage.setItem("luminaUser", JSON.stringify(user));
  userMessage.textContent = `¡Gracias por registrarte, ${name}!`;
  userForm.reset();
});

// Finalizar compra
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert(
    "¡Gracias por tu compra! Esta es una demostración. " +
    "Todavía no hay pagos reales conectados."
  );

  cart = [];
  saveCart();
  renderCart();
  closeCartPanel();
});

// Inicializar vistas principales
renderProducts();
renderCart();

// --- SISTEMA DE FILTRADO DE PRODUCTOS ---
document.addEventListener("DOMContentLoaded", () => {
  const botonesFiltro = document.querySelectorAll(".filtro-btn");

  if (botonesFiltro.length > 0) {
    botonesFiltro.forEach(boton => {
      boton.addEventListener("click", (e) => {
        // 1. Quitar la clase 'activo' de todos los botones y ponérsela al clickeado
        botonesFiltro.forEach(b => b.classList.remove("activo"));
        e.target.classList.add("activo");

        // 2. Obtener la categoría seleccionada
        const categoriaSeleccionada = e.target.getAttribute("data-filtro");

        // 3. Filtrar el arreglo usando 'cate'
        let productosFiltrados = products;
        if (categoriaSeleccionada !== "todos") {
          productosFiltrados = products.filter(p => p.cate === categoriaSeleccionada);
        }

        // 4. Volver a renderizar con la lista filtrada
        renderProducts(productosFiltrados);
      });
    });
  }
});