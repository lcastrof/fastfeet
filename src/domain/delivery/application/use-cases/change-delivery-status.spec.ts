import { Status } from "@/core/enums/status";
import { makeDelivery } from "test/factories/make-delivery";
import { makeDeliveryStatus } from "test/factories/make-delivery-status";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { InMemoryDeliveryStatusRepository } from "test/repositories/in-memory-delivery-status-repository";
import { ChangeDeliveryStatusUseCase } from "./change-delivery-status";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryDeliveryStatusRepository: InMemoryDeliveryStatusRepository;
let sut: ChangeDeliveryStatusUseCase;

describe("Change Delivery Status", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
    );
    inMemoryDeliveryStatusRepository = new InMemoryDeliveryStatusRepository();
    sut = new ChangeDeliveryStatusUseCase(
      inMemoryDeliveryStatusRepository,
      inMemoryDeliveryRepository,
    );
  });

  it("should be able to change the delivery status", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);
    expect(delivery.status.title).toEqual(Status.NOT_STARTED);
    expect(inMemoryDeliveryStatusRepository.deliveryStatuses).toHaveLength(0);

    const newStatus = makeDeliveryStatus({ title: Status.IN_DELIVERY });

    await inMemoryDeliveryStatusRepository.create(newStatus);

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryStatusId: newStatus.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.deliveries[0].status.title).toEqual(
      Status.IN_DELIVERY,
    );
    expect(inMemoryDeliveryStatusRepository.deliveryStatuses).toHaveLength(1);
  });

  it("should not be able to change the delivery status if the delivery does not exist", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    const newStatus = makeDeliveryStatus({ title: Status.IN_DELIVERY });

    await inMemoryDeliveryStatusRepository.create(newStatus);

    const result = await sut.execute({
      deliveryId: "2",
      deliveryStatusId: newStatus.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
  });

  it("should not be able to change the delivery status if the delivery status does not exist", async () => {
    const delivery = makeDelivery();

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.deliveries).toHaveLength(1);

    const newStatus = makeDeliveryStatus({ title: Status.IN_DELIVERY });

    await inMemoryDeliveryStatusRepository.create(newStatus);

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryStatusId: "2",
    });

    expect(result.isLeft()).toBe(true);
  });
});
