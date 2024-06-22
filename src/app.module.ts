import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeormDataSource from './database/config/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TypeormDataSource.options,
      autoLoadEntities: true,
    }),
    ReviewsModule,
  ],
})
export class AppModule {}
