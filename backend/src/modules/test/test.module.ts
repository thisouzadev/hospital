import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultController } from './controllers/test-result.controller';
import { TestController } from './controllers/test.controller';
import { TestResult } from './entities/test-result.entity';
import { Test } from './entities/test.entity';
import { TestResultService } from './services/test-result.service';
import { TestService } from './services/test.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test, TestResult])],
  providers: [TestService, TestResultService],
  controllers: [TestController, TestResultController],
})
export class TestModule {}
