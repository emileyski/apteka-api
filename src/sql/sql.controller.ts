// sql.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SqlService } from './sql.service';
import { ApiTags } from '@nestjs/swagger';
import { SqlQueryDto } from './dto/sql-query.dto';

@ApiTags('sql')
@Controller('sql')
export class SqlController {
  constructor(private readonly sqlService: SqlService) {}

  @Post('execute')
  async executeSql(@Body() query: SqlQueryDto): Promise<any> {
    try {
      const result = await this.sqlService.executeSql(query);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
