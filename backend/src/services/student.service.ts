import { ILike, DeleteResult } from "typeorm"; // Ilike n'est pas sensible à la casse contrairement à Like.
import { Student } from "../entities/student";

export function findStudentById(id: number): Promise<Student | null> {
  return Student.findOne({
    where: { id: id },
  });
}

export async function getAllStudents(): Promise<Student[]> {
  const allStudent = await Student.find();
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

export async function create(StudentData: {
  firstname: string;
  lastname: string;
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

  return await student.save();
}

export async function updateStudent(
  id: number,
  Student: Student
): Promise<Student | undefined> {
  const StudentToUpdate = await findStudentById(id);

  if (!StudentToUpdate) {
    throw new Error("Student not found..");
  }

  if (StudentToUpdate) {
    StudentToUpdate.firstname = Student.firstname;
    StudentToUpdate.lastname = Student.lastname;

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