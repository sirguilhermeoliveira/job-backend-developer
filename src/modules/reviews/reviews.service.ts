import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './entities/create-reviews.entity';
import { Review } from './entities/review.entity';
import { UpdateReviewDto } from './entities/update-reviews.entity';

@Injectable()
export class ReviewsService {
  private readonly apiKey = 'aa9290ba';
  private readonly omdbUrl = 'https://www.omdbapi.com/';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  fetchMovieDetails(title: string) {
    const url = `${this.omdbUrl}?t=${encodeURIComponent(title)}&apikey=${this.apiKey}`;
    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => response.data),
    );
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const movieDetails$ = this.fetchMovieDetails(createReviewDto.movieTitle);
    const movieDetails = await firstValueFrom(movieDetails$);

    const review = this.reviewRepository.create({
      title: createReviewDto.movieTitle,
      notes: createReviewDto.notes,
      year: movieDetails.Year,
      imdbRating: movieDetails.imdbRating,
    });

    return this.reviewRepository.save(review);
  }

  async updateReview(movieTitle, updateReviewDto: UpdateReviewDto) {
    const oldReview = await this.reviewRepository.findOne({ where: { title: movieTitle } });

    if (!oldReview) {
      throw new NotFoundException(`Review with movie title ${movieTitle} not found`);
    }
 
    await this.reviewRepository.update(oldReview.id, updateReviewDto);
  }

  
  async findAllReviews() {
    return this.reviewRepository.find();
  }

}
