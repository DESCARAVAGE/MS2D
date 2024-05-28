import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Group } from "./group.entity";

@Entity()
@ObjectType()
export class Student extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field(() => Group, { nullable: true })
  @ManyToOne(() => Group, group => group.students, { nullable: true })
  group?: Group;
}