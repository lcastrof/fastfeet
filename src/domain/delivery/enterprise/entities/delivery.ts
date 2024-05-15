import { randomUUID } from "node:crypto";

export class Delivery {
  public id: string;

  public status: string;

  public postedAt: Date;
  public retrievedAt: Date;
  public deliveredAt: Date;
  public returnedAt: Date;

  constructor(id?: string, props?: Partial<Delivery>) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
