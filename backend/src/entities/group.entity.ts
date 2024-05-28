import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Student } from "./student.entity";

@Entity()
@ObjectType()
export class Group extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  subject: string;

  @Field(() => Number)
  get totalStudents(): number {
    return this.students ? this.students.length : 0;
  }

  @OneToMany(() => Student, student => student.group)
  students?: Student[];
}