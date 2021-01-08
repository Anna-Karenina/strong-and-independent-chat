module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "^@core/(.*)": "<rootDir>/src/core/$1",
    "^@components/(.*)": "<rootDir>/src/components/$1",
    "^@/(.*)": "<rootDir>/src/$1"
  },
}