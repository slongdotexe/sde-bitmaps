import { BigNumber } from '@ethersproject/bignumber'
import BN from 'bn.js'

export class BigNumberBitmaps {
  public value: bigint

  constructor(val: bigint) {
    this.value = val
  }

  isBitSet(index: number): boolean {
    const bn = this.toBN()
    return bn.testn(index)
  }

  isBitsSet(indices: number[]): boolean {
    return indices.every((bitIndex) => this.isBitSet(bitIndex))
  }

  setBit(index: number): BigNumberBitmaps {
    const bn = this.toBN()
    return BigNumberBitmaps.from(
      bn.setn(
        index,
        // @ts-expect-error -- Potential issue with types package
        1,
      ),
    )
  }

  unsetBit(index: number): BigNumberBitmaps {
    const bn = this.toBN()
    return BigNumberBitmaps.from(
      bn.setn(
        index,
        // @ts-expect-error -- Potential issue with types package
        0,
      ),
    )
  }

  setBits(indices: number[]): BigNumberBitmaps {
    const bn = this.toBN()
    indices.forEach((bitIndex) => {
      bn.setn(
        bitIndex,
        // @ts-expect-error -- Potential issue with types package
        1,
      )
    })
    return BigNumberBitmaps.from(bn)
  }

  unsetBits(indices: number[]): BigNumberBitmaps {
    const bn = this.toBN()
    for (let i = 0; i < indices.length; i += 1) {
      // @ts-expect-error -- Potential issue with types package
      bn.setn(indices[i], 0)
    }
    return BigNumberBitmaps.from(bn)
  }

  shiftLeft(places: number, width?: number): BigNumberBitmaps {
    const bn = this.toBN()
    const bnWidth = bn.bitLength()
    // Preserve the original width of the bitmap. Due to bn.js effectively supporting unlimited word size we need to mask the result to the original width as would happen on-chain.
    const result = bn.shln(places).imaskn(width ?? bnWidth)
    return BigNumberBitmaps.from(result)
  }

  shiftRight(places: number): BigNumberBitmaps {
    const bn = this.toBN()
    // Due to being little-endian we don't need to mask off extra bits as they're intrinsically masked off by being shifted below the 0th bit.
    const result = bn.shrn(places)
    return BigNumberBitmaps.from(result)
  }

  flip(): BigNumberBitmaps {
    const bn = this.toBN()
    // Explicitly provide the intended bit length such that a bitwise inversion behaves as the EVM does
    return BigNumberBitmaps.from(bn.notn(256))
  }

  flipBit(index: number): BigNumberBitmaps {
    const bn = this.toBN()
    return bn.testn(index)
      ? // @ts-expect-error @types issue
        BigNumberBitmaps.from(bn.setn(index, 0))
      : // @ts-expect-error @types issue
        BigNumberBitmaps.from(bn.setn(index, 1))
  }

  selectInsideRange(start: number, end: number, width = this.toBN().bitLength()): BigNumberBitmaps {
    return this.maskRange(start, end, width, false)
  }

  selectOutsideRange(start: number, end: number, width = this.toBN().bitLength()) {
    return this.maskRange(start, end, width, true)
  }

  maskRange(start: number, end: number, width: number, invert: boolean) {
    const bn = this.toBN()
    if (start > end) {
      const emptyMask = new BN(0)
      const finalMask = invert ? emptyMask.notn(width) : emptyMask
      return BigNumberBitmaps.from(bn.and(finalMask))
    }

    const rangeMask = new BN(1)
      .shln(end - start + 1)
      .subn(1)
      .shln(start)
      .maskn(width)

    const finalMask = invert ? rangeMask.notn(width) : rangeMask
    return BigNumberBitmaps.from(bn.and(finalMask))
  }

  toBN(): BN {
    return new BN(this.value.toString())
  }

  toBigInt(): bigint {
    return this.value
  }

  static new() {
    return new BigNumberBitmaps(0n)
  }

  static from(value: any): BigNumberBitmaps {
    if (value instanceof BigNumberBitmaps) {
      return value
    }
    return new BigNumberBitmaps(BigNumber.from(String(value)).toBigInt())
  }

  static fromBinary(binary: string): BigNumberBitmaps {
    return BigNumberBitmaps.from(`0x${new BN(binary, 2).toString('hex')}`)
  }

  static getBucketFromBitIndex(bitIndex: number): BigNumberBitmaps {
    return BigNumberBitmaps.from(bitIndex).shiftRight(8)
  }

  static getBitmaskFromBitIndex(bitIndex: number): BigNumberBitmaps {
    const normalisedIndex = BigNumberBitmaps.from(bitIndex).toBN().mod(new BN(256))
    return BigNumberBitmaps.from(0).setBit(normalisedIndex.toNumber())
  }
}
