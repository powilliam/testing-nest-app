import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingModule } from '../src/meeting/meeting.module';
import { MeetingService } from '../src/meeting/meeting.service';
import { LocationService } from '../src/meeting/location/location.service';
import { Meeting } from '../src/meeting/meeting.entity';
import { Location } from '../src/meeting/location/location.entity';
import * as uuid from 'uuid';
import * as faker from 'faker';
import * as supertest from 'supertest';

describe('MeetingController (e2e)', () => {
  let app: INestApplication;
  const meetingId = uuid.v4();
  const locationId = uuid.v4();
  const latitude = faker.address.latitude();
  const longitude = faker.address.longitude();
  const meetingService = {
    findAll: () => [
      {
        id: meetingId,
        name: 'Meeting to celebrate this test',
        description: "It's deticated to everyone that uses TDD at its projects",
        location: {
          id: locationId,
          latitude,
          longitude,
        },
      },
    ],
    create: () => ({
      id: meetingId,
      name: 'Meeting to celebrate this test',
      description: "It's deticated to everyone that uses TDD at its projects",
    }),
  };
  const locationService = {
    create: () => ({
      id: locationId,
      latitude,
      longitude,
      meeting: meetingService.create(),
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          url:
            'postgres://development:development@localhost:5432/nest-app-test',
          entities: [Meeting, Location],
          synchronize: true,
        }),
        MeetingModule,
      ],
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
    const { status, body } = await supertest(app.getHttpServer())
      .post('/meetings')
      .send({
        name: 'Meeting to celebrate this test',
        description: "It's deticated to everyone that uses TDD at its projects",
        latitude,
        longitude,
      });

    expect(status).toBe(201);
    expect(body).toMatchObject({
      ...meetingService.create(),
      location: locationService.create(),
    });
  });
});
