import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PacienteModule } from './modules/paciente/paciente.module';
import { ConsultaModule } from './modules/consulta/consulta.module';
import { AnamneseModule } from './modules/anamnese/anamnese.module';
import { TratamentoModule } from './modules/tratamento/tratamento.module';
import { ExamesSolicitadosModule } from './modules/examesSolicitados/exames-solicitados.module';
import { PrescricaoInicialModule } from './modules/prescricaoInicial/prescricao-inicial.module';
import { EvolucaoPrescricaoModule } from './modules/evolucaoPrescricao/evolucao-prescricao.module';
import { TransferenciaModule } from './modules/transferencia/transferencia.module';
import { PermissaoAcessoModule } from './modules/permissaoAcesso/permissaoAcesso.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { UserModule } from './modules/user/user.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { EmployeeModule } from './modules/employee/employee.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
      cache: true,
    }),

    PacienteModule,
    AddressModule,
    EmployeeModule,
    ConsultaModule,
    AnamneseModule,
    TratamentoModule,
    ExamesSolicitadosModule,
    PrescricaoInicialModule,
    EvolucaoPrescricaoModule,
    TransferenciaModule,
    PermissaoAcessoModule,
    HospitalModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
