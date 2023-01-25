import { Boom } from "@hapi/boom"
import { db } from "../../database"

export const getLesson = {
  method: "GET",
  // path: "/api/router/courses/{courseUrl}/lessons/{lessonSeqNo}",
  path: "/api/lesson-details",
  handler: async (req, h) => {
    // const { courseUrl, lessonSeqNo } = req.params
    const queryParams = req.query
    const courseUrl = queryParams["courseUrl"]
    const lessonSeqNo = queryParams["lessonSeqNo"]
    const res = await db.query(`SELECT courses.id FROM courses WHERE url=?`, [
      courseUrl,
    ])
    const courseId = res["results"][0].id
    console.log("courseId", courseId, lessonSeqNo)
    if (!courseId)
      Boom.notFound(`Course with courseId=${courseId} does not exist`)

    const { results } = await db.query(
      `SELECT * FROM lessons WHERE courseId=? AND seqNo=?`,
      [courseId, lessonSeqNo]
    )
    console.log("results", results.length)
    if (!results || results.length === 0) {
      console.log("Inside Boom")
      // throw Boom.notFound(`Lesson with ${lessonSeqNo} does not exist`)
    }

    const lesson = results[0]
    return lesson
  },
}
