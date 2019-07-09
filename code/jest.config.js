module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  reporters: ['default', 'jest-junit'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'node'],
  testMatch: [
    '**/test/**/*.test.[tj]s',
    '**/?(*.)+(spec|test).[tj]s',
    '**/test/**/*.test.[tj]sx',
    '**/?(*.)+(spec|test).[tj]sx',
  ],
  globalSetup: './test/setup.ts',
};
