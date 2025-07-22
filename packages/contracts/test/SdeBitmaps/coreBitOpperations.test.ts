/* eslint-disable no-plusplus -- --*/
/* eslint-disable no-await-in-loop -- --*/
import { expect } from 'chai'
import { deployments, ethers } from 'hardhat'
import { BigNumberBitmaps } from 'sde-bitmaps-lib'

import { SdeBitmapsExternal } from '../../typechain-types'

describe('Core Bit Opperations', async () => {
  let _SdeBitmapsExternal: SdeBitmapsExternal

  const { MaxUint256 } = ethers.constants

  describe('Set/get operations', async () => {
    describe('flipBucket', async () => {
      const zerothBucketInit = MaxUint256
      const firstBucketInit = MaxUint256.sub(1)
      const MaxUint25Bucket = MaxUint256.sub(2)
      beforeEach(async () => {
        await deployments.fixture('testbed')
        _SdeBitmapsExternal = await ethers.getContract('SdeBitmapsExternal')
        await _SdeBitmapsExternal.test_setBucket(0, zerothBucketInit)
        await _SdeBitmapsExternal.test_setBucket(1, firstBucketInit)
        await _SdeBitmapsExternal.test_setBucket(MaxUint256, MaxUint25Bucket)
      })

      it('Should flip the 0th bucket', async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(0)).to.equal(zerothBucketInit)
        await _SdeBitmapsExternal.test_flipBucket(0)
        expect(await _SdeBitmapsExternal.test_getBucket(0)).to.equal(
          BigNumberBitmaps.from(zerothBucketInit).flip().value,
        )
      })

      it('Should flip the 1st bucket', async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(1)).to.equal(firstBucketInit)
        await _SdeBitmapsExternal.test_flipBucket(1)
        expect(await _SdeBitmapsExternal.test_getBucket(1)).to.equal(
          BigNumberBitmaps.from(firstBucketInit).flip().value,
        )
      })

      it('Should flip the Uint256Max bucket', async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(MaxUint256)).to.equal(MaxUint25Bucket)
        await _SdeBitmapsExternal.test_flipBucket(MaxUint256)
        expect(await _SdeBitmapsExternal.test_getBucket(MaxUint256)).to.equal(
          BigNumberBitmaps.from(MaxUint25Bucket).flip().value,
        )
      })
    })

    describe('flipBit', async () => {
      beforeEach(async () => {
        await deployments.fixture('testbed')
        _SdeBitmapsExternal = await ethers.getContract('SdeBitmapsExternal')
      })
      it('Should flip the 0th bit', async () => {
        await _SdeBitmapsExternal.test_setBit(0)
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(true)
        await _SdeBitmapsExternal.test_flipBit(0)
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(false)
      })

      it('Should flip the 1st bit', async () => {
        await _SdeBitmapsExternal.test_setBit(1)
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.equal(true)
        await _SdeBitmapsExternal.test_flipBit(1)
        expect(await _SdeBitmapsExternal.test_getBit(1)).to.equal(false)
      })

      it('Should flip the Uint256Max bit', async () => {
        await _SdeBitmapsExternal.test_setBit(MaxUint256)
        expect(await _SdeBitmapsExternal.test_getBit(MaxUint256)).to.equal(true)
        await _SdeBitmapsExternal.test_flipBit(MaxUint256)
        expect(await _SdeBitmapsExternal.test_getBit(MaxUint256)).to.equal(false)
      })
    })
  })

  describe('Utility', async () => {
    describe('getBucketFromBitIndex', async () => {
      beforeEach(async () => {
        await deployments.fixture('testbed')
        _SdeBitmapsExternal = await ethers.getContract('SdeBitmapsExternal')
      })

      it('Should return the correct bucket for the 0th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(0)).to.equal(0)
      })

      it('Should return the correct bucket for the 128th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(128)).to.equal(0)
      })
      it('Should return the correct bucket for the 255th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(255)).to.equal(0)
      })
      it('Should return the correct bucket for the 256th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBucketFromBitIndex(256)).to.equal(1)
      })
    })

    describe('getBitmaskFromBitIndex', async () => {
      beforeEach(async () => {
        await deployments.fixture('testbed')
        _SdeBitmapsExternal = await ethers.getContract('SdeBitmapsExternal')
      })

      it('Should return the correct bitmask for the 0th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBitmaskFromBitIndex(0)).to.equal(1)
      })

      it('Should return the correct bitmask for the 128th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBitmaskFromBitIndex(128)).to.equal(BigInt(2 ** 128))
      })

      it('Should return the correct bitmask for the 255th bit', async () => {
        expect(await _SdeBitmapsExternal.test_getBitmaskFromBitIndex(255)).to.equal(BigInt(2 ** 255))
      })
    })
  })

  describe('Bit shift', async () => {
    describe('shiftLeft', async () => {
      beforeEach(async () => {
        await deployments.fixture('testbed')
        _SdeBitmapsExternal = await ethers.getContract('SdeBitmapsExternal')
        // Sets the first bit
        await _SdeBitmapsExternal.test_setBucket(0, 1)
      })
      it('Should shift left zero places when shift is 0', async () => {
        expect(await _SdeBitmapsExternal.test_getBucket(0)).to.equal(1)
        await _SdeBitmapsExternal.test_shiftLeft(0, 0)
        expect(await _SdeBitmapsExternal.test_getBucket(0)).to.equal(BigNumberBitmaps.from(1).shiftLeft(0).value)
      })

      it('Should shift left one place when shift is 1', async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(true)
        await _SdeBitmapsExternal.test_shiftLeft(0, 1)
        expect(await _SdeBitmapsExternal.test_getBucket(1)).equal(BigNumberBitmaps.from(1).shiftLeft(1).value)
      })

      it('Should shift left 255 places when shift is 255', async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(true)
        await _SdeBitmapsExternal.test_shiftLeft(0, 255)
        expect(await _SdeBitmapsExternal.test_getBucket(1)).equal(BigNumberBitmaps.from(1).shiftLeft(255).value)
      })
    })

    describe('shiftRight', async () => {
      beforeEach(async () => {
        await deployments.fixture('testbed')
        _SdeBitmapsExternal = await ethers.getContract('SdeBitmapsExternal')
        // Sets the first bit
        await _SdeBitmapsExternal.test_setBucket(0, 1)
      })
      it('Should shift right zero places when shift is 0', async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(true)
        await _SdeBitmapsExternal.test_shiftRight(0, 0)
        expect(await _SdeBitmapsExternal.test_getBucket(0)).equal(BigNumberBitmaps.from(1).shiftRight(0).value)
      })

      it('Should shift right one place when shift is 1', async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(true)
        await _SdeBitmapsExternal.test_shiftRight(0, 1)
        expect(await _SdeBitmapsExternal.test_getBucket(0)).equal(BigNumberBitmaps.from(1).shiftRight(1).value)
      })

      it('Should shift right 255 places when shift is 255', async () => {
        expect(await _SdeBitmapsExternal.test_getBit(0)).to.equal(true)
        await _SdeBitmapsExternal.test_shiftRight(0, 255)
        expect(await _SdeBitmapsExternal.test_getBucket(0)).equal(BigNumberBitmaps.from(1).shiftRight(255).value)
      })
    })
  })
})
