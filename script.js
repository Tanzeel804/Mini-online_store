// Main JavaScript File for TechStore - Updated with Enhanced Theme Handling

document.addEventListener("DOMContentLoaded", function () {
  // Enhanced Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem("techstore-theme") || "light";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme - prioritize saved theme, then system preference
  const initialTheme =
    savedTheme !== "light" && savedTheme !== "dark"
      ? prefersDark
        ? "dark"
        : "light"
      : savedTheme;

  body.setAttribute("data-theme", initialTheme);
  updateThemeIcon(initialTheme);

  // Theme toggle event
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Apply new theme
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("techstore-theme", newTheme);
    updateThemeIcon(newTheme);

    // Add smooth transition effect
    themeToggle.style.transform = "rotate(360deg) scale(1.1)";
    setTimeout(() => {
      themeToggle.style.transform = "";
    }, 500);

    // Show theme change notification
    showNotification(
      `Switched to ${newTheme === "dark" ? "Dark" : "Light"} mode`
    );
  });

  // Update theme icon based on current theme
  function updateThemeIcon(theme) {
    if (theme === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      themeToggle.setAttribute("aria-label", "Switch to light theme");
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
      themeToggle.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only auto-switch if user hasn't explicitly set a preference
      if (!localStorage.getItem("techstore-theme")) {
        const newTheme = e.matches ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        updateThemeIcon(newTheme);
      }
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
  const searchInput = searchBar
    ? searchBar.querySelector('input[type="search"]')
    : null;

  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      searchBar.classList.toggle("active");
      if (searchBar.classList.contains("active") && searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchToggle.contains(e.target) && !searchBar.contains(e.target)) {
        searchBar.classList.remove("active");
      }
    });

    // Close search on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchBar.classList.contains("active")) {
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
      description: "The ultimate iPhone with titanium design and A17 Pro chip",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1099,
      image: "./images/samsung.jpg",
      category: "mobile",
      rating: 4.7,
      badge: "Hot",
      description: "Advanced AI-powered smartphone with premium camera",
    },
    {
      id: 3,
      name: "Apple Watch Ultra 2",
      price: 799,
      image: "./images/watch.jpg",
      category: "watch",
      rating: 4.9,
      badge: "New",
      description: "Rugged outdoor smartwatch with advanced health features",
    },
    {
      id: 4,
      name: "MacBook Pro M3",
      price: 1999,
      originalPrice: 2199,
      image: "./images/laptop.jpg",
      category: "laptop",
      rating: 4.8,
      description:
        "Professional laptop with M3 chip and Liquid Retina XDR display",
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      price: 399,
      originalPrice: 449,
      image: "./images/headphones.jpg",
      category: "audio",
      rating: 4.6,
      badge: "Sale",
      description: "Industry-leading noise cancellation headphones",
    },
    {
      id: 6,
      name: "iPad Pro M2",
      price: 899,
      image: "./images/tablet.jpg",
      category: "tablet",
      rating: 4.7,
      description: "Powerful tablet with M2 chip and ProMotion display",
    },
    {
      id: 7,
      name: "Google Pixel 8 Pro",
      price: 999,
      image: "./images/pixel.jpg",
      category: "mobile",
      rating: 4.5,
      description: "Google's flagship with Tensor G3 and AI features",
    },
    {
      id: 8,
      name: "DJI Mini 4 Pro",
      price: 759,
      image: "./images/drone.jpg",
      category: "drone",
      rating: 4.8,
      badge: "New",
      description: "Ultra-light drone with advanced obstacle sensing",
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
    card.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
    card.innerHTML = `
      <div class="product-card h-100" data-aos="fade-up">
        <div class="product-image position-relative">
          <img src="${product.image}" alt="${product.name}" 
               onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop&crop=center'"
               class="w-100">
          ${
            product.badge
              ? `<span class="product-badge">${product.badge}</span>`
              : ""
          }
        </div>
        <div class="product-content d-flex flex-column">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">
            ${
              product.originalPrice
                ? `<s>$${product.originalPrice.toFixed(2)}</s> `
                : ""
            }
            $${product.price.toFixed(2)}
          </div>
          <div class="product-rating mb-3">
            ${generateStars(product.rating)}
            <small class="ms-2">${product.rating.toFixed(1)}</small>
          </div>
          <p class="text-muted small mb-3 flex-grow-1">${
            product.description
          }</p>
          <div class="product-actions mt-auto">
            <button class="btn btn-primary btn-sm add-to-cart w-75" data-id="${
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
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const hasMoreHalf = rating % 1 > 0.7;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i === fullStars && hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else if (i === fullStars && hasMoreHalf) {
        stars += '<i class="fas fa-star"></i>';
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
        countdown.innerHTML =
          '<div class="text-center fs-4 fw-bold">Sale Ended!</div>';
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
        showNotification(`${product.name} added to cart!`, "success");

        // Button feedback
        button.innerHTML = '<i class="fas fa-check me-2"></i> Added';
        button.classList.remove("btn-primary");
        button.classList.add("btn-success");
        button.disabled = true;

        setTimeout(() => {
          button.innerHTML =
            '<i class="fas fa-cart-plus me-2"></i> Add to Cart';
          button.classList.remove("btn-success");
          button.classList.add("btn-primary");
          button.disabled = false;
        }, 2000);
      }
    }
  });

  // Show Notification
  function showNotification(message, type = "success") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(
      ".custom-notification"
    );
    existingNotifications.forEach((notification) => {
      notification.remove();
    });

    const notification = document.createElement("div");
    notification.className = `custom-notification notification-${type}`;

    const icon =
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
    const bgColor = type === "success" ? "var(--success)" : "var(--danger)";

    notification.innerHTML = `
      <i class="fas ${icon} me-2"></i>
      <span>${message}</span>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 15px 20px;
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      box-shadow: var(--shadow-hover);
      max-width: 350px;
      font-weight: 500;
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
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
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
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "#!") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
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
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      const submitBtn = this.querySelector('button[type="submit"]');

      if (email && validateEmail(email)) {
        // Show loading state
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin me-2"></i> Subscribing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          this.innerHTML = `
            <div class="text-center text-white">
              <i class="fas fa-check-circle fa-3x mb-3"></i>
              <h5 class="mb-2">Subscribed Successfully!</h5>
              <p class="mb-0">You'll receive our newsletter soon.</p>
            </div>
          `;

          // Reset form after 5 seconds
          setTimeout(() => {
            this.innerHTML = `
              <div class="input-group">
                <input type="email" class="form-control" placeholder="Enter your email" required>
                <button class="btn btn-light" type="submit">
                  Subscribe <i class="fas fa-paper-plane ms-2"></i>
                </button>
              </div>
            `;
          }, 5000);
        }, 1500);
      } else {
        emailInput.style.borderColor = "var(--danger)";
        showNotification("Please enter a valid email address", "error");
        setTimeout(() => {
          emailInput.style.borderColor = "";
        }, 2000);
      }
    });
  });

  // Email validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Initialize everything
  loadProducts();
  startCountdown();
  updateCartDisplay(); // Initialize cart display

  console.log("TechStore initialized successfully!");
});

// Global cart functions
let cart = JSON.parse(localStorage.getItem("techstore-cart")) || [];

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

  localStorage.setItem("techstore-cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.querySelector(".total-price");

  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
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
        <a href="#products" class="btn btn-primary mt-3">Browse Products</a>
      </div>
    `;
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className =
      "cart-item d-flex align-items-center mb-3 pb-3 border-bottom";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="60" height="60" 
           class="rounded me-3 object-fit-cover" 
           onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=60&h=60&fit=crop&crop=center'">
      <div class="flex-grow-1">
        <h6 class="mb-1 fw-bold">${item.name}</h6>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="text-primary fw-bold">$${item.price.toFixed(2)}</span>
            <div class="quantity-controls d-flex align-items-center mt-2">
              <button class="btn btn-sm btn-outline-secondary decrease px-2 py-1" data-id="${
                item.id
              }">
                <i class="fas fa-minus"></i>
              </button>
              <span class="mx-2 fw-bold">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary increase px-2 py-1" data-id="${
                item.id
              }">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <button class="btn btn-sm btn-danger remove" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  // Add event listeners for cart item buttons
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      updateCartItemQuantity(productId, -1);
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      updateCartItemQuantity(productId, 1);
    });
  });

  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

function updateCartItemQuantity(productId, change) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("techstore-cart", JSON.stringify(cart));
    updateCartDisplay();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("techstore-cart", JSON.stringify(cart));
  updateCartDisplay();
  showNotification("Item removed from cart", "error");
}

// Initialize cart on page load
updateCartDisplay();

// Add event listener for checkout button
document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        showNotification(
          "Your cart is empty. Add some products first!",
          "error"
        );
      } else {
        showNotification("Proceeding to checkout...", "success");
        // In a real app, you would redirect to checkout page
        setTimeout(() => {
          alert(
            `Checkout - Total: $${cart
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(
                2
              )}\n\nThis is a demo. In a real app, you would be redirected to payment.`
          );
        }, 500);
      }
    });
  }
});

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
