import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

  async createReview(createReviewDto: ReviewDto): Promise<Review> {
    try{
    const existingReview = await this.reviewRepository.findOne({ where: { title: createReviewDto.movieTitle } });

    if (existingReview) {
      throw new Error('Review already exists in database.');
    }

    const movieDetails$ = this.fetchMovieDetails(createReviewDto.movieTitle);

    const movieDetails = await firstValueFrom(movieDetails$);

    const review = this.reviewRepository.create({
      title: createReviewDto.movieTitle,
      notes: createReviewDto.notes,
      year: movieDetails.Year,
      imdbRating: movieDetails.imdbRating,
    });

    this.reviewRepository.save(review);

    return
  } catch (error){
    throw new NotFoundException(error);
  }
  }

  async updateReview(movieTitle: string, updateReviewDto: UpdateReviewDto) {
    try{

      const oldReview = await this.reviewRepository.findOne({ where: { title: movieTitle } });
      
      if (!oldReview) {
        throw new NotFoundException(`Review with movie title ${movieTitle} not found`);
      }
      
      await this.reviewRepository.update(oldReview.id, updateReviewDto);
      
      return 
    }
      catch(error){
        throw new NotFoundException(error);
      }
      }
  
  async findAllReviews(filter: { startYear?: string, endYear?: string }, page = 1, limit = 10): Promise<Pagination<Review>> {
    try {
    const query = this.reviewRepository.createQueryBuilder('review');

    if (filter.startYear) {
      query.andWhere('review.year >= :startYear', { startYear: filter.startYear });
    }

    if (filter.endYear) {
      query.andWhere('review.year <= :endYear', { endYear: filter.endYear });
    }

    query.orderBy('review.year', 'DESC');

    return await paginate<Review>(query, { page, limit });

  } catch(error) {
    throw new NotFoundException(error);
  }
  }
  
  async findOneReviewAndVisualization(movieTitle:string) {
    try{
    const review = await this.reviewRepository.findOne({ where: { title: movieTitle } });

    if (!review) {
      throw new NotFoundException(`Review with movie title ${movieTitle} not found`);
    }
    return await this.reviewRepository.update(review.id, {
      visualizations: (review.visualizations || 0) + 1,
    });
  } catch(error) {
    throw new NotFoundException(error);
  }
  }

  async findReviewsOrderedByVisualizations(page = 1, limit= 10) {
    try{

      const query = this.reviewRepository.createQueryBuilder('review');
      
      return await paginate<Review>(query, { page, limit });
    } catch (error){
      throw new NotFoundException(error);
    }
  }

  async findOneDelete(movieTitle:string) {
    try{
    const review = await this.reviewRepository.findOne({ where: { title: movieTitle } });

    if (!review) {
      throw new NotFoundException(`Review with movie title ${movieTitle} not found`);
    }

    await this.reviewRepository.delete(review.id);

    return
  } catch(error) {
    throw new NotFoundException(error);
  }
  }
}