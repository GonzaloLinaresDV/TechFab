let total = 0;
const totalText = document.getElementById('totalAmount');
const productList = document.getElementById('Cartlist');
const productNames = new Set();
const productCount = {};

let cart={
    total:0,
    products:{}
};


function Constructor(price, product) {
    this.price = price; 
    this.product = product;
}



document.querySelectorAll('.addButton').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        const name = this.getAttribute('data-name');
        if (!isNaN(price) && name) {
            addToCart(price);
            addToCartList(name);
        } else {
            console.error("NO SE PROPORCIONÓ UN PRECIO VÁLIDO");
        }
    });
});

// Function add amount to total and Json Call
function addToCart(amount) {
    if (amount != null) {
        total += amount;
        cart.total = total;
        console.log(total);
    } else {
        console.log("NO PUSISTE PRECIO AMIGO");
    }
    updateText();
    saveCartToJson();
}



// Function to update the displayed total
function updateText() {
    totalText.textContent = "TOTAL A PAGAR: $" + total.toFixed(2);
}

// Function to add product to the cart list
function addToCartList(name) {
    if (!productCount[name]) {
        productCount[name] = 1;
        const listItem = document.createElement('li');
        listItem.setAttribute('data-name', name);
        listItem.textContent = `${name} x ${productCount[name]}`;
        productList.appendChild(listItem);
    } else {
        productCount[name]++;
        const existingItem = document.querySelector(`li[data-name="${name}"]`);
        if (existingItem) {
            existingItem.textContent = `${name} x ${productCount[name]}`;
        }
    }
    console.log(productCount);
    saveCartToJson();
}

//Function to save in JSon
function saveCartToJson(){
    const cartJson=JSON.stringify(cart);
    console.log("Carrito guardado" , cartJson);
    localStorage.setItem('cart',cartJson);
}

//Clear Cart on JSon
function loadCartFromJson() {
    const cartJson = localStorage.getItem('cart');
    if (cartJson) {
        cart = JSON.parse(cartJson);
        total = cart.total;
        updateText();

        for (const [name, quantity] of Object.entries(cart.products)) {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-name', name);
            listItem.textContent = `${name} x ${quantity}`;
            productList.appendChild(listItem);
        }
    }
}
document.addEventListener('DOMContentLoaded', function(){
    loadCartFromJson();
});
// Clear the cart list and reset total
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function() {
    productList.innerHTML = '';
    total = 0;
    
    cart={total:0,products:{}};
    updateText();
    localStorage.removeItem('cart');
    console.log("Cart cleared and reset.");
});
