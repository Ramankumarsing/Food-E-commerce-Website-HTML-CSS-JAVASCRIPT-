function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }
    window.addEventListener('click', (e) => {
        const menu = document.getElementById('nav-menu');
        if (menu && !menu.contains(e.target) && !burger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    displayCart();
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateTotal() {
    const totalElement = document.querySelector(".total span");
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    if (totalElement) {
        totalElement.textContent = `INR ${total.toFixed(2)}`;
    }
}
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        updateTotal();
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                </div>
            </div>
            <div class="item-price">INR ${item.price.toFixed(2)}</div>
            <div class="item-quantity">
                <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            </div>
            <div class="item-total">INR ${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateTotal();
    attachEventListeners();
}
function attachEventListeners() {
    const quantityInputs = document.querySelectorAll(".item-quantity input");
    const removeButtons = document.querySelectorAll(".remove-btn");

    quantityInputs.forEach(input => {
        input.addEventListener("change", (event) => {
            const index = event.target.dataset.index;
            const quantity = parseInt(event.target.value);
            if (quantity < 1) {
                event.target.value = 1;
            }
            updateCartQuantity(index, quantity);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            removeFromCart(index);
        });
    });

    const clearCartBtn = document.getElementById("clear-cart");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart);
    }

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert(`Proceeding to checkout with total: ${document.querySelector(".total span").textContent}`);
        });
    }
}
function updateCartQuantity(index, quantity) {
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    alert("Cart cleared!");
}
function addToCart(name, price, image, description) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, description, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
let cartItems = [];
let totalPrice = 0;

function addToCart(itemName, itemPrice, itemImage, itemDescription) {
    cartItems.push({ name: itemName, price: itemPrice, image: itemImage, description: itemDescription });
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let cartHTML = '';
        totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price;
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <p>INR ${item.price}</p>
                    </div>
                    <button onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            `;
        });
        cartContainer.innerHTML = cartHTML;
        totalPriceElement.innerText = `INR ${totalPrice.toFixed(2)}`;
    }
}

function removeFromCart(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    updateCart();
}
let cart = [];
function addToCart(name, price, image, description) {
    const item = {
        name,
        price,
        image,
        description
    };
    cart.push(item);
    updateCart();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p>Price: INR ${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
        updateTotalPrice();
    }
}
function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total-price").innerText = `INR ${totalPrice}`;
}
document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
});
let cart = [];
function addToCart(name, price, image, description) {
    const item = {
        name,
        price,
        image,
        description
    };
    cart.push(item);
    updateCart();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <p>Price: INR ${item.price}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        updateTotalPrice();
    }
}
function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total-price").innerText = `INR ${totalPrice.toFixed(2)}`;
}
document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
});
