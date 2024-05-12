import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

// TODO - Mover entities para pasta de infra quando criada
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  @Unique(["cpf"])
  cpf: string;

  @Column()
  passwordHashed: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
