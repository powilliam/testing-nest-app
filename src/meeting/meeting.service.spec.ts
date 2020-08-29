import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { Meeting } from './meeting.entity';
import { Location } from './location/location.entity';
import { CreateMeetingDTO } from './dto/CreateMeeting.dto';
import * as uuid from 'uuid';
import * as faker from 'faker';

describe('Testing MeetingService', () => {
  let moduleRef: TestingModule;
  let meetingService: MeetingService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          url:
            'postgres://development:development@localhost:5432/nest-app-test',
          entities: [Meeting, Location],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Meeting]),
      ],
      providers: [MeetingService],
    }).compile();

    meetingService = moduleRef.get<MeetingService>(MeetingService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('findAll', () => {
    it('should be able to show all meetings', async () => {
      const meeting = new Meeting();
      meeting.id = uuid.v4();
      meeting.name = 'Meeting to celebrate this test';
      meeting.description =
        "It's deticated to everyone that uses TDD at its projects";

      const result = [meeting];

      jest
        .spyOn(meetingService, 'findAll')
        .mockImplementation(async () => result);
      expect(await meetingService.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should be able to create a meeting', async () => {
      const location = new Location();
      location.id = uuid.v4();
      location.latitude = faker.address.latitude();
      location.longitude = faker.address.longitude();

      const meeting = new Meeting();
      meeting.id = uuid.v4();
      meeting.name = 'Meeting to celebrate this test';
      meeting.description =
        "It's deticated to everyone that uses TDD at its projects";

      const dto: CreateMeetingDTO = {
        name: meeting.name,
        description: meeting.description,
        location,
      };

      jest
        .spyOn(meetingService, 'create')
        .mockImplementation(async () => meeting);
      expect(await meetingService.create(dto)).toBe(meeting);
    });
  });
});
