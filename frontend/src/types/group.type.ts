import { Student } from "./student.type";

export type Group = {
    id: number;
    name: string;
    subject: string;
    totalStudents: number;
    students?: Student[];
  };
