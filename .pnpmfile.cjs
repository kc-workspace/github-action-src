function readPackage(pkg, context) {
  if (typeof pkg.name === "string" && pkg.name.startsWith("@actions/")) {
    context.log("found @actions/* package");
    pkg["sideEffects"] = false;
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
