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
    const request = {
      id: "1",
      recipientId: "1",
      product: "Product",
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.delivery.id).toEqual(request.id);
      expect(result.value.delivery.recipientId).toEqual(request.recipientId);
      expect(result.value.delivery.product).toEqual(request.product);
    }
  });
});
