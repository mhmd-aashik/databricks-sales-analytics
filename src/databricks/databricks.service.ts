import { DBSQLClient } from '@databricks/sql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabricksService {
  constructor(private readonly configService: ConfigService) {}

  async getTopProducts() {
    const client = new DBSQLClient();

    const connection = await client.connect({
      host: this.configService.get('DATABRICKS_HOST')!,
      path: this.configService.get('DATABRICKS_PATH')!,
      token: this.configService.get('DATABRICKS_TOKEN')!,
    });

    const session = await connection.openSession();

    const operation = await session.executeStatement(
      'SELECT * FROM workspace.default.product_revenue ORDER BY revenue DESC',
      {
        runAsync: true,
      },
    );

    const result = await operation.fetchAll();

    await operation.close();
    await session.close();
    await connection.close();

    return result;
  }
}
