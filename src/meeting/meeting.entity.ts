import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Location } from './location/location.entity';

@Entity()
export class Meeting {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @OneToOne(
    () => Location,
    location => location.meeting,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  public location: Location;
}
