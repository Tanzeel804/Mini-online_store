// Cart Management System
class CartSystem {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    this.updateCartDisplay();
    this.setupEventListeners();
  }

  addItem(product) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCartDisplay();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
    this.showNotification("Item removed from cart!");
  }

  updateQuantity(productId, change) {
    const item = this.cart.find((item) => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity < 1) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  getTotal() {
    return this.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  updateCartDisplay() {
    // Update cart count
    const cartCounts = document.querySelectorAll(".cart-count");
    cartCounts.forEach((count) => {
      count.textContent = this.getItemCount();
    });

    // Update cart total
    const cartTotals = document.querySelectorAll(".total-price");
    cartTotals.forEach((total) => {
      total.textContent = `$${this.getTotal().toFixed(2)}`;
    });

    // Update cart items in sidebar
    this.updateCartItems();
  }

  updateCartItems() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (this.cart.length === 0) {
      cartItems.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                    <a href="index.html#products" class="btn btn-primary mt-3">Continue Shopping</a>
                </div>
            `;
      return;
    }

    this.cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <img src="${item.image}" alt="${
        item.name
      }" width="70" height="70" 
                         class="rounded me-3" onerror="this.src='https://via.placeholder.com/70x70?text=Product'">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-primary fw-bold">$${item.price.toFixed(
                                  2
                                )}</span>
                                <div class="quantity-controls d-flex align-items-center mt-2">
                                    <button class="btn btn-sm btn-outline-secondary decrease" 
                                            data-id="${item.id}">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary increase" 
                                            data-id="${item.id}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <span class="fw-bold me-3">$${(
                                  item.price * item.quantity
                                ).toFixed(2)}</span>
                                <button class="btn btn-sm btn-danger remove" data-id="${
                                  item.id
                                }">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      cartItems.appendChild(cartItem);
    });
  }

  setupEventListeners() {
    // Event delegation for cart actions
    document.addEventListener("click", (e) => {
      // Decrease quantity
      if (e.target.closest(".decrease")) {
        const productId = parseInt(
          e.target.closest(".decrease").getAttribute("data-id")
        );
        this.updateQuantity(productId, -1);
      }

      // Increase quantity
      if (e.target.closest(".increase")) {
        const productId = parseInt(
          e.target.closest(".increase").getAttribute("data-id")
        );
        this.updateQuantity(productId, 1);
      }

      // Remove item
      if (e.target.closest(".remove")) {
        const productId = parseInt(
          e.target.closest(".remove").getAttribute("data-id")
        );
        this.removeItem(productId);
      }

      // Checkout button
      if (e.target.closest(".checkout-btn")) {
        if (this.cart.length === 0) {
          this.showNotification("Your cart is empty!", "error");
          return;
        }

        this.showNotification("Proceeding to checkout...", "success");
        // In a real app, you would redirect to checkout page
        // window.location.href = 'checkout.html';
      }
    });
  }

  showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(".cart-notification");
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement("div");
    notification.className = `cart-notification alert alert-${
      type === "error" ? "danger" : "success"
    }`;
    notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${
                  type === "error" ? "exclamation-circle" : "check-circle"
                } me-2"></i>
                <span>${message}</span>
            </div>
        `;

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartDisplay();
  }
}

// Initialize cart system
const cartSystem = new CartSystem();

// Make addToCart function globally available
window.addToCart = function (product) {
  cartSystem.addItem(product);
};

// Make clearCart function globally available
window.clearCart = function () {
  cartSystem.clearCart();
};
