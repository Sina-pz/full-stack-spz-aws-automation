import { db } from "../../database"
export const updateCourseRoute = {
  method: "PUT",
  path: "/api/router/courses/{courseId}",
  handler: async (req, h) => {
    const id = req.params.courseId
    const changes = req.query["changes"]
    const { description, category, longDescription } = changes
    console.log("getChanges in UpdateCourse", changes)
    await db.query(
      "UPDATE courses SET description=?, category=?, longDescription=? WHERE id=?",
      [description, category, longDescription, id]
    )
    const { results } = await db.query("SELECT * FROM courses")
    return results[0]
  },
}
