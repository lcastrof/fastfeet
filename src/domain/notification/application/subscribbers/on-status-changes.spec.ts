import { Status } from "@/core/enums/status";
import { makeDelivery } from "test/factories/make-delivery";
import { makeDeliveryStatus } from "test/factories/make-delivery-status";
import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { MockInstance, vi } from "vitest";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { OnStatusChange } from "./on-status-change";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;

let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance;

describe("On status changes", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
    );
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    new OnStatusChange(inMemoryRecipientRepository, sendNotificationUseCase);
  });

  it("should send a notification when the delivery status changes", async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.create(recipient);

    const delivery = makeDelivery({
      recipientId: recipient.id,
    });
    await inMemoryDeliveryRepository.create(delivery);

    const deliveryStatus = makeDeliveryStatus({
      title: Status.IN_DELIVERY,
    });
    delivery.status = deliveryStatus;

    expect(sendNotificationExecuteSpy).not.toHaveBeenCalled();

    await inMemoryDeliveryRepository.save(delivery);

    expect(sendNotificationExecuteSpy).toHaveBeenCalledTimes(1);
  });
});
