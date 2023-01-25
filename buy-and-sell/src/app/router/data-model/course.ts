import { COURSES } from './mock-course.test';
export interface Course {
  id: number;
  description: string;
  longDescription: string;
  iconUrl: string;
  courseListIcon: string;
  category: string;
  lessonsCount: string;
  seqNo: number;
  url: string;
  price: number;
  promo: boolean;
}

export function sortCoursesSeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}

export function setMockSortedCourses() {
  return COURSES.sort((a, b) => {
    return a.seqNo - b.seqNo;
  });
}
