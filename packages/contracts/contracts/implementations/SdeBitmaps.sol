pragma solidity 0.8.18;
// SPDX-License-Identifier: MIT

import "./SdeBitmapsCore.sol";
import "../interfaces/ISdeBitmaps.sol";

contract SdeBitmaps is ISdeBitmaps {
    using SdeBitmapsCore for SdeBitmapsCore.BitMap;

    SdeBitmapsCore.BitMap internal testBitmap;

    function selectInsideRange(
        uint256 _bucketIndex,
        uint8 _start,
        uint8 _end
    ) public view returns (uint256 bucketBits) {
        bucketBits = testBitmap.selectInsideRange(_bucketIndex, _start, _end);
    }

    function getBucket(
        uint256 _bucketIndex
    ) external view returns (uint256 bucketBits) {
        bucketBits = testBitmap.getBucket(_bucketIndex);
    }

    function setBucket(uint256 _bucketIndex, uint256 _bucketContents) external {
        testBitmap.setBucket(_bucketIndex, _bucketContents);
    }

    function setBit(uint256 _bitIndex) external {
        testBitmap.setBit(_bitIndex);
    }

    function unsetBit(uint256 _bitIndex) external {
        testBitmap.unsetBit(_bitIndex);
    }

    constructor() {}
}
