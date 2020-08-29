import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { LocationService } from './location/location.service';
import { ICreateMetting } from './interfaces/CreateMeeting';
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
  public async create(
    @Body() { name, description, latitude, longitude }: ICreateMetting,
  ): Promise<Meeting> {
    const meeting = await this.meetingService.create({ name, description });
    const location = await this.locationService.create({
      latitude,
      longitude,
      meeting,
    });
    return { ...meeting, location };
  }
}
