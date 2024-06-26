export const cart =[];

export function addToCart(productId, selectedValue) {
    let matchingItem;
  
      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });
  
  
      if(matchingItem){
        matchingItem.Quantity += selectedValue;
      }
      else{
        cart.push({
          productId: productId,
          quantity: selectedValue,
        })
      };
  }