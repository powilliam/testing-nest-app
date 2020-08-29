import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConstants from './database.constants';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConstants)],
})
export class DatabaseModule {}
