export default {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/lib/**/*.{js,ts}'],
  coverageDirectory: '<rootDir>/build/coverage/',
  coveragePathIgnorePatterns: [],
  coverageReporters: ['cobertura', 'html', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  reporters: [
    'default',
    [
      '<rootDir>/node_modules/jest-html-reporter',
      {
        pageTitle: 'aws-cdk-lib test report',
        outputPath: '<rootDir>/build/test-report.html',
        includeSuiteFailure: true,
        includeFailureMsg: true,
        includeConsoleLog: true,
      }
    ]
  ],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
