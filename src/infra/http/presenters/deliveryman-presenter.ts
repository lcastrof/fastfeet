import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export class DeliverymanPresenter {
  static toHTTP(deliveryman: Deliveryman) {
    return {
      id: Number(deliveryman.id.toValue()),
      name: deliveryman.name,
      email: deliveryman.email.value,
      cpf: deliveryman.cpf.value,
      latitude: deliveryman.latitude,
      longitude: deliveryman.longitude,
    };
  }
}
