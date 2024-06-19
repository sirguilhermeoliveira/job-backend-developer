import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    autoLoadEntities: true,
    synchronize: true,   
  }),ReviewsModule, OmdbModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
