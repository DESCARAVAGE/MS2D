import { Group } from "./group.type";

export type Student = {
  id: number;
  firstname: string;
  lastname: string;
  group: {
    id: number;
    name: string;
    subject: string;
    totalStudents: number;
  }
  };