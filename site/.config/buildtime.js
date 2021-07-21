module.exports = {
  stories: ['../docs/*.mdx'],
  siteUrl: 'https://structured-types.vercel.app/',
  webpack: (config = {}, options = {}) => {
    return {
      ...config,
      plugins: [
        //remove mini-css-extract-plugin
        ...config.plugins.slice(0, -1),
        // new BundleAnalyzerPlugin({ generateStatsFile: true, statsFilename: 'stats.json' })
      ],
    };
  },
};
