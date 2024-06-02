import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export abstract class DeliverymanRepository {
  abstract findById(id: string | number): Promise<Deliveryman | null>;
  abstract findByEmail(email: string): Promise<Deliveryman | null>;
  abstract findByCpf(cpf: string): Promise<Deliveryman | null>;
  abstract createDeliveryman(deliveryman: Deliveryman): Promise<void>;
  abstract saveDeliveryman(deliveryman: Deliveryman): Promise<void>;
  abstract deleteDeliveryman(id: string | number): Promise<void>;
}
