import { getInput } from "@actions/core"

import { greeting } from "./next"

const name = getInput("name") ?? "world"
console.log(`${greeting} ${name}`)
