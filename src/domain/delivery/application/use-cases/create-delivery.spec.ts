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
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
    );
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
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
      expect(result.value.delivery.recipientId.toValue()).toEqual(
        request.recipientId,
      );
      expect(result.value.delivery.product).toEqual(request.product);
    }
  });
});
