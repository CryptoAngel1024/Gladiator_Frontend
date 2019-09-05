/*eslint-env node*/
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // preset: 'ts-jest',
  globals: {
    // '@vue/vue3-jest': {
    //   babelConfig: true,
    // },
    // 'ts-jest': {},
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '@aws-amplify/auth': '<rootDir>/tests/__mocks__/aws-amplify.js',
    '@openid/appauth': '<rootDir>/tests/__mocks__/openid-appauth.js',
    'reveal.js': '<rootDir>/tests/__mocks__/reveal.js',
    '^@aws-amplify/(.*)$': '<rootDir>/tests/__mocks__/@aws-amplify/$1.mock.js',
  },
  // moduleDirectories: ['node_modules', 'src'],
  testMatch: ['<rootDir>/tests/**/*.spec.js', '<rootDir>/tests/**/*.test.js'],
  // modulePaths: ['<rootDir>', '<rootDir>/tests'],
  // roots: ['<rootDir>/tests/'],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,vue}'],
  coveragePathIgnorePatterns: ['deprecated_'],
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
