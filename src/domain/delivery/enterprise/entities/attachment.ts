import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface AttachmentProps {
  deliveryId: UniqueEntityID;
  title: string;
  link: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get deliveryId() {
    return this.props.deliveryId;
  }

  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id);

    return attachment;
  }
}
