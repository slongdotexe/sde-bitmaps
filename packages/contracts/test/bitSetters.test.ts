/* eslint-disable camelcase -- -- */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { BigNumberBitmaps } from "sde-bitmaps-lib";
import { get256Indices } from "sde-bitmaps-lib/src/helpers";

import { TestSdeBitmaps } from "../typechain-types";

const {
  constants: { Zero, MaxUint256 },
} = ethers;

describe("SdeBitmapsCore bit setter tests", async () => {
  let Deployer: SignerWithAddress;
  let SdeBitmapsContract: TestSdeBitmaps;
  const testBucket = 0;

  const fourBits = [...new Array(4).keys()];
  const sixteenBits = [...new Array(16).keys()];

  const offsets_16 = [0, 48, 112, 176, 240];
  const offsets_4 = [0, 63, 126, 189, 252];

  beforeEach(async () => {
    [Deployer] = await ethers.getSigners();
  });

  describe("setBit, unsetBit, setBitsInBucket tests", async () => {
    beforeEach(async () => {
      await deployments.fixture("testbed");
      [Deployer] = await ethers.getSigners();
      SdeBitmapsContract = await ethers.getContract("TestSdeBitmaps", Deployer);
    });

    // #########################
    // # setBit / unsetBit tests
    offsets_16.forEach((offset) => {
      sixteenBits.forEach((bitIndex) => {
        it(`should set bit ${offset + bitIndex}. "setBit()"`, async () => {
          expect(await SdeBitmapsContract.test_getBucket(testBucket)).to.equal(
            Zero
          );

          await SdeBitmapsContract.test_setBit(bitIndex);
          const after = new BigNumberBitmaps(
            await SdeBitmapsContract.test_getBucket(testBucket)
          );

          expect(after.value).to.equal(
            new BigNumberBitmaps(Zero).setBit(bitIndex).value
          );
        });

        it(`should unset bit ${offset + bitIndex}. "unsetBit()"`, async () => {
          await SdeBitmapsContract.test_setBucket(testBucket, MaxUint256);
          expect(await SdeBitmapsContract.test_getBucket(testBucket)).to.equal(
            MaxUint256
          );

          await SdeBitmapsContract.test_unsetBit(bitIndex);
          const afterBnBm = new BigNumberBitmaps(
            await SdeBitmapsContract.test_getBucket(testBucket)
          );

          expect(afterBnBm.value).to.equal(
            new BigNumberBitmaps(MaxUint256).unsetBit(bitIndex).value
          );
        });
      });
    });

    // #########################
    // # setBitsInBucket / unsetBitsInBucket tests
    offsets_4.forEach((offset) => {
      fourBits.forEach((bitIndex) => {
        it(`should set bits ${offset} to ${
          offset + bitIndex
        }. "setBits()"`, async () => {
          expect(await SdeBitmapsContract.test_getBucket(testBucket)).to.equal(
            Zero
          );

          const bits = get256Indices().slice(offset, bitIndex + offset);
          await SdeBitmapsContract.test_setBitsInBucket(testBucket, bits);
          const expectedResult = BigNumberBitmaps.new().setBits(bits).value;

          expect(await SdeBitmapsContract.test_getBucket(testBucket)).to.equal(
            expectedResult
          );
        });

        it(`should unset bits ${offset} to ${
          offset + bitIndex
        }. "unsetBits()"`, async () => {
          await SdeBitmapsContract.test_setBucket(testBucket, MaxUint256);
          expect(await SdeBitmapsContract.test_getBucket(testBucket)).to.equal(
            MaxUint256
          );
          const bits = get256Indices().slice(offset, bitIndex + offset);

          await SdeBitmapsContract.test_unsetBitsInBucket(testBucket, bits);
          const expectedResult = new BigNumberBitmaps(MaxUint256).unsetBits(
            bits
          ).value;

          expect(await SdeBitmapsContract.test_getBucket(testBucket)).to.equal(
            expectedResult
          );
        });
      });
    });
  });

  describe("isBitSet / isBitsSet tests", async () => {
    beforeEach(async () => {
      await deployments.fixture("testbed");
      [Deployer] = await ethers.getSigners();
      SdeBitmapsContract = await ethers.getContract("TestSdeBitmaps", Deployer);
    });
    // #########################
    // # isBitSet tests
    offsets_16.forEach((offset) => {
      sixteenBits.forEach((bitIndex) => {
        it(`should return true for bit ${
          bitIndex + offset
        } "isBitSet()"`, async () => {
          await SdeBitmapsContract.test_setBit(bitIndex + offset);
          const result = await SdeBitmapsContract.test_isBitSet(
            bitIndex + offset
          );
          expect(result).to.equal(true);
        });

        it(`should return false for bit ${
          bitIndex + offset
        }  "isBitSet()"`, async () => {
          await SdeBitmapsContract.test_setBucket(testBucket, MaxUint256);
          await SdeBitmapsContract.test_unsetBit(bitIndex + offset);
          const result = await SdeBitmapsContract.test_isBitSet(
            bitIndex + offset
          );
          expect(result).to.equal(false);
        });
      });
    });
  });
});
