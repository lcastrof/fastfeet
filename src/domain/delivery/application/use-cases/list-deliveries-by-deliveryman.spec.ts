import { makeDelivery } from "test/factories/make-delivery";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { ListDeliveriesByDeliverymanUseCase } from "./list-deliveries-by-deliveryman";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: ListDeliveriesByDeliverymanUseCase;

describe("Find deliveries by deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
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
      await inMemoryDeliveryRepository.create(delivery);
    });

    const { data, meta } = await sut.execute({
      deliverymanId: mockedDeliveryman.id.toString(),
      page: 1,
      itemsPerPage: 10,
    });

    expect(data).toHaveLength(2);
    expect(meta.totalItems).toEqual(2);
  });

  it("should paginate correctly", async () => {
    const mockedDeliveryman = makeDeliveryman();

    const mockedDeliveries = [
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
      makeDelivery({ deliverymanId: mockedDeliveryman.id }),
    ];

    mockedDeliveries.forEach(async (delivery) => {
      await inMemoryDeliveryRepository.create(delivery);
    });

    const { data, meta } = await sut.execute({
      deliverymanId: mockedDeliveryman.id.toString(),
      page: 1,
      itemsPerPage: 1,
    });

    expect(data).toHaveLength(1);
    expect(meta.totalItems).toEqual(3);
    expect(meta.totalPages).toEqual(3);
  });
});
