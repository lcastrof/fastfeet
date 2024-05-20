import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export interface DeliverymanRepository {
  findById(id: string): Promise<Deliveryman> | null;
  create(deliveryman: Deliveryman): Promise<void>;
  save(deliveryman: Deliveryman): Promise<void>;
  delete(id: string): Promise<void>;
}
