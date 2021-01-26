module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    "@g/(.*)": "<rootDir>/src/$1",
    "@player/(.*)": "<rootDir>/src/player/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@component/(.*)": "<rootDir>/src/component/$1",
    "@codes/(.*)": "<rootDir>/src/codes/$1",
    "@images/(.*)": "<rootDir>/src/images/$1",
    "@utils/(.*)": "<rootDir>/src/Utils/$1"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ]
}

