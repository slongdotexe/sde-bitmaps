export {};
// /* eslint-disable camelcase -- -- */
// import BN from "bn.js";
// import { expect } from "chai";

// import { bitShiftLeft, toBigNumber } from "../../../../lib/ExtendedBigNumber";

// describe("bitShiftLeft tests", async () => {
//   it("Should return 1111 shifting left 0", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("1111", 2));
//     const shift = 0;
//     const result = bitShiftLeft(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });

//   it("Should return 1110 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("1110", 2));
//     const shift = 1;
//     const result = bitShiftLeft(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });
//   it("Should return 1100 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("1100", 2));
//     const shift = 2;
//     const result = bitShiftLeft(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });

//   it("Should return 1000 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("1000", 2));
//     const shift = 3;
//     const result = bitShiftLeft(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });

//   it("Should return 0000 shifting left 1", async () => {
//     const fourBits = toBigNumber(new BN("1111", 2));
//     const expectedResult = toBigNumber(new BN("0000", 2));
//     const shift = 4;
//     const result = bitShiftLeft(fourBits, shift);
//     expect(result.toNumber()).eq(expectedResult.toNumber());
//   });
// });
