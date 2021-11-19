/* app.js */
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function renderProducts(){
    products.forEach((product) => {
        productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}"t-shirt 1">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>R</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onClick = addToCart(${product.id})>
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `
    });
}

function renderCart(){
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onClick="updateNumberOfUnits(${item.id}, 'minus')">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onClick="updateNumberOfUnits(${item.id}, 'add')">+</div>           
            </div>
        </div>
        `
    })
}

function renderSubtotal(){
    let totalItems = 0, totalPrice = 0;

    cart.forEach((item) => {
        totalItems += item.numberOfUnits;
        totalPrice += item.price * item.numberOfUnits;
    })

    subtotalEl.innerHTML = `Subtotal (${totalItems} items): R ${totalPrice.toFixed(2)}`;
}

function addToCart(id){
    if (cart.some((item) => item.id === id)) {
        updateNumberOfUnits(id, 'add');
    }else {
        const item = products.find((product) => product.id === id)
        cart.push({
            ...item, 
            numberOfUnits: 1,
        })
    }
    updateCart();
}

function updateCart(){
    renderCart();
    renderSubtotal();
    localStorage.setItem("CART", JSON.stringify(cart))
}

function updateNumberOfUnits(id, action){
    const item = cart.find((product) => product.id === id)
    if (action === 'add' && item.numberOfUnits < item.instock){
        item.numberOfUnits = (item.numberOfUnits ?? 0) + 1;
    } else if (action === 'minus' && item.numberOfUnits > 1){
        item.numberOfUnits = (item.numberOfUnits ?? 0) - 1;
    }
    updateCart();
}

function removeItemFromCart(id){
   cart = cart.filter((item) => item.id !== id);
   updateCart();
}

renderProducts()