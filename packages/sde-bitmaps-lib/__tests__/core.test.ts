import { BigNumber } from "@ethersproject/bignumber";
import BN from "bn.js";
import { expect } from "chai";

import { BigNumberBitmaps } from "../src";
import {
  MaxUint256,
  MaxUint256BigNumber,
  MaxUint256BN,
} from "../src/constants";

describe("BigNumberBitmaps core tests", async () => {
  const testBitmap = new BigNumberBitmaps(
    BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
  );

  describe("instantiation and `toXYZ`", async () => {
    describe("to", () => {
      it("Should return a BN with the correct value when toBN is called", async () => {
        const result = testBitmap.toBN();
        expect(result).instanceOf(BN);
        expect(result.toString()).eq(MaxUint256.toString());
      });

      it("Should return a BigInt with the correct value when toBigInt is called", async () => {
        const result = testBitmap.toBigInt();
        expect(result).eq(MaxUint256);
      });
    });
    describe("from", () => {
      it("Should return a BigNumberBitmaps with the correct value when from is called with a BigNumberBitmaps", async () => {
        const result = BigNumberBitmaps.from(testBitmap);
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(MaxUint256);
      });

      it("Should return a BigNumberBitmaps with the correct value when from is called with a BigNumber", async () => {
        const result = BigNumberBitmaps.from(MaxUint256BigNumber);
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(MaxUint256);
      });

      it("Should return a BigNumberBitmaps with the correct value when from is called with a BN", async () => {
        const result = BigNumberBitmaps.from(MaxUint256BN);
        expect(result.toBN()).instanceOf(BN);
        expect(result.value).eq(MaxUint256);
      });

      it("Should return a BigNumberBitmaps with the correct value when from is called with a BigInt", async () => {
        const result = BigNumberBitmaps.from(MaxUint256);
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(MaxUint256);
      });

      it("Should return a BigNumberBitmaps when from is called with a number", async () => {
        const result = BigNumberBitmaps.from(1);
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(1n);
      });

      it("Should return a BigNumberBitmaps when from is called with a string", async () => {
        const result = BigNumberBitmaps.from("1");
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(1n);
      });

      it("Should return a BigNumberBitmaps when from is called with a hex string", async () => {
        const result = BigNumberBitmaps.from("0x1");
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(1n);
      });
    });

    describe("misc", () => {
      it("Should return a BigNumberBitmaps with value 0n when calling new", () => {
        const result = BigNumberBitmaps.new();
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(0n);
      });

      it("Should return a BigNumberBitmaps with the correct value when calling fromBinary", () => {
        const result = BigNumberBitmaps.fromBinary("111");
        expect(result).instanceOf(BigNumberBitmaps);
        expect(result.value).eq(7n);
      });
    });
  });

  describe("getBitmaskFromBitIndex ", async () => {
    // 0th bit set === decimal 1
    it("Should return 1 for bit index 0", () => {
      expect(BigNumberBitmaps.getBitmaskFromBitIndex(0).value).eq(1n);
    });
    // 1st bit set === decimal 2
    it("Should return 1 for bit index 1", () => {
      expect(BigNumberBitmaps.getBitmaskFromBitIndex(1).value).eq(2n);
    });
    // 255th bit set === decimal 2 ** 255
    it("Should return 2 ** 255 for bit index 255", () => {
      const result = BigNumberBitmaps.getBitmaskFromBitIndex(255);
      expect(result.value).equals(2n ** 255n);
    });
    // 256th bit set is 1 due to this index wrapping into the next 256bit word
    it("Should return 1 for 256th bit index", () => {
      const result = BigNumberBitmaps.getBitmaskFromBitIndex(256);
      expect(result.value).eq(1n);
    });
    // 257th bit === decimal 2 due to wrapping as above
    it("Should return 2 for the 257th bit index", () => {
      const result = BigNumberBitmaps.getBitmaskFromBitIndex(257);
      expect(result.value).eq(2n);
    });
    // etc
    it("Should return 2 ** 255 for 511th bit index", () => {
      const result = BigNumberBitmaps.getBitmaskFromBitIndex(511);
      expect(result.value).eq(2n ** 255n);
    });
  });

  describe("getBucketFromBitIndex", () => {
    it("Should return 0 for bit index 0", () => {
      expect(BigNumberBitmaps.getBucketFromBitIndex(0).value).eq(0n);
    });

    it("Should return 0 for bit index 1", () => {
      expect(BigNumberBitmaps.getBucketFromBitIndex(1).value).eq(0n);
    });

    it("Should return 0 for bit index 255", () => {
      expect(BigNumberBitmaps.getBucketFromBitIndex(255).value).eq(0n);
    });

    it("Should return 1 for bit index 256", () => {
      expect(BigNumberBitmaps.getBucketFromBitIndex(256).value).eq(1n);
    });

    it("Should return 1 for bit index 257", () => {
      expect(BigNumberBitmaps.getBucketFromBitIndex(257).value).eq(1n);
    });
  });
});
