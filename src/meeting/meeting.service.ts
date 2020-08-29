import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './meeting.entity';
import { CreateMeetingDTO } from './dto/CreateMeeting.dto';
import * as uuid from 'uuid';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) {}

  public async findAll(): Promise<Meeting[]> {
    return await this.meetingRepository.find({ relations: ['location'] });
  }

  public async create(dto: CreateMeetingDTO): Promise<Meeting> {
    const meeting = this.meetingRepository.create({ ...dto, id: uuid.v4() });
    await this.meetingRepository.save(meeting);
    return meeting;
  }
}
