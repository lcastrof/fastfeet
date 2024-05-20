import { makeDeliveryman } from "test/factories/make-deliveryman";
import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { DeleteDeliverymanUseCase } from "./delete-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: DeleteDeliverymanUseCase;
describe("Delete Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new DeleteDeliverymanUseCase(inMemoryDeliverymanRepository);
  });

  it("should be able to delete a deliveryman", async () => {
    const deliveryman = makeDeliveryman();

    await inMemoryDeliverymanRepository.create(deliveryman);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);

    await sut.execute({
      id: deliveryman.id.toString(),
    });

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(0);
  });

  it("should not be able to delete a deliveryman that does not exist", async () => {
    const deliveryman = makeDeliveryman();

    await inMemoryDeliverymanRepository.create(deliveryman);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);

    expect(
      sut.execute({
        id: "2",
      }),
    ).rejects.toThrowError("Deliveryman not found");
  });
});
