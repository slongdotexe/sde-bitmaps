import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { BigNumberBitmaps } from "sde-bitmaps-lib";
import { get256Indices } from "sde-bitmaps-lib/src/helpers";

import { SdeBitmaps } from "../typechain-types";

const {
  constants: { Zero, MaxUint256 },
} = ethers;

describe("SdeBitmapsCore bit setter tests", async () => {
  let Deployer: SignerWithAddress;
  let SdeBitmapsContract: SdeBitmaps;
  const testBucket = 0;

  beforeEach(async () => {
    [Deployer] = await ethers.getSigners();
  });

  describe("setBit, unsetBit, setBitsInBucket tests", async () => {
    const fourBits = [...new Array(4).keys()];
    const sixteenBits = [...new Array(16).keys()];
    beforeEach(async () => {
      await deployments.fixture("testbed");
      [Deployer] = await ethers.getSigners();
      SdeBitmapsContract = await ethers.getContract("TestSdeBitmaps", Deployer);
    });

    get256Indices().forEach((bitIndex) => {
      it(`should set bit ${bitIndex}. "setBit`, async () => {
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
    });

    get256Indices().forEach((bitIndex) => {
      it(`should unset bit ${bitIndex}. "unsetBit()"`, async () => {
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

    const offsets = [0, 63, 126, 189, 252];
    fourBits.forEach((bitIndex) => {
      offsets.forEach((offset) => {
        it.only(`should set four bits from offset ${offset}. "setBits()"`, async () => {
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
      });
    });
    describe("isBitSet / isiBitsSet tests", async () => {
      beforeEach(async () => {
        await deployments.fixture("testbed");
        [Deployer] = await ethers.getSigners();
        SdeBitmapsContract = await ethers.getContract(
          "TestSdeBitmaps",
          Deployer
        );
      });
      get256Indices().forEach((bitIndex) => {
        it(`should return true for bit  ${bitIndex} "isBitSet()"`, async () => {
          await SdeBitmapsContract.test_setBit(bitIndex);
          const result = await SdeBitmapsContract.test_isBitSet(bitIndex);
          expect(result).to.equal(true);
        });
      });

      get256Indices().forEach((bitIndex) => {
        it(`should return false for bit ${bitIndex}  "isBitSet()"`, async () => {
          await SdeBitmapsContract.test_setBucket(testBucket, MaxUint256);
          await SdeBitmapsContract.test_unsetBit(bitIndex);
          const result = await SdeBitmapsContract.test_isBitSet(bitIndex);
          expect(result).to.equal(false);
        });
      });
    });
  });
});
