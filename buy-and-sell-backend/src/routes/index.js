import { updateCourseRoute } from "./courses/editCourse"
import { getAllCourses as getAllCoursesRoute } from "./courses/getAllCourses"
import { getAllLessons } from "./courses/getAllLessons"
import { getCourseRoute } from "./courses/getCourse"
import { getLesson } from "./courses/getLesson"
import { addViewToListingRoute } from "./listings/addViewToListing"
import { createNewListingRoute } from "./listings/createNewListing"
import { deleteListingRoute } from "./listings/deleteListing"
import { getAllListingsRoute } from "./listings/getAllListings"
import { getListingRoute } from "./listings/getListing"
import { getUserListingsRoute } from "./listings/getUserListings"
import { updateListingRoute } from "./listings/updateListing"
import { getUser } from "./users/getUser"

export default [
  addViewToListingRoute,
  createNewListingRoute,
  deleteListingRoute,
  getAllListingsRoute,
  getListingRoute,
  getUserListingsRoute,
  updateListingRoute,
  // Courses
  getAllCoursesRoute,
  getCourseRoute,
  getAllLessons,
  getLesson,
  updateCourseRoute,
  // user
  getUser,
]
