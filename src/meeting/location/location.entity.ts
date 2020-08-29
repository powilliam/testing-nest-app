import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Meeting } from '../meeting.entity';

@Entity()
export class Location {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public latitude: string;

  @Column({ nullable: false })
  public longitude: string;

  @OneToOne(
    () => Meeting,
    meeting => meeting.location,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn()
  public meeting: Meeting;
}
