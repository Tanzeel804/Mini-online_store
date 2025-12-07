// Main JavaScript File for TechStore

document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";

  body.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Add animation
    themeToggle.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeToggle.style.transform = "";
    }, 500);
  });

  // Cart Toggle
  const cartToggle = document.getElementById("cartToggle");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.querySelector(".close-cart");

  function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartFunc() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (cartToggle) cartToggle.addEventListener("click", openCart);
  if (closeCart) closeCart.addEventListener("click", closeCartFunc);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartFunc);

  // Search Toggle
  const searchToggle = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");

  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", () => {
      searchBar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!searchToggle.contains(e.target) && !searchBar.contains(e.target)) {
        searchBar.classList.remove("active");
      }
    });
  }

  // Product Data - Updated with correct image paths
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1299,
      image: "./images/iphone.jpg",
      category: "mobile",
      rating: 4.8,
      badge: "New",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1099,
      image: "./images/samsung.jpg",
      category: "mobile",
      rating: 4.7,
      badge: "Hot",
    },
    {
      id: 3,
      name: "Apple Watch Ultra 2",
      price: 799,
      image: "./images/watch.jpg",
      category: "watch",
      rating: 4.9,
      badge: "New",
    },
    {
      id: 4,
      name: "MacBook Pro M3",
      price: 1999,
      image: "./images/laptop.jpg",
      category: "laptop",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      price: 399,
      image: "./images/headphones.jpg",
      category: "audio",
      rating: 4.6,
      badge: "Sale",
    },
    {
      id: 6,
      name: "iPad Pro M2",
      price: 899,
      image: "./images/tablet.jpg",
      category: "tablet",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Google Pixel 8 Pro",
      price: 999,
      image: "./images/pixel.jpg",
      category: "mobile",
      rating: 4.5,
    },
    {
      id: 8,
      name: "DJI Mini 4 Pro",
      price: 759,
      image: "./images/drone.jpg",
      category: "drone",
      rating: 4.8,
      badge: "New",
    },
  ];

  // Load Products
  function loadProducts() {
    const container = document.getElementById("productsContainer");
    if (!container) return;

    container.innerHTML = "";

    products.slice(0, 8).forEach((product) => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
    });
  }

  // Create Product Card
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "col-md-3";
    card.innerHTML = `
            <div class="product-card" data-aos="fade-up">
                <div class="product-image">
                    <img src="${product.image}" alt="${
      product.name
    }" onerror="this.src='https://via.placeholder.com/300x200?text=TechStore'">
                    ${
                      product.badge
                        ? `<span class="product-badge">${product.badge}</span>`
                        : ""
                    }
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(
                      2
                    )}</div>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <small class="ms-2">(${product.rating})</small>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-sm add-to-cart" data-id="${
                          product.id
                        }">
                            <i class="fas fa-cart-plus me-2"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline-primary btn-sm quick-view" data-id="${
                          product.id
                        }">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

    return card;
  }

  // Generate Stars
  function generateStars(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i === fullStars && hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }

    return stars;
  }

  // Countdown Timer
  function startCountdown() {
    const countdown = document.getElementById("countdown");
    if (!countdown) return;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        countdown.innerHTML = '<div class="text-center">Sale Ended!</div>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.querySelector(".days").textContent = String(days).padStart(
        2,
        "0"
      );
      document.querySelector(".hours").textContent = String(hours).padStart(
        2,
        "0"
      );
      document.querySelector(".minutes").textContent = String(minutes).padStart(
        2,
        "0"
      );
      document.querySelector(".seconds").textContent = String(seconds).padStart(
        2,
        "0"
      );
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  // Add to Cart Event
  document.addEventListener("click", function (e) {
    if (e.target.closest(".add-to-cart")) {
      const button = e.target.closest(".add-to-cart");
      const productId = parseInt(button.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);

      if (product) {
        addToCart(product);
        showNotification(`${product.name} added to cart!`);

        button.innerHTML = '<i class="fas fa-check me-2"></i> Added';
        button.disabled = true;

        setTimeout(() => {
          button.innerHTML =
            '<i class="fas fa-cart-plus me-2"></i> Add to Cart';
          button.disabled = false;
        }, 2000);
      }
    }
  });

  // Show Notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <span>${message}</span>
        `;

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: var(--shadow);
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Add CSS for notification animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Newsletter Form
  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        // Simulate subscription
        this.innerHTML = `
                    <div class="text-center">
                        <i class="fas fa-check-circle fa-2x mb-3"></i>
                        <p class="mb-0">Thank you for subscribing!</p>
                    </div>
                `;

        setTimeout(() => {
          this.innerHTML = `
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email" required>
                            <button class="btn btn-light" type="submit">
                                Subscribe <i class="fas fa-paper-plane ms-2"></i>
                            </button>
                        </div>
                    `;
        }, 3000);
      }
    });
  });

  // Initialize everything
  loadProducts();
  startCountdown();

  console.log("TechStore initialized successfully!");
});

// Global cart functions
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.querySelector(".total-price");

  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  if (cartTotal) {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Update cart items in sidebar
  updateCartItems();
}

function updateCartItems() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Your cart is empty</p>
            </div>
        `;
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className =
      "cart-item d-flex align-items-center mb-3 pb-3 border-bottom";
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${
      item.name
    }" width="60" height="60" class="rounded me-3" onerror="this.src='https://via.placeholder.com/60x60?text=Product'">
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-primary fw-bold">$${item.price.toFixed(
                          2
                        )}</span>
                        <div class="quantity-controls mt-1">
                            <button class="btn btn-sm btn-outline-secondary decrease" data-id="${
                              item.id
                            }">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary increase" data-id="${
                              item.id
                            }">+</button>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-danger remove" data-id="${
                      item.id
                    }">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    cartItems.appendChild(cartItem);
  });
}

// Initialize cart on page load
updateCartDisplay();

// Developer section animations (global functions)
function animateSkill(element) {
  element.style.transform = "scale(1.1)";
  element.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";

  setTimeout(() => {
    element.style.transform = "scale(1)";
    element.style.boxShadow = "";
  }, 500);
}

function animateProject(element) {
  element.style.transform = "translateY(-10px)";
  element.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";

  setTimeout(() => {
    element.style.transform = "translateY(0)";
    element.style.boxShadow = "";
  }, 500);
}
