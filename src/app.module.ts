import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MeetingModule } from './meeting/meeting.module';

@Module({
  imports: [DatabaseModule, MeetingModule],
})
export class AppModule {}
