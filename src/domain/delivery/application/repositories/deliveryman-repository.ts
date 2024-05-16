import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export interface DeliverymanRepository {
  create(deliveryman: Deliveryman): Promise<void>;
  findById(id: string): Promise<Deliveryman | null>;
  delete(id: string): Promise<void>;
}
