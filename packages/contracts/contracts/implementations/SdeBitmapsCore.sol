pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

library SdeBitmapsCore {
    struct BitMap {
        mapping(uint256 => uint256) _data;
    }

    function getBucket(
        BitMap storage bitmap,
        uint256 bucketIndex
    ) internal view returns (uint256 bucket) {
        bucket = bitmap._data[bucketIndex];
    }

    function setBucket(
        BitMap storage bitmap,
        uint256 index,
        uint256 bucketContents
    ) internal {
        bitmap._data[index] = bucketContents;
    }

    /**
     * @dev Returns whether the bit at `index` is set.
     */
    function isBitSet(
        BitMap storage bitmap,
        uint256 bitIndex
    ) internal view returns (bool) {
        uint256 bucket = getBucketFromBitIndex(bitIndex);
        uint256 mask = 1 << (bitIndex & 0xff);
        return bitmap._data[bucket] & mask != 0;
    }

    /**
     * @dev Sets the bit at `index` to the boolean `value`.
     */
    function setBitTo(
        BitMap storage bitmap,
        uint256 index,
        bool value
    ) internal {
        if (value) {
            setBit(bitmap, index);
        } else {
            unsetBit(bitmap, index);
        }
    }

    /**
     * @dev Sets the bit at `index`.
     */
    function setBit(BitMap storage bitmap, uint256 bitIndex) internal {
        uint256 bucket = bitIndex >> 8;
        uint256 mask = 1 << (bitIndex & 0xff);
        bitmap._data[bucket] |= mask;
    }

    /**
     * @dev Unsets the bit at `index`.
     */
    function unsetBit(BitMap storage bitmap, uint256 bitIndex) internal {
        uint256 bucket = getBucketFromBitIndex(bitIndex);
        uint256 mask = 1 << (bitIndex & 0xff);
        bitmap._data[bucket] &= ~mask;
    }

    function getBucketFromBitIndex(
        uint256 bitIndex
    ) internal pure returns (uint256 bucket) {
        bucket = bitIndex >> 8;
    }

    function selectInsideRange(
        BitMap storage _bitmap,
        uint256 _bucketIndex,
        uint8 _start,
        uint8 _end
    ) internal view returns (uint256 bits) {
        uint256 mask = (type(uint256).max << _start) &
            (type(uint256).max >> (255 - _end));
        bits = getBucket(_bitmap, _bucketIndex) & mask;
    }
    //TODO WIP
    // function maskInsideRange(
    //   uint256 _bits,
    //   uint256 _start,
    //   uint256 _end
    // ) internal pure returns (uint256 bits) {
    //   uint256 mask = (type(uint256).max << _start) & (type(uint256).max >> _end);
    //   bits = _bits & mask;
    // }

    // function maskOutsideRange(
    //   uint256 _bits,
    //   uint256 _start,
    //   uint256 _end
    // ) internal pure returns (uint256 bits) {
    //   uint256 mask = (type(uint256).max << _start) & (type(uint256).max >> _end);
    //   bits = _bits & ~mask;
    // }
}
