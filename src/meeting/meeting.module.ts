import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { MeetingService } from './meeting.service';
import { LocationModule } from './location/location.module';
import { MeetingController } from './meeting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), LocationModule],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
