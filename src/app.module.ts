import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabricksService } from './databricks/databricks.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DatabricksService],
})
export class AppModule {}
