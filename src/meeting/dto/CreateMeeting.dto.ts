import { Location } from '../location/location.entity';

export class CreateMeetingDTO {
  public name: string;
  public description: string;
  public location: Location;
}
