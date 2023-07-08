import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorAttendanceStatus } from 'src/shared/enums/sector-attendance-status.enum';
import { Repository } from 'typeorm';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { Sector } from '../entities/sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}

  async create(hospitalId: string, createSectorDto: CreateSectorDto) {
    const sectorExists = await this.sectorRepository.findOneBy({
      name: createSectorDto.name,
    });

    if (sectorExists) {
      throw new ConflictException('Já existe um setor com este nome');
    }

    const sector = this.sectorRepository.create({
      ...createSectorDto,
      hospitalId,
    });

    await this.sectorRepository.save(sector);

    return sector;
  }

  findAll(hospitalId: string) {
    return this.sectorRepository.find({
      where: {
        hospitalId,
        // sectorAttendances: { status: SectorAttendanceStatus.WAITING },
      },
      // relations: ['attendances', 'sectorAttendances'],
    });
  }

  async findOne(hospitalId: string, sectorId: string) {
    const sector = await this.sectorRepository.findOne({
      where: {
        hospitalId,
        sectorId,
        sectorAttendances: {
          status: SectorAttendanceStatus.WAITING,
        },
      },
      relations: [
        'sectorAttendances',
        'sectorAttendances.attendance',
        'sectorAttendances.attendance.patient',
      ],
    });

    if (!sector) {
      throw new NotFoundException('O setor não existe');
    }

    return sector;
  }

  async update(
    hospitalId: string,
    sectorId: string,
    updateSectorDto: UpdateSectorDto,
  ) {
    const sector = await this.sectorRepository.findOneBy({
      sectorId,
      hospitalId,
    });

    if (!sector) {
      throw new NotFoundException('O setor não existe');
    }

    Object.assign(sector, updateSectorDto);

    await this.sectorRepository.save(sector);

    return sector;
  }
}
