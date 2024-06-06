import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { CreateRecipientUseCase } from "./create-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: CreateRecipientUseCase;

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to create a recipient", async () => {
    const request = {
      name: "Name",
      email: "john@doe.com",
      zipCode: "12345678",
      city: "City",
      complement: "Complement",
      latitude: 123,
      longitude: 123,
      neighborhood: "Neighborhood",
      number: 123,
      state: "State",
      street: "Street",
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
  });
});
