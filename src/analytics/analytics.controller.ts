import { Controller, Get } from '@nestjs/common';
import { DatabricksService } from 'src/databricks/databricks.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly databricksService: DatabricksService) {}

  @Get('top-products')
  async getTopProducts() {
    return this.databricksService.getTopProducts();
  }

  @Get('total-revenue')
  async getTotalRevenue() {
    return this.databricksService.getTotalRevenue();
  }

  @Get('revenue-by-category')
  async getRevenueByCategory() {
    return this.databricksService.getRevenueByCategory();
  }
}
