pragma solidity 0.8.18;
// SPDX-License-Identifier: MIT

import "./SdeBitmapsCore.sol";
import "../interfaces/_ISdebitmapsExternal.sol";

// Utility contract for testing SdeBitmapsCore

contract SdeBitmapsExternal is ISdeBitmapsExternal {
  using SdeBitmapsCore for SdeBitmapsCore.BitMap;

  SdeBitmapsCore.BitMap internal testBitmap;

  constructor(
    uint256 bitmapZeroValue,
    uint256 bitmapOneValue,
    uint256 bitmapTwoValue
  ) {
    testBitmap.setBucket(0, bitmapZeroValue);
    testBitmap.setBucket(1, bitmapOneValue);
    testBitmap.setBucket(2, bitmapTwoValue);
  }

  function test_getBucket(
    uint256 bucketIndex
  ) external view override returns (uint256 bucketBits) {
    bucketBits = testBitmap.getBucket(bucketIndex);
  }

  function test_setBucket(
    uint256 bucketIndex,
    uint256 bucketBits
  ) external override {
    testBitmap.setBucket(bucketIndex, bucketBits);
  }

  function test_getBit(
    uint256 bitIndex
  ) external view override returns (bool isSet) {
    isSet = testBitmap.getBit(bitIndex);
  }

  function test_setBit(uint256 bitIndex) external override {
    testBitmap.setBit(bitIndex);
  }

  function test_unsetBit(uint256 bitIndex) external override {
    testBitmap.unsetBit(bitIndex);
  }

  function test_getBucketFromBitIndex(
    uint256 bitIndex
  ) external pure override returns (uint256 bucket) {
    bucket = SdeBitmapsCore.getBucketFromBitIndex(bitIndex);
  }

  function test_getBitmaskFromBitIndex(
    uint256 bitIndex
  ) external pure override returns (uint256 mask) {
    mask = SdeBitmapsCore.getBitmaskFromBitIndex(bitIndex);
  }

  function test_flipBucket(uint256 bucketIndex) external override {
    testBitmap.flipBucket(bucketIndex);
  }

  function test_flipBit(uint256 bitIndex) external override {
    testBitmap.flipBit(bitIndex);
  }

  function test_shiftLeft(uint256 bucketIndex, uint8 shift) external override {
    testBitmap.shiftLeft(bucketIndex, shift);
  }

  function test_shiftRight(uint256 bucketIndex, uint8 shift) external override {
    testBitmap.shiftRight(bucketIndex, shift);
  }
}
