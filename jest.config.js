module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*|react-native-gesture-handler|react-native-screens)',
  ],
};
