import { Field, InputType } from "type-graphql";

@InputType()
export class CreateStudentInputType {
    @Field()
    id: number;

    @Field()
    firstname: string;

    @Field()
    lastname: string;
}