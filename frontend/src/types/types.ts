export interface Professor {
  id: number;
  name: string;
}
export interface Course {
  id: number;
  name: string;
  number: string;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
}

export interface Semester {
  id: number;
  name: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  ip_address: string;
  points: number;
}

export interface File {
  id: string;
  filename: string;
  original_author: User;
  professor: Professor;
  course: Course;
  semester: Semester;
  upvotes: number[];
  downvotes: number[];
}