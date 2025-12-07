// Cart Management System
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
    this.updateCartDisplay();
  }

  addItem(product) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCartDisplay();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(productId, newQuantity) {
    const item = this.items.find((item) => item.id === productId);

    if (item) {
      if (newQuantity < 1) {
        this.removeItem(productId);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  updateCartDisplay() {
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartItems = document.getElementById("cartItems");

    // Update cart count
    if (cartCount) {
      cartCount.textContent = this.getItemCount();
    }

    // Update cart total
    if (cartTotal) {
      cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    // Update cart items
    if (cartItems) {
      cartItems.innerHTML = "";

      if (this.items.length === 0) {
        cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="ri-shopping-cart-line"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
        return;
      }

      this.items.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(
                          2
                        )}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${
                              item.id
                            }">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${
                              item.id
                            }">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                `;
        cartItems.appendChild(cartItem);
      });
    }
  }
}

// Initialize Cart
const cart = new Cart();

// Cart Modal Functions
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartOverlay = document.getElementById("cartOverlay");

if (openCartBtn) {
  openCartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCart);
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Event Delegation for Cart Actions
document.addEventListener("click", function (e) {
  // Quantity buttons
  if (e.target.closest(".quantity-btn")) {
    const button = e.target.closest(".quantity-btn");
    const productId = parseInt(button.getAttribute("data-id"));
    const isPlus = button.classList.contains("plus");
    const isMinus = button.classList.contains("minus");

    const item = cart.items.find((item) => item.id === productId);
    if (item) {
      if (isPlus) {
        cart.updateQuantity(productId, item.quantity + 1);
      } else if (isMinus) {
        cart.updateQuantity(productId, item.quantity - 1);
      }
    }
  }

  // Remove item
  if (e.target.closest(".remove-item")) {
    const button = e.target.closest(".remove-item");
    const productId = parseInt(button.getAttribute("data-id"));
    cart.removeItem(productId);
  }

  // Checkout button
  if (e.target.closest(".checkout-btn")) {
    if (cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(`Proceeding to checkout with $${cart.getTotal().toFixed(2)} total`);
    closeCart();
  }
});

// Add to Cart Function (exposed globally)
window.addToCart = function (product) {
  cart.addItem(product);
};

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // ESC to close cart
  if (e.key === "Escape" && cartSidebar.classList.contains("active")) {
    closeCart();
  }
});
