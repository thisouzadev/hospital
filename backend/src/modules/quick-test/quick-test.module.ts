import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCategory } from './entities/test-category.entity';
import { QuickTest } from './entities/quick-test.entity';
import { QuickTestService } from './services/test-result.service';
import { TestService } from './services/test.service';
import { QuickTestController } from './controllers/quick-test.controller';
import { TestCategoryController } from './controllers/test-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestCategory, QuickTest])],
  providers: [TestService, QuickTestService],
  controllers: [TestCategoryController, QuickTestController],
})
export class QuickTestModule {}
