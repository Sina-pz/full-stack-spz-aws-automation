import { db } from "../../database"
import Boom from "@hapi/boom"
export const getAllCourses = {
  method: "GET",
  path: "/api/router/courses",
  handler: async (req, h) => {
    const { results } = await db.query("SELECT * FROM courses")
    // console.log("getAllCourses", results)
    // const courses = results[0]
    if (!results) throw Boom.notFound("Courses not found!")
    return results
  },
}
