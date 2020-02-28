//vending machine
class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    console.log(this.inventory.products[0].currentQuantity);
  }
  getInventory() {
    return this.inventory;
  }
  getProducts() {
    return this.inventory.products;
  }
  getCoins() {
    return this.inventory.coins;
  }
}

emptyInventory = () => {
  if (inventory.products[0].currentQuantity === 0) {
    return 0;
  }

  //   //change balance - if payment is greater than cost
  //   if (payment > cost) {
  //     const change = payment - cost;
  //     return change;
  //   }
  //   return error("please try again");
};

// //inventory
// function inventory(unit) {
//   let inventoryA = 10;
//   let inventoryB = 10;
//   let inventoryC = 10;
//   //full inventory
//   if (unit === 10) {
//     return true;
//   }
//   //low inventory
//   if (1 < unit < 3) {
//     return false;
//   }
//   //empty inventory
//   if (unit === 0) {
//     throw new Error();
//   }
//   return error("please try again");
// }
module.exports = VendingMachine;
