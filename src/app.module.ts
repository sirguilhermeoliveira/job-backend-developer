import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost', 
    port: 3306,         
    username: 'root',   
    password: 'Giovanna20@',  
    database: 'nestjs-job-backend-developer', 
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,   
  }),ReviewsModule
],
})
export class AppModule {}
