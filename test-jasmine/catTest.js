import { addToCart, cart, loadFromStorage } from "../data/cart.js";
describe("Look at the addToCart Function", () => {
    it("Adding an existing product to the cart", () => {
        spyOn(localStorage, "setItem")
        
        spyOn(localStorage, "getItem").and.callFake(() =>{
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "1"
                }
            ]);
        });
        
        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
   })
    it("Adding a new product to the cart", () => {
        //spyOn() takes two argument 
        // Object will want to mock, the method of the object
        spyOn(localStorage, "setItem")
        spyOn(localStorage, "getItem").and.callFake(() =>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual()
    })
})