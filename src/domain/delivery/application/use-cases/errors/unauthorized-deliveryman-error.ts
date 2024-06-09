import { UseCaseError } from "@/core/errors/use-case-error";

export class UnauthorizedDeliverymanError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Unauthorized deliveryman");
  }
}
