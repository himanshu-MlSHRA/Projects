document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "product1", price: 59.99 },
        { id: 2, name: "product2", price: 69.99 },
        { id: 3, name: "product3", price: 79.99 }
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartsTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    // Show products
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add To Cart</button>
        `;
        productList.append(productDiv);
    });

    // Add to cart
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartsTotalMessage.classList.remove("hidden");

            cart.forEach(item => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = totalPrice.toFixed(2);
        } else {
            emptyCartMessage.classList.remove("hidden");
            cartsTotalMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$  0.00`;
        }
    }

    checkoutButton.addEventListener("click", () => {
        alert("Checkout in process.....");
        cart.length = 0; 
        renderCart();
    });

    
    
});


// Assignments : add a remove button which is functionable and add localStorage;