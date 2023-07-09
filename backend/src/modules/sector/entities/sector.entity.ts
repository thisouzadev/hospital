import { Attendance } from 'src/modules/attendance/entities/attendance.entity';
import { Hospital } from 'src/modules/hospital/entities/hospital.entity';
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

@Entity('sectors')
export class Sector {
  @PrimaryGeneratedColumn('uuid', { name: 'sector_id' })
  sectorId: string;

  @Column()
  name: string;

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
