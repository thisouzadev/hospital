import { Attendance } from '../../attendance/entities/attendance.entity';
import { Hospital } from '../../hospital/entities/hospital.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SectorAttendance } from './sector-attendance.entity';
import { ISector } from '../models/ISector';

@Entity('sectors')
export class Sector implements ISector {
  @PrimaryGeneratedColumn('uuid', { name: 'sector_id' })
  sectorId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Attendance, (attendance) => attendance.sectors)
  @JoinTable({
    synchronize: false,
    name: 'sector_attendances',
    joinColumn: {
      name: 'sector_id',
      referencedColumnName: 'sectorId',
    },
    inverseJoinColumn: {
      name: 'attendance_id',
      referencedColumnName: 'attendanceId',
    },
  })
  attendances: Attendance[];

  @Column('uuid', { name: 'hospital_id' })
  hospitalId: string;

  @OneToMany(
    () => SectorAttendance,
    (sectorAttendance) => sectorAttendance.sector,
  )
  sectorAttendances: SectorAttendance[];

  @ManyToOne(() => Hospital)
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'hospitalId' })
  hospital: Hospital;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
