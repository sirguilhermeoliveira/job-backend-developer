import { Controller, Post, Body, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiOperation } from '@nestjs/swagger';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Cria um review para um filme do OMDB e armazena no banco de dados' })
  @Post()
  async createReview(@Body() createReviewDto: ReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @ApiOperation({ summary: 'Atualiza o review feito anteriormente' })
  @Patch(':movieTitle')
  async updateReview(@Param('movieTitle') movieTitle: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview(movieTitle, updateReviewDto);
  }

  @ApiOperation({ summary: 'Trás todos os reviews feitos' })

  @Get()
  async findAllReviews(@Query('startYear') startYear?: string, @Query('endYear') endYear?: string) {
    return this.reviewsService.findAllReviews({ startYear, endYear });
  }

  @ApiOperation({ summary: 'Visualiza um review feito e incrementa o contador de visualizações' })

@Patch(':movieTitle/visualization') 
async findOneDelete(@Param('movieTitle') movieTitle: string) {
    return this.reviewsService.findOneDelete(movieTitle);
  }

  @Delete(':movieTitle') 
async findOneReviewAndVisualization(@Param('movieTitle') movieTitle: string) {
    return this.reviewsService.findOneReviewAndVisualization(movieTitle);
  }

  @ApiOperation({ summary: 'Ordena do mais visualizado para o menos visualizado os reviews' })

  @Get('ordered/visualizations')
  async findReviewsOrderedByVisualizations() {
    return this.reviewsService.findReviewsOrderedByVisualizations();
  }
}
