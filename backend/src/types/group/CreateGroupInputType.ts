import { Field, InputType } from "type-graphql";

@InputType()
export class CreateGroupInputType {
    @Field()
    name: string;

    @Field()
    subject: string;
}