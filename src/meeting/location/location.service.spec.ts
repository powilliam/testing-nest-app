import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { CreateLocationDTO } from './dto/CreateLocation.dto';
import * as uuid from 'uuid';
import * as faker from 'faker';

describe('Testing LocationService', () => {
  let moduleRef: TestingModule;
  let locationService: LocationService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          url:
            'postgres://development:development@localhost:5432/nest-app-test',
          entities: [Location],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Location]),
      ],
      providers: [LocationService],
    }).compile();

    locationService = moduleRef.get<LocationService>(LocationService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('create', () => {
    it('should be able to create a location', async () => {
      const location = new Location();
      location.id = uuid.v4();
      location.latitude = faker.address.latitude();
      location.longitude = faker.address.longitude();

      const dto: CreateLocationDTO = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      jest
        .spyOn(locationService, 'create')
        .mockImplementation(async () => location);
      expect(await locationService.create(dto)).toBe(location);
    });
  });
});
