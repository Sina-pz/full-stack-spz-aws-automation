import { Boom } from "@hapi/boom"
import { db } from "../../database"

export const getUser = {
  method: "GET",
  path: "/api/routers/login",
  handler: async (req, h) => {
    const queryParams = req.query
    // const { email, password } = req.payload
    const email = queryParams["email"]
    const password = queryParams["password"]
    const { results } = await db.query(
      "SELECT * FROM users WHERE email=? AND password=?",
      [email, password]
    )
    const user = results[0]
    console.log()
    // if (!user) throw Boom.notFound("user does not exist")

    if (user) {
      return { payload: user }
    } else {
      return h.response("The user does not exist").code(404)
    }
  },
}
