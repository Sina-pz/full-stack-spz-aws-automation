import { db } from "../../database"
import { Boom } from "@hapi/boom"
export const getCourseRoute = {
  method: "GET",
  path: "/api/router/courses/{courseUrl}",
  handler: async (req, h) => {
    const url = req.params.courseUrl
    console.log("getCourse", url)
    const { results } = await db.query(
      "SELECT * FROM courses WHERE courses.url=?",
      [url]
    )
    if (!results[0]) throw Boom.notFound(`Course does not exist with id ${url}`)
    return results[0]
  },
}
