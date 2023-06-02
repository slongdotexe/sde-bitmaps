pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

library SdeBitmapsCore {
  struct BitMap {
    mapping(uint256 => uint256) _data;
  }

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
  function getBitmaskFromBitIndex(
    uint256 bitIndex
  ) internal pure returns (uint256 mask) {
    mask = 1 << (bitIndex & 0xff);
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
   * @dev Inverts the contents of a bucket.
   */
  function flipBucket(BitMap storage bitmap, uint256 bucketIndex) internal {
    bitmap._data[bucketIndex] = ~bitmap._data[bucketIndex];
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
    uint256 mask = getBitmaskFromBitIndex(_index);
    return _bitmap._data[bucket] & mask != 0;
  }

  /**
   * @dev Sets the bit at `index`.
   * Orignally published in Bitmaps.sol by OpenZeppelin as `set`
   */
  function setBit(BitMap storage bitmap, uint256 bitIndex) internal {
    bitmap._data[getBucketFromBitIndex(bitIndex)] |= getBitmaskFromBitIndex(
      bitIndex
    );
  }

  /**
   * @dev Unsets the bit at `index`.
   * Orignally published in Bitmaps.sol by OpenZeppelin as `unset`
   */
  function unsetBit(BitMap storage bitmap, uint256 bitIndex) internal {
    bitmap._data[getBucketFromBitIndex(bitIndex)] &= ~getBitmaskFromBitIndex(
      bitIndex
    );
  }

  /**
   * @dev Toggles the bit at `index`.
   */
  function flipBit(BitMap storage bitmap, uint256 bitIndex) internal {
    bitmap._data[getBucketFromBitIndex(bitIndex)] ^= getBitmaskFromBitIndex(
      bitIndex
    );
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
   */
  function setBitsInBucket(
    BitMap storage _bitmap,
    uint256 bucketIndex,
    uint8[] calldata indices
  ) internal {
    uint256 bucket = _bitmap._data[bucketIndex];
    for (uint256 i = 0; i < indices.length; i++) {
      bucket |= 1 << indices[i];
    }
    _bitmap._data[bucketIndex] = bucket;
  }

  // TODO: tests
  /**
   *
   * @dev Unsets the bit indices in `indices` in the bucket at `bucketIndex`.
   */
  function unsetBitsInBucket(
    BitMap storage _bitmap,
    uint256 bucketIndex,
    uint8[] calldata indices
  ) internal {
    uint256 bucket = _bitmap._data[bucketIndex];
    for (uint256 i = 0; i < indices.length; i++) {
      bucket &= ~(1 << indices[i]);
    }
    _bitmap._data[bucketIndex] = bucket;
  }

  // TODO: tests
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
