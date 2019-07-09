// @ts-nocheck
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
module.exports = withTypescript(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]', // we don't use hashing since it will break the global scope
    },
  })
);
