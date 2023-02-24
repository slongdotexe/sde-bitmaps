import BN from "bn.js";
import { ethers } from "ethers";

export const bitShiftLeft = (number: BN, places: number) => number.shln(places);

export const bitShiftRight = (number: BN, places: number) =>
  number.shrn(places);

export const BNToEthersBN = (number: BN) =>
  ethers.BigNumber.from(`0x${number.toString(16)}`);

export const generateMask = (
  startIndex: number,
  endIndex: number,
  currentIndex: number,
  wordSize: number
) => {
  const currentBucket = Math.floor(currentIndex / wordSize);
  const startBucket = Math.floor(startIndex / wordSize);
  const endBucket = Math.floor(endIndex / wordSize);
  const maxIntBn = new BN("".padEnd(wordSize, "1"), 2);

  let result = maxIntBn;
  if (currentBucket === startBucket) {
    const startNToLose = startIndex - wordSize * startBucket;
    result = result.and(bitShiftLeft(maxIntBn, startNToLose));
  }
  if (currentBucket === endBucket) {
    const endNToLose = wordSize - 1 - (endIndex - wordSize * endBucket);
    result = result.and(bitShiftRight(maxIntBn, endNToLose));
  }
  return result;
};

export const rangeArray = (start: number, end: number) =>
  [...Array(end - start + 1).keys()].map((item) => item + start);

export const generateBitmap = (wordSize: number, initial: boolean) =>
  new BN("".padEnd(wordSize, initial ? "1" : "0"), 2);
