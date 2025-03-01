import { makeDelivery } from "test/factories/make-delivery";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { ListDeliveriesByDeliverymanUseCase } from "./list-deliveries-by-deliveryman";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: ListDeliveriesByDeliverymanUseCase;

describe("Find deliveries by deliveryman", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
    );
    sut = new ListDeliveriesByDeliverymanUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to get the deliveries based on deliveryman id", async () => {
    const mockedDeliveryman = makeDeliveryman();

    const mockedDeliveries = [
      makeDelivery(),
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
    ];

    mockedDeliveries.forEach(async (delivery) => {
      await inMemoryDeliveryRepository.createDelivery(delivery);
    });

    const result = await sut.execute({
      deliverymanId: mockedDeliveryman.id.toString(),
      page: 1,
      itemsPerPage: 10,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.data).toHaveLength(2);
      expect(result.value.meta.totalItems).toEqual(2);
    }
  });

  it("should paginate correctly", async () => {
    const mockedDeliveryman = makeDeliveryman();

    const mockedDeliveries = [
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
    ];

    mockedDeliveries.forEach(async (delivery) => {
      await inMemoryDeliveryRepository.createDelivery(delivery);
    });

    const result = await sut.execute({
      deliverymanId: mockedDeliveryman.id.toString(),
      page: 1,
      itemsPerPage: 1,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.data).toHaveLength(1);
      expect(result.value.meta.totalItems).toEqual(3);
      expect(result.value.meta.totalPages).toEqual(3);
    }
  });
});
