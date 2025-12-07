document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme =
        body.getAttribute("data-theme") === "light" ? "dark" : "light";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // CART
  const cartToggle = document.getElementById("cartToggle");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.querySelector(".close-cart");

  function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    body.style.overflow = "hidden";
  }
  function closeCartFunc() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    body.style.overflow = "";
  }
  if (cartToggle) cartToggle.addEventListener("click", openCart);
  if (closeCart) closeCart.addEventListener("click", closeCartFunc);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartFunc);

  // PRODUCTS
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1299,
      image: "./images/iphone.jpg",
      rating: 4.8,
      badge: "New",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1099,
      image: "./images/samsung.jpg",
      rating: 4.7,
      badge: "Hot",
    },
    {
      id: 3,
      name: "Apple Watch Ultra 2",
      price: 799,
      image: "./images/watch.jpg",
      rating: 4.9,
      badge: "New",
    },
    {
      id: 4,
      name: "MacBook Pro M3",
      price: 1999,
      image: "./images/laptop.jpg",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      price: 399,
      image: "./images/headphones.jpg",
      rating: 4.6,
      badge: "Sale",
    },
    {
      id: 6,
      name: "iPad Pro M2",
      price: 899,
      image: "./images/tablet.jpg",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Google Pixel 8 Pro",
      price: 999,
      image: "./images/pixel.jpg",
      rating: 4.5,
    },
    {
      id: 8,
      name: "DJI Mini 4 Pro",
      price: 759,
      image: "./images/drone.jpg",
      rating: 4.8,
      badge: "New",
    },
  ];

  function generateStars(rating) {
    let stars = "";
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) stars += '<i class="fas fa-star"></i>';
      else if (i === full && half)
        stars += '<i class="fas fa-star-half-alt"></i>';
      else stars += '<i class="far fa-star"></i>';
    }
    return stars;
  }

  function loadProducts() {
    const container = document.getElementById("productsContainer");
    if (!container) return;
    container.innerHTML = "";
    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "col-md-3";
      card.innerHTML = `<div class="product-card">
        <div class="product-image">
          <img src="${p.image}" alt="${
        p.name
      }" onerror="this.src='https://via.placeholder.com/300x200?text=TechStore'">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        </div>
        <div class="product-content">
          <h3 class="product-title">${p.name}</h3>
          <div class="product-price">$${p.price.toFixed(2)}</div>
          <div class="product-rating">${generateStars(p.rating)} <small>(${
        p.rating
      })</small></div>
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-id="${
              p.id
            }">Add to Cart</button>
          </div>
        </div>
      </div>`;
      container.appendChild(card);
    });
  }

  // CART LOGIC
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  function addToCart(product) {
    const exist = cart.find((i) => i.id === product.id);
    if (exist) exist.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartCount = document.querySelector(".cart-count");
    const cartTotal = document.querySelector(".total-price");
    if (cartCount)
      cartCount.textContent = cart.reduce((a, i) => a + i.quantity, 0);
    if (cartTotal)
      cartTotal.textContent = `$${cart
        .reduce((a, i) => a + i.price * i.quantity, 0)
        .toFixed(2)}`;
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;
    cartItems.innerHTML = "";
    if (cart.length === 0) {
      cartItems.innerHTML = `<div class="text-center py-5">
      <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
      <p class="text-muted">Your cart is empty</p></div>`;
      return;
    }
    cart.forEach((item) => {
      const div = document.createElement("div");
      div.className =
        "cart-item d-flex align-items-center mb-3 pb-3 border-bottom";
      div.innerHTML = `<img src="${
        item.image
      }" width="60" height="60" class="rounded me-3">
      <div class="flex-grow-1">
        <h6 class="mb-1">${item.name}</h6>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="text-primary fw-bold">$${item.price.toFixed(2)}</span>
            <div class="quantity-controls mt-1">
              <button class="decrease btn btn-sm btn-outline-secondary" data-id="${
                item.id
              }">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="increase btn btn-sm btn-outline-secondary" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
          <button class="remove btn btn-sm btn-danger" data-id="${
            item.id
          }"><i class="fas fa-trash"></i></button>
        </div>
      </div>`;
      cartItems.appendChild(div);
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest(".add-to-cart")) {
      const id = parseInt(
        e.target.closest(".add-to-cart").getAttribute("data-id")
      );
      const p = products.find((x) => x.id === id);
      addToCart(p);
    }
    if (e.target.closest(".increase")) {
      const id = parseInt(
        e.target.closest(".increase").getAttribute("data-id")
      );
      cart.find((x) => x.id === id).quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
    if (e.target.closest(".decrease")) {
      const id = parseInt(
        e.target.closest(".decrease").getAttribute("data-id")
      );
      const item = cart.find((x) => x.id === id);
      if (item.quantity > 1) item.quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
    if (e.target.closest(".remove")) {
      const id = parseInt(e.target.closest(".remove").getAttribute("data-id"));
      cart = cart.filter((x) => x.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  });

  loadProducts();
  updateCartDisplay();
});
