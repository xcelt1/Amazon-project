export const deliveryOption = [{
    id : "1",
    deliveryDays: 7,
    PriceCents: 0,
},
{
id: "2",
deliveryDays: 3,
PriceCents: 499
},
{
    id: "3",
    deliveryDays: 1,
    PriceCents: 999
}
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOptions;

    deliveryOption.forEach((option) => {
        if (option.id === deliveryOptionId){
            deliveryOptions = option;
        }
    });
    return deliveryOptions || deliveryOption[0]
}