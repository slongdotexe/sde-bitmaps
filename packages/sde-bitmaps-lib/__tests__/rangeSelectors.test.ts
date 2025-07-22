import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";

import { BigNumberBitmaps } from "../src";
import { MaxUint256BigNumber } from "../src/constants";

describe("BigNumberBitmaps range selector tests", async () => {
  const testBits = "1111";
  const bitWidth = 4;
  describe("selectInsideRange tests", () => {
    it("Should return `0001` when start=0 end=0", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0001");
      const start = 0;
      const end = 0;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );
      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0011` when start=0 end=1", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0011");
      const start = 0;
      const end = 1;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0111` when start=0 end=2", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0111");
      const start = 0;
      const end = 2;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1111` when start=0 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1111");
      const start = 0;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0010` when start=1 end=1", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0010");
      const start = 1;
      const end = 1;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0110` when start=1 end=2", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0110");
      const start = 1;
      const end = 2;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1110` when start=1 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1110");
      const start = 1;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0100` when start=2 end=2", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0100");
      const start = 2;
      const end = 2;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1100` when start=2 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1100");
      const start = 2;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1000` when start=3 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1000");
      const start = 3;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectInsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return the correct bits across a full 256 bit range", () => {
      const _bitWidth = 256;

      for (let startIndex = 0; startIndex < _bitWidth; startIndex++) {
        for (let endIndex = 0; endIndex < _bitWidth; endIndex++) {
          if (startIndex > endIndex) break;

          const startMask = MaxUint256BigNumber.shl(startIndex).mask(_bitWidth);

          const endMask = MaxUint256BigNumber.shr(255 - endIndex);

          const finalMask = startMask.and(endMask);
          const expectedResult = BigNumber.from(finalMask);

          const result = BigNumberBitmaps.from(
            MaxUint256BigNumber
          ).selectInsideRange(startIndex, endIndex, 256);
          expect(result.toBigInt()).eq(expectedResult.toBigInt());
        }
      }
    });
  });
  describe("selectOutsideRange tests", () => {
    it("Should return `1110` when start=0 end=0", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1110");
      const start = 0;
      const end = 0;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1100` when start=0 end=1", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1100");
      const start = 0;
      const end = 1;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1000` when start=0 end=2", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1000");
      const start = 0;
      const end = 2;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0000` when start=0 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0000");
      const start = 0;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1101` when start=1 end=1", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1101");
      const start = 1;
      const end = 1;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1001` when start=1 end=2", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1001");
      const start = 1;
      const end = 2;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0001` when start=1 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0001");
      const start = 1;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `1011` when start=2 end=2", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("1011");
      const start = 2;
      const end = 2;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0011` when start=2 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0011");
      const start = 2;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return `0111` when start=3 end=3", () => {
      const expectedResult = BigNumberBitmaps.fromBinary("0111");
      const start = 3;
      const end = 3;
      const result = BigNumberBitmaps.fromBinary(testBits).selectOutsideRange(
        start,
        end,
        bitWidth
      );

      expect(result.toBigInt()).eq(expectedResult.toBigInt());
    });

    it("Should return the correct bits across a full 256 bit range", () => {
      const _bitWidth = 256;

      for (let startIndex = 0; startIndex < _bitWidth; startIndex++) {
        for (let endIndex = 0; endIndex < _bitWidth; endIndex++) {
          if (startIndex > endIndex) break;

          const startMask = MaxUint256BigNumber.shl(startIndex).mask(_bitWidth);

          const endMask = MaxUint256BigNumber.shr(255 - endIndex);

          const finalMask = startMask.and(endMask).xor(MaxUint256BigNumber);
          const expectedResult = BigNumber.from(finalMask);

          const result = BigNumberBitmaps.from(
            MaxUint256BigNumber
          ).selectOutsideRange(startIndex, endIndex, 256);
          expect(result.toBigInt()).eq(expectedResult.toBigInt());
        }
      }
    });
  });
});
