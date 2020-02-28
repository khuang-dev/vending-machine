//vending machine
class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.products = inventory.products;
    this.coins = inventory.coins;
    // console.log(this.products);
  }
  getInventory() {
    return this.inventory;
  }
  itemSelection(selection) {
    const itemSelected = this.products.find(
      product => product.id === selection
    );
    // console.log(itemSelected);
    return itemSelected || "invalid selection";
  }
  inventoryCheck(selection) {
    const itemSelected = this.itemSelection(selection);
    if (typeof itemSelected == "string") {
      return itemSelected;
    }
    if (itemSelected.currentQuantity === 0) {
      throw new Error("Out of stock");
    }
    if (0 < itemSelected.currentQuantity < 3) {
      throw new Error("Stock is low, please refill");
    }
  }

  validateCoin() {
    let nickel = null;
    let dime = null;
    let quarter = null;
    let loonie = null;
    let toonie = null;
  }
}

module.exports = VendingMachine;
