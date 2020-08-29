import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDTO } from './dto/CreateLocation.dto';
import * as uuid from 'uuid';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  public async create(dto: CreateLocationDTO): Promise<Location> {
    const location = this.locationRepository.create({ ...dto, id: uuid.v4() });
    await this.locationRepository.save(location);
    return location;
  }
}
