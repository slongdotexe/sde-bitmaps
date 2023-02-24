pragma solidity 0.8.18;
// SPDX-License-Identifier: MIT

import "./SdeBitmapsCore.sol";
import "../interfaces/IBitmaps.sol";
import "hardhat/console.sol";

contract SdeBitmaps is IBitmaps {
    using BitmapsCore for BitmapsCore.BitMap;

    BitmapsCore.BitMap internal testBitmap;

    constructor() {}

    function setBucket() external override {
        testBitmap.setBucket(0, type(uint256).max);
    }

    function getBucket() external view override returns (uint256 bucket) {
        bucket = BitmapsCore.maskInsideRange(testBitmap.getBucket(0), 0, 16);
        console.log(bucket);
    }

    function generateMask(
        uint256 _start,
        uint256 _end
    ) external pure returns (uint256 mask) {
        mask = BitmapsCore.createMask(_start, _end);
    }
}
