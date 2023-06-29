import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetRandomDataResultDto } from './dto/get-random-data-result.dto';
import { SomeTaskGetRandomService } from './some-task-get-random.service';

@ApiTags('Some task')
@Controller('some-task')
export class SomeTaskController {
  constructor(private readonly someTaskGetRandomService: SomeTaskGetRandomService) {}

  @Get()
  @ApiOperation({ description: 'Get random 10 records' })
  @ApiOkResponse({ type: GetRandomDataResultDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async getRandomData() {
    return await this.someTaskGetRandomService.getRandomData();
  }
}
