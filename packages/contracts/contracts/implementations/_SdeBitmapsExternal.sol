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
  ) external view returns (uint256 bucketBits) {
    bucketBits = testBitmap.getBucket(bucketIndex);
  }

  function test_setBucket(uint256 bucketIndex, uint256 bucketBits) external {
    testBitmap.setBucket(bucketIndex, bucketBits);
  }

  function test_getBit(uint256 bitIndex) external view returns (bool isSet) {
    isSet = testBitmap.getBit(bitIndex);
  }

  function test_setBit(uint256 bitIndex) external {
    testBitmap.setBit(bitIndex);
  }

  function test_unsetBit(uint256 bitIndex) external {
    testBitmap.unsetBit(bitIndex);
  }

  function test_getBucketFromBitIndex(
    uint256 bitIndex
  ) external pure returns (uint256 bucket) {
    bucket = SdeBitmapsCore.getBucketFromBitIndex(bitIndex);
  }
}
