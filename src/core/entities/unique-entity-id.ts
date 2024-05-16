import { randomUUID } from "node:crypto";

// Isso é um value-object compartilhado
export class UniqueEntityID {
  private value: string;

  constructor(id?: string) {
    this.value = id ?? this.generateId();
  }

  private generateId() {
    return randomUUID();
  }

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }
}
