import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { makeDelivery } from "test/factories/make-delivery";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { Status } from "../../enterprise/entities/value-objects/status";
import { ChangeDeliveryStatusUseCase } from "./change-delivery-status";
import { InvalidStatusError } from "./errors/invalid-status-error";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: ChangeDeliveryStatusUseCase;

describe("Change Delivery Status", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
    );
    sut = new ChangeDeliveryStatusUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to change the delivery status", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);
    expect(delivery.status.value).toEqual(StatusEnum.NOT_STARTED);
    expect(delivery.domainEvents).toHaveLength(0);

    const newStatus = Status.create(StatusEnum.IN_DELIVERY);

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      status: newStatus.value,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.deliveries[0].status.value).toEqual(
      StatusEnum.IN_DELIVERY,
    );
  });

  it("should not be able to change the delivery status if the delivery does not exist", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    const newStatus = Status.create(StatusEnum.IN_DELIVERY);

    const result = await sut.execute({
      deliveryId: "2",
      status: newStatus.value,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to change the delivery status if the delivery status does not exist", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      status: "INVALID_STATUS",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidStatusError);
  });
});
