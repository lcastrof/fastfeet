import { makeDelivery } from "test/factories/make-delivery";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { Attachment } from "../../enterprise/entities/attachment";
import { DeleteDeliveryUseCase } from "./delete-delivery";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: DeleteDeliveryUseCase;
describe("Delete Delivery", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
    );
    sut = new DeleteDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to delete a delivery", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    await sut.execute({
      id: delivery.id.toString(),
    });

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(0);
  });

  it("should not be able to delete a delivery that does not exist", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    const result = await sut.execute({
      id: "2",
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should delete the attachment(when it have one) when deleting a delivery", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    const attachment = Attachment.create({
      deliveryId: delivery.id,
      link: "http://link.com",
      title: "Title",
    });

    await inMemoryAttachmentRepository.create(attachment);

    expect(inMemoryAttachmentRepository.attachments).toHaveLength(1);

    await sut.execute({
      id: delivery.id.toString(),
    });

    expect(inMemoryAttachmentRepository.attachments).toHaveLength(0);
  });
});
