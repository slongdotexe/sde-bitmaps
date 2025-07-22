module.exports = {
  root: true,
  extends: ['@slongdotexe/eslint-config/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
}
