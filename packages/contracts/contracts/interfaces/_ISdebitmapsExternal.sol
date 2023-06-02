pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

interface ISdeBitmapsExternal {
  function test_getBucketFromBitIndex(
    uint256 bitIndex
  ) external pure returns (uint256 bucket);

  function test_getBucket(
    uint256 bucketIndex
  ) external view returns (uint256 bucketBits);

  function test_setBucket(uint256 bucketIndex, uint256 bucketBits) external;

  function test_getBit(uint256 bitIndex) external view returns (bool isSet);

  function test_setBit(uint256 bitIndex) external;

  function test_unsetBit(uint256 bitIndex) external;

  function test_flipBucket(uint256 bucketIndex) external;

  function test_flipBit(uint256 bitIndex) external;

  function test_getBitmaskFromBitIndex(
    uint256 bitIndex
  ) external pure returns (uint256 mask);

  function test_shiftLeft(uint256 bucketIndex, uint8 shift) external;

  function test_shiftRight(uint256 bucketIndex, uint8 shift) external;
}
