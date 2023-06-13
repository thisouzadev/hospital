import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Paciente } from '../entities/paciente.entity';

@EntityRepository(Paciente)
export class PacienteRepository extends Repository<Paciente> {}
