import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({ description: 'ID' })
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  login: string;

  @Property()
  password: string;

  @Property()
  email: string;

  @Property({ default: false })
  deleted: boolean;
}
