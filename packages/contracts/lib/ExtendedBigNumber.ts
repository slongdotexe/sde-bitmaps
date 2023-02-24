import BN from "bn.js";
import { BigNumber, BigNumberish, logger } from "ethers";

export const toBigNumber = (value: BN): BigNumber =>
  BigNumber.from(toHex(value));

export const toHex = (_value: string | BN): string => {
  let value = _value;
  // For BN, call on the hex string
  if (typeof value !== "string") {
    return toHex(value.toString(16));
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
    value = toHex(value);

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
};

export const toBN = (value: BigNumberish): BN => {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN(`-${hex.substring(3)}`, 16);
  }
  return new BN(hex.substring(2), 16);
};

export const isBitSet = (number: BigNumber, index: number): boolean =>
  toBN(number).testn(index);

export const setBit = (number: BigNumber, index: number): BigNumber =>
  toBigNumber(
    toBN(number).setn(
      index,
      // @ts-ignore
      1
    )
  );

export const unsetBit = (number: BigNumber, index: number): BigNumber =>
  toBigNumber(
    toBN(number).setn(
      index,
      // @ts-ignore
      0
    )
  );

export const setBits = (number: BigNumber, indicies: number[]): BigNumber => {
  const bn = toBN(number);
  for (let i = 0; i < indicies.length; i += 1) {
    bn.setn(
      indicies[i],
      // @ts-ignore
      1
    );
  }
  return toBigNumber(bn);
};

export const unsetBits = (number: BigNumber, indicies: number[]): BigNumber => {
  let bn = toBN(number);
  for (let i = 0; i < indicies.length; i += 1) {
    bn = bn.setn(
      indicies[i],
      // @ts-ignore
      0
    );
  }
  return toBigNumber(bn);
};

export const bitShiftLeft = (
  number: BigNumber,
  places: number,
  width?: number
) => {
  const bn = toBN(number);
  return toBigNumber(
    toBN(number)
      .shln(places)
      .maskn(width ?? bn.bitLength())
  );
};

export const bitShiftRight = (
  number: BigNumber,
  places: number,
  width?: number
) => {
  const bn = toBN(number);
  return toBigNumber(
    toBN(number)
      .shrn(places)
      .maskn(width ?? bn.bitLength())
  );
};
