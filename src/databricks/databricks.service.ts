import { DBSQLClient } from '@databricks/sql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabricksService {
  constructor(private readonly configService: ConfigService) {}

  private async executeQuery(sql: string) {
    const client = new DBSQLClient();

    const connection = await client.connect({
      host: this.configService.get<string>('DATABRICKS_HOST')!,
      path: this.configService.get<string>('DATABRICKS_PATH')!,
      token: this.configService.get<string>('DATABRICKS_TOKEN')!,
    });

    const session = await connection.openSession();

    try {
      const operation = await session.executeStatement(sql, {
        runAsync: true,
      });
      try {
        return await operation.fetchAll();
      } finally {
        await operation.close();
      }
    } finally {
      await session.close();
      await connection.close();
    }
  }

  async getTopProducts() {
    return this.executeQuery(`
      SELECT *
      FROM workspace.default.product_revenue
      ORDER BY revenue DESC
    `);
  }

  async getTotalRevenue() {
    return this.executeQuery(`
      SELECT
        SUM(o.quantity * p.price) AS total_revenue
      FROM workspace.default.orders o
      JOIN workspace.default.products p
        ON o.product_id = p.product_id
    `);
  }

  async getRevenueByCategory() {
    return this.executeQuery(`
      SELECT
        p.category,
        SUM(o.quantity * p.price) AS revenue
      FROM workspace.default.orders o
      JOIN workspace.default.products p
        ON o.product_id = p.product_id
      GROUP BY p.category
      ORDER BY revenue DESC
    `);
  }
}
