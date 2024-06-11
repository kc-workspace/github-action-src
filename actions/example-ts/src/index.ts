import actions from "./core/actions"

actions.exec((data, context) => {
  context.use("log").info("hello {name}", data.input)
})
