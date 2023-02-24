/* eslint-disable camelcase -- -- */
import BN from "bn.js";
import { expect } from "chai";

import { generateMask } from "../../../lib/bitmaps";

describe("generateMask tests", async () => {
  const compareMasks = (generated: BN, canonincal: string) => {
    const canonincalBN = new BN(canonincal, 2);
    expect(canonincalBN.eq(generated)).eq(true);
  };

  // Range is inclusive, i.e minimum one bit will always be in the mask, therefore 0 is not possible

  it("startIndex=0, endIndex=0 - expect 0001 (decimal 1)", async () => {
    const binary = "0001";
    const generatedMask = generateMask(0, 0, 0, 4);
    compareMasks(generatedMask, binary);
  });

  it("startIndex=1, endIndex=1 - expect 0010 (decimal 2)", async () => {
    const binary = "0010";
    const generatedMask = generateMask(1, 1, 0, 4);
    compareMasks(generatedMask, binary);
  });

  it("startIndex=0, endIndex=1 - expect 0011 (decimal 3)", async () => {
    const binary = "0011";
    const generatedMask = generateMask(0, 1, 0, 4);
    compareMasks(generatedMask, binary);
  });

  it("startIndex=2, endIndex=2 - expect 0100 (decimal 4)", async () => {
    const binary = "0100";
    const generatedMask = generateMask(2, 2, 0, 4);
    compareMasks(generatedMask, binary);
  });

  // Not possible as the generated mask is contiguous
  it("startIndex=x, endIndex=x - expect 0101 (decimal 5", async () => {});

  it("startIndex=1, endIndex=2 - expect 0110 (decimal 6)", async () => {
    const binary = "0110";
    const generatedMask = generateMask(1, 2, 0, 4);
    compareMasks(generatedMask, binary);
  });

  it("startIndex=0, endIndex=2 - expect 0111(decimal 7)", async () => {
    const binary = "0111";
    const generatedMask = generateMask(0, 2, 0, 4);
    compareMasks(generatedMask, binary);
  });

  it("startIndex=0, endIndex=3 - expect 1000 (decimal 8)", async () => {
    const binary = "1000";
    const generatedMask = generateMask(3, 3, 0, 4);
    compareMasks(generatedMask, binary);
  });

  // Not really possibly as masking is contiguous
  it("startIndex=x, endIndex=x - expect 1001 (decimal 9)", async () => {});

  // Not really possibly as masking is contiguous
  it("startIndex=x, endIndex=x - expect 1010 (decimal 10)", async () => {});

  // Not really possibly as masking is contiguous
  it("startIndex=x, endIndex=x - expect 1011 (decimal 11)", async () => {});

  it("startIndex=2, endIndex=3 - expect 1100 (decimal 12)", async () => {
    const binary = "1100";
    const generatedMask = generateMask(2, 3, 0, 4);
    compareMasks(generatedMask, binary);
  });
  // Not really possibly as masking is contiguous
  it("startIndex=x, endIndex=x - expect 1101 (decimal 13)", async () => {});

  it("startIndex=1, endIndex=3 - expect 1110 (decimal 14)", async () => {
    const binary = "1110";
    const generatedMask = generateMask(1, 3, 0, 4);
    compareMasks(generatedMask, binary);
  });

  it("startIndex=0, endIndex=3 - expect 1111 (decimal 15)", async () => {
    const binary = "1111";
    const generatedMask = generateMask(0, 3, 0, 4);
    compareMasks(generatedMask, binary);
  });
});
