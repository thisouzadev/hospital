import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Hospital } from 'src/modules/hospital/entities/hospital.entity';

@Entity('doctor_schedules')
export class DoctorSchedule {
  @PrimaryGeneratedColumn('uuid', { name: 'schedule_id' })
  scheduleId: string;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @OneToOne(() => Doctor, (doctor) => doctor, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id', referencedColumnName: 'doctorId' })
  doctor: Doctor;

  @Column({ name: 'hospital_id' })
  hospitalId: string;

  @OneToOne(() => Hospital, (hospital) => hospital, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'hospitalId' })
  hospital: Hospital;

  @Column({ name: 'week_day', type: 'integer' })
  weekDay: number;

  @Column({ name: 'start_at' })
  startAt: string;

  @Column({ name: 'end_day' })
  endAt: string;

  @Column({})
  vacancies: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
