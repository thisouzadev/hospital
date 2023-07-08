import { Attendance } from '../../../modules/attendance/entities/attendance.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Sector } from './sector.entity';
import { SectorAttendanceStatus } from '../../../shared/enums/sector-attendance-status.enum';

@Entity('sector_attendances')
export class SectorAttendance {
  @PrimaryColumn('uuid', { name: 'sector_id' })
  sectorId: string;

  @PrimaryColumn('uuid', { name: 'attendance_id' })
  attendanceId: string;

  @ManyToOne(() => Sector)
  @JoinColumn({ name: 'sector_id', referencedColumnName: 'sectorId' })
  sector: Sector;

  @ManyToOne(() => Attendance)
  @JoinColumn({ name: 'attendance_id', referencedColumnName: 'attendanceId' })
  attendance: Attendance;

  @CreateDateColumn({
    name: 'entered_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  enteredAt: Date;

  @Column({
    name: 'attended_at',
    type: 'timestamp',
    nullable: true,
  })
  attendedAt: Date;

  @Column({
    name: 'left_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  leftAt: Date;

  @Column({
    type: 'enum',
    enum: SectorAttendanceStatus,
    default: SectorAttendanceStatus.WAITING,
  })
  status: SectorAttendanceStatus;

  @Column({ name: 'is_finished', default: false })
  isFinished: boolean;
}
