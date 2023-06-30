import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { SearchPatientQueryDto } from '../dto/search-patient-query.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const cpfExists = await this.patientRepository.findOne({
      where: { cpf: createPatientDto.cpf },
    });

    if (cpfExists) {
      throw new ConflictException('O paciente já está cadastrado');
    }

    const patient = this.patientRepository.create(createPatientDto);
    await this.patientRepository.save(patient);
    return patient;
  }

  findAll(query: SearchPatientQueryDto) {
    const { attendanceDate, attendanceNumber, name, ...restOfQuery } = query;
    return this.patientRepository.find({
      order: { createdAt: 'DESC' },
      where: {
        name: Like(`%${name || ''}%`),
        ...restOfQuery,
        attendances: { attendanceDate, attendanceNumber },
      },
      relations: ['attendances'],
    });
  }

  async findOne(patientId: string) {
    const patient = await this.patientRepository.findOne({
      where: { patientId },
      relations: ['address'],
    });
    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }
    return patient;
  }

  async findOneByCPF(cpf: string) {
    const patient = await this.patientRepository.findOneBy({ cpf });
    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }
    return patient;
  }

  async update(patientId: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOneBy({ patientId });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    Object.assign(patient, updatePatientDto);

    await this.patientRepository.save(patient);

    return patient;
  }

  async remove(patientId: string) {
    const patient = await this.patientRepository.findOneBy({ patientId });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }
    await this.patientRepository.remove(patient);
  }
}
