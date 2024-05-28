import { ILike, DeleteResult } from "typeorm"; // Ilike n'est pas sensible à la casse contrairement à Like.
import { Group } from "../entities/group.entity";

export function findGroupById(id: number): Promise<Group | null> {
  return Group.findOne({
    where: { id: id },
    relations: ["students"]
  });
}

export async function getAllGroups(): Promise<Group[]> {
  const allGroup = await Group.find({ relations: ["students"] });
  if (allGroup.length === 0) {
    throw new Error("the BDD is empty...");
  } else {
    return allGroup;
  }
}

/**
 * Récupère les pays en fonction des termes de recherche fournis.
 * @param terms - Les termes de recherche pour filtrer les pays.
 * @returns Une promesse résolue avec un tableau de pays correspondant aux termes de recherche.
 * @throws Une erreur si une erreur survient pendant la recherche ou si aucune catégorie n'est trouvée.
 */
export async function getGroupsByterms(terms: string = ''): Promise<Group[]> {
  try {
    // Vérifier si des termes de recherche sont fournis
    const group = terms
      ? await Group.find({ where: { name: ILike(`%${terms}%`) } })
      : await Group.find();

    // Vérifier si des pays ont été trouvées
    if (group.length > 0) {
      return group;
    } else {
      throw new Error(`No group find with this terms : "${terms}"...`);
    }
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant la recherche
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
  }
}

export async function create(GroupData: {
  name: string;
  subject: string;
  totalStudents?: number;
}): Promise<String | Group> {
  // Vérifier si le pays existe déjà
  const existingGroup = await Group.findOne({ where: { name: GroupData.name } });

  // Si le pays existe, renvoyer un message d'erreur
  if (existingGroup) {
    throw new Error('the groupe is already created');
  }

  // Si le pays n'existe pas, créer une nouvelle catégorie
  const group = new Group();
  group.name = GroupData.name;
  group.subject = GroupData.subject;

  return await group.save();
}

export async function updateGroup(
  id: number,
  Group: Group
): Promise<Group | undefined> {
  const GroupToUpdate = await findGroupById(id);

  if (!GroupToUpdate) {
    throw new Error("Group not found..");
  }

  if (GroupToUpdate) {
    GroupToUpdate.name = Group.name;
    GroupToUpdate.subject = Group.subject;

    return GroupToUpdate.save();
  }
}

export interface DeleteGroupResult {
  isSuccess: boolean;
  message?: string;
}

export async function deleteGroup(id: number): Promise<DeleteGroupResult> {
  try {
    const GroupToDelete = await Group.delete(id);

    if (!GroupToDelete) {
      return { isSuccess: false, message: `The group with id : "${id}" don't exist.` }
    }

    const result: DeleteResult = await Group.delete({ id: id });

    return { isSuccess: true, message: "Successfully deleted group." }
  } catch (error) {
    return { isSuccess: false, message: "An unexpected error occurred." }
  }
}