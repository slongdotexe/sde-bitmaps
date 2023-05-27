import { BigNumber } from "@ethersproject/bignumber";
import _BN from "bn.js";

import { getMaxBN } from "./helpers";

import BN = _BN;

export class BigNumberBitmaps {
  public value: BigInt;

  constructor(val: BigInt) {
    this.value = val;
  }

  isBitSet(index: number): boolean {
    const bn = this.toBN();
    return bn.testn(index);
  }

  isBitsSet(indices: number[]): boolean {
    return indices.every((bitIndex) => this.isBitSet(bitIndex));
  }

  setBit(index: number): BigNumberBitmaps {
    const bn = this.toBN();
    return BigNumberBitmaps.from(
      bn.setn(
        index,
        // @ts-ignore @types issue
        1
      )
    );
  }

  unsetBit(index: number): BigNumberBitmaps {
    const bn = this.toBN();
    return BigNumberBitmaps.from(
      bn.setn(
        index,
        // @ts-ignore @types issue
        0
      )
    );
  }

  setBits(indices: number[]): BigNumberBitmaps {
    const bn = this.toBN();
    indices.forEach((bitIndex) => {
      bn.setn(
        bitIndex,
        // @ts-ignore @types issue
        1
      );
    });
    return BigNumberBitmaps.from(bn);
  }

  unsetBits(indices: number[]): BigNumberBitmaps {
    const bn = this.toBN();
    for (let i = 0; i < indices.length; i += 1) {
      // @ts-ignore @types issue
      bn.setn(indices[i], 0);
    }
    return BigNumberBitmaps.from(bn);
  }

  bitShiftLeft(places: number, width?: number): BigNumberBitmaps {
    const bn = this.toBN();
    const bnWidth = bn.bitLength();
    const result = bn.shln(places).maskn(width ?? bnWidth);
    return BigNumberBitmaps.from(result);
  }

  bitShiftRight(places: number, width?: number): BigNumberBitmaps {
    const bn = this.toBN();
    const bnWidth = bn.bitLength();
    const result = bn.shrn(places).maskn(width ?? bnWidth);
    return BigNumberBitmaps.from(result);
  }

  selectInsideRange(
    start: number,
    end: number,
    width = this.toBN().bitLength()
  ): BigNumberBitmaps {
    return this.maskRange(start, end, width, false);
  }

  selectOutsideRange(
    start: number,
    end: number,
    width = this.toBN().bitLength()
  ) {
    return this.maskRange(start, end, width, true);
  }

  maskRange(start: number, end: number, width: number, invert: boolean) {
    const bn = this.toBN();
    // Mask off extra bits beyond the intended width (provided or original)
    const startMask = getMaxBN(width).shln(start).maskn(width);
    const endMask = getMaxBN(width).shrn(width - 1 - end);
    const finalMask = invert
      ? startMask.and(endMask).notn(width)
      : startMask.and(endMask);
    return BigNumberBitmaps.from(bn.and(finalMask));
  }

  toBN(): BN {
    return new BN(this.value.toString());
  }

  toBigNumber(): BigNumber {
    return BigNumber.from(this.value.toString());
  }

  toBigInt(): BigInt {
    return this.value;
  }

  static new() {
    return new BigNumberBitmaps(0n);
  }

  static from(value: any): BigNumberBitmaps {
    if (value instanceof BigNumberBitmaps) {
      return value;
    }
    if (value instanceof BigNumber) {
      return new BigNumberBitmaps(BigInt(value.toString()));
    }
    if (value instanceof BN) {
      return new BigNumberBitmaps(BigInt(value.toString()));
    }

    if (value instanceof BigInt) {
      return new BigNumberBitmaps(BigInt(value.toString()));
    }

    return new BigNumberBitmaps(BigInt(BigNumber.from(value).toString()));
  }

  static fromBinary(binary: string): BigNumberBitmaps {
    return BigNumberBitmaps.from(`0x${new BN(binary, 2).toString("hex")}`);
  }

  static BigNumberishToBN(value: BigNumber): BN {
    const hex = BigNumber.from(value).toHexString();
    if (hex[0] === "-") {
      return new BN(`-${hex.substring(3)}`, "hex");
    }
    return new BN(hex.substring(2), "hex");
  }
}
