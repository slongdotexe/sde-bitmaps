export {};
// /* eslint-disable camelcase -- --  */
// import BN from "bn.js";
// import { expect } from "chai";

// import { bitShiftRight, toBigNumber } from "../../../../lib/ExtendedBigNumber";

// export {};

// describe("bitShiftRight tests", async () => {
//   it("Should return 1111 shifting left 0", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("1111", 2));
//     const shift = 0;
//     const result = bitShiftRight(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });

//   it("Should return 0111 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("0111", 2));
//     const shift = 1;
//     const result = bitShiftRight(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });
//   it("Should return 0011 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("0011", 2));
//     const shift = 2;
//     const result = bitShiftRight(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });

//   it("Should return 0001 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("0001", 2));
//     const shift = 3;
//     const result = bitShiftRight(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });

//   it("Should return 0000 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("0000", 2));
//     const shift = 4;
//     const result = bitShiftRight(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });
// });
