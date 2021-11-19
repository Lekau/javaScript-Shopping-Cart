/* app.js */
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");

let cart = [];

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
                        <h2><small>$</small>${product.price}</h2>
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
            <div class="item-info">
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
}

function updateNumberOfUnits(id, action){
    const item = cart.find((product) => product.id === id)
    if (action === 'add'){
        item["numberOfUnits"] = (item["numberOfUnits"] ?? 0) + 1;
    } else {
        item["numberOfUnits"] = (item["numberOfUnits"] ?? 0) - 1;
    }
    updateCart();
}

renderProducts()