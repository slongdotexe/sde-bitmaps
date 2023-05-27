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

  it("Should return a BN with the correct value when toBN is called", async () => {
    expect(testBitmap.toBN()).instanceOf(BN);
    expect(BigInt(testBitmap.toBN().toString())).eq(MaxUint256);
  });

  it("Should return a BigNumber with the correct value when toBigNumber is called", async () => {
    expect(testBitmap.toBigNumber()).instanceOf(BigNumber);
    expect(testBitmap.value).eq(MaxUint256);
  });

  it("Should return a BigInt with the correct value when toBigInt is called", async () => {
    expect(testBitmap.toBigInt()).eq(MaxUint256);
  });

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
