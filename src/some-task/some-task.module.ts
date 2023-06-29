import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../redis/redis.module';
import { SomeTaskGetRandomService } from './some-task-get-random.service';
import { SomeTaskController } from './some-task.controller';

@Module({
  imports: [RedisModule, AuthModule, UsersModule],
  providers: [SomeTaskGetRandomService],
  controllers: [SomeTaskController],
})
export class SomeTaskModule {}
