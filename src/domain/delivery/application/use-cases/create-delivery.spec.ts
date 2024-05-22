import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { CreateDeliveryUseCase } from "./create-delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: CreateDeliveryUseCase;

describe("Create Delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to create a delivery", async () => {
    const request = {
      id: "1",
      recipientId: "1",
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.deliveries[0].id).toEqual(
      result.value.delivery.id,
    );
  });
});
