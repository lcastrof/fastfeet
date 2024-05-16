import { Entity } from "@/core/entities/entity";
import { Cpf } from "./value-objects/cpf";

interface AdministratorProps {
  name: string;
  email: string;
  password: string;
  cpf: Cpf;
}

export class Administrator extends Entity<AdministratorProps> {}
