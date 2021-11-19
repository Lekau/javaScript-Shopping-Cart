/* app.js */
const productsEl = document.querySelector(".products");


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
function addToCart(id){
    if (cart.some((item) => item.id === id)) {
        const item = cart.find((product) => product.id === id)
        item["numberOfUnits"] = (item["numberOfUnits"] ?? 0) + 1;
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
    console.log(cart);
}

renderProducts()