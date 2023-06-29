import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { SomeTaskModule } from './some-task/some-task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity.js'],
      entitiesTs: ['./src/**/*.entity.ts'],
      dbName: 'gamicorp',
      clientUrl: process.env.MONGO_URL,
      type: 'mongo',
    }),
    RedisModule,
    UsersModule,
    AuthModule,
    SomeTaskModule
  ],
})
export class AppModule {}
