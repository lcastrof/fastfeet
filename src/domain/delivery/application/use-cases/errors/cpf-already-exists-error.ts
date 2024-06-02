import { UseCaseError } from "@/core/errors/use-case-error";

export class CPFAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super("CPF already in use");
  }
}
