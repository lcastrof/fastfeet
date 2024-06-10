import { OnStatusChange } from "@/domain/notification/application/subscribbers/on-status-change";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [OnStatusChange, SendNotificationUseCase],
})
export class EventsModule {}
