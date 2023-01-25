import { Boom } from "@hapi/boom"
import { db } from "../../database"

export const getAllLessons = {
  method: "GET",
  path: "/api/router/lessons",
  handler: async (req, h) => {
    const queryParams = req.query
    const filter = queryParams["filter"] || ""
    const sortOrder = queryParams["sortOrder"] || "asc"
    const pageNumber = parseInt(queryParams["pageNumber"]) || 0
    const pageSize = parseInt(queryParams["pageSize"]) || 3
    const courseUrl = queryParams["courseUrl"]

    const res = await db.query(`SELECT courses.id FROM courses WHERE url=?`, [
      courseUrl,
    ])
    const courseId = res["results"][0].id
    if (!courseId)
      throw Boom.notFound(` Course with courseId=${courseId} does not exist`)

    const { results } = await db.query(
      `SELECT * FROM lessons WHERE courseId=?`,
      [courseId]
    )

    if (!results) throw Boom.notFound("Lessons does not exist")

    let lessons = results.sort((l1, l2) => l1.id - l2.id)

    if (filter) {
      lessons = lessons.filter(
        (lesson) =>
          lesson.description
            .trim()
            .toLowerCase()
            .search(filter.toLowerCase()) >= 0
      )
    }

    if (sortOrder == "desc") {
      lessons = lessons.reverse()
    }

    const initialPos = pageNumber * pageSize

    const lessonsPage = lessons
      .slice(initialPos, initialPos + pageSize)
      .map((lesson) => {
        const newLesson = { ...lesson }
        delete newLesson.videoId
        return newLesson
      })

    return { payload: lessonsPage }
  },
}

// const ss = await db.query(`SELECT id FROM courses WHERE url=?`, [courseUrl])
// console.log("courseId", ss)

// Server is listening on http://localhost:8000
// getCourse serverless-angular
// courseId {
//   results: [ RowDataPacket { id: 1 } ],
//   fields: [
//     FieldPacket {
//       catalog: 'def',
//       db: 'buy-and-sell',
//       table: 'courses',
//       orgTable: 'courses',
//       name: 'id',
//       orgName: 'id',
//       charsetNr: 63,
//       length: 11,
//       type: 3,
//       flags: 16899,
//       decimals: 0,
//       default: undefined,
//       zeroFill: false,
//       protocol41: true
//     }
//   ]
// }
