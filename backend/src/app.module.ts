import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PacienteModule } from './modules/paciente/paciente.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { ConsultaModule } from './modules/consulta/consulta.module';
import { AnamneseModule } from './modules/anamnese/anamnese.module';
import { TratamentoModule } from './modules/tratamento/tratamento.module';
import { ExamesSolicitadosModule } from './modules/examesSolicitados/exames-solicitados.module';
import { PrescricaoInicialModule } from './modules/prescricaoInicial/prescricao-inicial.module';
import { EvolucaoPrescricaoModule } from './modules/evolucaoPrescricao/evolucao-prescricao.module';
import { TransferenciaModule } from './modules/transferencia/transferencia.module';
import { PermissaoAcessoModule } from './modules/permissaoAcesso/permissaoAcesso.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Use 'mysql' para MySQL Server
      host: 'mysql_hospital',
      port: 3306,
      username: 'hospital',
      password: 'passw',
      database: 'hospital',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Caminho para as entidades
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 1000,
    }),

    PacienteModule,
    EnderecoModule,
    FuncionarioModule,
    ConsultaModule,
    AnamneseModule,
    TratamentoModule,
    ExamesSolicitadosModule,
    PrescricaoInicialModule,
    EvolucaoPrescricaoModule,
    TransferenciaModule,
    PermissaoAcessoModule,
    HospitalModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
