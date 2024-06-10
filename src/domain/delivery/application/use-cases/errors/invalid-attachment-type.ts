import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor() {
    super("Invalid attachment file type");
  }
}
