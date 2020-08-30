import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MeetingController } from '../src/meeting/meeting.controller';
import { MeetingService } from '../src/meeting/meeting.service';
import { LocationService } from '../src/meeting/location/location.service';
import { Meeting } from '../src/meeting/meeting.entity';
import { Location } from '../src/meeting/location/location.entity';
import * as uuid from 'uuid';
import * as faker from 'faker';
import * as supertest from 'supertest';

describe('MeetingController (e2e)', () => {
  let app: INestApplication;
  const location = {
    id: uuid.v4(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  };
  const meeting = {
    id: uuid.v4(),
    name: 'Meeting to celebrate this test',
    description: "It's deticated to everyone that uses TDD at its projects",
    location,
  };
  const meetingService = {
    findAll: () => [meeting],
    create: () => meeting,
  };
  const locationService = {
    create: () => location,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MeetingController],
      providers: [MeetingService, LocationService],
    })
      .overrideProvider(MeetingService)
      .useValue(meetingService)
      .overrideProvider(LocationService)
      .useValue(locationService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET meetings', async () => {
    const { status, body } = await supertest(app.getHttpServer()).get(
      '/meetings',
    );

    expect(status).toBe(200);
    expect(body).toStrictEqual(meetingService.findAll());
  });

  it('/POST meetings', async () => {
    const mockMeeting = meetingService.create();

    const { status, body } = await supertest(app.getHttpServer())
      .post('/meetings')
      .send(mockMeeting);

    expect(status).toBe(201);
    expect(body).toMatchObject(mockMeeting);
  });
});
