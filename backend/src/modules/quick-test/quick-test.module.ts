import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultController } from './controllers/test-result.controller';
import { TestController } from './controllers/test.controller';
import { TestCategory } from './entities/test-category.entity';
import { QuickTest } from './entities/quick-test.entity';
import { QuickTestService } from './services/test-result.service';
import { TestService } from './services/test.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestCategory, QuickTest])],
  providers: [TestService, QuickTestService],
  controllers: [TestController, TestResultController],
})
export class QuickTestModule {}
