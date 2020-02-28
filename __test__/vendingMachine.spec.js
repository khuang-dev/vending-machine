const VendingMachine = require("../lib/vendingMachine.js/");
const inventory = require("../mockData.json");

//vending machine
describe("vendingMachine", () => {
  let vendingMachine;
  beforeEach(() => {
    vendingMachine = new VendingMachine(inventory);
  });
  describe("inventory", () => {
    it("initial inventory", () => {
      expect(vendingMachine.getInventory()).toEqual(inventory);
    });
  });
  //item selection
  describe("When product s1 is selected", () => {
    it("return s1", () => {
      expect(vendingMachine.itemSelection("s1")).toEqual({
        id: "s1",
        name: "Salmon Sushi",
        price: 1.5,
        currentQuantity: 0,
        maxQuantity: 20
      });
    });
    describe("When product s1 is empty", () => {
      it("return 0", () => {
        expect(() => {
          vendingMachine.inventoryCheck("s1");
        }).toThrow("Out of stock");
      });
    });
    describe("When product s1 is low", () => {
      it("return 2", () => {
        expect(() => {
          vendingMachine.inventoryCheck("s2");
        }).toThrow("Stock is low, please refill");
      });
    });
  });
});
