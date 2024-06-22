import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as 'mysql', 
      host: process.env.TYPEORM_HOST, 
      port: parseInt(process.env.TYPEORM_PORT, 10), 
      username: process.env.TYPEORM_USERNAME, 
      password: process.env.TYPEORM_PASSWORD, 
      database: process.env.TYPEORM_DATABASE, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    ReviewsModule,
  ],
})
export class AppModule {}
