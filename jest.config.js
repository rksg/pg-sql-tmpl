module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.[jt]s$': 'ts-jest'
  },
  testRegex: 'spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts, js}'],
  coverageThreshold: {
    global: {
      'statements': 100,
      'branches': 100,
      'functions': 100,
      'lines': 100
    }
  }
}
