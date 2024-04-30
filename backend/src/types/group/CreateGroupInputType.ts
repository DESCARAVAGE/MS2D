import { Field, InputType } from "type-graphql";

@InputType()
export class CreateGroupInputType {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    subject: string;
}