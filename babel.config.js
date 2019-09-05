/*eslint-env node*/
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    ['babel-preset-vite'], // https://github.com/OpenSourceRaidGuild/babel-vite/tree/main/packages/babel-preset-vite
  ],
  // plugins: [
  //   function () {
  //     return {
  //       visitor: {
  //         MetaProperty(path) {
  //           path.replaceWithSourceString('process')
  //         },
  //       },
  //     }
  //   },
  // ],
}
