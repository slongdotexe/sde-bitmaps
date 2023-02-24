/* eslint-disable class-methods-use-this -- -- */
/* eslint-disable no-param-reassign -- --*/
import _BN from "bn.js";
import { BigNumber, logger } from "ethers";

import BN = _BN;

export class BigNumberBitmaps {
  public value: BigNumber;

  constructor(val: BigNumber) {
    this.value = val;
  }

  isBitSet(index: number): boolean {
    const bn = this.toBN();
    return bn.testn(index);
  }

  // TODO add tests
  isBitsSet(indices: number[]): boolean {
    return indices.every((bitIndex) => this.isBitSet(bitIndex));
  }

  setBit(index: number): BigNumberBitmaps {
    const bn = this.toBN();
    return BigNumberBitmaps.fromBN(
      bn.setn(
        index,
        // @ts-ignore @types issue
        1
      )
    );
  }

  unsetBit(index: number): BigNumberBitmaps {
    const bn = this.toBN();
    return BigNumberBitmaps.fromBN(
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
    return BigNumberBitmaps.fromBN(bn);
  }

  unsetBits(indices: number[]): BigNumberBitmaps {
    const bn = this.toBN();
    for (let i = 0; i < indices.length; i += 1) {
      // @ts-ignore @types issue
      bn.setn(indices[i], 0);
    }
    return BigNumberBitmaps.fromBN(bn);
  }

  bitShiftLeft(places: number, width?: number): BigNumberBitmaps {
    const bn = this.toBN();
    const bnWidth = bn.bitLength();
    const result = bn.shln(places).maskn(width ?? bnWidth);
    return BigNumberBitmaps.fromBN(result);
  }

  bitShiftRight(places: number, width?: number): BigNumberBitmaps {
    const bn = this.toBN();
    const bnWidth = bn.bitLength();
    const result = bn.shrn(places).maskn(width ?? bnWidth);
    return BigNumberBitmaps.fromBN(result);
  }

  toBigNumberBitmaps(value: BigNumber) {
    return new BigNumberBitmaps(value);
  }

  toBN(): BN {
    return BigNumberBitmaps.BigNumberishToBN(this.value);
  }

  static fromBN(value: BN): BigNumberBitmaps {
    return new BigNumberBitmaps(BigNumberBitmaps.BNtoBigNumber(value));
  }

  static BigNumberishToBN(value: BigNumber): BN {
    const hex = BigNumber.from(value).toHexString();
    if (hex[0] === "-") {
      return new BN(`-${hex.substring(3)}`, 16);
    }
    return new BN(hex.substring(2), 16);
  }

  static BNtoBigNumber(value: BN): BigNumber {
    return BigNumber.from(this.ethersToHex(value));
  }

  /**
   *
   * @author: Originally authored in the BigNumber class with ether.js as toHex
   */
  static ethersToHex(value: string | BN): string {
    // For BN, call on the hex string
    if (typeof value !== "string") {
      return this.ethersToHex(value.toString(16));
    }

    // If negative, prepend the negative sign to the normalized positive value
    if (value[0] === "-") {
      // Strip off the negative sign
      value = value.substring(1);

      // Cannot have multiple negative signs (e.g. "--0x04")
      if (value[0] === "-") {
        logger.throwArgumentError("invalid hex", "value", value);
      }

      // Call toHex on the positive component
      value = this.ethersToHex(value);

      // Do not allow "-0x00"
      if (value === "0x00") {
        return value;
      }

      // Negate the value
      return `-${value}`;
    }

    // Add a "0x" prefix if missing
    if (value.substring(0, 2) !== "0x") {
      value = `0x${value}`;
    }

    // Normalize zero
    if (value === "0x") {
      return "0x00";
    }

    // Make the string even length
    if (value.length % 2) {
      value = `0x0${value.substring(2)}`;
    }

    // Trim to smallest even-length string
    while (value.length > 4 && value.substring(0, 4) === "0x00") {
      value = `0x${value.substring(4)}`;
    }

    return value;
  }
}
