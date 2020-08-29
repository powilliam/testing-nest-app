import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { Location } from '../meeting/location/location.entity';

export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Meeting, Location],
  synchronize: true,
} as TypeOrmModuleOptions;
