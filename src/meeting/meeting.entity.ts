import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Location } from './location/location.entity';

@Entity()
export class Meeting {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @OneToOne(() => Location, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  public location: Location;
}
