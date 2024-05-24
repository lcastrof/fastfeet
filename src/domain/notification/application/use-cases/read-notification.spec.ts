import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { makeNotification } from "test/factories/make-notification";
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository";
import { ReadNotificationUseCase } from "./read-notification";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("1"),
    });

    await inMemoryNotificationRepository.create(notification);

    expect(notification.isRead()).toBe(false);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: "1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.notifications[0].isRead()).toBe(true);
  });

  it("should not be able to read a notification that does not exist", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("1"),
    });

    await inMemoryNotificationRepository.create(notification);

    expect(notification.isRead()).toBe(false);

    const result = await sut.execute({
      notificationId: "2",
      recipientId: "1",
    });

    expect(result.isLeft()).toBe(true);
  });

  it("should not be able to read a notification that does not belong to the recipient", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("1"),
    });

    await inMemoryNotificationRepository.create(notification);

    expect(notification.isRead()).toBe(false);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: "2",
    });

    expect(result.isLeft()).toBe(true);
  });
});
