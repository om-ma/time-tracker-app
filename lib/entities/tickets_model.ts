import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TicketsModel {
  @PrimaryGeneratedColumn()
  ticket_id!: number;

  @Column({ type: 'varchar', length: 50 })
  type!: string;

  @Column({ type: 'varchar', length: 255 })
  summary: string | null | undefined;

  @Column({ type: 'text' })
  detail: string | null | undefined;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  hours: number | null | undefined;

  @Column({ type: 'text' })
  timer: string | null | undefined;

  @Column({ type: 'text', nullable: true })
  notes: string | null | undefined;
}
