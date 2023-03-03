pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

import "../implementations/SdeBitmapsCore.sol";

interface ISdeBitmaps {
    function selectInsideRange(
        uint256 _bucketIndex,
        uint8 _start,
        uint8 _end
    ) external view returns (uint256 bits);

    function getBucket(
        uint256 bucketIndex
    ) external view returns (uint256 bucket);

    function setBucket(uint256 _bucketIndex, uint256 _bucketContents) external;

    function unsetBit(uint256 _bitIndex) external;
}
