module.exports = {
  stories: ['../docs/*.mdx'],
  siteUrl: 'https://component-controls.com',
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
