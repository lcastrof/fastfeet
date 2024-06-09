import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";
import { Status } from "../../enterprise/entities/value-objects/status";
import { AttachmentRepository } from "../repositories/attachment-repository";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { InvalidAttachmentIdError } from "./errors/invalid-attachment-id-error";
import { InvalidStatusError } from "./errors/invalid-status-error";
import { UnauthorizedDeliverymanError } from "./errors/unauthorized-deliveryman-error";

interface MarkDeliveryStatusAsDeliveredRequest {
  deliveryId: string;
  deliverymanId: string;
  status: StatusEnum.DELIVERED;
  attachmentId: string;
}

type MarkDeliveryStatusAsDeliveredResponse = Either<
  | ResourceNotFoundError
  | InvalidStatusError
  | InvalidAttachmentIdError
  | UnauthorizedDeliverymanError,
  null
>;

@Injectable()
export class MarkDeliveryStatusAsDeliveredUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly attachmentRepository: AttachmentRepository,
  ) {}

  async execute({
    deliveryId,
    deliverymanId,
    attachmentId,
    status,
  }: MarkDeliveryStatusAsDeliveredRequest): Promise<MarkDeliveryStatusAsDeliveredResponse> {
    if (!Status.validate(status)) {
      return left(new InvalidStatusError());
    }

    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    if (delivery.deliverymanId?.toValue() !== deliverymanId) {
      return left(new UnauthorizedDeliverymanError());
    }

    const attachment = await this.attachmentRepository.findById(attachmentId);

    if (!attachment) {
      return left(new InvalidAttachmentIdError());
    }

    delivery.status = Status.create(status);
    delivery.attachmentId = new UniqueEntityID(attachmentId);
    delivery.deliveredAt = new Date();

    await this.deliveryRepository.saveDelivery(delivery);

    return right(null);
  }
}
