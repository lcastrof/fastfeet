import { randomUUID } from "node:crypto";

export class Recipient {
  public id: string;

  public cep: string;
  public street: string;
  public number: number;
  public neighborhood: string;
  public city: string;
  public state: string;
  public complement: string;

  public latitude: number;
  public longitude: number;

  constructor(id?: string, props?: Partial<Recipient>) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
