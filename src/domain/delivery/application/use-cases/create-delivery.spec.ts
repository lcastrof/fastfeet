import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { CreateDeliveryUseCase } from "./create-delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: CreateDeliveryUseCase;

describe("Create Delivery", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
      inMemoryRecipientRepository,
    );
    sut = new CreateDeliveryUseCase(
      inMemoryDeliveryRepository,
      inMemoryRecipientRepository,
    );
  });

  it("should be able to create a delivery", async () => {
    const recipient = makeRecipient();
    const request = {
      recipientId: recipient.id.toValue(),
      product: "Product",
    };

    inMemoryRecipientRepository.recipients.push(recipient);

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);
      expect(
        inMemoryDeliveryRepository.deliveries[0].recipientId.toValue(),
      ).toBe(recipient.id.toValue());
    }
  });
});
