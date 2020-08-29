import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MeetingModule } from './meeting/meeting.module';

@Module({
  imports: [ConfigModule, DatabaseModule, MeetingModule],
})
export class AppModule {}
