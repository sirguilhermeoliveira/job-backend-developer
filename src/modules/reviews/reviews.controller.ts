import { Controller, Post, Body, Patch, Param, Get, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './entities/create-reviews.entity';
import { UpdateReviewDto } from './entities/update-reviews.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Patch(':movieTitle')
  async updateReview(@Param('movieTitle') movieTitle: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview(movieTitle, updateReviewDto);
  }

  @Get()
  async findAllReviews(@Query('startYear') startYear?: string, @Query('endYear') endYear?: string) {
    return this.reviewsService.findAllReviews({ startYear, endYear });
  }

@Patch(':movieTitle/visualize') 
async findOneReviewAndVisualization(@Param('movieTitle') movieTitle: string) {
    return this.reviewsService.findOneReviewAndVisualization(movieTitle);
  }

  @Get('ordered/visualizations')
  async findReviewsOrderedByVisualizations() {
    return this.reviewsService.findReviewsOrderedByVisualizations();
  }
}
