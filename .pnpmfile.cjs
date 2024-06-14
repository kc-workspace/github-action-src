function readPackage(pkg, context) {
  if (typeof pkg.name === "string" && pkg.name.startsWith("@actions/")) {
    pkg["sideEffects"] = false;
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
