import { ILike, DeleteResult } from "typeorm"; // Ilike n'est pas sensible à la casse contrairement à Like.
import { Student } from "../entities/student.entity";
import { Group } from "../entities/group.entity";
import { UpdateStudentInputType } from "../types/student/UpdateStudentInputType";

export function findStudentById(id: number): Promise<Student | null> {
  return Student.findOne({
    where: { id: id },
  });
}

export async function getAllStudents(): Promise<Student[]> {
  const allStudent = await Student.find({ relations: ["group"] });
  if (allStudent.length === 0) {
    throw new Error("the BDD is empty...");
  } else {
    return allStudent;
  }
}

/**
 * Récupère les pays en fonction des termes de recherche fournis.
 * @param terms - Les termes de recherche pour filtrer les pays.
 * @returns Une promesse résolue avec un tableau de pays correspondant aux termes de recherche.
 * @throws Une erreur si une erreur survient pendant la recherche ou si aucune catégorie n'est trouvée.
 */
export async function getStudentsByterms(terms: string = ''): Promise<Student[]> {
  try {
    // Vérifier si des termes de recherche sont fournis
    const student = terms
      ? await Student.find({ where: { firstname: ILike(`%${terms}%`) } })
      : await Student.find();

    // Vérifier si des pays ont été trouvées
    if (student.length > 0) {
      return student;
    } else {
      throw new Error(`No Student find with this terms : "${terms}"...`);
    }
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant la recherche
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
  }
}

export async function getStudentsByGroup(groupId: number): Promise<Student[] | null> {
  try {
    const student = groupId
    ? await Student.find({where: { group: {id: groupId} }})
    : null;
    if (student  && student.length > 0) {
      return student;
    } else {
      throw new Error("not students in this group");
    }
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant la recherche
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
  }
}

export async function create(StudentData: {
  firstname: string;
  lastname: string;
  group?: number;
}): Promise<String | Student> {
  // Vérifier si le pays existe déjà
  const existingStudent = await Student.findOne({ where: { firstname: StudentData.firstname } });

  // Si le pays existe, renvoyer un message d'erreur
  if (existingStudent) {
    throw new Error('the Studente is already created');
  }

  // Si le pays n'existe pas, créer une nouvelle catégorie
  const student = new Student();
  student.firstname = StudentData.firstname;
  student.lastname = StudentData.lastname;
  student.group = {
    id: StudentData.group,
  } as Group;

  return await student.save();
}

export async function updateStudent(
  student: UpdateStudentInputType,
): Promise<Student | undefined> {
  const StudentToUpdate = await findStudentById(student.id);

  if (!StudentToUpdate) {
    throw new Error("Student not found..");
  }

  if (StudentToUpdate) {
    StudentToUpdate.firstname = student.firstname;
    StudentToUpdate.lastname = student.lastname;
    StudentToUpdate.group = {
      id: student.group,
    } as Group;

    return StudentToUpdate.save();
  }
}

export interface DeleteStudentResult {
  isSuccess: boolean;
  message?: string;
}

export async function deleteStudent(id: number): Promise<DeleteStudentResult> {
  try {
    const StudentToDelete = await Student.delete(id);

    if (!StudentToDelete) {
      return { isSuccess: false, message: `The Student with id : ${id} don't exist.` }
    }

    const result: DeleteResult = await Student.delete({ id: id });

    return { isSuccess: true, message: "Successfully deleted Student." }
  } catch (error) {
    return { isSuccess: false, message: "An unexpected error occurred." }
  }
}