import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { GetRecipientByIdUseCase } from "./get-recipient-by-id";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: GetRecipientByIdUseCase;

describe("Get Recipient By Id", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new GetRecipientByIdUseCase(inMemoryRecipientRepository);
  });

  it("should be able to get a recipient by id", async () => {
    const mockedRecipient = makeRecipient();

    await inMemoryRecipientRepository.createRecipient(mockedRecipient);

    const result = await sut.execute({
      id: mockedRecipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.recipient.id.toString()).toEqual(
        mockedRecipient.id.toString(),
      );
    }
  });
});
