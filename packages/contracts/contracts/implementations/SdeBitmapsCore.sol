pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

library SdeBitmapsCore {
    struct BitMap {
        mapping(uint256 => uint256) _data;
    }

    function getBucketFromBitIndex(
        uint256 bitIndex
    ) internal pure returns (uint256 bucket) {
        bucket = bitIndex >> 8;
    }

    /**
     * @dev Gets the bucket at `bucketIndex` (raw value).
     */
    function getBucket(
        BitMap storage bitmap,
        uint256 bucketIndex
    ) internal view returns (uint256 bucket) {
        bucket = bitmap._data[bucketIndex];
    }

    /**
     * @dev Sets the bucket at `bucketIndex` to `bucketContents` (raw value).
     */
    function setBucket(
        BitMap storage bitmap,
        uint256 index,
        uint256 bucketContents
    ) internal {
        bitmap._data[index] = bucketContents;
    }

    /**
     * @dev Returns whether the bit at `index` is set.
     * Originally published in Bitmaps.sol by OpenZeppelin as `get`
     */
    function getBit(
        BitMap storage _bitmap,
        uint256 _index
    ) internal view returns (bool isSet) {
        uint256 bucket = _index >> 8;
        uint256 mask = 1 << (_index & 0xff);
        return _bitmap._data[bucket] & mask != 0;
    }

    /**
     * @dev Sets the bit at `index`.
     * Orignally published in Bitmaps.sol by OpenZeppelin as `set`
     */
    function setBit(BitMap storage bitmap, uint256 bitIndex) internal {
        uint256 bucket = bitIndex >> 8;
        uint256 mask = 1 << (bitIndex & 0xff);
        bitmap._data[bucket] |= mask;
    }

    /**
     * @dev Unsets the bit at `index`.
     * Orignally published in Bitmaps.sol by OpenZeppelin as `unset`
     */
    function unsetBit(BitMap storage bitmap, uint256 bitIndex) internal {
        uint256 bucket = getBucketFromBitIndex(bitIndex);
        uint256 mask = 1 << (bitIndex & 0xff);
        bitmap._data[bucket] &= ~mask;
    }

    /**
     * @dev Sets the bit indices in `indeices` in the bucket at `bucketIndex`.
     */
    function setBitsInBucket(
        BitMap storage _bitmap,
        uint256 bucketIndex,
        uint8[] calldata indeices
    ) internal {
        uint256 bucket = _bitmap._data[bucketIndex];
        for (uint256 i = 0; i < indeices.length; i++) {
            bucket |= 1 << indeices[i];
        }
        _bitmap._data[bucketIndex] = bucket;
    }

    /**
     *
     * @dev Unsets the bit indices in `indeices` in the bucket at `bucketIndex`.
     */
    function unsetBitsInBucket(
        BitMap storage _bitmap,
        uint256 bucketIndex,
        uint8[] calldata indeices
    ) internal {
        uint256 bucket = _bitmap._data[bucketIndex];
        for (uint256 i = 0; i < indeices.length; i++) {
            bucket &= ~(1 << indeices[i]);
        }
        _bitmap._data[bucketIndex] = bucket;
    }

    /**
     * @dev Returns bucket at `bucketIndex`, masked to only include bits between `_start` and `_end`.
     */
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
