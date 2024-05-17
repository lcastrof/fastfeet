import { makeDeliveryman } from "test/factories/make-deliveryman";
import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { GetDeliverymanByIdUseCase } from "./get-deliveryman-by-id";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: GetDeliverymanByIdUseCase;

describe("Get Deliveryman By Id", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new GetDeliverymanByIdUseCase(inMemoryDeliverymanRepository);
  });

  it("should be able to get a deliveryman by id", async () => {
    const mockedDeliveryman = makeDeliveryman();

    await inMemoryDeliverymanRepository.create(mockedDeliveryman);

    const { deliveryman } = await sut.execute({
      id: mockedDeliveryman.id.toString(),
    });

    expect(deliveryman.id).toBeTruthy();
    expect(deliveryman.id.toString()).toEqual(mockedDeliveryman.id.toString());
  });
});
