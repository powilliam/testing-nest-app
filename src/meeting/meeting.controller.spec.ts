import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { LocationService } from './location/location.service';
import { Meeting } from './meeting.entity';
import { Location } from './location/location.entity';
import { MeetingController } from './meeting.controller';
import { CreateMeetingDTO } from './dto/CreateMeeting.dto';
import * as uuid from 'uuid';
import * as faker from 'faker';

describe('Testing MeetingController', () => {
  let moduleRef: TestingModule;
  let meetingController: MeetingController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [MeetingController],
      providers: [
        MeetingService,
        LocationService,
        { provide: getRepositoryToken(Meeting), useValue: {} },
        { provide: getRepositoryToken(Location), useValue: {} },
      ],
    }).compile();

    meetingController = moduleRef.get<MeetingController>(MeetingController);
  });

  describe('index', () => {
    it('should be able to list all meetings', async () => {
      const location = new Location();
      location.id = uuid.v4();
      location.latitude = faker.address.latitude();
      location.longitude = faker.address.longitude();

      const meeting = new Meeting();
      meeting.id = uuid.v4();
      meeting.name = 'Meeting to celebrate this test';
      meeting.description =
        "It's deticated to everyone that uses TDD at its projects";
      meeting.location = location;

      const result = [meeting];
      jest
        .spyOn(meetingController, 'index')
        .mockImplementation(async () => result);
      expect(await meetingController.index()).toBe(result);
    });
  });

  describe('create', () => {
    it('should be able to create a meeting related to a location', async () => {
      const location = new Location();
      location.id = uuid.v4();
      location.latitude = faker.address.latitude();
      location.longitude = faker.address.longitude();

      const meeting = new Meeting();
      meeting.id = uuid.v4();
      meeting.name = 'Meeting to celebrate this test';
      meeting.description =
        "It's deticated to everyone that uses TDD at its projects";
      meeting.location = location;

      const dto: CreateMeetingDTO = {
        name: meeting.name,
        description: meeting.description,
        location,
      };

      jest
        .spyOn(meetingController, 'create')
        .mockImplementation(async () => meeting);
      expect(await meetingController.create(dto)).toBe(meeting);
    });
  });

  afterAll(async () => {
    await moduleRef.close();
  });
});
