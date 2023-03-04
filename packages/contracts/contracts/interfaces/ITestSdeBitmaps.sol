pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

import "../implementations/SdeBitmapsCore.sol";

interface ITestSdeBitmaps {
    function test_selectInsideRange(
        uint256 bucketIndex,
        uint8 start,
        uint8 end
    ) external view returns (uint256 bucketBits);

    function test_getBucket(
        uint256 bucketIndex
    ) external view returns (uint256 bucketBits);

    function test_setBucket(
        uint256 bucketIndex,
        uint256 bucketContents
    ) external;

    function test_setBit(uint256 bitIndex) external;

    function test_unsetBit(uint256 bitIndex) external;

    function test_isBitSet(uint256 bitIndex) external view returns (bool isSet);

    function test_setBitsInBucket(
        uint256 bucketIndex,
        uint8[] calldata bits
    ) external;

    function test_unsetBitsInBucket(
        uint256 bucketIndex,
        uint8[] calldata bits
    ) external;
}
