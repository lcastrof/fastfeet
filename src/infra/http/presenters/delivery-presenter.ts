import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";

export class DeliveryPresenter {
  static toHTTP(delivery: Delivery) {
    return {
      id: Number(delivery.id.toValue()),
      product: delivery.product,
      recipientId: delivery.recipientId.toValue(),
      deliverymanId: delivery.deliverymanId?.toValue(),
      status: delivery.status.value,
      attachmentId: delivery.attachmentId?.toValue(),
      deliveredAt: delivery.deliveredAt,
      returnedAt: delivery.returnedAt,
      retrievedAt: delivery.retrievedAt,
      postedAt: delivery.postedAt,
    };
  }
}
