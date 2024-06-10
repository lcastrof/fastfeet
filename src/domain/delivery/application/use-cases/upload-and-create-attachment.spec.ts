import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { FakeUploader } from "test/storage/fake-uploader";
import { Attachment } from "../../enterprise/entities/attachment";
import { InvalidAttachmentTypeError } from "./errors/invalid-attachment-type";
import { UploadAndCreateAttachmentUseCase } from "./upload-and-create-attachment";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let fakeUploader: FakeUploader;

let sut: UploadAndCreateAttachmentUseCase;

describe("Upload and create attachment", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    fakeUploader = new FakeUploader();
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    );
  });

  it("should be able to upload and create an attachment", async () => {
    const request = {
      deliveryId: new UniqueEntityID(),
      fileName: "file.jpg",
      fileType: "image/jpeg",
      body: Buffer.from("file"),
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      attachment: expect.any(Attachment),
    });
  });

  it("should not be able to upload an invalid attachment type", async () => {
    const request = {
      deliveryId: new UniqueEntityID(),
      fileName: "file.jpg",
      fileType: "application/json",
      body: Buffer.from("file"),
    };

    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError);
  });
});
