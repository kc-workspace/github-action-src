export const getPluginUrl = (plugin: string, pluginUrl?: string) => {
  if (typeof pluginUrl === "string" && pluginUrl.length > 0) return pluginUrl

  switch (plugin) {
    case "nodejs":
    case "ruby":
      return "https://github.com/asdf-vm/asdf-{0}.git"
    case "python":
      return "https://github.com/asdf-community/asdf-{0}.git"
    case "java":
      return "https://github.com/halcyon/asdf-{0}.git"
    default:
      return "https://github.com/kc-workspace/asdf-{0}.git"
  }
}
