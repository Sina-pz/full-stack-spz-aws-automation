export interface LessonSummary {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}

export interface LessonDetail {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
  videoId: string;
  first: boolean;
  last: boolean;
}