import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { Email } from "../../enterprise/entities/value-objects/email";
import { EditRecipientRequest, EditRecipientUseCase } from "./edit-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: EditRecipientUseCase;
describe("Edit Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new EditRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to edit a recipient", async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.createRecipient(recipient);

    expect(inMemoryRecipientRepository.recipients).toHaveLength(1);

    const editedRecipient: EditRecipientRequest = {
      id: recipient.id.toString(),
      name: "John Doe",
      email: "john@doe.com",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      number: 123,
      complement: "Complement",
      zipCode: "12345678",
      latitude: 0,
      longitude: 0,
    };

    const result = await sut.execute(editedRecipient);

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.recipients).toHaveLength(1);
    expect(inMemoryRecipientRepository.recipients[0]).toMatchObject(
      expect.objectContaining({
        name: editedRecipient.name,
        email: Email.create(editedRecipient.email),
        city: editedRecipient.city,
        state: editedRecipient.state,
        neighborhood: editedRecipient.neighborhood,
        street: editedRecipient.street,
        number: editedRecipient.number,
        complement: editedRecipient.complement,
        zipCode: editedRecipient.zipCode,
        latitude: editedRecipient.latitude,
        longitude: editedRecipient.longitude,
      }),
    );
  });

  it("should not be able to edit a recipient that does not exist", async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.createRecipient(recipient);

    expect(inMemoryRecipientRepository.recipients).toHaveLength(1);

    const result = await sut.execute({
      id: "2",
      name: "John Doe",
      email: "john@doe.com",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      number: 123,
      complement: "Complement",
      zipCode: "12345678",
      latitude: 0,
      longitude: 0,
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
