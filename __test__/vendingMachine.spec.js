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
    //check if inventory is empty
    describe("When product s1 is empty", () => {
      it("return 0", () => {
        expect(() => {
          vendingMachine.productInventoryCheck("s1");
        }).toThrow("Out of stock");
      });
    });
    //check if inventory is low
    describe("When product s1 is low", () => {
      it("return 2", () => {
        expect(() => {
          vendingMachine.productInventoryCheck("s2");
        }).toThrow("Stock is low, please refill");
      });
    });
    //restock product
    describe("When product is not full", () => {
      it("returns currentQuantity to 20", () => {
        expect(vendingMachine.restockProduct("s1")).toEqual(20);
      });
    });
    //validate coin input amount
    describe("When coin input is [5, 5, 1, 1, 1]", () => {
      it("return 3.00", () => {
        expect(vendingMachine.coinInputAmount([5, 5, 1, 1, 1])).toEqual(4.0);
      });
    });
    //check if coin type is available
    describe("When coin count is 0", () => {
      it("return false", () => {
        expect(vendingMachine.coinInventoryCheck("nickel")).toEqual(false);
      });
    });
    //check if coin type is available
    describe("When coin count is not 0", () => {
      it("return true", () => {
        expect(vendingMachine.coinInventoryCheck("dime")).toEqual(true);
      });
    });
    //check if credit amount is less than required price
    describe("When credit amount is less than price", () => {
      it("insufficient fund", () => {
        expect(() => {
          vendingMachine.validatePurchase("s1", [0, 0, 0, 1, 0]);
        }).toThrow("insufficient funds");
      });
    });
    //calculate change
    describe("When credit amount is greater or equal to price, calculate change", () => {
      it("return 0", () => {
        expect(vendingMachine.validatePurchase("s1", [0, 0, 2, 1, 0])).toEqual(
          0
        );
      });
      //dispense change
      describe("calculate minimal amount of change to give", () => {
        it("return 2 toonie, 1 loonie, 2 quarter, 0 dime, 0 nickel", () => {
          expect(vendingMachine.dispenseChange(5.5)).toEqual({
            toonie: 2,
            loonie: 1,
            quarter: 2,
            dime: 0,
            nickel: 0
          });
        });
        //no change to dispense
        describe("When change to give is 0", () => {
          it("return 0", () => {
            expect(vendingMachine.dispenseChange(0)).toEqual({
              toonie: 0,
              loonie: 0,
              quarter: 0,
              dime: 0,
              nickel: 0
            });
          });
        });
      });
    });
  });
});
