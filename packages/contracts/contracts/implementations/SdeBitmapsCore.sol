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
    function get(
        BitMap storage bitmap,
        uint256 index
    ) internal view returns (bool) {
        uint256 bucket = index >> 8;
        uint256 mask = 1 << (index & 0xff);
        return bitmap._data[bucket] & mask != 0;
    }

    /**
     * @dev Sets the bit at `index` to the boolean `value`.
     */
    function setTo(BitMap storage bitmap, uint256 index, bool value) internal {
        if (value) {
            set(bitmap, index);
        } else {
            unset(bitmap, index);
        }
    }

    /**
     * @dev Sets the bit at `index`.
     */
    function set(BitMap storage bitmap, uint256 index) internal {
        uint256 bucket = index >> 8;
        uint256 mask = 1 << (index & 0xff);
        bitmap._data[bucket] |= mask;
    }

    /**
     * @dev Unsets the bit at `index`.
     */
    function unset(BitMap storage bitmap, uint256 index) internal {
        uint256 bucket = index >> 8;
        uint256 mask = 1 << (index & 0xff);
        bitmap._data[bucket] &= ~mask;
    }

    function createMask(
        uint256 _start,
        uint256 _end
    ) internal pure returns (uint256 mask) {
        mask =
            (type(uint256).max << (_start)) &
            (type(uint256).max >> (_end + 1));
    }

    function maskInsideRange(
        uint256 _bits,
        uint256 _start,
        uint256 _end
    ) internal pure returns (uint256 bits) {
        uint256 mask = (type(uint256).max << _start) &
            (type(uint256).max >> _end);
        bits = _bits & mask;
    }

    function maskOutsideRange(
        uint256 _bits,
        uint256 _start,
        uint256 _end
    ) internal pure returns (uint256 bits) {
        uint256 mask = (type(uint256).max << _start) &
            (type(uint256).max >> _end);
        bits = _bits & ~mask;
    }
}
