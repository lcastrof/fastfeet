import { randomUUID } from "node:crypto";

export class Deliveryman {
  public id: string;

  public name: string;
  public email: string;
  public password: string;
  public cpf: string;

  constructor(id?: string, props?: Partial<Deliveryman>) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
