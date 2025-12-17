function addToCart(productName, price) {
    const quantity = 1;

    let cart = JSON.parse(localStorage.getItem('shinboiCart')) || [];

    let existingItemIndex = cart.findIndex(item => item.name == productName);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem('shinboiCart', JSON.stringify(cart));

    console.log(`Successfully added ${quantity} of ${productName} to cart.`);

    window.location.href = "/products/shopping_cart.html";
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('shinboiCart')) || [];

    cart.splice(index, 1);

    localStorage.setItem('shinboiCart', JSON.stringify(cart));

    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('shinboiCart')) || [];
    const cartTableBody = document.getElementById('cart-items');

    cartTableBody.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="4">Your cart is empty. Time to gear up!</td></tr>';
        subtotal = 0;
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const row = cartTableBody.insertRow();

            row.insertCell(0).innerHTML = item.name;

            row.insertCell(1).innerHTML = `$${item.price.toFixed(2)}`;

            row.insertCell(2).innerHTML = `<input type="number" value="${item.quantity}" min="1"
                                            onchange="updateQuantity(${index}, this.value)" style="width: 50px;">`;

            row.insertCell(3).innerHTML = `$${itemTotal.toFixed(2)}`;

            row.insertCell(4).innerHTML = `<button onclick="removeItem(${index})" class="remove-button">Remove</button>`;
        });
    }

    const NINJA_TAX_RATE = 0.05;
    const tax = subtotal * NINJA_TAX_RATE;
    const grandTotal = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `$${grandTotal.toFixed(2)}`;
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('shinboiCart')) || [];
    const quantity = parseInt(newQuantity);

    if (quantity > 0) {
        cart[index].quantity = quantity;
    } else if (quantity === 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('shinboiCart', JSON.stringify(cart));
    displayCart();
}

window.onload = displayCart;