import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import BN from "bn.js";

import { getMaxBN } from "./helpers";

export type BignumberBitmapsish = BigNumberish | BigNumberBitmaps;

export class BigNumberBitmaps {
  public value: bigint;

  constructor(val: bigint) {
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

  shiftLeft(places: number, width?: number): BigNumberBitmaps {
    const bn = this.toBN();
    const bnWidth = bn.bitLength();
    // Preserve the original width of the bitmap. Due to bn.js effectively supporting unlimited word size we need to mask the result to the original width as would happen on-chain.
    const result = bn.shln(places).imaskn(width ?? bnWidth);
    return BigNumberBitmaps.from(result);
  }

  shiftRight(places: number): BigNumberBitmaps {
    const bn = this.toBN();
    // Due to being little-endian we don't need to mask off extra bits as they're intrinsically masked off by being shifted below the 0th bit.
    const result = bn.shrn(places);
    return BigNumberBitmaps.from(result);
  }

  flip(): BigNumberBitmaps {
    const bn = this.toBN();
    // Explicitly provide the intended bit length such that a bitwise inversion behaves as the EVM does
    return BigNumberBitmaps.from(bn.notn(256));
  }

  flipBit(index: number): BigNumberBitmaps {
    const bn = this.toBN();
    return bn.testn(index)
      ? // @ts-expect-error @types issue
        BigNumberBitmaps.from(bn.setn(index, 0))
      : // @ts-expect-error @types issue
        BigNumberBitmaps.from(bn.setn(index, 1));
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
    return BigNumber.from(this.value);
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
    return new BigNumberBitmaps(BigNumber.from(String(value)).toBigInt());
  }

  static fromBinary(binary: string): BigNumberBitmaps {
    return BigNumberBitmaps.from(`0x${new BN(binary, 2).toString("hex")}`);
  }

  static getBucketFromBitIndex(
    bitIndex: BignumberBitmapsish
  ): BigNumberBitmaps {
    return BigNumberBitmaps.from(bitIndex).shiftRight(8);
  }

  static getBitmaskFromBitIndex(
    bitIndex: BignumberBitmapsish
  ): BigNumberBitmaps {
    const normalisedIndex = BigNumberBitmaps.from(bitIndex)
      .toBN()
      .mod(new BN(256));
    return BigNumberBitmaps.from(0).setBit(normalisedIndex.toNumber());
  }
}
