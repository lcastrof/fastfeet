import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export interface DeliverymanRepository {
  create(deliveryman: Deliveryman): Promise<Deliveryman>;
  findById(id: string): Promise<Deliveryman> | null;
  delete(id: string): Promise<void>;
}
