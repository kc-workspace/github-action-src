import { Actions } from "@utils/actions"
import { ContextBuilder } from "@utils/contexts"
import { ExecContextPlugin, InputContextPlugin } from "@utils/contexts/plugins"

export const context = ContextBuilder.builder("create-hosts", "v0.1.0-dev")
  .addPlugin(new InputContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .build()

const toHosts = (host: string): string[] => {
  return host
    .split(",")
    .flatMap((h) => h.split("\n"))
    .filter((h) => h !== "")
}

export default Actions.builder(context, (context) => {
  const input = context.use("input")
  return {
    domains: toHosts(input.requiredString("domains")),
    ip: input.requiredString("ip"),
    tableFile: "/etc/hosts",
  }
})
