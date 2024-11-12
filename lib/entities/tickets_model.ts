import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class TicketsModel {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  ticket_id!: string;

  @Column({ type: 'varchar', length: 50 })
  type!: string;

  @Column({ type: 'varchar', length: 255 })
  summary: string | null | undefined;

  @Column({ type: 'text' })
  detail: string | null | undefined;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  hours: number | null | undefined;

  @Column({ type: 'text' })
  timer: string | null | undefined;

  @Column({ type: 'text', nullable: true })
  notes: string | null | undefined; // Nullable field (to match the table's schema)

  // Hook to generate the custom ticket_id in the format TECH-<ID>
  @BeforeInsert()
  setTicketId() {
    if (!this.ticket_id) {
      this.ticket_id = `TECH-${Math.floor(Math.random() * 10000)}`;
    }
  }
}
