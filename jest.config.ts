/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
  },
  modulePaths: ['<rootDir>/src'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/infra/database/'],
};
