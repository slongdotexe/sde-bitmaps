import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { BigNumberBitmaps } from "sde-bitmaps-lib";
import { get256Indices } from "sde-bitmaps-lib/src/helpers";

import { SdeBitmaps } from "../typechain-types";

describe("SdeBitmapsCore bit setter tests", async () => {
  let Deployer: SignerWithAddress;
  let SdeBitmapsContract: SdeBitmaps;
  const bucketIndex = 0;

  beforeEach(async () => {
    [Deployer] = await ethers.getSigners();
  });

  describe("setBit / unsetBit tests", async () => {
    beforeEach(async () => {
      await deployments.fixture("testbed");
      [Deployer] = await ethers.getSigners();
      SdeBitmapsContract = await ethers.getContract("SdeBitmaps", Deployer);
    });

    get256Indices().forEach((bitIndex) => {
      it(`should set bit ${bitIndex}`, async () => {
        const beforeBnBm = new BigNumberBitmaps(
          await SdeBitmapsContract.getBucket(bucketIndex)
        );
        expect(beforeBnBm.value).to.equal(
          new BigNumberBitmaps(ethers.constants.Zero).value
        );
        await SdeBitmapsContract.setBit(bitIndex);
        const afterBnBm = new BigNumberBitmaps(
          await SdeBitmapsContract.getBucket(bucketIndex)
        );

        expect(afterBnBm.value).to.equal(
          new BigNumberBitmaps(ethers.constants.Zero).setBit(bitIndex).value
        );
      });
    });

    get256Indices().forEach((bitIndex) => {
      it(`should unset bit ${bitIndex}`, async () => {
        await SdeBitmapsContract.setBucket(
          bucketIndex,
          ethers.constants.MaxUint256
        );

        const beforeBnBm = new BigNumberBitmaps(
          await SdeBitmapsContract.getBucket(bucketIndex)
        );
        expect(beforeBnBm.value).to.equal(
          new BigNumberBitmaps(ethers.constants.MaxUint256).value
        );
        await SdeBitmapsContract.unsetBit(bitIndex);
        const afterBnBm = new BigNumberBitmaps(
          await SdeBitmapsContract.getBucket(bucketIndex)
        );

        expect(afterBnBm.value).to.equal(
          new BigNumberBitmaps(ethers.constants.MaxUint256).unsetBit(bitIndex)
            .value
        );
      });
    });
  });
});
