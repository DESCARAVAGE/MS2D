import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as studentService from "../services/student.service";
import { CreateStudentInputType } from "../types/student/CreateStudentInputType copy";
import { UpdateStudentInputType } from "../types/student/UpdateStudentInputType";
import { DeleteStudentResult } from "../services/student.service";
import { Student } from "../entities/student.entity";

@Resolver(Student)
export class StudentResolver {
  @Query(() => Student)
  getOneStudent(@Arg("id") id: number): Promise<Student | null> {
    return studentService.findStudentById(id);
  }

  @Query(() => [Student])
  async getAllStudents(): Promise<Student[]> {
    return await studentService.getAllStudents();
  }

  @Query(() => [Student])
  async getStudentsByGroup(@Arg("groupId") groupId: number): Promise<Student[] | null> {
    return await studentService.getStudentsByGroup(groupId);
  }

  @Query(() => [Student])
  async searchStudentsByTerms(@Arg("terms", { nullable: true }) terms: string): Promise<Student[]> {
    try {
      return await studentService.getStudentsByterms(terms);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // Renvoyer l'erreur en tant que chaîne
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }

  @Mutation(() => Student)
  createStudent(@Arg("Student") Student: CreateStudentInputType): Promise<Student | String> {
    return studentService.create({...Student});
  }

  @Mutation(() => Student)
  updateStudent(@Arg("student") student: UpdateStudentInputType): Promise<Student | undefined> {
    return studentService.updateStudent(student);
  }

  @Mutation(() => String)
  async deleteStudent(@Arg("id") id: number): Promise<string | undefined> {
    const result: DeleteStudentResult = await studentService.deleteStudent(id);
    return result.message;
  }
}