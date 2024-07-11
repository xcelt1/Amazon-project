import { cart } from "../../data/cart.js"
import { getProductId } from "../../data/products.js"
import { deliveryOption, getDeliveryOption } from "../../data/deliveryOptioins.js";
import { formateCurrency } from "../Utiity/money.js";


export function renderPaymentSummary () {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
  cart.forEach((cartItem) =>{
    let product = getProductId(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.PriceCents;

    let totalBeforeTaxCents = productPriceCents + shippingPriceCents;

    let taxCents = totalBeforeTaxCents * 0.1;

    let totalCents = totalBeforeTaxCents + taxCents;
    
    let paymentSummaryHtml = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class ="js-items"></div>
            <div class="payment-summary-money">$${formateCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formateCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formateCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formateCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formateCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
  `
    document.querySelector(".js-payment-summary")
    .innerHTML = paymentSummaryHtml;
  })

  updateCartQuantity()
}

function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
  })
  document.querySelector('.js-items')
  .innerHTML = `Items(${cartQuantity})`;
};