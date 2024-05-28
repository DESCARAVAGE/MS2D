import { Field, InputType } from "type-graphql";
import { Group } from "../../entities/group.entity";

@InputType()
export class CreateStudentInputType {
    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field( )
    group: number;
}