/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/v1/common/$1',
    '@app/(.*)': '<rootDir>/src/v1/app/$1',
    '@infra/(.*)': '<rootDir>/src/v1/infra/$1',
    '@domain/(.*)': '<rootDir>/src/v1/domain/$1',
    '@presentation/(.*)': '<rootDir>/src/v1/presentation/$1',
    '@helpers/(.*)': '<rootDir>/src/v1/helpers/$1',
  },
  modulePaths: ['<rootDir>/src'],
};
