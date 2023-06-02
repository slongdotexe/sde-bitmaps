import { readFileSync } from "fs";

const main = async () => {
  const packageData = readFileSync("../../package.json", "utf8");

  const jsonPackage = await JSON.parse(packageData);
  const pack = jsonPackage.devDependencies as Record<string, string>;
  // Object.entries(pack).forEach(([key, value]) => {
  //   console.log(key);
  // });
  const packs = Object.entries(pack).reduce(
    (prev, curr) => `${prev + curr[0]} `,
    ""
  );
  console.log(packs);
};

main();
