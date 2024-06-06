import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export class InMemoryDeliverymanRepository implements DeliverymanRepository {
  public deliverymen: Deliveryman[] = [];

  async createDeliveryman(deliveryman: Deliveryman): Promise<void> {
    this.deliverymen.push(deliveryman);
  }

  async saveDeliveryman(deliveryman: Deliveryman): Promise<void> {
    const index = this.deliverymen.findIndex(
      (item) => item.id.toString() === deliveryman.id.toString(),
    );

    this.deliverymen[index] = deliveryman;
  }

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymen.find(
      (deliveryman) => deliveryman.id.toString() === id,
    );

    if (!deliveryman) {
      return null;
    }

    return deliveryman;
  }

  async deleteDeliveryman(id: string): Promise<void> {
    this.deliverymen = this.deliverymen.filter(
      (deliveryman) => deliveryman.id.toString() !== id,
    );
  }

  async findByEmail(email: string): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymen.find(
      (deliveryman) => deliveryman.email.value === email,
    );

    if (!deliveryman) {
      return null;
    }

    return deliveryman;
  }

  async findByCpf(cpf: string): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymen.find(
      (deliveryman) => deliveryman.cpf.value === cpf,
    );

    if (!deliveryman) {
      return null;
    }

    return deliveryman;
  }
}
