import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidCpfError extends Error implements UseCaseError {
  constructor() {
    super("Invalid CPF");
  }
}
