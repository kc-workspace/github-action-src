const createConfig = require("@kcws/eslint-config")
module.exports = createConfig({
  cwd: __dirname,
  profile: "node",
  typescript: true,
  jest: true,
  prettier: true,
  ecma: "latest",
})
