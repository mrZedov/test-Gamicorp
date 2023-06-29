import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/services/redis.service';
import { GetRandomDataResultDto } from './dto/get-random-data-result.dto';

@Injectable()
export class SomeTaskGetRandomService {
  constructor(private readonly redisService: RedisService) {}

  async getRandomData(): Promise<GetRandomDataResultDto[]> {
    let n = 10;
    const result = [];
    while (n-- > 0) {
      const key = await this.redisService.randomKey();
      result.push({ key: key, value: await this.redisService.get(key) });
    }
    return result;
  }
}
