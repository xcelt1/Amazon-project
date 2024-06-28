// const products = [
//     {
//         image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//         rating: {
//             stars: 4.5,
//             count: 87
//         },
//         priceCents: 1090
// },
// {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating:{
//         stars: 4,
//         count: 127,
//     },
//     priceCents: 2095,
// },
// {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating:{
//         stars: 4.5,
//         count: 56,
//     },
//     priceCents: 799,
// },
// ];

import { cart, addToCart } from "../data/cart.js";

import { products } from "../data/products.js";

import { formateCurrency } from "./Utiity/money.js";


let productsHtml = '';

products.forEach((product) => {
    productsHtml = productsHtml + `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10 }.png ">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formateCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button data-product-id = "${product.id}" class="add-to-cart-button button-primary js-add-to-cart-btn">
            Add to Cart
          </button>
    </div>`
});

document.querySelector('.js-product-grid')
.innerHTML = productsHtml;


function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
  })
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity;
}

function displayAddedMessage(productId){
  let addedMessage = document.querySelector(`.js-added-message-${productId}`)
  addedMessage.classList.add('added')

  setTimeout( () => {
    if(addedMessage.classList.contains('added')){
      addedMessage.classList.remove('added')
    }
  }, 2000)
}


document.querySelectorAll('.js-add-to-cart-btn')
.forEach((button) => {
  button.addEventListener('click', () =>{
    let productId = button.dataset.productId;

    let selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let selectedValue = Number(selectElement.value);

    addToCart(productId, selectedValue);
    updateCartQuantity(); 
    displayAddedMessage(productId);
  
  })
});