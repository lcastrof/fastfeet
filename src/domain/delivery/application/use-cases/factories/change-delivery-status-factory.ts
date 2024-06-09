import { StatusEnum } from "@/core/enums/status";
import { Injectable } from "@nestjs/common";
import { MarkDeliveryStatusAsDeliveredUseCase } from "../mark-delivery-status-as-delivered";
import { MarkDeliveryStatusAsReturnedUseCase } from "../mark-delivery-status-as-returned";
import { MarkDeliveryStatusAsWaitingUseCase } from "../mark-delivery-status-as-waiting";
import { MarkDeliveryStatusAsWithdrawnUseCase } from "../mark-delivery-status-as-withdrawn";

@Injectable()
export class ChangeDeliveryStatusFactory {
  constructor(
    private readonly markDeliveryStatusAsDeliveredUseCase: MarkDeliveryStatusAsDeliveredUseCase,
    private readonly markDeliveryStatusAsReturnedUseCase: MarkDeliveryStatusAsReturnedUseCase,
    private readonly markDeliveryStatusAsWaitingUseCase: MarkDeliveryStatusAsWaitingUseCase,
    private readonly markDeliveryStatusAsWithdrawnUseCase: MarkDeliveryStatusAsWithdrawnUseCase,
  ) {}

  public getChangeDeliveryStatusUseCase(status: StatusEnum) {
    switch (status) {
      case StatusEnum.DELIVERED:
        return this.markDeliveryStatusAsDeliveredUseCase;
      case StatusEnum.RETURNED:
        return this.markDeliveryStatusAsReturnedUseCase;
      case StatusEnum.WAITING:
        return this.markDeliveryStatusAsWaitingUseCase;
      case StatusEnum.WITHDRAWN:
        return this.markDeliveryStatusAsWithdrawnUseCase;
      default:
        throw new Error("Invalid status " + status);
    }
  }
}
