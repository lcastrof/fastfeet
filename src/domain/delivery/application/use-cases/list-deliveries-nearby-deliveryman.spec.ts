import { StatusEnum } from "@/core/enums/status";
import { makeDelivery } from "test/factories/make-delivery";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { Status } from "../../enterprise/entities/value-objects/status";
import { ListDeliveriesNearbyDeliverymanUseCase } from "./list-deliveries-nearby-deliveryman";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let inMemoryRecipientRepository: InMemoryRecipientRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: ListDeliveriesNearbyDeliverymanUseCase;

describe("Find deliveries by deliveryman", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryAttachmentRepository,
      inMemoryRecipientRepository,
    );
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new ListDeliveriesNearbyDeliverymanUseCase(
      inMemoryDeliveryRepository,
      inMemoryDeliverymanRepository,
    );
  });

  it("should be able to get the deliveries with the recipient address near the deliveryman", async () => {
    const deliveryman = makeDeliveryman({
      latitude: -23.563987,
      longitude: -46.654365,
    });
    inMemoryDeliverymanRepository.deliverymen = [deliveryman];
    inMemoryRecipientRepository.recipients = [
      makeRecipient({
        latitude: -23.563987,
        longitude: -46.654365,
      }),
      makeRecipient({
        latitude: -23.123987,
        longitude: -46.124365,
      }),
      makeRecipient({
        latitude: -22.563987,
        longitude: -43.654365,
      }),
      makeRecipient({
        latitude: 10.563987,
        longitude: 46.654365,
      }),
    ];
    const delivery1 = makeDelivery({
      deliverymanId: deliveryman.id,
      status: Status.create(StatusEnum.WAITING),
      recipientId: inMemoryRecipientRepository.recipients[0].id,
    });
    const delivery2 = makeDelivery({
      deliverymanId: deliveryman.id,
      status: Status.create(StatusEnum.WAITING),
      recipientId: inMemoryRecipientRepository.recipients[1].id,
    });
    const delivery3 = makeDelivery({
      deliverymanId: deliveryman.id,
      status: Status.create(StatusEnum.WAITING),
      recipientId: inMemoryRecipientRepository.recipients[2].id,
    });
    const delivery4 = makeDelivery({
      deliverymanId: deliveryman.id,
      status: Status.create(StatusEnum.WAITING),
      recipientId: inMemoryRecipientRepository.recipients[3].id,
    });

    inMemoryDeliveryRepository.deliveries = [
      delivery1,
      delivery2,
      delivery3,
      delivery4,
    ];

    const response = await sut.execute({
      deliverymanId: deliveryman.id.toValue(),
      maxDistance: 50,
      page: 1,
      itemsPerPage: 10,
    });

    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) {
      expect(response.value.data).toHaveLength(3);
      expect(response.value.data[0].id).toBe(delivery1.id);
      expect(response.value.data[1].id).toBe(delivery2.id);
      expect(response.value.data[2].id).toBe(delivery3.id);
    }
  });
});
