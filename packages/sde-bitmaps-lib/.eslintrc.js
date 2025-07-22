// module.exports = {
//   extends: "eslint-config-labrys",
//   parser: "@typescript-eslint/parser",
//   rules: {
//     "eslint-comments/disable-enable-pair": "off",
//     "no-unused-vars": "off",
//     "@typescript-eslint/no-unused-vars": "error",
//     "no-plusplus": "off",
//   },
// };

module.exports = {
  root: true,
  extends: ['@slongdotexe/eslint-config/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
}
