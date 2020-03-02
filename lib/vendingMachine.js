//vending machine
class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.products = inventory.products;
    this.coins = inventory.coins;
  }
  getInventory() {
    return this.inventory;
  }
  itemSelection(selection) {
    const itemSelected = this.products.find(
      product => product.id === selection
    );
    return itemSelected || "invalid selection";
  }
  productInventoryCheck(selection) {
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
  restockProduct(selection, currentQuantityCount) {
    const selectedItem = this.itemSelection(selection);
    let currentQuantity = selectedItem.currentQuantity;
    const maxQuantity = selectedItem.maxQuantity;
    if (currentQuantityCount >= maxQuantity) {
      throw new Error("Inventory maxed out");
    } else {
      currentQuantity += 1;
    }
    return currentQuantity;
  }
  coinInventoryCheck(coinType) {
    const coinCount = this.coins.find(coin => coin.id === coinType);
    if (coinCount.currentQuantity === 0) {
      return false;
    }
    if (coinCount.currentQuantity > 0) {
      return true;
    }
    return coinCount;
  }
  restockCoins(coinType) {
    const coin = this.coins.find(coin => coin.id === coinType);
    let currentCoinCount = coin.currentQuantity;
    return (currentCoinCount += 1);
  }
  coinInputAmount(coin) {
    const coinSet = [0.05, 0.1, 0.25, 1.0, 2.0];
    return coin.reduce((sum, q, i) => {
      return sum + q * coinSet[i];
    }, 0); //if no 0, initial value will be first in array(5)
  }
  validatePurchase(selection, coin) {
    const itemSelected = this.itemSelection(selection);
    const creditAmount = this.coinInputAmount(coin);
    if (itemSelected.price > creditAmount) {
      throw new Error("insufficient funds");
    }
    if (itemSelected.price <= creditAmount) {
      const change = creditAmount - itemSelected.price;
      return change;
    }
  }
  dispenseChange(change) {
    let remainingChange = change;
    const changeToGive = {
      nickel: 0,
      dime: 0,
      quarter: 0,
      loonie: 0,
      toonie: 0
    };
    while (remainingChange >= 2) {
      remainingChange -= 2;
      changeToGive["toonie"] += 1;
    }
    while (remainingChange >= 1) {
      remainingChange -= 1;
      changeToGive["loonie"] += 1;
    }
    while (remainingChange >= 0.25) {
      remainingChange -= 0.25;
      changeToGive["quarter"] += 1;
    }
    while (remainingChange >= 0.1) {
      remainingChange -= 0.1;
      changeToGive["dime"] += 1;
    }
    while (remainingChange >= 0.05) {
      remainingChange -= 0.05;
      changeToGive["nickel"] += 1;
    }
    return changeToGive;
  }
  updateInsertedCoins(credit) {
    const updatedCoins = this.coins.map(
      (coin, i) => (coin.currentQuantity += credit[i])
    );
    return updatedCoins;
  }
  updateDispensedCoins(change) {
    const changeCount = Object.values(change);
    const updatedCoins = this.coins.map(
      (coin, i) => (coin.currentQuantity -= changeCount[i])
    );
    return updatedCoins;
  }
  dispenseProduct(selection) {
    const selectedItem = this.itemSelection(selection);
    const updatedQuantity = (selectedItem.currentQuantity -= 1);
    return updatedQuantity;
  }
}

module.exports = VendingMachine;
