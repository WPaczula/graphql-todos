module.exports = {
  name: 'ts-node-boilerplate',
  testEnvironment: 'node',
  verbose: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
