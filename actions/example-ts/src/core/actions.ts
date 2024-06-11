import { Actions } from "@kcws/github-actions"
import context from "./context"

export default Actions.builder(context, context => {
  return {
    name: context.use("input").optionalString("name") ?? "world",
  }
})
