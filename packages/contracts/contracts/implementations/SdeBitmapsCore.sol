pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

library SdeBitmapsCore {
  struct BitMap {
    mapping(uint256 => uint256) _data;
  }

  // ###  Bitwise Getters/Setters  ###
  // ###                      ###

  /**
   * @dev Sets the bit at `index`.
   * Orignally published in Bitmaps.sol by OpenZeppelin as `set`
   */
  function setBit(BitMap storage bitmap, uint256 bitIndex) internal {
    bitmap._data[getBucketFromBitIndex(bitIndex)] |= getBitMaskFromBitIndex(
      bitIndex
    );
  }

  /**
   * @dev Returns whether the bit at `index` is set.
   * Originally published in Bitmaps.sol by OpenZeppelin as `get`
   */
  function getBit(
    BitMap storage _bitmap,
    uint256 _index
  ) internal view returns (bool isSet) {
    uint256 bucket = (getBucketFromBitIndex(_index));
    uint256 mask = getBitMaskFromBitIndex(_index);
    return _bitmap._data[bucket] & mask != 0;
  }

  /**
   * @dev Unsets the bit at `index`.
   * Originally published in Bitmaps.sol by OpenZeppelin as `unset`
   */
  function unsetBit(BitMap storage bitmap, uint256 bitIndex) internal {
    bitmap._data[getBucketFromBitIndex(bitIndex)] &= ~getBitMaskFromBitIndex(
      bitIndex
    );
  }

  /**
   * @dev Toggles the bit at `index`.
   */
  function flipBit(BitMap storage bitmap, uint256 bitIndex) internal {
    bitmap._data[getBucketFromBitIndex(bitIndex)] ^= getBitMaskFromBitIndex(
      bitIndex
    );
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

  function setBitsInRange(
    BitMap storage bitmap,
    uint256 startIndex,
    uint256 endIndex
  ) internal {
    _updateBitsInRange(bitmap, startIndex, endIndex, true);
  }

  function unsetBitsInRange(
    BitMap storage bitmap,
    uint256 startIndex,
    uint256 endIndex
  ) internal {
    _updateBitsInRange(bitmap, startIndex, endIndex, false);
  }

  // ###  Utility Operations  ###
  // ###                      ###

  /**
   * @dev Gets the bucket index at `bitIndex`.
   */
  function getBucketFromBitIndex(
    uint256 bitIndex
  ) internal pure returns (uint256 bucket) {
    bucket = bitIndex >> 8;
  }

  /**
   * @dev Returns a bitmask representing a single bit at `bitIndex`.
   */
  function getBitMaskFromBitIndex(
    uint256 bitIndex
  ) internal pure returns (uint256 mask) {
    mask = 1 << (bitIndex & 0xff);
  }

  /**
   * @dev Inverts the contents of a bucket.
   */
  function flipBucket(BitMap storage bitmap, uint256 bucketIndex) internal {
    bitmap._data[bucketIndex] = ~bitmap._data[bucketIndex];
  }

  /**
   * @dev Bit shift left
   */
  function shiftLeft(
    BitMap storage bitmap,
    uint256 bucketIndex,
    uint8 places
  ) internal {
    bitmap._data[bucketIndex] = bitmap._data[bucketIndex] << places;
  }

  /**
   * @dev Bit shift right
   */
  function shiftRight(
    BitMap storage bitmap,
    uint256 bucketIndex,
    uint8 places
  ) internal {
    uint256 bucket = bitmap._data[bucketIndex];
    bitmap._data[bucketIndex] = bucket >> places;
  }

  // ##### UNTESTED CODE #####

  // TODO: tests
  /**
   * @dev Sets the bit indices in `indices` in the bucket at `bucketIndex`.
   * Optimized version that builds the mask first, then applies it in one operation.
   */
  function setBitsInBucket(
    BitMap storage _bitmap,
    uint256 bucketIndex,
    uint8[] calldata indices
  ) internal {
    uint256 mask = 0;
    // Build mask with all bits to set
    for (uint256 i = 0; i < indices.length; ) {
      mask |= 1 << indices[i];
      unchecked {
        ++i;
      }
    }
    // Apply mask in single operation
    _bitmap._data[bucketIndex] |= mask;
  }

  // TODO: tests
  /**
   * @dev Unsets the bit indices in `indices` in the bucket at `bucketIndex`.
   * Optimized version that builds the mask first, then applies it in one operation.
   */
  function unsetBitsInBucket(
    BitMap storage _bitmap,
    uint256 bucketIndex,
    uint8[] calldata indices
  ) internal {
    uint256 mask = 0;
    // Build mask with all bits to unset
    for (uint256 i = 0; i < indices.length; ) {
      mask |= 1 << indices[i];
      unchecked {
        ++i;
      }
    }
    // Apply inverted mask in single operation
    _bitmap._data[bucketIndex] &= ~mask;
  }

  /**
   * @dev Internal helper to set or unset bits in a range across buckets.
   * Optimized for gas efficiency with pre-computed constants and reduced operations.
   */
  function _updateBitsInRange(
    BitMap storage bitmap,
    uint256 startIndex,
    uint256 endIndex,
    bool setBits
  ) private {
    if (startIndex > endIndex) return;

    uint256 startBucket = startIndex >> 8;
    uint256 endBucket = endIndex >> 8;

    // Single bucket optimization
    if (startBucket == endBucket) {
      uint256 startBit = startIndex & 0xff;
      uint256 endBit = endIndex & 0xff;

      uint256 mask;
      if (startBit == 0 && endBit == 255) {
        mask = type(uint256).max;
      } else {
        mask =
          (type(uint256).max >> (255 - endBit)) &
          (type(uint256).max << startBit);
      }

      if (setBits) {
        bitmap._data[startBucket] |= mask;
      } else {
        bitmap._data[startBucket] &= ~mask;
      }
      return;
    }
    uint256 bucketData;

    // Handle first partial bucket
    uint256 startBit = startIndex & 0xff;
    if (startBit == 0) {
      bitmap._data[startBucket] = setBits ? type(uint256).max : 0;
    } else {
      uint256 mask = type(uint256).max << startBit;
      bucketData = bitmap._data[startBucket];
      bitmap._data[startBucket] = setBits
        ? (bucketData | mask)
        : (bucketData & ~mask);
    }

    // Handle middle buckets
    uint256 middleValue = setBits ? type(uint256).max : 0;
    for (uint256 b = startBucket + 1; b < endBucket; ) {
      bitmap._data[b] = middleValue;
      unchecked {
        ++b;
      }
    }

    // Handle last partial bucket
    uint256 endBit = endIndex & 0xff;
    if (endBit == 255) {
      bitmap._data[endBucket] = setBits ? type(uint256).max : 0;
    } else {
      uint256 mask = (1 << (endBit + 1)) - 1;
      bucketData = bitmap._data[endBucket];
      bitmap._data[endBucket] = setBits
        ? (bucketData | mask)
        : (bucketData & ~mask);
    }
  }
}
