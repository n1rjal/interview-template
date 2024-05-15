import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  title: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "timestamptz",
  })
  attend_at: Date;

  @Column({
    type: "boolean",
    default: false,
  })
  is_completed: boolean;
}
