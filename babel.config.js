// babel.config.js
module.exports = {
  presets: [
    "@babel/env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
}