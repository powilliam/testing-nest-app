import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { LocationModule } from './location/location.module';
import { Meeting } from './meeting.entity';
import { Location } from './location/location.entity';
import { MeetingController } from './meeting.controller';
import { ICreateMetting } from './interfaces/CreateMeeting';
import * as uuid from 'uuid';
import * as faker from 'faker';

describe('Testing MeetingController', () => {
  let moduleRef: TestingModule;
  let meetingController: MeetingController;

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
        LocationModule,
      ],
      controllers: [MeetingController],
      providers: [MeetingService],
    }).compile();

    meetingController = moduleRef.get<MeetingController>(MeetingController);
  });

  describe('index', () => {
    it('should be able to list all meetings', async () => {
      const meeting = new Meeting();
      meeting.id = uuid.v4();
      meeting.name = 'Meeting to celebrate this test';
      meeting.description =
        "It's deticated to everyone that uses TDD at its projects";

      const result = [meeting];
      jest
        .spyOn(meetingController, 'index')
        .mockImplementation(async () => result);
      expect(await meetingController.index()).toBe(result);
    });
  });

  describe('create', () => {
    it('should be able to create a meeting related to a location', async () => {
      const meeting = new Meeting();
      meeting.id = uuid.v4();
      meeting.name = 'Meeting to celebrate this test';
      meeting.description =
        "It's deticated to everyone that uses TDD at its projects";

      const location = new Location();
      location.id = uuid.v4();
      location.latitude = faker.address.latitude();
      location.longitude = faker.address.longitude();
      location.meeting = meeting;

      const dto: ICreateMetting = {
        name: meeting.name,
        description: meeting.description,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const expectedResponse = { ...meeting, location };

      jest
        .spyOn(meetingController, 'create')
        .mockImplementation(async () => expectedResponse);
      expect(await meetingController.create(dto)).toBe(expectedResponse);
    });
  });

  afterAll(async () => {
    await moduleRef.close();
  });
});
