pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

interface ISdeBitmaps {
    function setBucket() external;

    function getBucket() external view returns (uint256);
}
