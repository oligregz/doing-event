import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'event' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  description: string;

  @Column({type: 'timestamptz', name: 'start_date'})
  startDate: Date;

  @Column({type: 'timestamptz', name: 'end_date'})
  endDate: Date;
}