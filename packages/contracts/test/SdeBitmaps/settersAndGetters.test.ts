/* eslint-disable no-unused-expressions -- -- */
/* eslint-disable camelcase -- --*/
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import {
  SdeBitmapsExternal,
  SdeBitmapsExternal__factory,
} from "../../typechain-types";

describe("SdeBitmaps setters and getters", async () => {
  let Deployer: SignerWithAddress;

  let _SdeBitmapsExternal: SdeBitmapsExternal;

  const zerothBucketInit = 0;
  const firstBucketInit = 1;
  const secondBucketInit = 2;

  const newValue = 10;

  describe("bucket setters and getters", async () => {
    describe("getBucketFromBitIndex", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(zerothBucketInit, firstBucketInit, secondBucketInit);
      });

      it("Should return the correct bucket value for the 0th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(0)).to.eq(
          zerothBucketInit
        );
      });

      it("Should return the correct bucket value for the 128th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(128)).to.eq(
          zerothBucketInit
        );
      });

      it("Should return the correct value for the 255th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(255)).to.eq(
          zerothBucketInit
        );
      });

      it("Should return the correct bucket value for the 256th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(256)).to.eq(
          firstBucketInit
        );
      });

      it("Should return the correct bucket value for the 384th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(384)).to.eq(
          firstBucketInit
        );
      });

      it("Should return the correct bucket value for the 511th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(511)).to.eq(
          firstBucketInit
        );
      });

      it("Should return the correct bucket value for the 512th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(512)).to.eq(
          secondBucketInit
        );
      });

      it("Should return the correct bucket value for the 640th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(640)).to.eq(
          secondBucketInit
        );
      });

      it("Should return the correct bucket value for the 767th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(767)).to.eq(
          secondBucketInit
        );
      });
    });

    describe("getBucket", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(zerothBucketInit, firstBucketInit, secondBucketInit);
      });

      it("Should get the correct value from  the 0th bucket", async () => {
        const bucket = await _SdeBitmapsExternal.test_getBucket(0);
        expect(bucket).to.equal(0);
      });

      it("Should get the correct value from  the 1st bucket", async () => {
        const bucket = await _SdeBitmapsExternal.test_getBucket(1);
        expect(bucket).to.equal(firstBucketInit);
      });

      it("Should get the correct value from  the 2nd bucket", async () => {
        const bucket = await _SdeBitmapsExternal.test_getBucket(2);
        expect(bucket).to.equal(2);
      });
    });

    describe("setBucket", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(zerothBucketInit, firstBucketInit, secondBucketInit);
      });
      it("Should set the correct value in the 0th bucket", async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(0)).to.eq(
          zerothBucketInit
        );
        await _SdeBitmapsExternal.test_setBucket(0, newValue);
        expect(await _SdeBitmapsExternal.test_getBucket(0)).to.eq(newValue);
      });

      it("Should set the correct value in the 1st bucket", async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(1)).to.eq(
          firstBucketInit
        );
        await _SdeBitmapsExternal.test_setBucket(1, newValue);
        expect(await _SdeBitmapsExternal.test_getBucket(1)).to.eq(newValue);
      });

      it("Should set the correct value in the 2nd bucket", async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(2)).to.eq(
          secondBucketInit
        );
        await _SdeBitmapsExternal.test_setBucket(2, newValue);
        expect(await _SdeBitmapsExternal.test_getBucket(2)).to.eq(newValue);
      });

      it("Should set the correct value in the MaxUint256 bucket", async () => {
        const maxUint256 = ethers.constants.MaxUint256;
        expect(await _SdeBitmapsExternal.test_getBucket(maxUint256)).to.eq(0);
        await _SdeBitmapsExternal.test_setBucket(maxUint256, newValue);
        expect(await _SdeBitmapsExternal.test_getBucket(maxUint256)).to.eq(
          newValue
        );
      });
    });
  });

  describe("bit setters and getters", async () => {
    describe("getBit when not set", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(0, 0, 0);
      });
      it("Should return false for the 0th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.be.false;
      });
      it("Should return false for the 1st bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.be.false;
      });
      it("Should return false for the 2nd bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(2)).to.be.false;
      });
    });

    describe("getBit when set", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
      });
      it("Should return true for the 0th bit", async () => {
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(1, 0, 0);
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.be.true;
      });
      it("Should return true for the 1st bit", async () => {
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(2, 0, 0);
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.be.true;
      });
      it("Should return true for the 2nd bit", async () => {
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(4, 0, 0);
        expect(await _SdeBitmapsExternal.test_getBit(2)).to.be.true;
      });
    });

    describe("setBit", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
        ).deploy(0, 0, 0);
      });
      it("Should set the 0th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.be.false;
        await _SdeBitmapsExternal.test_setBit(0);
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.be.true;
      });
      it("Should set the 1st bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.be.false;
        await _SdeBitmapsExternal.test_setBit(1);
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.be.true;
      });
      it("Should set the 2nd bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(2)).to.be.false;
        await _SdeBitmapsExternal.test_setBit(2);
        expect(await _SdeBitmapsExternal.test_getBit(2)).to.be.true;
      });
      it("Should set the MaxUint256th bit", async () => {
        const maxUint256 = ethers.constants.MaxUint256;
        expect(await _SdeBitmapsExternal.test_getBit(maxUint256)).to.be.false;
        await _SdeBitmapsExternal.test_setBit(maxUint256);
        expect(await _SdeBitmapsExternal.test_getBit(maxUint256)).to.be.true;
      });
    });

    describe("unsetBit", async () => {
      beforeEach(async () => {
        await deployments.fixture();
        [Deployer] = await ethers.getSigners();
        _SdeBitmapsExternal = await new SdeBitmapsExternal__factory(
          Deployer
          // Sets the first three bits
        ).deploy(7, 0, 0);
      });

      it("Should unset the 0th bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.be.true;
        await _SdeBitmapsExternal.test_unsetBit(0);
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.be.false;
      });

      it("Should unset the 1st bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.be.true;
        await _SdeBitmapsExternal.test_unsetBit(1);
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.be.false;
      });

      it("Should unset the 2nd bit", async () => {
        expect(await _SdeBitmapsExternal.test_getBit(2)).to.be.true;
        await _SdeBitmapsExternal.test_unsetBit(2);
        expect(await _SdeBitmapsExternal.test_getBit(2)).to.be.false;
      });

      it("Should unset the MaxUint256th bit", async () => {
        const maxUint256 = ethers.constants.MaxUint256;
        await _SdeBitmapsExternal.test_setBit(maxUint256);
        expect(await _SdeBitmapsExternal.test_getBit(maxUint256)).to.be.true;
        await _SdeBitmapsExternal.test_unsetBit(maxUint256);
        expect(await _SdeBitmapsExternal.test_getBit(maxUint256)).to.be.false;
      });
    });
  });
});
