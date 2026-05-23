let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

let cartItems =
    document.getElementById("cart-items");

let subtotal =
    document.getElementById("subtotal");

let total =
    document.getElementById("total");

let cartCount =
    document.getElementById("cart-count");

renderCart();

function renderCart() {

    cartItems.innerHTML = "";

    let totalMoney = 0;

    cartCount.innerText = cart.length;

    cart.forEach((item, index) => {

        totalMoney += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="product-name">
                ${item.name}
            </div>

            <div class="price">
                ${item.price.toLocaleString("vi-VN")}đ
            </div>

            <div class="quantity-box">

                <button onclick="decrease(${index})">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increase(${index})">
                    +
                </button>

            </div>

            <div class="total-price">

                ${(item.price * item.quantity)
                    .toLocaleString("vi-VN")}đ

            </div>

            <div class="delete-btn"
                 onclick="removeItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </div>

        </div>

        `;

    });

    subtotal.innerText =
        totalMoney.toLocaleString("vi-VN") + "đ";

    total.innerText =
        totalMoney.toLocaleString("vi-VN") + "đ";

}

function increase(index) {

    cart[index].quantity++;

    saveCart();

}

function decrease(index) {

    if(cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    saveCart();

}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}

function clearCart() {

    cart = [];

    saveCart();

}

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

}
function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    }
    else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    window.onload = function(){
    updateCartCount();
}
function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    let count = document.getElementById("cart-count");

    if(count){
        count.innerText = total;
    }
}
}