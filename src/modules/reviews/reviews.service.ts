import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { CreateReviewDto } from './entities/create-reviews.entity';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  private readonly apiKey = 'aa9290ba';
  private readonly omdbUrl = 'https://www.omdbapi.com/';

  constructor(
    private readonly httpService,
    private readonly reviewRepository: Repository<Review>,
  ) {}


  fetchMovieDetails(title: string) {
    const url = `${this.omdbUrl}?t=${encodeURIComponent(title)}&apikey=${this.apiKey}`;
    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => response.data),
    );
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const movieDetails = this.fetchMovieDetails(createReviewDto.movieTitle);

    const review = this.reviewRepository.create({
        title: createReviewDto.movieTitle,
        notes: createReviewDto.notes,
        year: movieDetails.Year,
        imdbRating: movieDetails.imdbRating,
      });
  
      return this.reviewRepository.save(review);
  }
}

