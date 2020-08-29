import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Location {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public latitude: string;

  @Column({ nullable: false })
  public longitude: string;
}
