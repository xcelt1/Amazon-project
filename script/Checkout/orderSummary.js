import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProductId } from "../../data/products.js";
import { formateCurrency } from "../Utiity/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import  dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index"
import { deliveryOption, getDeliveryOption } from "../../data/deliveryOptioins.js";
import { renderPaymentSummary } from "./paymentSummary.js";




export function renderOrderSummary () {
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProductId(productId);

    //getting Id out of the cart
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOptions = getDeliveryOption(deliveryOptionId);


    const today = dayjs();
    const deliveryDate = today.add(deliveryOptions.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMM D");
    
    
    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formateCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
            Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" 
            data-product-id = "${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options js-delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${deliveryOptionsHtml(matchingProduct, cartItem)}
        </div>
        </div>
        </div>

    `;
});
document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

function deliveryOptionsHtml(matchingProduct, cartItem){
    let html = '';
    deliveryOption.forEach((deliveryOptions) =>{
       const today = dayjs();
       const deliveryDate = today.add(deliveryOptions.deliveryDays, "days");
       let dateString =  deliveryDate.format("dddd, MMM D");
       const priceStrings = deliveryOptions.PriceCents === 0 ? 
       "free - " : `$${formateCurrency(deliveryOptions.PriceCents)} -`;
       
        const isChecked = deliveryOptions.id === cartItem.deliveryOptionId;

       html +=
        `
        <div class="delivery-option js-delivery-Option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOptions.id}">
            <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceStrings} Shipping
            </div>
            </div>
        </div>
        `
    })
    return html
}

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderPaymentSummary();


        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();

        
    })
    
});

function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem) =>{
      cartQuantity += cartItem.quantity;
    })
    document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} Items`;
  };

  updateCartQuantity();

  document.querySelectorAll('.js-delivery-Option')
  .forEach((element) => {
    const {productId, deliveryOptionId} = element.dataset;
    element.addEventListener('click', () => {
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    })
  })
}


 


  




  
