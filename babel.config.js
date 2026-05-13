module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
    // Reanimated’s Babel plugin is the worklets plugin — do not add `react-native-worklets/plugin` separately.
    'react-native-reanimated/plugin',
  ],
};
