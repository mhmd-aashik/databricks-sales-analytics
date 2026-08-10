import { Controller, Get } from '@nestjs/common';
import { DatabricksService } from 'src/databricks/databricks.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly databricksService: DatabricksService) {}

  @Get('top-products')
  async getTopProducts() {
    return this.databricksService.testConnection();
  }
}
