import { Meeting } from '../../meeting.entity';

export class CreateLocationDTO {
  public latitude: string;
  public longitude: string;
  public meeting: Meeting;
}
