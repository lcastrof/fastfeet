import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("recipients")
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column({
    name: "zip_code",
  })
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  complement: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({
    default: new Date(),
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    default: new Date(),
    name: "updated_at",
  })
  updatedAt: Date;
}
