import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

import { PostEntity } from './entities/post.entity'; //entity file
import {Migration1691522060921} from './migrations/1691522060921-migration' //import class from file migration, after migration:generate

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [PostEntity],
  migrations: [Migration1691522060921]
});
