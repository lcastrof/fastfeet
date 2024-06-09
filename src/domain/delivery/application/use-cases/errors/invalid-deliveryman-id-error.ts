import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidDeliverymanIdError extends Error implements UseCaseError {
  constructor() {
    super("Invalid deliveryman id");
  }
}
