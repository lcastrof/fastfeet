import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { Cpf } from "../../enterprise/entities/value-objects/cpf";
import { GetDeliverymanByIdUseCase } from "./get-deliveryman-by-id";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: GetDeliverymanByIdUseCase;

describe("Get Deliveryman By Id", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new GetDeliverymanByIdUseCase(inMemoryDeliverymanRepository);
  });

  it("should be able to get a deliveryman by id", async () => {
    const mockedDeliveryman = Deliveryman.create({
      name: "John Doe",
      email: "john@doe.com",
      cpf: new Cpf("12345678909"),
      password: "password",
      latitude: 0,
      longitude: 0,
    });

    await inMemoryDeliverymanRepository.create(mockedDeliveryman);

    const { deliveryman } = await sut.execute({
      id: mockedDeliveryman.id.toString(),
    });

    expect(deliveryman.id).toBeTruthy();
    expect(deliveryman.id.toString()).toEqual(mockedDeliveryman.id.toString());
  });
});
