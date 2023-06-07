import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  enderecoID: number;

  @Column()
  numero: string;

  @Column()
  cep: string;

  @Column()
  telefone: string;

  @Column()
  estado: string;

  @Column()
  municipio: string;

  @Column()
  bairro: string;

  @OneToMany(() => Paciente, (paciente) => paciente.endereco)
  pacientes: Paciente[];
}
