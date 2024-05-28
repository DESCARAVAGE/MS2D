import { Field, InputType } from "type-graphql";
import { Group } from "../../entities/group.entity";

@InputType()
export class UpdateStudentInputType {
    @Field()
    id: number;

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    group: number;
}