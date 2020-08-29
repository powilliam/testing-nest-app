import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { LocationService } from './location/location.service';
import { CreateMeetingDTO } from './dto/CreateMeeting.dto';
import { Meeting } from './meeting.entity';

@Controller('meetings')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  public async index(): Promise<Meeting[]> {
    return await this.meetingService.findAll();
  }

  @Post()
  public async create(@Body() dto: CreateMeetingDTO): Promise<Meeting> {
    const location = await this.locationService.create(dto.location);
    return await this.meetingService.create({ ...dto, location });
  }
}
