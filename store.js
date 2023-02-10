//Currency formatter
let pounds = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

//Select elements
const productContainer = document.getElementById("product-cards");
const cartContainer = document.getElementById("cart-cards");
const subTotal = document.querySelector(".total h3");

//Render Products
function renderProducts(){
    stock.forEach((item) => {
        console.log(item.sku)
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${item.product_image}">
                <h4> ${item.product_name}</h4>
                <h4> ${pounds.format(item.price)}</h4>
                <button class="addButton" onClick="addToCart(${item.sku})">Add me</button>
            </div>
        `
    })
}

renderProducts()

//Add to Cart
let cart = []

function addToCart(sku){
    if (cart.some((item) => item.sku === sku)) {
        changeNumberOfUnits("plus", sku)
    } else {
        const item = stock.find((product) => product.sku === sku)
        cart.push({
            ...item,
            numberInCart: 1,
        })
    }
    updateCart()
}

function updateCart() {
    renderCartItems()
    renderSubtotal()
}

//render items you've added to cart
function renderCartItems() {
    cartContainer.innerHTML = ""
    cart.forEach((product) => {
    cartContainer.innerHTML += `
        <div class="cart-item">
            <div class="cart-card-left">
            <img src="${product.product_image}">
            </div>
            <div class="cart-card-right">
                <div class="product-info">
                    <h4> ${product.product_name}</h4>
                    <h4> ${pounds.format(product.price)}</h4>
                </div>
                <div class="units">
                    <button class="icrement-btn" onclick="changeNumberOfUnits('minus', ${product.sku})">-</button>
                    <div class="number">${product.numberInCart}</div>
                    <button class="icrement-btn" onclick="changeNumberOfUnits('plus', ${product.sku})">+</button>           
                </div>
            </div>
        </div>
    `
   })
}

//Increment number of items
function changeNumberOfUnits(action, sku) {
    cart = cart.map((item) => {
        let numberInCart = item.numberInCart
        if(item.sku === sku){
            if(action === "minus" && numberInCart > 1){
                numberInCart--
            } else if (action === "plus"){
                numberInCart++
            }
        }
        return {
            ...item,
            numberInCart,
        }
    })
    updateCart()
}

//Calculate and show total
function renderSubtotal() {
    let totalPrice = 0
    cart.forEach((item) => {
        totalPrice += item.price * item.numberInCart

        //DISCOUNT A
        discountA = 0.20
        let discountMultipleA
        let discountTotalA
        if (item.sku === 0 ){
            const byThree = item.numberInCart / 3
            const sum = (byThree - Math.floor(byThree)) !== 0
            if (!sum){
                discountMultipleA = item.numberInCart
                discountTotalA = discountMultipleA / 3
                discountA = discountA * discountTotalA
                totalPrice -= discountA
            }
        } 

        //DISCOUNT B
        discountB = 0.15
        let discountMultipleB
        let discountTotalB
        if (item.sku === 1 ){
            const byTwo = item.numberInCart / 2
            const sum = (byTwo - Math.floor(byTwo)) !== 0
            if (!sum){
                discountMultipleB = item.numberInCart
                discountTotalB = discountMultipleB / 2
                discountB = discountB * discountTotalB
                totalPrice -= discountB
            }
        } 
    })
    subTotal.innerHTML = `£${totalPrice.toFixed(2)}`
}

//Promotional offers functions

//Offer A is the function giveing item A (sku 0) at 3 units for 1.30
function offerA(n){
    var result = (n - Math.floor(n)) !== 0; 
    console.log(result)
    if (!result){
        console.log(result)
    }
    console.log(result)
}
