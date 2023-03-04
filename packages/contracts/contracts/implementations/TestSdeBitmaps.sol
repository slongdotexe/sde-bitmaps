pragma solidity 0.8.18;
// SPDX-License-Identifier: MIT

import "./SdeBitmapsCore.sol";
import "../interfaces/ITestSdeBitmaps.sol";

contract TestSdeBitmaps is ITestSdeBitmaps {
    using SdeBitmapsCore for SdeBitmapsCore.BitMap;

    SdeBitmapsCore.BitMap internal testBitmap;

    function test_selectInsideRange(
        uint256 bucketIndex,
        uint8 start,
        uint8 end
    ) public view returns (uint256 bucketBits) {
        bucketBits = testBitmap.selectInsideRange(bucketIndex, start, end);
    }

    function test_getBucket(
        uint256 bucketIndex
    ) external view returns (uint256 bucketBits) {
        bucketBits = testBitmap.getBucket(bucketIndex);
    }

    function test_setBucket(
        uint256 bucketIndex,
        uint256 bucketContents
    ) external {
        testBitmap.setBucket(bucketIndex, bucketContents);
    }

    function test_setBit(uint256 bitIndex) external {
        testBitmap.setBit(bitIndex);
    }

    function test_unsetBit(uint256 bitIndex) external {
        testBitmap.unsetBit(bitIndex);
    }

    function test_isBitSet(
        uint256 bitIndex
    ) external view override returns (bool isSet) {
        isSet = testBitmap.getBit(bitIndex);
    }

    function test_setBitsInBucket(
        uint256 bucketIndex,
        uint8[] calldata bits
    ) external {
        testBitmap.setBitsInBucket(bucketIndex, bits);
    }

    function test_unsetBitsInBucket(
        uint256 bucketIndex,
        uint8[] calldata bits
    ) external {
        testBitmap.unsetBitsInBucket(bucketIndex, bits);
    }

    constructor() {}
}
