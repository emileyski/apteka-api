// sql.service.ts
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SqlQueryDto } from './dto/sql-query.dto';

@Injectable()
export class SqlService {
  constructor(private readonly connection: Connection) {}

  async executeSql(sql: SqlQueryDto): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const result = await queryRunner.query(sql.query);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
