import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidAttachmentIdError extends Error implements UseCaseError {
  constructor() {
    super("Invalid attachment id");
  }
}
