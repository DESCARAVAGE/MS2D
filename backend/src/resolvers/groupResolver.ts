import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Group } from "../entities/group.entity";
import * as groupService from "../services/group.service";
import { CreateGroupInputType } from "../types/group/CreateGroupInputType";
import { UpdateGroupInputType } from "../types/group/UpdateGroupInputType";
import { DeleteGroupResult } from "../services/group.service";

@Resolver(Group)
export class GroupResolver {
  @Query(() => [Group])
  async getAllGroups(): Promise<Group[]> {
    return await groupService.getAllGroups();
  }

  @Query(() => Group)
  getOneGroupById(@Arg("id") id: number): Promise<Group | null> {
    return groupService.findGroupById(id);
  }

  @Query(() => [Group])
  async searchGroupsByTerms(@Arg("terms", { nullable: true }) terms: string): Promise<Group[]> {
    try {
      return await groupService.getGroupsByterms(terms);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // Renvoyer l'erreur en tant que chaîne
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }

  @Mutation(() => Group)
  createGroup(@Arg("group") group: CreateGroupInputType): Promise<Group | String> {
    return groupService.create({ ...group});
  }

  @Mutation(() => Group)
  updateGroup(@Arg("Group") Group: UpdateGroupInputType): Promise<Group | undefined> {
    return groupService.updateGroup(Group.id, {...Group} as unknown as Group)
  }

  @Mutation(() => String)
  async deleteGroup(@Arg("id") id: number): Promise<string | undefined> {
    const result: DeleteGroupResult = await groupService.deleteGroup(id);
    return result.message;
  }
}