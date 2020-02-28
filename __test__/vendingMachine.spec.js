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
  describe("When inventory is empty", () => {
    it("currentQuantity===0", () => {
      expect(vendingMachine.getProducts([0].currentQuantity)).toEqual(0);
    });
  });
  // describe("When payment of 1.25 is less than cost of 2.00", () => {
  //   it("will return remaining balance of 0.50 needed", () => {
  //     expect(vendingMachine(1.5, 2.0)).toEqual(0.5);
  //   });
  // });
});

// inventory
// describe("inventory", () => {
//   describe("When inventory is full", () => {
//     it("units will equal 10", () => {
//       expect(inventory(10)).toEqual(true);
//     });
//   });
//   describe("When inventory is low", () => {
//     it("units will be less than 3 but more than 1", () => {
//       expect(inventory(2)).toEqual(false);
//     });
//   });
//   describe("When inventory is empty", () => {
//     it("units will equal 0", () => {
//       expect(() => {
//         inventory(0);
//       }).toThrow();
//     });
//   });
// });
