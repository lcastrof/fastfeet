import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { DeleteRecipientUseCase } from "./delete-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: DeleteRecipientUseCase;
describe("Delete Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new DeleteRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to delete a recipient", async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.createRecipient(recipient);

    expect(inMemoryRecipientRepository.recipients).toHaveLength(1);

    await sut.execute({
      id: recipient.id.toString(),
    });

    expect(inMemoryRecipientRepository.recipients).toHaveLength(0);
  });

  it("should not be able to delete a recipient that does not exist", async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.createRecipient(recipient);

    expect(inMemoryRecipientRepository.recipients).toHaveLength(1);

    const result = await sut.execute({
      id: "2",
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
