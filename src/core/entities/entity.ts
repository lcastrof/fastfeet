import { randomUUID } from "node:crypto";

export class Entity<Props> {
  private _id: string;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this.id) {
      return true;
    }

    return false;
  }
}
