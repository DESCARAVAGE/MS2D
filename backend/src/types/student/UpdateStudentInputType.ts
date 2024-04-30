import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateStudentInputType {
    @Field()
    id: number;

    @Field()
    firstname: string;

    @Field()
    lastname: string;
}