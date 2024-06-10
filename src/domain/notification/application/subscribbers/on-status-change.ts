// Essa pasta de subscribers está na camada de application visto que vai precisar de recursos como
// repositories e use-cases

import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { DeliveryStatusChangeEvent } from "@/domain/delivery/enterprise/events/delivery-status-change-event";
import { Injectable } from "@nestjs/common";
import { SendNotificationUseCase } from "../use-cases/send-notification";

@Injectable()
export class OnStatusChange implements EventHandler {
  constructor(
    private recipientRepository: RecipientRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendStatusChangeNotification.bind(this),
      DeliveryStatusChangeEvent.name,
    );
  }

  private async sendStatusChangeNotification({
    status,
    delivery,
  }: DeliveryStatusChangeEvent) {
    const recipient = await this.recipientRepository.findById(
      delivery.recipientId.toString(),
    );

    if (!recipient) {
      throw new ResourceNotFoundError();
    }

    await this.sendNotificationUseCase.execute({
      recipientId: recipient.id.toString(),
      title: `Your delivery "${delivery.id}" status just changed!`,
      content: `Your delivery status is now ${status.value}`,
    });
  }
}
