import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private redisClient;

  constructor() {
    this.redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    });
  }

  async onModuleInit() {
    this.redisClient.on('error', (err) => console.log('Redis client error', err));
    this.redisClient.on('connect', () => {
      console.log('Redis client connect success');
      this.generateData();
    });
    await this.redisClient.connect();
  }

  async randomKey() {
    return this.redisClient.randomKey();
  }

  async get(key) {
    return this.redisClient.get(key);
  }

  async set(key, value) {
    return this.redisClient.set(key, value);
  }

  async generateData() {
    let numberValues = 50;
    while (numberValues-- > 0) {
      const currentTime = new Date();
      const key = 'key' + +currentTime;
      const value = +currentTime + ' ' + currentTime;
      await this.set(key, value);
    }
    console.log('Redis record generation complete');
  }
}
