import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to send a notification", async () => {
    const request = {
      recipientId: "1",
      title: "Title",
      content: "Content",
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.notifications[0].id).toEqual(
      result.value.notification.id,
    );
  });
});
