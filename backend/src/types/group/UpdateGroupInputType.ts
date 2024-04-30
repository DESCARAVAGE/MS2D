import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateGroupInputType {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    subject: string;
}