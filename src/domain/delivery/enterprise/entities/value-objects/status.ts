import { StatusEnum } from "@/core/enums/status";

export class Status {
  private constructor(private readonly status: StatusEnum) {
    Object.freeze(this);
  }

  get value(): StatusEnum {
    return this.status;
  }

  static create(status: string): Status {
    if (!this.validate(status)) {
      throw new Error("Invalid status");
    }

    return new Status(status as StatusEnum);
  }

  static validate(status: string): boolean {
    return Object.values(StatusEnum).includes(status as StatusEnum);
  }
}
