import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface NotificationProps {
  recipientId: UniqueEntityID;
  title: string;
  content: string;
  createdAt: Date;
  readAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  get recipientId(): UniqueEntityID {
    return this.props.recipientId;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get readAt(): Date | undefined {
    return this.props.readAt;
  }

  public markAsRead(): void {
    this.props.readAt = new Date();
  }

  public isRead(): boolean {
    return !!this.props.readAt;
  }

  public static create(
    props: Optional<NotificationProps, "createdAt">,
    id?: UniqueEntityID,
  ): Notification {
    return new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
