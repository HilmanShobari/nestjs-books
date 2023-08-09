import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

// define entity file before run "npm run typeorm:generate-migration"
// import { PostEntity } from './entities/post.entity'; 
import { UserEntity } from './entities/users.entity'; 
//import class from file migration, before run "npm run typeorm:run-migrations"
import {Migration1691549323251} from './migrations/1691549323251-migration' 

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [UserEntity],
  migrations: [Migration1691549323251]
});
