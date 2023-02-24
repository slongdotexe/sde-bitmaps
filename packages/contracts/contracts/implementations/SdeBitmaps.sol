pragma solidity 0.8.18;
// SPDX-License-Identifier: MIT

import "./SdeBitmapsCore.sol";
import "../interfaces/ISdeBitmaps.sol";
import "hardhat/console.sol";

contract SdeBitmaps is ISdeBitmaps {
  using SdeBitmapsCore for SdeBitmapsCore.BitMap;

  SdeBitmapsCore.BitMap internal testBitmap;

  constructor() {}

  function setBucket() external override {
    testBitmap.setBucket(0, type(uint256).max);
  }

  function getBucket() external view override returns (uint256 bucket) {
    bucket = SdeBitmapsCore.maskInsideRange(testBitmap.getBucket(0), 0, 16);
    console.log(bucket);
  }

  function generateMask(
    uint256 _start,
    uint256 _end
  ) external pure returns (uint256 mask) {
    mask = SdeBitmapsCore.createMask(_start, _end);
  }
}
